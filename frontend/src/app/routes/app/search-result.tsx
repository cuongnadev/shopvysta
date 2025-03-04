import { FilterBox } from "src/components/ui/filter";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProduct } from "src/api/search";
import { CardProduct } from "src/components/ui";
import { ProductProps } from "src/types/product";

export const SearchResultRouter = () => {
  const [selected, setSelected] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data, isLoading } = useSearchProduct(query);
  const [gridClass, setGridClass] = useState(
    "sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
  );

  const products = data?.data as ProductProps[];

  useEffect(() => {
    const updateGrid = () => {
        if (products?.length * 270 < window.innerWidth) {
            setGridClass(
                "sm:grid-cols-[repeat(auto-fit,minmax(170px,270px))] md:grid-cols-[repeat(auto-fit,minmax(200px,270px))]"
            );
        } else {
            setGridClass(
                "sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
            );
        }
    };

    updateGrid(); // Cập nhật ngay khi component mount
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
}, [products]);


  return (
    <>
      <FilterBox
        selected={selected}
        setSelected={setSelected}
      />
      <div 
        className={`grid grid-cols-2 ${gridClass} justify-start gap-2 sm:gap-5 w-full`}
      >
        { isLoading ? "abc" : products.map((product: ProductProps, index) => (
          <CardProduct product={product} key={index}/>
        )) }
      </div>
    </>
  );
};
