import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CustomSelect = ({ options, placeholder, value, onChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef?.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find(
    (option: any) => option.value === value
  )?.label;

  return (
    <div className="relative" ref={selectRef}>
      <div
        className="border p-2 min-w-44 cursor-pointer flex justify-between items-center rounded-md transition-all duration-200 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "" : "text-gray-500 text-sm"}>
          {selectedLabel || placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" /> 
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 border bg-white shadow-lg rounded-md transition-all duration-200 ease-in-out">
          {options.map(({ label, value }: any) => (
            <div
              key={value}
              className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSelect(value)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
