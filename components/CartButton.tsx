import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants";
import { useAuthStore } from "@/store/auth.store";

const CartButton = () => {
  const totalItems = 10;

  const getToken = async () => {
    const token = useAuthStore((state) => state.token);
    console.log({ token });
  };

  return (
    <TouchableOpacity className="cart-btn" onPress={() => getToken()}>
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
