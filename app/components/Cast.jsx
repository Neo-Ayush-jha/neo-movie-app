import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Cast({ cast,navigation }) {
  let personName = "Christian Bale";
  let characterName = "Bruce Wayne / Batman";
  return (
    <View className="my-4">
      <Text className="text-white text-xl mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {/* Render cast members here */}
        {cast.map((person, index) => (
          <TouchableOpacity key={index} className="mx-4 items-center" onPress={() => navigation.navigate("Person", person)}>
            <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
              <Image
                source={require("@/assets/images/Christian.jpg")}
                style={{ width: 80, height: 80, borderRadius: 999 }}
              />
            </View>

            <Text className="text-white text-sm  mt-1">
              {characterName.length > 10
                ? characterName.slice(0, 10) + "..."
                : characterName}
            </Text>
            <Text className="text-neutral-300 text-sm  mt-1">
              {personName.length > 10
                ? personName.slice(0, 10) + "..."
                : personName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
