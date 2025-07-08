import apiClient from "@/config/axios.config";
import { Menu } from "@/type";

export const fetchMenus = async (): Promise<Menu[]> => {
  const res = await apiClient.get<Menu[]>("/menu");
  return res.data;
};
