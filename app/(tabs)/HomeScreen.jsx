import Loading from "@/app/components/Loading";
import MovieList from "@/app/components/MovieList";
import TrandingMovies from "@/app/components/TrandingMovies";
import "@/style/global.css";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../utils/moviedb";

const ios = Platform.OS === "ios";
const HomeScreen = () => {

  const [loading, setLoading] = React.useState(false);

  const [trandingMovies, setTrandingMovies] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getTrendingMovies(),
          getUpcomingMovies(),
          getTopRatedMovies(),
        ]);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Trending Movies
  const getTrendingMovies = async () => {
    setLoading(true);
    try {
      const trending = await fetchTrendingMovies();
      if (trending) {
        setTrandingMovies(trending?.results);
        // console.log("Trending Movies:", trending.results);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Upcoming Movies
  const getUpcomingMovies = async () => {
    setLoading(true);
    try {
      const upcomingMovies = await fetchUpcomingMovies();
      if (upcomingMovies) {
        setUpcoming(upcomingMovies?.results || upcomingMovies);
        // console.log("Upcoming Movies:", upcomingMovies);
      }
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }finally {
      setLoading(false);
    }
  };

  // 🔹 Top Rated Movies
  const getTopRatedMovies = async () => {
    setLoading(true);
    try {
      const topRatedMovies = await fetchTopRatedMovies();
      if (topRatedMovies) {
        setTopRated(topRatedMovies?.results || topRatedMovies);
        // console.log("Top Rated Movies:", topRatedMovies);
      }
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-neutral-800 flex-1 pt-16 h-full">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold ">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon
              size="30"
              strokeWidth={2}
              color="white"
              onPress={() => navigation.navigate("Search")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          className="gap-8"
        >
          {trandingMovies.length > 0 && (
            <TrandingMovies data={trandingMovies} />
          )}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#eab388",
  },
});
