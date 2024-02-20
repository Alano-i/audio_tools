const SelectField = ({ label, options, value, onChange }) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text text-opacity-50">{label}</span>
        </div>
      )}
      <select className="select select-bordered w-full" value={value} onChange={onChange}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectField;
