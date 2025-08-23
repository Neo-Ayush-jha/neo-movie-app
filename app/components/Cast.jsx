import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Cast({ cast, navigation, title }) {
  // {
  //   cast.map((person, index) => {
  //     console.log("cast-------", person?.primaryImage);
  //   });
  // }
  console.log("cast-------", cast);
  return (
    <View className="mt-4 mb-6">
      <Text className="text-white text-xl mx-4 mb-5">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {/* Render cast members here */}
        {cast.map((person, index) => (
          <TouchableOpacity
            key={index}
            className="mx-4 items-center"
            onPress={() => navigation.navigate("Person", { person })}
          >
            <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
              {person?.thumbnails?.[2]?.url ||
              person?.primaryImage ? (
                <Image
                  source={{
                    uri:
                      person?.thumbnails?.[1]?.url ||
                      person?.primaryImage 
                  }}
                  style={{ width: 80, height: 80, borderRadius: 999 }}
                />
              ) : (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 999,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}
                  >
                    {person?.fullName?.charAt(0) || "?"}
                  </Text>
                </View>
              )}
            </View>

            <Text className="text-white text-sm  mt-1">
              {person?.characters && person?.characters?.length > 10
                ? person?.characters.slice(0, 10) + "..."
                : person?.characters}
            </Text>
            <Text className="text-neutral-300 text-sm  mt-1">
              {person?.fullName?.length > 10
                ? person?.fullName.slice(0, 10) + "..."
                : person?.fullName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
