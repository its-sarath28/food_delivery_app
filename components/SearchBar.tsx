import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { images } from "@/constants";

const SearchBar = () => {
  const param = useLocalSearchParams<{ query?: string }>();
  const initialQuery = param?.query || "";

  const [input, setInput] = useState(initialQuery);

  const submitSearch = () => {
    router.setParams({ query: input || undefined });
  };

  return (
    <View
      className={cn("searchbar", Platform.OS === "android" ? "shadow-md" : "")}
    >
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
        value={input}
        onChangeText={setInput}
        onSubmitEditing={submitSearch}
        placeholderTextColor="#A0A0A0"
        returnKeyType="search"
      />

      <TouchableOpacity className="pr-5" onPress={submitSearch}>
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5D5F6D"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
