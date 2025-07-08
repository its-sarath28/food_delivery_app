import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    fullName: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    const { email, fullName, password } = form;

    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please enter all details");
      return;
    }

    setIsSubmitting(true);

    try {
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Error", err.messages);
    } finally {
      setIsSubmitting(false);
    }
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

      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting} />

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
