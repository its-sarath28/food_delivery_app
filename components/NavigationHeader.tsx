import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants";

interface NavigationHeaderProps {
  title?: string;
}

const NavigationHeader = ({ title }: NavigationHeaderProps) => {
  return (
    <View className="mt-5 flex-row items-center justify-between">
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={images.arrowBack}
          className="size-5"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text className="base-bold">{title}</Text>

      <TouchableOpacity>
        <Image source={images.search} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationHeader;
