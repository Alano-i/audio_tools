import os
# from mbot.core.plugins import plugin
# from mbot.core.plugins import PluginContext, PluginMeta
# from mbot.openapi import mbot_api
from typing import Dict, Any
import logging

from audio_tools.notify.notifycontrol import NotifyControl

loger = logging.getLogger(__name__)
plugins_name = '「批量重命名」'


# @plugin.after_setup
# def after_setup(plugin_meta: PluginMeta, config: Dict[str, Any]):
#     global message_to_uid, channel
#     message_to_uid = config.get('uid')
#     if config.get('channel'):
#         channel = config.get('channel')
#         loger.info(f'{plugins_name}已切换通知通道至「{channel}」')
#     else:
#         channel = 'qywx'
#     if not message_to_uid:
#         loger.error(f'{plugins_name}获取推送用户失败，可能是设置了没保存成功或者还未设置')
#
#
# @plugin.config_changed
# def config_changed(config: Dict[str, Any]):
#     global message_to_uid, channel
#     message_to_uid = config.get('uid')
#     if config.get('channel'):
#         channel = config.get('channel')
#         loger.info(f'{plugins_name}已切换通知通道至「{channel}」')
#     else:
#         channel = 'qywx'
#     if not message_to_uid:
#         loger.error(f'{plugins_name}获取推送用户失败，可能是设置了没保存成功或者还未设置')


def push_msg_to_mbot(msg_title, msg_digest, cover_image_url, link_url=''):
    image_url = cover_image_url if cover_image_url else 'https://img.nanako.vip/img?type=原神'
    msg_data = {
        'title': msg_title,
        'a': msg_digest,
        'pic_url': image_url,
        'link_url': link_url,
    }
    NotifyControl().send_message_by_tmpl(title=msg_title, content=msg_digest, img_url=image_url, url=link_url)

    # try:
    #     if message_to_uid:
    #         for _ in message_to_uid:
    #             server.notify.send_message_by_tmpl('{{title}}', '{{a}}', msg_data, to_uid=_, to_channel_name=channel)
    #     else:
    #         server.notify.send_message_by_tmpl('{{title}}', '{{a}}', msg_data)
    #     loger.info(f'{plugins_name}已推送消息')
    #     return
    # except Exception as e:
    #     loger.error(f'{plugins_name}推送消息异常, 原因: {e}')


def replace_string(folder_path, loop_all_folder=False, old_str='', new_str='', *args, **kwargs):
    ext = ['.doc', '.m4a', '.mp3', '.mkv', '.flac', '.ass']
    # for root, dirs, files in os.walk(folder_path):
    #     for file in files:
    #         file_name, file_ext = os.path.splitext(file)
    #         if file_ext.lower() in ext:
    #             file_path = os.path.join(root, file)
    #             new_file_name = file.replace(old_str, new_str)
    #             os.rename(file_path, os.path.join(root, new_file_name))
    #             loger.info(f'{plugins_name}开始重命名：{file_path}')
    #     if not loop_all_folder:
    #         break
    loger.info(f"入参：folder_path:{folder_path}、old_str={old_str}、new_str={new_str}")

    # 推送通知
    msg_title = '向NDU学习'
    msg_digest = f'测试通知，{folder_path}完成'
    cover_image_url = ''
    push_msg_to_mbot(msg_title, msg_digest, cover_image_url, link_url='')


