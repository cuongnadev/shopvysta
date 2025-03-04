import { useState } from "react";
import { Button } from "../button";
import { LocalIcon } from "src/assets/local-icon";
import { Input, Select, SelectTransparent, SelectSearch } from "../input";

type FilterBoxProps = {
  selected: string;
  setSelected: (value: string) => void;
};

export const FilterBox = ({ selected, setSelected }: FilterBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full rounded-[6px] bg-white px-4 sm:px-6">
      {/* Header */}
      <div className="flex z-[11] justify-between items-center pt-[10px]">
        <SelectTransparent
          selected={selected}
          setSelected={setSelected}
        />
        <Button
          variant="transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <LocalIcon iconName="filter_icon" />
          <span>Filter</span>
        </Button>
      </div>

      {/* Dropdown container */}
      <div
        className={`flex flex-wrap lg:flex-nowrap items-center z-[10] pb-[15px] gap-4 transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[400px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-3"
        }`}
      >
        {/* Dropdown filters + Price filter cùng 1 hàng */}
        <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
          {/* Dropdown filters */}
          <SelectSearch
            options={["Free shipping", "Standard shipping", "Express shipping"]}
            placeholder="Seller"
            selected={selected}
            setSelected={setSelected}
            className="flex-1 min-w-[200px]"
          />
          <Select
            options={["Free shipping", "Standard shipping", "Express shipping"]}
            placeholder="Shipping Cost"
            selected={selected}
            setSelected={setSelected}
            className="flex-1 min-w-[200px]"
          />
          <Select
            options={["New", "Used", "Refurbished"]}
            placeholder="Condition"
            selected={selected}
            setSelected={setSelected}
            className="flex-1 min-w-[200px]"
          />

          {/* Price filter */}
          <div className="flex flex-wrap sm:flex-nowrap sm:items-center gap-2 flex-1 min-w-[270px]">
            <Input
              placeholder="Min price"
              containerClass="flex-1 min-w-[90px] h-[36.5px]"
            />
            <Input
              placeholder="Max price"
              containerClass="flex-1 min-w-[90px] h-[36.5px]"
            />
            <Button className="h-[36.5px] w-full sm:w-auto">Filter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
