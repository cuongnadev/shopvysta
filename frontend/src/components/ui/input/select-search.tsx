import { useState, useRef, useEffect } from "react";
import { LocalIcon } from "src/assets/local-icon";

type SelectSearchProps = {
    options: string[];
    placeholder: string;
    selected: string;
    setSelected: (value: string) => void;
    className?: string; 
};

export const SelectSearch = ({ options, placeholder, setSelected, className }: SelectSearchProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
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

    // Filter options based on search input
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={selectRef} className={`relative w-64 flex-1 ${className || ""}`}>
            <div className={`border text-[14px] px-4 py-[7px] rounded bg-white relative transition-all border-gray-300 ${open ? 'border-blue-500' : ''}`}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    className="w-full bg-transparent focus:outline-none caret-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {open ? <LocalIcon className="-rotate-90" iconName="arrow_icon" /> : <LocalIcon className="rotate-90" iconName="arrow_icon" />}
                </div>
            </div>
            {open && (
                <div className="absolute z-[10] text-[14px] left-0 w-full mt-1 bg-white border rounded shadow-md max-h-40 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((item, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => {
                                    setSearch(item);
                                    setSelected(item);
                                    setOpen(false);
                                }}
                            >
                                {item}
                            </div>
                        ))
                    ) : (
                        <p className="px-4 py-2 text-gray-500">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};
