import HomeScreen from "@/app/(tabs)/HomeScreen";
import MovieScreen from "@/app/(tabs)/MovieScreen";
import PersonScreen from "@/app/(tabs)/PersonScreen";
import SearchScreen from "@/app/(tabs)/SearchScreen";
import "@/style/global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Person"
        component={PersonScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function Index() {
  return <TabNavigator />;
}
