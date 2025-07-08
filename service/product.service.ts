import { fetchProducts } from "@/api/product.api";
import { Product } from "@/type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetProduct = (
  categoryId?: string,
  query?: string,
  options?: UseQueryOptions<Product[], Error>
) => {
  return useQuery<Product[], Error>({
    queryKey: ["product", categoryId, query],
    queryFn: () => fetchProducts(categoryId, query),
    refetchOnWindowFocus: true,
    ...options,
  });
};
