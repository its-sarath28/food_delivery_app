import { fetchProducts, getProductDetail } from "@/api/product.api";
import { Product, ProductDetail } from "@/type";
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

export const useGetProductDetail = (
  productId: string,
  options?: UseQueryOptions<ProductDetail, Error>
) => {
  return useQuery<ProductDetail, Error>({
    queryKey: ["product-detail", productId],
    queryFn: () => getProductDetail(productId),
    refetchOnWindowFocus: true,
    ...options,
  });
};
