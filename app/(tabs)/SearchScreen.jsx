import { useNavigation } from "@react-navigation/native";

import { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";

import {
  fetchMovieDetails,
  normalizeMovies,
  searchMovies,
  searchMoviesOMDb,
} from "../utils/moviedb";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      let res;
      try {
        res = await searchMoviesOMDb(text);
      } catch (err) {
        console.warn("TMDB search failed, falling back to OMDb:", err.message);
        res = await searchMovies(text);
      }
      // const res = await searchMovies(text);
      const movies = normalizeMovies(res);
      // console.log("Movies-------------------", movies);
      setResults(movies);
    } catch (error) {
      console.error("Search error:", error.message);
      setResults([]);
    }
    setLoading(false);
  };

  const handleClick = async (item) => {
    console.log("handleClick item:", item);
    if (item) {
      console.log("Fetching details for:", item);

      try {
        const movieDetails = await fetchMovieDetails(item);

        console.log("API Response:", movieDetails);

        if (movieDetails) {
          navigation.navigate("Movie", { item: movieDetails });
        } else {
          console.warn("No movie details received from API.");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    } else {
      console.warn("Invalid item or imdbID passed to navigation:", { item });
    }
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 pt-16">
      {/* Search bar */}
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
          value={query}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* Loading */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3 mt-4 "
        >
          <Text className="text-white text-xl font-semibold ml-2 mb-2">
            Results
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              const movieName = item?.title || item?.originalTitle || "Unknown";
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => handleClick(item?.id || item?.imdbID)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri:
                          (item?.poster || item?.primaryImage) !==
                          ("N/A" || null)
                            ? item?.poster || item?.primaryImage
                            : `https://picsum.photos/200/300?random=${index}`,
                      }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                        borderRadius: 20,
                      }}
                    />

                    <Text className="text-neutral-300 ml-2">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + "..."
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        // Empty screen
        <View className="flex-row justify-center">
          <Image
            source={require("@/assets/images/adaptive-icon.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
