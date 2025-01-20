import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

const Dropdown = ({
  options,
  defaultText = "Select",
  onSelect,
  label,
  labelWeight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const selectHandler = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
    console.log("option value", option.value);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label
          className={`text-[#000] text-sm md:text-base mb-2 block ${
            labelWeight ? labelWeight : "font-normal"
          }`}
        >
          {label}
        </label>
      )}
      <button
        type="button"
        className="w-full h-[45px] px-4 border border-[#E0E0E9] rounded-lg text-sm text-[#383838E5] flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-[#383838E5]">
          {selected ? selected.option : defaultText}
        </span>
        <div
          className={`transition-all duration-300 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <GoChevronDown fontSize={20} color="#292D3280" />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full h-fit rounded-md shadow-md cursor-pointer border-y mt-1">
          {options.map((option) => (
            <li
              className="py-2 text-sm px-4 border-b bg-white hover:bg-[hsl(208,100%,95%)]"
              key={option.value}
              onClick={() => selectHandler(option)}
            >
              {option.option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
