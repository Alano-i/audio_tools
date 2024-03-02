import os

if not os.environ.get("WORKDIR"):
    workdir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
else:
    workdir = os.environ.get("WORKDIR")
if not os.path.exists(workdir):
    os.makedirs(workdir)
log_dir = os.path.join(workdir, 'logs')
if not os.path.exists(log_dir):
    os.makedirs(log_dir)
conf_dir = os.path.join(workdir, 'conf')
if not os.path.exists(conf_dir):
    os.makedirs(conf_dir)
os.environ["WORKDIR"] = workdir

import logging.config
import httpx
import uvicorn
import inject

from fastapi import FastAPI, Response, Request
from starlette.exceptions import HTTPException
from fastapi.exceptions import RequestValidationError
from apscheduler.schedulers.background import BackgroundScheduler

from audio_tools.databases import create_all
from audio_tools.config.yamlconf import default_conf_file, parse_conf_file
from audio_tools.binderapi import NotifyConf, BarkConf, QywxConf, TelegramConf
from audio_tools.common.logging import LOGGING_CONFIG
from audio_tools.common.response import json_200, json_with_status, json_500
from audio_tools.tasks.podcastupdate import PodcastUpdate
from audio_tools.route import router as audio_route
from audio_tools.models import *

scheduler = BackgroundScheduler(daemon=True)

logging.config.dictConfig(LOGGING_CONFIG)
logger = logging.getLogger(__name__)
app = FastAPI()
app.include_router(audio_route, prefix='/api/audio', tags=['audio'])

create_all()


@app.get("/")
async def root():
    return json_200(message="AudioTools is running.")


@app.exception_handler(RequestValidationError)
async def unprocessable_entity_handler(request, exc: RequestValidationError):
    return json_with_status(
        status_code=422,
        message='Parameter error',
        data=dict(exc.errors())
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return json_with_status(status_code=exc.status_code, message=exc.detail)


@app.exception_handler(httpx.HTTPStatusError)
async def http_status_exception_handler(request, e: httpx.HTTPStatusError):
    msg = e.response.json().get('error', {}).get('message')
    logger.error('http status exception: ' + msg, exc_info=True)
    return json_500(message=msg)


@app.exception_handler(Exception)
async def universal_exception_handler(request, exc):
    logger.error('universal_exception_handler', exc_info=True)
    return json_500(message=str(exc))


def conf(binder):
    conf = parse_conf_file()
    base_conf = conf.audio_tools
    notify_conf = conf.notify
    qywx_conf = notify_conf.qywx
    bark_conf = notify_conf.bark
    telegram_conf = notify_conf.telegram
    if base_conf.notify:
        notify_channel = base_conf.notify.split(",")
    else:
        notify_channel = []
    notify_channel = [channel.strip() for channel in notify_channel]
    notify = NotifyConf(channel=notify_channel)
    binder.bind(NotifyConf, notify)
    if 'qywx' in notify_channel:
        qywx = QywxConf(base_url=qywx_conf.qywx_base_url, corp_id=qywx_conf.corpid, corp_secret=qywx_conf.corpsecret,
                        agent_id=qywx_conf.agentid, to_user=qywx_conf.touser)
        binder.bind(QywxConf, qywx)
    if 'bark' in notify_channel:
        if not bark_conf.bark_icon:
            bark_conf.bark_icon = "https://ossapi.ainnk.vip/public/images/NDU/NDU-icon.jpg"
        bark = BarkConf(base_url=bark_conf.bark_url, sound=bark_conf.bark_sound,
                        group=bark_conf.bark_group, icon=bark_conf.bark_icon)
        binder.bind(BarkConf, bark)
    if 'telegram' in notify_channel:
        telegram = TelegramConf(base_url=telegram_conf.tg_base_url, token=telegram_conf.tgbot_token,
                                chat_id=telegram_conf.tg_chat_id, proxy=telegram_conf.proxy)
        binder.bind(TelegramConf, telegram)


def start_hub_scheduler():
    conf = parse_conf_file()
    base_conf = conf.audio_tools
    interval_secs = int(base_conf.interval)
    scheduler.add_job(PodcastUpdate().run, 'interval', seconds=interval_secs,
                      id='dockerhub_task')
    logger.info(f"更新博客信息任务启动，间隔时间: {interval_secs}s")
    scheduler.start()


def startup():
    default_conf_file()
    inject.clear_and_configure(conf)
    logger.info(f'程序启动，立刻执行一次任务')
    PodcastUpdate().run()
    start_hub_scheduler()


def main():
    startup()
    uvicorn.run(app, host="0.0.0.0", port=5050)


if __name__ == '__main__':
    main()
