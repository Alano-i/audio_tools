import inject
import logging
from typing import Dict, Optional, Union, List

from audio_tools.binderapi import NotifyConf
from audio_tools.notify.bark_notify import BarkNotify
from audio_tools.notify.qywx_notify import QYWXNotify
from audio_tools.notify.telegram_notify import TelegramNotify

logger = logging.getLogger(__name__)


class NotifyControl:
    def __init__(self):
        notify_conf: NotifyConf = inject.instance(NotifyConf)
        self.notify_channel = notify_conf.NotifyChannel

    def send_message_by_tmpl(self, title: str, content: str, to_channel_name: Union[str | List[str]] = None, url: str = None, img_url: str = None):
        if not to_channel_name:
            to_channel_name = self.notify_channel
        if isinstance(to_channel_name, str):
            to_channel_name = [to_channel_name]
        try:
            if 'bark' in to_channel_name:
                BarkNotify().send_message(title=title, content=content)
            if 'qywx' in to_channel_name:
                QYWXNotify().send_img_text_message(title=title, content=content, url=url, img_url=img_url)
            if 'telegram' in to_channel_name:
                TelegramNotify().send_photo_message(title=title, content=content, url=url, img_url=img_url)
        except Exception as e:
            logger.error(f"通知失败: {e}", exc_info=True)
            return
