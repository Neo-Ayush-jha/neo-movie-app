import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-6";

export default function PersonScreen() {
  const route = useRoute();
  const { person } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  console.log("Person Screen", person);
  

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center pt-16 px-4 " +
          verticalMargin
        }
      >
        <TouchableOpacity
          style={{ backgroundColor: "#eab388" }}
          className="rounded-xl p-1 "
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon size="35" color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="flex-1 items-center justify-center p-1">
            <View
              style={{
                shadowColor: "gray",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 40,
                elevation: 15,
                borderRadius: 150,
                padding: 25,
              }}
            >
              {/* Image Container */}
              <View className="h-[330px] w-[330px] rounded-full overflow-hidden border-2 border-neutral-400 bg-black">
                <Image
                  source={{ uri: person?.primaryImage }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center border border-neutral-700 rounded-lg">
            <View className="font-semibold text-white border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">
                {person?.fullName}
              </Text>
              <Text className="text-sm text-neutral-300">Person</Text>
            </View>
            <View className="font-semibold text-white border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">
                {person?.characters?.length > 0
                  ? person?.characters
                  : person?.fullName}
              </Text>
              <Text className="text-sm text-neutral-300 caption-top">
                {person?.job}
              </Text>
            </View>
            <View className="font-semibold text-white border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Christian Bale</Text>
              <Text className="text-sm text-neutral-300">Actor</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Christian Bale</Text>
              <Text className="text-sm text-neutral-300">Actor</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-4">
            <Text className="text-white">Biography</Text>
            <Text className="text-neutral-300">
              Christian Bale is an English actor known for his versatility and
              intense performances. He has received numerous accolades,
              including Academy Awards and Golden Globe Awards.Christian Bale is
              an English actor known for his versatility and intense
              performances. He has received numerous accolades, including
              Academy Awards and Golden Globe Awards.Christian Bale is an
              English actor known for his versatility and intense performances.
              He has received numerous accolades, including Academy Awards and
              Golden Globe Awards.Christian Bale is an English actor known for
              his versatility and intense performances. He has received numerous
              accolades, including Academy Awards and Golden Globe
              Awards.Christian Bale is an English actor known for his
              versatility and intense performances. He has received numerous
              accolades, including Academy Awards and Golden Globe
              Awards.Christian Bale is an English actor known for his
              versatility and intense performances. He has received numerous
              accolades, including Academy Awards and Golden Globe
            </Text>
          </View>

          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
