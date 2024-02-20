const Checkbox = ({ label, checked, onChange }) => {
    
  return (
    <label className="cursor-pointer p-0 m-0 label">
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={checked}
        onChange={onChange}
      />
      <span className="label-text ml-2">{label}</span>
    </label>
  );
};

export default Checkbox;
