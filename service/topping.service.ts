import { fetchToppings } from "@/api/topping.api";
import { Topping } from "@/type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetTopping = (
  productId: string,
  options?: UseQueryOptions<Topping[], Error>
) => {
  return useQuery<Topping[], Error>({
    queryKey: ["all-toppings", productId],
    queryFn: () => fetchToppings(productId),
    refetchOnWindowFocus: true,
    ...options,
  });
};
