import MovieList from "@/app/components/MovieList";
import TrandingMovies from "@/app/components/TrandingMovies";
import "@/style/global.css";
import { StatusBar } from "expo-status-bar";
import React from "react";
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
  MagnifyingGlassCircleIcon,
} from "react-native-heroicons/outline";
const ios = Platform.OS === "ios";

const HomeScreen = () => {
  const movies = [
  { id: 1, title: "The Dark Knight Rises", poster: require("@/assets/images/1092424.jpg") },
  { id: 2, title: "Inception", poster: require("@/assets/images/1092424.jpg") },
  { id: 3, title: "Interstellar", poster: require("@/assets/images/1092424.jpg") },
];

  const [trandingMovies, setTrandingMovies] = React.useState(movies);
  const [upcoming, setUpcoming] = React.useState(movies);
  const [topRated, setTopRated] = React.useState(movies);
  return (
    <View className="bg-neutral-800 flex-1 pt-16 h-full">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassCircleIcon
              size="30"
              strokeWidth={2}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="gap-8"
      >
        <TrandingMovies data={trandingMovies} />

        <MovieList title="Upcoming" data={upcoming} />

        <MovieList title="Top Rated" data={topRated} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#eab388",
  },
});
