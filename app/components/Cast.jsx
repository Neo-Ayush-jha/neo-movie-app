import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Cast({ cast, navigation, title }) {
  // {
  //   cast.map((person, index) => {
  //     console.log("cast-------", person);
  //   });
  // }
  const actors = cast?.Actors ? cast.Actors.split(",") : [];
  // console.log("cast-------",  cast);
  return (
    <View className="mt-4 mb-6">
      <Text className="text-white text-xl mx-4 mb-5">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {(cast?.length > 0
          ? cast
          : actors?.length > 0
          ? actors.split(",")
          : []
        ).map((person, index) => {
          const isRapidApi = typeof person === "object";

          const name = isRapidApi ? person?.fullName : person?.trim();
          const image =
            isRapidApi && (person?.thumbnails?.[1]?.url || person?.primaryImage)
              ? person?.thumbnails?.[1]?.url || person?.primaryImage
              : `https://picsum.photos/200/300?random=${index}`;

          return (
            <TouchableOpacity
              key={index}
              className="mx-4 items-center"
              onPress={() =>
                navigation.navigate("Person", {
                  person: isRapidApi ? person : { fullName: name },
                })
              }
            >
              <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                {image ? (
                  <Image
                    source={{ uri: image }}
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
                      style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {name?.charAt(0) || "?"}
                    </Text>
                  </View>
                )}
              </View>

              {isRapidApi && person?.characters && (
                <Text className="text-white text-sm mt-1 text-center">
                  {person?.characters?.length > 10
                    ? person?.characters.slice(0, 10) + "..."
                    : person?.characters}
                </Text>
              )}

              <Text className="text-neutral-300 text-sm mt-1 text-center">
                {name?.length > 10 ? name.slice(0, 10) + "..." : name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
