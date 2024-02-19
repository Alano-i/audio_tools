import React, { useState } from "react";
const Index = () => {
  const [audio_paths, set_audio_paths] = useState("https://qyapi.weixin.qq.com");


  return (
    <div className="min-w-[800px] flex flex-col gap-4">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-opacity-50 text-opacity-50">通知推送渠道</span>
        </div>
        <input type="text" placeholder="" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-opacity-50 text-opacity-50">企业微信 API 代理</span>
        </div>
        <input type="text" placeholder="https://qyapi.weixin.qq.com" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-opacity-50 text-opacity-50">通知消息默认封面</span>
        </div>
        <input type="text" placeholder="" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-opacity-50 text-opacity-50">有声书父文件夹</span>
        </div>
        <input type="text" placeholder="" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-opacity-50 text-opacity-50">音乐父文件夹</span>
        </div>
        <input type="text" placeholder="" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-opacity-50 text-opacity-50">有声书下载完成接口</span>
        </div>
        <input type="text" placeholder="" className="input input-bordered w-full " />
      </label>

      <div className="mt-8 btn btn-primary">测试设置</div>
    </div>
  );
};

export default Index;
