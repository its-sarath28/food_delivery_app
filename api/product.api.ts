import apiClient from "@/config/axios.config";
import { Product } from "@/type";

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
