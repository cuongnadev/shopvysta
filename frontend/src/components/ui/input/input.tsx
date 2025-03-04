import { forwardRef, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva("focus:border-transparent w-[80%] focus:outline-none focus:ring-0");

/**
 * Input component props.
 * @typedef {Object} InputProps
 */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    icon?: ReactNode;
    containerClass?: string;
  };

/**
 * Input component with optional icon.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({className, 
    icon,
    containerClass,
    placeholder,
    ...props },
 ref) => {
    return (
      <div 
        className={`flex items-center border border-gray-300 rounded-[4px] px-[20px] 
        ${containerClass}`}
      >
        <input ref={ref}
         className={inputVariants({ className })}
         placeholder={placeholder} 
         {...props} />
        {icon && icon}
      </div>
    );
  }
);

