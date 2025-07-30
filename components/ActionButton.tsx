import React from "react";
import { Pressable, Text, View } from "react-native";

interface ActionButtonProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const ActionButton = ({
  onDecrease,
  onIncrease,
  quantity,
}: ActionButtonProps) => {
  return (
    <View className="flex-row items-center gap-x-[1rem]">
      <Pressable
        disabled={quantity === 1}
        onPress={onDecrease}
        className="px-3"
      >
        <Text className="h1-bold text-primary">-</Text>
      </Pressable>

      <Text className="h3-bold text-dark-100">{quantity}</Text>

      <Pressable onPress={onIncrease} className="px-3">
        <Text className="h1-bold text-primary">+</Text>
      </Pressable>
    </View>
  );
};

export default ActionButton;
