import apiClient from "@/config/axios.config";
import { Topping } from "@/type";

export const fetchSideOptions = async (
  productId: string
): Promise<Topping[]> => {
  const params = new URLSearchParams();
  if (productId) params.append("productId", productId);

  const res = await apiClient.get<Topping[]>(
    `/side-options?${params.toString()}`
  );
  return res.data;
};
