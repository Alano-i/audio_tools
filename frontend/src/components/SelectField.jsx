const SelectField = ({ label, options, value, onChange }) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text text-opacity-50">{label}</span>
        </div>
      )}
      <select className="select select-bordered w-full" value={value} onChange={onChange}>
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectField;