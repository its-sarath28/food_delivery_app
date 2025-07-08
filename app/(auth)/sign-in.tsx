import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

import { useSignIn } from "@/service/auth.service";

import { useAuthStore } from "@/store/auth.store";

const SignIn = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const { setIsAuthenticated, setToken, setRefreshToken } = useAuthStore();

  const { mutate, isPending } = useSignIn({
    onSuccess: async (data) => {
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    },
    onError: (err: any) => {
      console.log(JSON.stringify(err));
      Alert.alert(
        "Sign up failed",
        err?.response?.data?.message || "Please try again"
      );
    },
  });

  const submit = () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Error", "Please enter all details");
      return;
    }

    mutate(form);
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Password"
        value={form.password}
        onChangeText={(value) =>
          setForm((prev) => ({ ...prev, password: value }))
        }
        label="Password"
        secureTextEntry
      />

      <CustomButton title="Sign In" onPress={submit} isLoading={isPending} />

      <View className="flex justify-center items-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
