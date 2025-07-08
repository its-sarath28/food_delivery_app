import { fetchCategory } from "@/api/category.api";
import { Category } from "@/type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetCategory = (
  options?: UseQueryOptions<Category[], Error>
) => {
  return useQuery<Category[], Error>({
    queryKey: ["category"],
    queryFn: fetchCategory,
    ...options,
  });
};
