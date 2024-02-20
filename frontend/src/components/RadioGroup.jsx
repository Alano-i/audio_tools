const RadioGroup = ({ options, selectedValue, onChange }) => {
  return (
    <div className="flex flex-wrap">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer p-0 m-0 label mr-8">
          <input
            type="radio"
            value={option.value}
            name="radioGroup"
            className="radio checked:bg-primary mr-2"
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="label-text text-xs md:text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
