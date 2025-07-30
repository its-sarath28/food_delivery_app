import apiClient from "@/config/axios.config";
import { Topping } from "@/type";

export const fetchToppings = async (productId: string): Promise<Topping[]> => {
  const params = new URLSearchParams();
  if (productId) params.append("productId", productId);

  const res = await apiClient.get<Topping[]>(`/topping?${params.toString()}`);
  return res.data;
};
