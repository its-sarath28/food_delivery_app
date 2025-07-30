import apiClient from "@/config/axios.config";
import { Product, ProductDetail } from "@/type";

export const fetchProducts = async (
  categoryId?: string,
  query?: string
): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (categoryId) params.append("categoryId", categoryId);
  if (query) params.append("query", query);

  const res = await apiClient.get<Product[]>(`/product?${params.toString()}`);
  return res.data;
};

export const getProductDetail = async (
  productId: string
): Promise<ProductDetail> => {
  const res = await apiClient.get<ProductDetail>(`/product/${productId}`);
  return res.data;
};
