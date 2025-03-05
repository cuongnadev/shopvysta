import { apiClient } from "src/libs/api-client";
import { useQuery } from "@tanstack/react-query";
import { ProductProps } from "src/types/product";

export const filterProduct = (q: string, filters: Record<string, string>) => {
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    
    // Thêm tất cả các bộ lọc vào query params
    Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    return apiClient.get<ProductProps[]>(`/search?${params.toString()}`);
};

export const useFilterProduct = (q: string, filters: Record<string, string>) => {
    return useQuery({
        queryKey: ["filter-product", q, filters],
        queryFn: () => filterProduct(q, filters),
    });
};
