import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";

import { useGetCategory } from "@/service/category.service";
import { Category } from "@/type";

const CategoryFilter = () => {
  const { data, isLoading } = useGetCategory();
  const searchParams = useLocalSearchParams();

  const [active, setActive] = useState(
    searchParams.categoryId?.toString() || "0"
  );

  const formattedCategory: Category[] = data
    ? [{ id: 0, name: "All" }, ...data]
    : [{ id: 0, name: "All" }];

  const handlePress = (id: string) => {
    setActive(id);

    if (id === "0") {
      router.setParams({ categoryId: undefined });
    } else {
      router.setParams({ categoryId: id });
    }
  };

  return (
    <FlatList
      data={formattedCategory}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={cn(
            "filter",
            active === item.id.toString() ? "bg-amber-500" : "bg-white"
          )}
          style={
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
          onPress={() => handlePress(item.id.toString())}
        >
          <Text
            className={cn(
              "body-medium",
              active === item.id.toString() ? "text-white" : "text-gray-200"
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
    />
  );
};

export default CategoryFilter;
