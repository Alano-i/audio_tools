from fastapi import APIRouter, Request, Response

from audio_tools.func.rename import replace_string
from audio_tools.common.response import json_200

router = APIRouter()


@router.get("/rename")
async def rename(request: Request):
    folder_path = request.query_params.get("folder_path")
    arg1 = request.query_params.get("arg1")
    arg2 = request.query_params.get("arg2")
    replace_string(folder_path, False, arg1, arg2)
    return json_200(message=f'「批量重命名」对[{folder_path}]文件夹下文件批量重命名完成')