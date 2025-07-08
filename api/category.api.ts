import apiClient from "@/config/axios.config";
import { Category } from "@/type";

export const fetchCategory = async (): Promise<Category[]> => {
  const res = await apiClient.get<Category[]>("/category");
  return res.data;
};
