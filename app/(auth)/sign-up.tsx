import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { useAuthStore } from "@/store/auth.store";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

import { useSignUp } from "@/service/auth.service";

const SignUp = () => {
  const [form, setForm] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    fullName: "",
    email: "",
    password: "",
  });

  const { setIsAuthenticated, setToken, setRefreshToken } = useAuthStore();

  const { mutate, isPending } = useSignUp({
    onSuccess: (data) => {
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    },
    onError: (err: any) => {
      console.log(err?.response?.data);
      Alert.alert(
        "Sign up failed",
        Array.isArray(err?.response?.data?.message)
          ? err.response.data.message
              .map((msg: string) => `• ${msg}`)
              .join("\n")
          : err?.response?.data?.message || "Please try again"
      );
    },
  });

  const submit = () => {
    const { email, fullName, password } = form;

    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please enter all details");
      return;
    }

    mutate(form);
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Full name"
        value={form.fullName}
        onChangeText={(value) =>
          setForm((prev) => ({ ...prev, fullName: value }))
        }
        label="Full name"
      />

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

      <CustomButton title="Sign Up" onPress={submit} isLoading={isPending} />

      <View className="flex justify-center items-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
