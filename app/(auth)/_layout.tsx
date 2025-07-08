import { Redirect, Slot } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

import { images } from "@/constants";
import { useAuthStore } from "@/store/auth.store";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore.getState();

  if (isAuthenticated) {
    <Redirect href="/(tabs)" />;
  }

  return (
    <View
      style={{
        minHeight: Dimensions.get("screen").height,
        backgroundColor: "#fff",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-green-300 h-full"
      >
        <ScrollView
          className="bg-white h-full"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            className="w-full relative"
            style={{ height: Dimensions.get("screen").height / 2.25 }}
          >
            <ImageBackground
              source={images.loginGraphic}
              className="size-full rounded-b-lg"
              resizeMode="stretch"
            />

            <Image
              source={images.logo}
              className="self-center size-48 absolute -bottom-16 z-10"
            />
          </View>

          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
