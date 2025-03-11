import { useState, forwardRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = "Select an option", className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((option) => option.value === value);

    return (
      <div className={cn("relative w-full", className)} ref={ref}>
        <button
          type="button"
          className="flex h-9 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>

        {isOpen && (
          <div className="absolute left-0 z-50 mt-1 w-full rounded-md border bg-white shadow-md">
            <ul className="max-h-60 overflow-auto py-1 text-sm">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-100",
                    value === option.value && "bg-gray-200"
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="h-4 w-4 text-blue-500" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
