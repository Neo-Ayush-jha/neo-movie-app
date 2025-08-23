import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

let { width, height } = Dimensions.get("window");

export default function TrandingMovies({ data }) {
  const navigation = useNavigation();

    
  const handleClick = (item) => {
    if (item && typeof item === "object") {
      console.log('items',item?.id)
      navigation.navigate("Movie", {item});
    } else {
      console.warn("Invalid item passed to navigation:", {item});
    }
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-2xl mx-4 mb-5">Trending</Text>

      <Carousel
        loop={true}
        width={width}
        height={height * 0.45}
        data={data}
        mode={"horizontal-stack"}
        modeConfig={{
          snapDirection: "left",
          stackInterval: 18,
        }}
        pagingEnabled={true}
        snapEnabled={true}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideScale={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <View
      style={{
        width,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={{ uri: item?.primaryImage }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 20,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
