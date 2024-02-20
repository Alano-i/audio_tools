/* eslint-disable no-unused-vars */
import {React, useState } from "react";

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
  const [is_group, set_is_group] = useState(true);
  const [short_filename_config, set_short_filename_config] = useState(true);
  const [deep_config, set_deep_config] = useState(false);

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
    console.log("强制200集:", is_group);
    console.log("根据标题优化:", short_filename_config);
    console.log("深路径:", deep_config);
  };

  const mainOptions = [
    { value: "generate_podcast", label: "🎧 生成播客源" },
    { value: "clip_audio", label: "🎹 剪辑音频" },
    { value: "link_file", label: "🔗 链接文件" },
    { value: "change_cover", label: "🖼 修改封面" },
    { value: "download_xmly", label: "⬇️ 下载喜马拉雅" },
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
          <option value="" disabled>
            请选择要执行的操作
          </option>
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
          <div className="w-full flex flex-col gap-4">
            {/*  带说明提示是输入框 */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-opacity-50">
                  输入文件夹名称或完整路径
                </span>
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
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-opacity-50">简介</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </div>
              <textarea
                className="textarea textarea-bordered h-12 w-full"
                placeholder=""
                value={podcast_summary}
                onChange={(e) => set_podcast_summary(e.target.value)}
              ></textarea>
            </label>

            <div className="flex gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="w-full label-text text-opacity-50">
                    作者
                  </span>
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
                  <span className="w-full label-text text-opacity-50">
                    演播者
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={reader}
                  onChange={(e) => set_reader(e.target.value)}
                />
              </label>
            </div>



            <div className="flex gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="w-full label-text text-opacity-50">
                    发布年份
                  </span>
                </div>
                <input
                  type="number"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={pub_year}
                  onChange={(e) => set_pub_year(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="w-full label-text text-opacity-50">
                    分类
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={podcast_category}
                  onChange={(e) => set_podcast_category(e.target.value)}
                />
              </label>
            </div>

            <div className="flex gap-4 mb-4 mt-4">
              <label className="cursor-pointer p-0 m-0 label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={is_group}
                  onChange={(e) => set_is_group(e.target.checked)}
                />
                <span className="label-text ml-2">第一季强制200集</span>
              </label>

              <label className="cursor-pointer p-0 m-0 label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={short_filename_config}
                  onChange={(e) => set_short_filename_config(e.target.checked)}
                />
                <span className="label-text ml-2">根据文件名优化每集标题</span>
              </label>

              <label className="cursor-pointer p-0 m-0 label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={deep_config}
                  onChange={(e) => set_deep_config(e.target.checked)}
                />
                <span className="label-text ml-2">深路径</span>
              </label>
            </div>
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
      <div className="mt-2 mb-10 btn btn-primary" onClick={handleTestSetting}>
        运行
      </div>
    </div>
  );
};

export default Index;
