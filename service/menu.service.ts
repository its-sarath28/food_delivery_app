import { fetchMenus } from "@/api/menu.api";
import { Menu } from "@/type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetMenu = (options?: UseQueryOptions<Menu[], Error>) => {
  return useQuery<Menu[], Error>({
    queryKey: ["menu"],
    queryFn: fetchMenus,
    ...options,
  });
};
