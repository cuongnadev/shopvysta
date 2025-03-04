import { ProductProps } from "src/types/product";
import { Button } from "../button";
import { cva, VariantProps } from "class-variance-authority";
import { Link } from "../link";

const cardVariants = cva(
  "relative bg-white p-2 overflow-hidden min-w-[170px] max-w-[270px] h-[360px] rounded-2xl shadow flex flex-col items-center justify-between gap-[10px] sm:gap-[14px]"
);

/**
 * CardProduct component props.
 * @typedef {Object} CardProductProps
 */
export type CardProductProps = VariantProps<typeof cardVariants> & {
  product?: ProductProps;
  className?: string;
};

/**
 * CardProduct component.
 */
export const CardProduct = ({ product, className }: CardProductProps) => {
  return (
    <div className={cardVariants({ className })}>
          <div className="w-[100%] h-[54%] rounded-2xl flex items-center justify-center">
            <figure className="w-[100%] h-[100%] shadow rounded-xl flex justify-center">
              <img className="w-auto h-[100%] rounded-xl cursor-pointer" src={product?.image ? product.image : "https://media.secretsales.com/catalog/product/2/e/2e866c8d7fa747f5ae9b91ab6bac37a9.jpg"} alt="" />
            </figure>
          </div>

          <div className="w-[100%] h-[42%] flex flex-col justify-between items-center gap-2">
            <div className="w-[100%] sm:py-2 flex flex-col justify-center items-start gap-2 flex-grow">
              <Link to={product?.url ? product.url : ""}>
                <h3 className="text-[14px] sm:text-[16px] text-gray-800 h-[42px] sm:h-[48px] line-clamp-2 font-bold cursor-pointer">
                  {product?.title ? product.title : "abc"}
                </h3>
              </Link>
              <div className="flex flex-col justify-center items-start gap-2 sm:flex-row sm:justify-between sm:items-center w-full">
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[12px] text-gray-800 font-bold">
                    ${product?.price.value ? product.price.value : "$44.25"}
                  </p>
                  <p className="text-[8px] sm:text-[10px] text-gray-600 line-through">
                    ${product?.price.value ? product.price.value : "$44.25"}
                  </p>
                </div>
                <span className="block min-w-0 max-w-[120px] py-[2px] sm:py-1 px-[6px] sm:px-3 bg-slate-300 rounded-2xl text-[10px] sm:text-[12px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                  {product?.brand ? product.brand : "Beckham"}
                </span>
              </div>
            </div>

            <Button className="w-[100%] h-[26%] sm:h-[38%] text-[14px] rounded-xl bg-stone-300 text-stone-800 hover:bg-stone-600 hover:text-stone-50">
              Detail »
            </Button>
          </div>
    </div>
  );
};
