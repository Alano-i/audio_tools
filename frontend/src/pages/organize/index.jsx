import React, { useState } from "react";

const Index = () => {
  const [selectedMainOption, setSelectedMainOption] =
    useState("generate_podcast");
  const [selectedRadioOption, setSelectedRadioOption] = useState("audio_book");
  const [book_title, set_book_title] = useState("");
  const [path, setPath] = useState("");
  const [audio_paths, set_audio_paths] = useState("/Media/有声书/");
  const [podcast_summary, set_podcast_summary] = useState("");
  const [podcast_category, set_podcast_category] = useState("");
  const [podcast_author, set_podcast_author] = useState("");
  const [reader, set_reader] = useState("");
  const [pub_year, set_pub_year] = useState("");
  const [is_group, set_is_group] = useState("True");
  const [short_filename_config, set_short_filename_config] = useState("True");
  const [deep_config, set_deep_config] = useState("True");

  const handleMainOptionChange = (option) => {
    setSelectedMainOption(option);
  };

  const handleRadioOptionChange = (option) => {
    setSelectedRadioOption(option);
  };

  const handleTestSetting = () => {
    // 根据您的实际需求将输入的值传递给后端
    console.log("书名:", book_title);
    console.log("输入路径:", audio_paths);
    console.log("简介:", podcast_summary);
    console.log("分类:", podcast_category);
    console.log("作者:", podcast_author);
    console.log("演播者:", reader);
    console.log("发布年份:", pub_year);
  };

  const mainOptions = [
    { value: "generate_podcast", label: "📕 生成播客源" },
    { value: "clip_audio", label: "🎹 剪辑音频" },
    { value: "link_file", label: "🌍 链接文件" },
    { value: "change_cover", label: "修改封面" },
    { value: "download_xmly", label: "下载喜马拉雅" },
  ];

  const radioOptions = [
    { value: "audio_book", label: "📕 有声书" },
    { value: "music", label: "🎹 音乐" },
    { value: "auto_all", label: "🌍 批量处理存量有声书" },
  ];

  return (
    <div className="min-w-[800px] flex flex-col gap-4">
      {/* 下拉选择 */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-opacity-50">选择要执行的操作</span>
        </div>
        <select
          className="select select-bordered"
          value={selectedMainOption}
          onChange={(e) => handleMainOptionChange(e.target.value)}
        >
          {mainOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="label">
          <span className="label-text-alt text-opacity-50">
            选择对应的操作后下面配置项将同步
          </span>
        </div>
      </label>

      {/* 当选择生成播客源时展示内容 */}
      {selectedMainOption === "generate_podcast" && (
        // 单选
        <div className="flex flex-wrap">
          {radioOptions.map((option) => (
            <label
              key={option.value}
              className="cursor-pointer p-0 m-0 label mr-8"
            >
              <input
                type="radio"
                value={option.value}
                name="notificationChannel"
                className="radio checked:bg-primary mr-2"
                checked={selectedRadioOption === option.value}
                onChange={() => handleRadioOptionChange(option.value)}
              />
              <span className="label-text text-xs md:text-sm">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}

      {selectedMainOption === "generate_podcast" &&
        selectedRadioOption === "audio_book" && (
          <div className="min-w-[800px] flex flex-col gap-4">

            <label className="form-control w-full">
              <div className="label">
                <span className="w-full label-text text-opacity-50">书名</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={book_title}
                onChange={(e) => set_book_title(e.target.value)}
              />
            </label>

            {/*  带说明提示是输入框 */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-opacity-50">输入文件夹名称或完整路径</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={audio_paths}
                onChange={(e) => set_audio_paths(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-opacity-50">
                支持多条，一行一条 /Media/有声书/
                </span>
              </div>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="w-full label-text text-opacity-50">简介</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={podcast_summary}
                onChange={(e) => set_podcast_summary(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="w-full label-text text-opacity-50">分类</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={podcast_category}
                onChange={(e) => set_podcast_category(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="w-full label-text text-opacity-50">作者</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={podcast_author}
                onChange={(e) => set_podcast_author(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="w-full label-text text-opacity-50">演播者</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={reader}
                onChange={(e) => set_reader(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="w-full label-text text-opacity-50">发布年份</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={pub_year}
                onChange={(e) => set_pub_year(e.target.value)}
              />
            </label>



          </div>
        )}
      {selectedMainOption === "generate_podcast" &&
        selectedRadioOption === "music" && (
          <label className="form-control w-full">
            <div className="label">
              <span className="w-full label-text text-opacity-50">音乐名</span>
            </div>
            <input
              type="text"
              placeholder="请输入音乐名"
              className="input input-bordered w-full"
              value={book_title}
              onChange={(e) => set_book_title(e.target.value)}
            />
          </label>
        )}
      {selectedMainOption === "generate_podcast" &&
        selectedRadioOption === "auto_all" && (
          // 带说明提示是输入框
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-opacity-50">深路径?</span>
            </div>
            <input
              type="text"
              placeholder="请输入"
              className="input input-bordered w-full"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
            <div className="label">
              <span className="label-text-alt text-opacity-50">
                不知道是什么就保持默认
              </span>
            </div>
          </label>
        )}
      <div className="mt-4 btn btn-primary" onClick={handleTestSetting}>
        测试设置
      </div>
    </div>
  );
};

export default Index;
