const InputField = ({ label, value, onChange, type = "text", placeholder = "" }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-opacity-50">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full placeholder:opacity-50"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default InputField;
