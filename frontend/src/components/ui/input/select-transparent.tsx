import { useState, useRef, useEffect } from "react";
import { LocalIcon } from "src/assets/local-icon";

type OptionType = "relevance" | "lowest price" | "highest price";
type SelectTransparentProps = {
    selected: string;
    setSelected: (value: string) => void;
}
const options: OptionType[] = ["relevance", "lowest price", "highest price"];

export const SelectTransparent = ({setSelected }: SelectTransparentProps) => {
    const [open, setOpen] = useState(false);
    const [select, setSelectItem] = useState<OptionType>("relevance");
    const selectRef = useRef<HTMLDivElement | null>(null);

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
        <div ref={selectRef} className="relative inline-block text-left">
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setOpen(!open)}>
                <span className="text-gray-500">Sorting:</span>
                <span className="text-black font-medium">{select}</span>
                <LocalIcon iconName="arrow_icon" className={`transition-transform ${open ? "-rotate-90" : "rotate-90"}`} />
            </div>

            {open && (
                <div className="absolute left-0 z-[10] mt-2 w-40 bg-white shadow-lg rounded-md">
                    {options.map((option) => (
                        <label key={option} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                            <input 
                                type="radio" 
                                name="sorting" 
                                value={option} 
                                checked={select === option} 
                                onChange={() => {
                                    setSelectItem(option);
                                    setSelected(option)
                                    setOpen(false);
                                }}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
