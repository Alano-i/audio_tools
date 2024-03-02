import ruamel.yaml
import os

conf_file = f"{os.environ.get('WORKDIR')}/conf/base_config.yml"


def deep_update_remove_rename(original, new_data, keys_to_rename=None, keys_to_remove=None):
    """
    更新字典中的值、删除指定的键、并重命名键。
    :param original: 原始字典。
    :param new_data: 包含更新数据的字典。
    :param keys_to_remove: 包含要删除键的列表，支持点表示法来指定嵌套键。
    :param keys_to_rename: 一个字典，表示要重命名的键及其新名字。
    """
    # 重命名键
    if keys_to_rename:
        for old_key_path, new_key in keys_to_rename.items():
            _rename_key_recursive(original, old_key_path.split('.'), new_key)

    # 更新
    deep_update(original, new_data)

    # 处理要删除的键
    if keys_to_remove:
        for key_path in keys_to_remove:
            keys = key_path.split('.')
            _remove_key_recursive(original, keys)


def deep_update(original, new_data):
    """
    递归合并两个字典，包括嵌套的字典。
    如果遇到同名键，且值也是字典，则递归合并这两个字典；
    但不会覆盖原始数据中已经存在的键值对。
    :param original: 原始字典。
    :param new_data: 包含更新数据的字典。
    """
    for key, value in new_data.items():
        # 如果键在原始字典中不存在，直接添加
        if key not in original:
            original[key] = value
        else:
            # 如果两个字典中都有这个键，且对应的值都是字典，则递归合并
            if isinstance(original[key], dict) and isinstance(value, dict):
                deep_update(original[key], value)
            # 如果键在原始字典中已存在，且对应的值不是字典，则不进行操作（不覆盖）
            else:
                continue


def _remove_key_recursive(dic, keys):
    """
    递归删除字典中的键。
    :param dic: 字典。
    :param keys: 键的列表，表示要删除的键的路径。
    """
    key = keys.pop(0)
    if len(keys) == 0:
        if key in dic:
            del dic[key]
    else:
        if key in dic and isinstance(dic[key], dict):
            _remove_key_recursive(dic[key], keys)


def _rename_key_recursive(dic, old_keys, new_key):
    """
    递归重命名字典中的键。
    :param dic: 字典。
    :param old_keys: 旧键名的路径列表。
    :param new_key: 新键名。
    """
    old_key = old_keys.pop(0)
    if len(old_keys) == 0:
        if old_key in dic:
            dic[new_key] = dic.pop(old_key)
    else:
        if old_key in dic and isinstance(dic[old_key], dict):
            _rename_key_recursive(dic[old_key], old_keys, new_key)


def default_conf_file():
    config = {
        "audio_tools": {
            "interval": 60,
            "notify": "bark,telegram,qywx"
        },
        "notify": {
            "public": {
                "notify_img": ""
            },
            "qywx": {
                "qywx_base_url": "https://qyapi.weixin.qq.com",
                "corpid": "",
                "corpsecret": "",
                "agentid": "",
                "touser": "@all",
            },
            "bark": {
                "bark_url": "",
                "bark_sound": "chime",
                "bark_group": "NDU",
                "bark_icon": "",
            },
            "telegram": {
                "tg_base_url": "https://api.telegram.org/bot",
                "tgbot_token": "",
                "tg_chat_id": "",
                "proxy": "",
            }

        }
    }

    keys_to_remove = [
        # 要删除的键
    ]
    keys_to_rename = {
        # 要重命名的键
    }

    if not os.path.exists(conf_file):
        with open(conf_file, 'w', encoding='utf-8') as init_f:
            ruamel.yaml.dump(config, init_f, Dumper=ruamel.yaml.RoundTripDumper, allow_unicode=True)
    else:
        with open(conf_file, 'r', encoding='utf-8') as exist_f:
            exist_config = ruamel.yaml.load(exist_f, Loader=ruamel.yaml.RoundTripLoader)
            if exist_config:
                deep_update_remove_rename(exist_config, config,
                                          keys_to_rename=keys_to_rename,
                                          keys_to_remove=keys_to_remove)
                with open(conf_file, 'w', encoding='utf-8') as replace_exist_f:
                    ruamel.yaml.dump(exist_config, replace_exist_f, Dumper=ruamel.yaml.RoundTripDumper,
                                     allow_unicode=True)
            else:
                with open(conf_file, 'w', encoding='utf-8') as init_f:
                    ruamel.yaml.dump(config, init_f, Dumper=ruamel.yaml.RoundTripDumper, allow_unicode=True)


class Config:
    def __init__(self, config_dict):
        self._config_dict = config_dict

    def __getattr__(self, name):
        value = self._config_dict[name]
        if isinstance(value, dict):
            return Config(value)
        elif isinstance(value, list):
            return [Config(item) if isinstance(item, dict) else item for item in value]
        return value

    def __getitem__(self, name):
        value = self._config_dict[name]
        if isinstance(value, dict):
            return Config(value)
        elif isinstance(value, list):
            return [Config(item) if isinstance(item, dict) else item for item in value]
        return value


def parse_conf_file():
    with open(conf_file, 'r', encoding='utf-8') as f:
        conf_dict = ruamel.yaml.safe_load(f.read())
        return Config(conf_dict)
