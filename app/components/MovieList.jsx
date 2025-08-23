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
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center mb-4">
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
                  {item?.primaryImage ? (
                    <Image
                      source={{ uri: item.primaryImage }}
                      className="rounded-3xl"
                      style={{
                        width: width * 0.6,
                        height: height * 0.4,
                        borderRadius: 20,
                      }}
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/1092424.jpg")}
                      className="rounded-3xl"
                      style={{
                        width: width * 0.6,
                        height: height * 0.4,
                        borderRadius: 20,
                      }}
                    />
                  )}
                </View>
                <Text className="text-neutral-300 ml-1 text-center mt-1 text-lg">
                  {item?.primaryTitle?.length > 14
                    ? item?.primaryTitle.slice(0, 14) + "..."
                    : item?.primaryTitle}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
