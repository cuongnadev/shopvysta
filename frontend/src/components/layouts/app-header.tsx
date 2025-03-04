import { useState, useEffect, useRef } from "react";
import { LocalIcon } from "src/assets/local-icon";
import { Input, Button } from "../ui";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SelectCountry } from "../ui";
import { Link } from "../ui";

export const AppHeader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState("What are you looking for?");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  //
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = window.location.pathname.includes("result") ? query : "";
    }
  }, [window.location.pathname]);

  //change placeholderplaceholder
  useEffect(() => {
    const updatePlaceholder = () => {
      setPlaceholder(window.innerWidth < 640 ? "Search..." : "What are you looking for?");
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  //searchhearchh
  const search = () => {
    if (inputRef.current) {
      const query = inputRef.current?.value.trim();
      if (query) {
        navigate(`search/result?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <header className="flex flex-col px-[16px] pb-4">
      <div className="flex justify-between items-center h-[60px]">
        <Link to="/" className="flex">
          <LocalIcon iconName="logo_icon" />
          <span className="font-bold">WWEBSITEE</span>
        </Link>
        <div className="flex items-center gap-[20px]">
          <button onClick={() => setIsSearchVisible(!isSearchVisible)}>
            <LocalIcon iconName="search_icon" />
          </button>
          <SelectCountry />
        </div>
      </div>

      <div
        className={`flex items-center gap-[20px] overflow-hidden transition-all duration-300 ${
          isSearchVisible ? "max-h-[60px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <Input className="flex-1" containerClass="flex-1 h-[50px]" placeholder={placeholder} ref={inputRef} />
        <Button aria-label="Search" className="h-[50px] w-[120px]" onClick={search}>Search</Button>
      </div>
    </header>
  );
};
