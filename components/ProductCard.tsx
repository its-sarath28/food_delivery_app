import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

import { Product } from "@/type";

const ProductCard = ({ item }: { item: Product }) => {
  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: item.imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />

      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {item.name}
      </Text>

      <Text className="body-regular text-gray-200 mb-4">
        From ₹{item.price}
      </Text>

      <TouchableOpacity onPress={() => {}}>
        <Text className="paragraph-bold text-primary">Add to cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;
