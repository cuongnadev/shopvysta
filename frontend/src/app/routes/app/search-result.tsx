import { FilterBox } from "src/components/ui/filter";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProduct } from "src/api/search";
import { CardProduct } from "src/components/ui";
import { ProductProps } from "src/types/product";

export const SearchResultRouter = () => {
  const [selected, setSelected] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, isLoading } = useSearchProduct(query);

  const products = data?.data as ProductProps[];

  return (
    <>
      <FilterBox
        selected={selected}
        setSelected={setSelected}
      />
      <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-2 sm:gap-5 w-full">
        { isLoading ? "abc" : products.map((product: ProductProps, index) => (
          <CardProduct product={product} key={index}/>
        )) }
      </div>
    </>
  );
};
