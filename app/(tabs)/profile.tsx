import NavigationHeader from "@/components/NavigationHeader";
import { images } from "@/constants";
import { useAuthStore } from "@/store/auth.store";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { clearStorage } = useAuthStore();

  const logout = () => {
    clearStorage();
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView
      style={{
        minHeight: Dimensions.get("screen").height,
        backgroundColor: "#FAFAFA",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <ScrollView
        contentContainerClassName="mx-[2rem] pb-[15rem]"
        showsVerticalScrollIndicator={false}
      >
        <NavigationHeader title="Profile" />

        <View className="items-center mt-10">
          <View className="relative">
            <Image
              source={images.avatar}
              className="w-32 h-32 rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => {}}
              className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full"
            >
              <Image
                source={images.pencil}
                className="w-5 h-5"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-y-[3rem] mt-[3rem] bg-white shadow-md rounded-lg py-5">
          <View className="flex-row items-center gap-x-4 px-5">
            <View>
              <Image source={images.user} className="size-8" />
            </View>

            <View>
              <Text className="body-regular text-gray-200">Full Name</Text>
              <Text className=" base-bold text-dark-100" numberOfLines={1}>
                Sarath R S
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-x-4 px-5">
            <View>
              <Image source={images.envelope} className="size-8" />
            </View>

            <View>
              <Text className="body-regular text-gray-200">Email</Text>
              <Text className=" base-bold text-dark-100" numberOfLines={1}>
                user@gmail.com
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-x-4 px-5">
            <View>
              <Image source={images.phone} className="size-8" />
            </View>

            <View>
              <Text className="body-regular text-gray-200">Phone</Text>
              <Text className=" base-bold text-dark-100">+91 9778438763</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-x-4 px-5">
            <View>
              <Image source={images.location} className="size-8" />
            </View>

            <View>
              <Text className="body-regular text-gray-200">Address</Text>
              <Text className=" base-bold text-dark-100" numberOfLines={1}>
                123 Main Street, Springfield, IL 62704
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-[3rem] gap-y-[1rem]">
          <TouchableOpacity className="border-2 border-primary rounded-full py-3.5 text-center justify-center items-center bg-primary/20">
            <Text className="base-bold text-primary">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            className="border-2 border-red-600 rounded-full py-3.5 text-center justify-center items-center bg-red-500/20"
          >
            <Text className="base-bold text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
