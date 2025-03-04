import { useState, useRef, useEffect } from "react";
import { LocalIcon } from "src/assets/local-icon";

export const SelectCountry = () => {
    const options: Record<string, React.ReactNode> = {
        usa: <LocalIcon iconName="usa_icon" />,
        finland: <LocalIcon iconName="finland_icon" />,
    };

    const [selected, setSelected] = useState<keyof typeof options>(() => {
        return (localStorage.getItem("selectedCountry") as keyof typeof options) || "usa";
    });

    const [open, setOpen] = useState(false);
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

    const handleSelect = (key: keyof typeof options) => {
        setSelected(key);
        localStorage.setItem("selectedCountry", key);
        setOpen(false);
    };

    return (
        <div ref={selectRef} className="relative w-12 z-[12]">
            <div
                className="p-2 flex items-center justify-center bg-white cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {options[selected]}
            </div>
            {open && (
                <div className="absolute left-0 w-12 mt-1 bg-white rounded shadow-md">
                    {Object.keys(options).map((key) => (
                        <div
                            key={key}
                            className="p-2 flex items-center justify-center cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSelect(key as keyof typeof options)}
                        >
                            {options[key as keyof typeof options]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
