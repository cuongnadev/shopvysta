import { CardProduct } from "src/components/ui";
import { FilterBox } from "src/components/ui/filter";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

let test: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

export const SearchResultRouter = () => {
  const [selected, setSelected] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    console.log(selected);
    console.log(query);
  }, [selected]);

  return (
    <>
      <FilterBox
        selected={selected}
        setSelected={setSelected}
      />
      <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-2 sm:gap-5 w-full">
        {test.map((t, index) => (
          <CardProduct
            key={index}
            product={t}
          />
        ))}
      </div>
    </>
  );
};
