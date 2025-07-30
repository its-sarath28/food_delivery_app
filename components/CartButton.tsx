import { Image, Text, TouchableOpacity, View } from "react-native";

import { useCartStore } from "@/store/cart.store";

import { images } from "@/constants";
import { router } from "expo-router";

const CartButton = () => {
  const { getTotalItems } = useCartStore();

  const totalItems = getTotalItems();

  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => router.push("/(tabs)/cart")}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />

      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
