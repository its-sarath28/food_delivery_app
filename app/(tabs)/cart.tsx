import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActionButton from "@/components/ActionButton";
import NavigationHeader from "@/components/NavigationHeader";

import { images } from "@/constants";

import { useCartStore } from "@/store/cart.store";

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const totalPrice = useCartStore((state) => state.getTotalPrice);
  const totalItems = useCartStore((state) => state.getTotalItems);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <ScrollView
        contentContainerClassName="mx-[2rem] pb-[15rem]"
        showsVerticalScrollIndicator={false}
      >
        <NavigationHeader />

        <View className="flex-row items-center justify-between my-[2.5rem]">
          <View className="flex-col">
            <Text className="paragraph-bold text-primary">
              DELIVERY LOCATION
            </Text>
            <Text className="base-bold text-dark-100">Home</Text>
          </View>

          <Pressable className="border border-primary px-4 py-3 rounded-full">
            <Text className="paragraph-bold text-primary">Change location</Text>
          </Pressable>
        </View>

        {items?.map((item) => (
          <View
            key={item.id}
            className="bg-white px-3 py-3 rounded-md flex-row items-center gap-x-3 mb-4"
          >
            <View className="bg-red-100 p-2 rounded-md">
              <Image source={{ uri: item.imageUrl }} className="size-20" />
            </View>

            <View className="flex-1">
              <Text className="h3-bold">{item.name}</Text>
              <Text className="paragraph-bold my-1">$ {item.price}</Text>
              <ActionButton
                onDecrease={() => decreaseQty(item.id)}
                onIncrease={() => increaseQty(item.id)}
                quantity={item.quantity}
              />
            </View>

            <Pressable onPress={() => removeItem(item.id)} className="px-3">
              <Image source={images.trash} className="size-8" />
            </Pressable>
          </View>
        ))}

        <View className="border border-gray-100 rounded-lg px-3 py-4">
          <Text className="h2-bold mb-3">Payment summary</Text>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="body-regular">Total Items (3)</Text>
            <Text className="base-bold">$ {totalPrice()}</Text>
          </View>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="body-regular">Delivery Fee</Text>
            <Text className="base-bold">Free</Text>
          </View>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="body-regular">Discount</Text>
            <Text className="base-bold text-green-500">- $10</Text>
          </View>

          <View className="border border-dashed my-4 border-gray-100" />

          <View className="flex-row items-center justify-between">
            <Text className="base-bold text-dark-100">Total</Text>
            <Text className="base-bold text-dark-100">
              $ {totalPrice() - 10}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {}}
          className="bg-primary mt-[2rem] py-3.5 rounded-full items-center justify-center"
        >
          <Text className="text-white base-bold">Order now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;
