const Index = () => {
  return (
    <div className="min-w-[800px] flex flex-col gap-4">
      <label className="form-control w-full">
        <div className="label">
          <span className="w-fulllabel-text">通知推送渠道</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="w-fulllabel-text">企业微信 API 代理</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="w-fulllabel-text">通知消息默认封面</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="w-fulllabel-text">有声书父文件夹</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="w-fulllabel-text">音乐父文件夹</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="w-fulllabel-text">有声书下载完成接口</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full " />
      </label>

      <div className="mt-8 btn btn-primary">测试设置</div>
    </div>
  );
};

export default Index;
