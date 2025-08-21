import Cast from "@/app/components/Cast";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
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
import MovieList from "../components/MovieList";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  let movieName = "The Dark Knight Rises";
  const route = useRoute();
  const { params: item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);

  const navigation = useNavigation();
  useEffect(() => {}, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900 "
    >
      <View className="w-full ">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center pt-16 px-4 " +
            ios
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
            <HeartIcon size="35" color={isFavorite ? "#eab388" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <Image
            source={require("@/assets/images/1092424.jpg")}
            className=""
            style={{ width: width, height: height * 0.65 }}
            // resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{
              width: width,
              height: height * 0.4,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-4 ">
        <Text className="text-white text-4xl tracking-wide font-bold text-center">
          {movieName}
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center py-4">
          Released • 2020 • 170 min
        </Text>

        <View className="flex-row justify-center mx-4 space-x-2 ">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center ">
            Thriller •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy •
          </Text>
        </View>

        <Text className="text-neutral-400 mx-4 tracking-wide pt-4">
          The Dark Knight (2008), directed by Christopher Nolan, is a
          masterpiece in superhero cinema. The film follows Batman as he battles
          chaos unleashed by the Joker, a criminal mastermind who thrives on
          fear and anarchy.Batman has a new foe, the Joker, who is an
          accomplished criminal hell-bent on decimating Gotham City. Together
          with Gordon and Harvey Dent, Batman struggles to thwart the Joker
          before it is too late.
        </Text>
      </View>
      <Cast cast={cast} navigation={navigation} />

      <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
    </ScrollView>
  );
}
