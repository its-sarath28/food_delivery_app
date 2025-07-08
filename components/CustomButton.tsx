import cn from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { CustomButtonProps } from "@/type";

const CustomButton = ({
  onPress,
  title = "Click Me",
  isLoading = false,
  leftIcon,
  style,
  textStyle,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn("custom-btn", style)} onPress={onPress}>
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
