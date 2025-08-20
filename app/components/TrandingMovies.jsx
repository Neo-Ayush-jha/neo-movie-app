import "@/style/global.css";
import React from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

let { width, height } = Dimensions.get("window");

export default function TrandingMovies(props) {
  return (
    <View className="mb-8 ">
      <Text className="text-white text-xl mx-4 mb-5">Tranding</Text>
      <Carousel
        data={props.data}
        renderItem={({ item }) => <MovieCard item={item} />}
        firstItem={1}
        width={width}
        inactiveSlideScale={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item }) => {
  return (
    <TouchableWithoutFeedback>
      <Image
        source={require("@/assets/images/1092424.jpg")}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
