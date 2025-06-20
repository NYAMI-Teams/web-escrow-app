import { X } from "lucide-react";

const ButtonMultiDropdown = ({ placeholder, options, value, onChange }) => {
  const toggleSelect = (item) => {
    if (value.includes(item)) {
      onChange(value.filter((i) => i !== item));
    } else {
      onChange([...value, item]);
    }
  };

  const removeItem = (item) => {
    onChange(value.filter((i) => i !== item));
  };

  return (
    <div className="w-full flex flex-col text-left text-[13px] text-darkslategray font-sf-pro gap-2">
      <select
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (selectedValue && !value.includes(selectedValue)) {
            onChange([...value, selectedValue]);
          }
          e.target.value = ""; // reset select ke placeholder setelah select
        }}
        className="w-full h-8 bg-white border border-dimgray rounded-lg px-2 text-[13px] outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-1">
        {value.map((item, idx) => (
          <div
            key={idx}
            className="rounded-[20px] bg-white border border-dimgray h-[26px] flex items-center py-1 pl-2 pr-1 gap-1"
          >
            <div className="text-[13px] leading-[18px] overflow-hidden text-ellipsis whitespace-nowrap">
              {item}
            </div>
            <button
              className="rounded-full p-0.5 hover:bg-gray-200"
              onClick={() => removeItem(item)}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonMultiDropdown;
