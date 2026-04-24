import React, { useState, useEffect, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { FiX } from 'react-icons/fi';

const RuleDropdown = ({ options, onSelect, value = [], label, disabled, placeholder = "Select sensors", multi }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleHandler = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const selectHandler = (option) => {
    if (multi) {
      const isSelected = value.some((v) => v.id === option.id);
      let newValues;
      if (isSelected) {
        newValues = value.filter((v) => v.id !== option.id);
      } else {
        newValues = [...value, option];
      }
      onSelect(newValues);
    } else {
      onSelect(option);
      setIsOpen(false);
    }
  };

  const removeSelected = (id) => {
    onSelect(value.filter((v) => v.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <label className="text-slate-700 text-sm font-semibold mb-2 block">{label}</label>}
      
      <div
        onClick={toggleHandler}
        className={`min-h-[45px] w-full px-3 py-2 border rounded-lg flex flex-wrap gap-2 items-center cursor-pointer transition-all ${
          disabled ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 hover:border-emerald-500'
        } ${isOpen ? 'border-emerald-500 ring-2 ring-emerald-50' : ''}`}
      >
        {value.length === 0 ? (
          <span className="text-slate-400 text-sm">{placeholder}</span>
        ) : (
          value.map((v) => (
            <span
              key={v.id}
              className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded flex items-center gap-1 text-xs font-bold transition-all hover:bg-emerald-200"
            >
              {v.name}
              <FiX className="cursor-pointer" onClick={(e) => { e.stopPropagation(); removeSelected(v.id); }} />
            </span>
          ))
        )}
        <div className="ml-auto pointer-events-none">
          <GoChevronDown className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <ul className="absolute z-50 w-full max-h-60 overflow-y-auto bg-white border border-slate-100 rounded-lg shadow-xl mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.length === 0 ? (
            <li className="p-4 text-center text-slate-400 text-sm italic">No records found</li>
          ) : (
            options.map((option) => {
              const isSelected = value.some((v) => v.id === option.id);
              return (
                <li
                  key={option.id}
                  onClick={() => selectHandler(option)}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                    isSelected ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div>
                    <div className="text-sm">{option.name}</div>
                    <div className="text-[10px] opacity-60 uppercase">{option.type}</div>
                  </div>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default RuleDropdown;
