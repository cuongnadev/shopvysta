import { useState, useRef, useEffect } from "react";
import { LocalIcon } from "src/assets/local-icon";

type SelectProps = {
    options: string[];
    placeholder: string;
    selected: string;
    setSelected: (value: string) => void;
    className?: string;
};

export const Select = ({ options, placeholder, setSelected, className }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [select, setSelectItem] = useState("");
  const selectRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative w-64 flex-1 ${className || ""}`}>
      {/* View */}
      <div
        className={`border px-4 pt-3 pb-2 rounded cursor-pointer bg-white relative transition-all ${
          open || select ? "border-blue-500" : "border-gray-300"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <label
          className={`absolute left-[14px] px-1 bg-white transition-all ${
            select || open
              ? "top-[-20%] text-xs text-blue-500"
              : "top-1/2 text-[14px] transform -translate-y-1/2 text-gray-500"
          }`}
        >
          {placeholder}
        </label>
        <span className={`block ${select ? "text-black text-[14px] leading-3 h-[15px]" : "text-gray-500 text-[14px] leading-3 h-[15px]"}`}>
          {select || " "}
        </span>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {open ? <LocalIcon className="-rotate-90" iconName="arrow_icon"/> : <LocalIcon className="rotate-90" iconName="arrow_icon"/>}
        </div>
      </div>

      {/* Option List */}
      {open && (
        <div className="absolute z-[10] text-[14px] left-0 w-full mt-1 bg-white border rounded shadow-md">
          {options.map((item, index) => (
            <label
              key={index}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              <input
                type="radio"
                name="select-option"
                value={item}
                checked={select === item}
                onChange={() => {
                  setSelectItem(item);
                  setSelected(item);
                  setOpen(false);
                }}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
