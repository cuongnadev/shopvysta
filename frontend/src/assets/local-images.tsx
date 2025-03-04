import { logo } from ".";

const image = {
    logo,
} satisfies Record<string, string>;

type LocalImageProps = {
    name: keyof typeof image;
    alt?: string;
    height?: number | "auto";
    width?: number | "auto";
    className?: string;
};

/**
 * Generator image component
 */
export const LocalImage = ({
    name,
    alt = "",
    height = 24,
    width = 24,
    className = "",
    ...props
}: LocalImageProps) => {
    const ImgSrc = image[name];

    return (
        <img
            src={ImgSrc}
            alt={alt}
            className={className}
            {...(height !== "auto" && { height })}
            {...(width !== "auto" && { width })}
            {...props}
        />
    );
};
