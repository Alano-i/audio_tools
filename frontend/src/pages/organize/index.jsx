import { useState } from "react";
import SelectField from "../../components/SelectField";
import GeneratePodcastForm from "./components/GeneratePodcastForm";

const Index = () => {
  // 使用一个状态对象来管理所有相关的状态
  const [formData, setFormData] = useState({
    selectedMainOption: "generate_podcast",
    selectedRadioOption: "audio_book",
    bookTitle: "",
    audioPaths: "/Media/有声书/",
    podcastSummary: "",
    podcastCategory: "",
    podcastAuthor: "",
    reader: "",
    pubYear: "",
    isGroup: true,
    shortFilenameConfig: true,
    deepConfig: false,
  });

  // 更新状态的函数，可以处理所有字段的更新
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTestSetting = () => {
    console.log(formData);
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
      <SelectField
        label="选择要执行的操作"
        options={[{ value: "", label: "请选择要执行的操作" }, ...mainOptions]}
        value={formData.selectedMainOption}
        onChange={(e) => handleChange("selectedMainOption", e.target.value)}
      />

      {/* 当选择生成播客源时展示内容 */}
      {formData.selectedMainOption === "generate_podcast" && (
        <GeneratePodcastForm
          radioOptions={radioOptions}
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {/* 运行按钮 */}

      <div className="mt-2 mb-10 btn btn-primary" onClick={handleTestSetting}>
        运行
      </div>
    </div>
  );
};

export default Index;
