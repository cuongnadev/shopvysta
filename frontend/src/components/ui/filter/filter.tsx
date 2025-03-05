import { useState } from "react";
import { Button } from "../button";
import { LocalIcon } from "src/assets/local-icon";
import { Input, Select, SelectTransparent, SelectSearch } from "../input";
import { ProductProps } from "src/types/product";

type FilterBoxProps = {
  data: ProductProps[];
  selectedFilters: Record<string, string>;
  setSelectedFilters: (filters: Record<string, string>) => void;
};

export const FilterBox = ({ data, selectedFilters, setSelectedFilters }: FilterBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const brands = [... new Set(data.map((product) => product.brand) as string[])];

  const handleChangeFiltered = (key: string, value: string) => {
    const newFilters = { ...selectedFilters };
    if(key === "freeShipping") {
      if(value === "Free shipping") {
        newFilters[key] = "true";
      } else {
        delete newFilters[key];
      }
    } else if(key === "condition") {
      if(value !== "All") {
        newFilters[key] = value;
      } else {
        delete newFilters[key];
      }
    } else if(key === "sort") {
      if(value === "lowest price") {
        newFilters[key] = "priceAsc";
      } else if(value === "highest price") {
        newFilters[key] = "priceDesc";
      } else {
        delete newFilters[key];
      }
    } else {
      newFilters[key] = value;
    }
    setSelectedFilters({...newFilters});
  };

  const handleApplyPrice = () => {
    const newFilters = { ...selectedFilters };

    if(minPrice) {
      newFilters["minPrice"] = minPrice.toString();
    } else {
      delete newFilters["minPrice"];
    }

    if(maxPrice) {
      newFilters["maxPrice"] = maxPrice.toString();
    } else {
      delete newFilters["maxPrice"];
    }
    setSelectedFilters({...newFilters});
  }

  return (
    <div className="flex flex-col w-full rounded-[6px] bg-white px-4 sm:px-6">
      {/* Header */}
      <div className="flex z-[11] justify-between items-center pt-[10px]">
        <SelectTransparent
          selected={selectedFilters}
          setSelected={handleChangeFiltered}
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
            options={brands}
            placeholder="Seller"
            name="brand"
            selected={selectedFilters}
            setSelected={handleChangeFiltered}
            className="flex-1 min-w-[200px]"
          />
          <Select
            options={["All shipping cost", "Free shipping"]}
            placeholder="Shipping Cost"
            name="freeShipping"
            selected={selectedFilters}
            setSelected={handleChangeFiltered}
            className="flex-1 min-w-[200px]"
          />
          <Select
            options={["All", "New", "Used"]}
            placeholder="Condition"
            name="condition"
            selected={selectedFilters}
            setSelected={handleChangeFiltered}
            className="flex-1 min-w-[200px]"
          />

          {/* Price filter */}
          <div className="flex flex-wrap sm:flex-nowrap sm:items-center gap-2 flex-1 min-w-[270px]">
            <Input
              placeholder="Min price"
              containerClass="flex-1 min-w-[90px] h-[36.5px]"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="text-[14px]"
            />
            <Input
              placeholder="Max price"
              containerClass="flex-1 min-w-[90px] h-[36.5px]"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="text-[14px]"
            />
            <Button className="h-[36.5px] w-full sm:w-auto" onClick={handleApplyPrice}>Filter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
