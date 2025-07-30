import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/components/CartButton";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

import { images } from "@/constants";
import { useGetProduct } from "@/service/product.service";

const Search = () => {
  const { categoryId, query } = useLocalSearchParams<{
    categoryId: string;
    query: string;
  }>();

  const { data: product, isLoading: productLoading } = useGetProduct(
    categoryId,
    query
  );

  return (
    <SafeAreaView
      className="bg-white"
      style={{ minHeight: Dimensions.get("screen").height }}
    >
      <FlatList
        data={product}
        renderItem={({ item, index }) => {
          const isFirstRightColItem: boolean = index % 2 === 0;

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <ProductCard item={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-[15rem]"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>

                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favourite food
                  </Text>
                </View>
              </View>

              <CartButton />
            </View>

            <SearchBar />

            <CategoryFilter />
          </View>
        )}
        ListEmptyComponent={() =>
          !productLoading && (
            <View className="justify-center items-center">
              <Image
                source={images.emptyState}
                className="size-52"
                resizeMode="contain"
              />

              <Text className="base-bold text-dark-100 mb-2">
                Nothing matched your search
              </Text>
              <Text className="body-regular text-gray-200">
                Try a different search term or check for typos.
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
