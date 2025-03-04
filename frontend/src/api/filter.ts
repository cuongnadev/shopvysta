import { apiClient } from "src/libs/api-client";
import { useQuery } from "@tanstack/react-query";
import { ProductProps } from "src/types/product";

export const filterProduct = () => {
    return apiClient.get<ProductProps>("candidate/contact");
};

export const useFilterProduct = () => {
    return useQuery({
        queryKey: ["filter-product"],
        queryFn: filterProduct,
    });
};
