import { FilterBox } from "src/components/ui/filter";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProduct } from "src/api/search";
import { CardProduct } from "src/components/ui";
import { ProductProps } from "src/types/product";
import { gif_infinite } from "src/assets";

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
        {isLoading ? (
           <div className="flex flex-col w-[90vw] h-[70vh] sm:w-[90vw] sm:h-[80vh] lg:w-[60%] lg:h-[70vh] justify-center items-center rounded-2xl bg-white m-auto ">
           <figure className="h-[150px] ms:h-[200px] md:h-[200px] flex justify-center">
             <img
               className="w-[150px] md:w-[250px] h-auto"
               src={gif_infinite}
               alt="infinity"
             />
           </figure>
           <div className="flex space-x-1 text-lg font-semibold">
             {"Product loading . . .".split("").map((char, index) => (
               <span
                 key={index}
                 className="inline-block animate-wave"
                 style={{ animationDelay: `${index * 0.1}s` }}
               >
                 {char}
               </span>
             ))}
           </div>
         </div>
        ) : (
          products.length > 0 ? (
            products.map((product: ProductProps, index) => (
              <CardProduct product={product} key={index} />
            ))
          ) : (
            <p>No products available</p>
          )        
        )}
      </div>
    </>
  );
};
