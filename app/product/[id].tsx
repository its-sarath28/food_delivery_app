import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StarRatingDisplay } from "react-native-star-rating-widget";

import ErrorPage from "@/components/ErrorPage";
import NavigationHeader from "@/components/NavigationHeader";
import ProductSideOption from "@/components/ProductSideOption";
import ProductTopping from "@/components/ProductTopping";

import { images } from "@/constants";

import { useGetProductDetail } from "@/service/product.service";

import ActionButton from "@/components/ActionButton";
import { useCartStore } from "@/store/cart.store";

const ProductDetails = () => {
  const { id }: { id: string } = useLocalSearchParams();

  const { getQuantityAndPrice, addItem } = useCartStore();

  const { data: productData, isLoading: productLoading } =
    useGetProductDetail(id);

  const { quantity: cartQuantity, totalPrice } = getQuantityAndPrice(
    Number(id)
  );

  const [quantity, setQuantity] = useState<number>(cartQuantity);
  const [price, setPrice] = useState<number>(Number(productData?.price) || 0);

  useEffect(() => {
    setPrice(Number(productData?.price));
  }, [productData?.price]);

  const handleChangeQuantity = (type: "inc" | "dec") => {
    if (type === "inc") {
      setQuantity(quantity + 1);
      setPrice((quantity + 1) * Number(productData?.price));
    } else if (type === "dec") {
      setQuantity(Math.max(quantity - 1, 1));
      setPrice(Math.max(quantity - 1, 1) * Number(productData?.price));
    }
  };

  if (!productData) return <ErrorPage />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FAFAFA",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <ScrollView
        contentContainerClassName="mx-[2rem] pb-[3rem]"
        showsVerticalScrollIndicator={false}
      >
        <NavigationHeader />

        <View className="flex-row items-start mt-[3rem]">
          <View className="flex-1">
            <Text className=" h1-bold mb-3">{productData?.name}</Text>

            {Number(productData?.rating) > 0 && (
              <StarRatingDisplay
                rating={Number(productData?.rating)}
                maxStars={5}
                starSize={20}
              />
            )}

            <View className="flex-row items-center gap-x-2 mt-4">
              <Text className="h2-bold text-primary">$</Text>
              <Text className="h2-bold text-dark-100">
                {productData?.price}
              </Text>
            </View>
          </View>

          <View>
            <Image
              source={{ uri: productData?.imageUrl }}
              className="size-44"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="flex-row items-center justify-between my-4">
          <View className="flex-row items-center gap-x-2 bg-primary/10 px-2 rounded-md py-2">
            <Image source={images.dollar} className="size-4" />
            <Text className="base-bold text-dark-100">Free Delivery</Text>
          </View>

          <View className="flex-row items-center gap-x-2 bg-primary/10 px-2 rounded-md py-2">
            <Image source={images.clock} className="size-4" />
            <Text className="base-bold text-dark-100">20 - 30 min</Text>
          </View>

          <View className="flex-row items-center gap-x-2 bg-primary/10 px-2 rounded-md py-2">
            <Image source={images.star} className="size-4" />
            <Text className="base-bold text-dark-100">
              {productData?.rating}
            </Text>
          </View>
        </View>

        <Text className="body-medium text-justify">
          {productData?.description}
        </Text>

        <ProductTopping productId={id} />

        <ProductSideOption productId={id} />
      </ScrollView>

      <View className="flex-row items-center gap-x-2 mx-5 mb-4 bg-white shadow-md py-2 pr-2 rounded-lg">
        <View className="flex-row items-center gap-x-4">
          <ActionButton
            onDecrease={() => handleChangeQuantity("dec")}
            onIncrease={() => handleChangeQuantity("inc")}
            quantity={quantity}
          />
        </View>

        <View className="flex-1">
          <TouchableOpacity
            onPress={() =>
              addItem({
                id: productData?.id,
                name: productData?.name,
                price: productData?.price,
                imageUrl: productData?.imageUrl,
              })
            }
            className="bg-primary flex-row items-center justify-center gap-x-3 py-4 px-2 rounded-full"
          >
            <Image source={images.bag} className="size-5" />
            <Text className="base-bold text-white">
              Add to cart ({totalPrice ? ` $${totalPrice} ` : ` $${price} `})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
