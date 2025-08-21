import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

let { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  let movieName = "The Dark Knight Rises";
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.push("Movie", { movie: item });
  };

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-xl" style={{ color: "#eab388" }}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleClick(item)}
            >
              <View>
                <View className="space-y-1 mr-4">
                  <Image
                    source={require("@/assets/images/1092424.jpg")}
                    className="rounded-3xl"
                    style={{
                      width: width * 0.6,
                      height: height * 0.4,
                      borderRadius: 20,
                    }}
                  />
                </View>
                <Text className="text-neutral-300 ml-1 text-center mt-1 text-lg">
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
