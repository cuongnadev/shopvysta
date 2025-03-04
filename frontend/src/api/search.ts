import { apiClient } from "src/libs/api-client";
import { useQuery } from "@tanstack/react-query";

import { ProductProps } from "src/types/product";

export const searchProduct = (q: string) => {
    return apiClient.get<ProductProps[]>(`/search?q=${q}`);
};

export const useSearchProduct = (q: string) => {
    return useQuery({
        queryKey: ["search-product", q],
        queryFn: () => searchProduct(q),
        enabled: !!q,
    });
};
