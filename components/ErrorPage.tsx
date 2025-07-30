import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ErrorPage = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View className="flex-col items-center justify-center">
        <Text className="base-bold">Something went wrong !</Text>
        <Text className="body-medium">Please try again later</Text>
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          className="mt-5 bg-primary px-3 py-2 rounded-md"
        >
          <Text className="base-bold text-white">Go Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ErrorPage;
