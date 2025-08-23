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
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import { fetchMovieCast, fetchMovieWriter } from "../utils/moviedb";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  // let movieName = "The Dark Knight Rises";
  const route = useRoute();
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [writer, setWriter] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getCastMovies(item?.id), getWriterMovies(item?.id)]);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (item?.id) {
      fetchData();

      // console.log("items---", item);
    }
  }, [item]);

  const getCastMovies = async (id) => {
    setLoading(true);
    try {

      const trending = await fetchMovieCast(id);
      if (trending) {
        setCast(trending);
        // console.log("Cast Movies:", trending);
      }
    } catch (error) {
      console.error("Error fetching cast movies:", error);
    } finally {
      setLoading(false);
    }
  };
  const getWriterMovies = async (id) => {
    setLoading(true);
    try {

      const trending = await fetchMovieWriter(id);
      if (trending) {
        setWriter(trending);
        // console.log("Cast Movies:", trending);
      }
    } catch (error) {
      console.error("Error fetching cast movies:", error);
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: item?.primaryImage }}
              className=""
              style={{ width: width, height: height * 0.69 }}
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
        )}
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-4 ">
        <Text className="text-white text-4xl tracking-wide font-bold text-center">
          {item?.originalTitle}
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center py-4">
          Released • {item?.releaseDate} •{" "}
          {item?.runtimeMinutes === null
            ? "170 min"
            : `${item.runtimeMinutes} min`}
        </Text>

        <View className="flex-row justify-center mx-4 space-x-2">
          {item?.genres.map((genre, index) => (
            <Text
              key={index}
              className="text-neutral-400 font-semibold text-base text-center"
            >
              {genre}
              {index < item.genres.length - 1 ? " •" : ""}
            </Text>
          ))}
        </View>

        <Text className="text-neutral-400 mx-4 tracking-wide pt-4">
          {item?.description?.length > 300
            ? item?.description.slice(0, 300) + "..."
            : item?.description}
        </Text>
      </View>
      <Cast title="Top Cast" cast={cast} navigation={navigation} />
      <Cast title="Writers" cast={writer} navigation={navigation} />

      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
}
