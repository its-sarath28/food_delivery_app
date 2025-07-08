import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import { useAuthStore } from "@/store/auth.store";

import "./global.css";

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore.getState();

  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("@/assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("@/assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("@/assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("@/assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnReconnect: true,
      },
    },
  });

  isAuthenticated ? (
    <Redirect href={"/(tabs)"} />
  ) : (
    <Redirect href={"/(auth)/sign-in"} />
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
