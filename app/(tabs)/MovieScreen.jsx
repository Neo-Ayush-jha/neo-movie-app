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
import {
  ChevronLeftIcon,
  HeartIcon,
  StarIcon,
} from "react-native-heroicons/solid";
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

  // console.log("Movie Screen", cast);

  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // await Promise.all([getCastMovies(item?.id), getWriterMovies(item?.id)]);
        await Promise.all([
          getCastMovies(item?.imdbID || item?.id),
          getWriterMovies(item?.imdbID || item?.id),
        ]);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };

    // if (item?.id) {
    if (item?.imdbID || item?.id) {
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
        // console.log("Writer Movies:", trending);
      }
    } catch (error) {
      console.error("Error fetching writer movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingValue = (rating) => {
    let value = rating.Value;
    if (value.includes("/10")) {
      return (parseFloat(value) / 10) * 5;
    } else if (value.includes("%")) {
      return (parseFloat(value) / 100) * 5;
    } else if (value.includes("/100")) {
      return (parseFloat(value) / 100) * 5;
    }
    return 0;
  };
  const getImdbStars = (val) => {
    if (!val) return 0;
    return (parseFloat(val) / 10) * 5;
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
              // source={{ uri: item?.Poster || item?.primaryImage }}
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
          {item?.Title || item?.originalTitle}
        </Text>

        <View className=" py-4">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Released • {cast?.Released || item?.releaseDate} •{" "}
            {item?.runtimeMinutes === null
              ? "170 min"
              : `${cast?.Runtime || item?.runtimeMinutes} min`}
          </Text>
          {cast?.Genre && (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Genre • {cast?.Genre ? cast.Genre.split(",").join(" • ") : ""}
            </Text>
          )}
          {cast?.Language && (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Language • {cast?.Language}{" "}
              {cast?.BoxOffice ? ` • Box Office • ${cast.BoxOffice}` : ""}
            </Text>
          )}
          {cast?.Ratings && (
            <View className="mx-md">
              <Text className="text-white font-bold text-md px-8">
                Ratings:
              </Text>
              {cast?.Ratings?.map((rating, index) => {
                const starValue = getRatingValue(rating);
                const filledStars = Math.round(starValue);

                return (
                  <View key={index} className="flex-row px-12 gap-4 ">
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                      {rating.Source}
                    </Text>
                    <View className="flex-row">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon
                          key={i}
                          name="star"
                          size={20}
                          color={i <= filledStars ? "gold" : "gray"}
                          style={{ marginRight: 2 }}
                        />
                      ))}
                    </View>
                  </View>
                );
              })}
              {cast?.imdbRating && (
                <View className="flex-row px-12 gap-4 ">
                  <Text className="text-neutral-400 font-semibold text-base text-center">
                    IMDb Rating
                  </Text>
                  <View className="flex-row">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon
                        key={i}
                        name="star"
                        size={20}
                        color={
                          i <= Math.round(getImdbStars(cast?.imdbRating))
                            ? "gold"
                            : "gray"
                        }
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        <View className="flex-row justify-center mx-4 space-x-2">
          {item?.genres?.map((genre, index) => (
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
            ? cast?.Plot.slice(0, 300) + "..."
            : cast?.Plot}
        </Text>
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
