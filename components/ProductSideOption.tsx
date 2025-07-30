import { useGetSideOption } from "@/service/sideOption.service";
import { SideOption } from "@/type";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

interface SideOptionProps {
  productId: string;
}

const SideOptionCard = ({ item }: { item: SideOption }) => {
  return (
    <View className="bg-[#3C2F2F] rounded-lg shadow-md">
      <View className="bg-white px-5 rounded-b-lg justify-center items-center">
        <Image source={{ uri: item.imageUrl }} className="size-20" />
      </View>

      <View className="flex-row items-center justify-between px-2 my-3 gap-x-5">
        <Text
          className="text-white base-bold"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ maxWidth: 70 }}
        >
          {item.name}
        </Text>

        <Pressable className="bg-red-500 size-8 rounded-full items-center justify-center">
          <Text className="base-bold text-white">+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ProductSideOption = ({ productId }: SideOptionProps) => {
  const { data, isLoading } = useGetSideOption(productId);

  if (!data?.length) return null;

  return (
    <View className="mt-5">
      <Text className="h2-bold text-dark-100 mb-2">Side options</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <SideOptionCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        ItemSeparatorComponent={() => <View className="mx-3" />}
      />
    </View>
  );
};

export default ProductSideOption;
