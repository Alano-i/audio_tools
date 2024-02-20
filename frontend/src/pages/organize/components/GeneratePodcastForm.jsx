import RadioGroup from "../../../components/RadioGroup";
import Checkbox from "../../../components/Checkbox";
import InputField from "../../../components/InputField";

const GeneratePodcastForm = ({ radioOptions, formData, handleChange }) => {
  const renderRadioOption = (formData) => {
    switch (formData.selectedRadioOption) {
      case "audio_book":
        return (
          <div className="w-full flex flex-col gap-4">
            <InputField
              label="输入文件夹名称或完整路径"
              placeholder="请输入文件夹名称或完整路径"
              value={formData.audioPaths}
              onChange={(e) => handleChange("audioPaths", e.target.value)}
            />
            <InputField
              label="书名"
              placeholder="请输入书名"
              value={formData.bookTitle}
              onChange={(e) => handleChange("bookTitle", e.target.value)}
            />
            <InputField
              label="简介"
              type="textarea"
              placeholder="请输入简介"
              value={formData.podcastSummary}
              onChange={(e) => handleChange("podcastSummary", e.target.value)}
            />
            <div className="flex gap-4">
              <InputField
                label="作者"
                placeholder="请输入作者"
                value={formData.podcastAuthor}
                onChange={(e) => handleChange("podcastAuthor", e.target.value)}
              />
              <InputField
                label="演播者"
                placeholder="请输入演播者"
                value={formData.reader}
                onChange={(e) => handleChange("reader", e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <InputField
                label="发布年份"
                type="number"
                placeholder="请输入发布年份"
                value={formData.pubYear}
                onChange={(e) => handleChange("pubYear", e.target.value)}
              />
              <InputField
                label="分类"
                placeholder="请输入分类"
                value={formData.podcastCategory}
                onChange={(e) => handleChange("podcastCategory", e.target.value)}
              />
            </div>
            <div className="flex gap-4 mb-4 mt-4">
              <Checkbox
                label="第一季强制200集"
                checked={formData.isGroup}
                onChange={(e) => handleChange("isGroup", e.target.checked)}
              />
              <Checkbox
                label="根据文件名优化每集标题"
                checked={formData.shortFilenameConfig}
                onChange={(e) => handleChange("shortFilenameConfig", e.target.checked)}
              />
              <Checkbox
                label="深路径"
                checked={formData.deepConfig}
                onChange={(e) => handleChange("deepConfig", e.target.checked)}
              />
            </div>
          </div>
        );
      case "music":
        return (
          <InputField
            label="音乐名"
            placeholder="请输入音乐名"
            value={formData.bookTitle}
            onChange={(e) => handleChange("bookTitle", e.target.value)}
          />
        );
      case "auto_all":
        return (
          <InputField
            label="深路径?"
            placeholder="不知道是什么就保持默认"
            value={formData.audioPaths}
            onChange={(e) => handleChange("audioPaths", e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <RadioGroup
        options={radioOptions}
        selectedValue={formData.selectedRadioOption}
        onChange={(value) => handleChange("selectedRadioOption", value)}
      />
      {renderRadioOption(formData)}
    </>
  );
};

export default GeneratePodcastForm;
