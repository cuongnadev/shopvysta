import { ProductProps } from "src/types/product";
import { Button } from "../button";
import { cva, VariantProps } from "class-variance-authority";
import { Link } from "../link";

const cardVariants = cva(
  "relative p-2 overflow-hidden min-w-[170px] max-w-[270px] min-h-[380px] max-h-[420px] rounded-2xl shadow flex flex-col items-center gap-[14px]"
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
          <div className="w-[100%] h-[60%] shadow rounded-2xl flex items-center justify-center">
            <figure className="w-[100%] h-[100%] rounded-2xl">
              <img className="w-[100%] h-[100%] rounded-2xl cursor-pointer" src={product?.image ? product.image : "https://media.secretsales.com/catalog/product/2/e/2e866c8d7fa747f5ae9b91ab6bac37a9.jpg"} alt="" />
            </figure>
          </div>

          <div className="w-[100%] flex-1 flex flex-col justify-between items-center gap-2">
            <div className="w-[100%] py-2 flex flex-col justify-center items-start gap-2">
              <Link to={product?.url ? product.url : ""}>
                <h3 className="text-[16px] text-gray-800 max-h-[48px] line-clamp-2 font-bold cursor-pointer">
                  {product?.title ? product.title : "abc"}
                </h3>
              </Link>
              <div className="flex flex-col justify-center items-start gap-2 sm:flex-row sm:justify-between sm:items-center w-full">
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[12px] text-gray-800 font-bold">
                    ${product?.price.value ? product.price.value : "$44.25"}
                  </p>
                  <p className="text-[10px] text-gray-600 line-through">
                    ${product?.price.value ? product.price.value : "$44.25"}
                  </p>
                </div>
                <span className="block min-w-0 max-w-[120px] h-[24px] py-1 px-3 bg-slate-300 rounded-2xl text-[12px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                  {product?.brand ? product.brand : "Beckham"}
                </span>
              </div>
            </div>

            <Button className="w-[100%] h-[38%] text-[14px] rounded-2xl bg-stone-300 text-stone-800 hover:bg-stone-600 hover:text-stone-50">
              Detail »
            </Button>
          </div>
    </div>
  );
};
