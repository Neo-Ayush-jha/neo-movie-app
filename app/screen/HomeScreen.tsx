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
  const [trandingMovies, setTrandingMovies] = React.useState([1,2,3]);
  return (
    <View className="bg-neutral-800 flex-1 pt-16">
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
      >
        {/* <Text style={styles.text}>Hello</Text> */}
        <TrandingMovies data={trandingMovies}/>
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
