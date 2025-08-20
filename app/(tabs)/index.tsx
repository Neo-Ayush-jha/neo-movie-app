import HomeScreen from "@/app/screen/HomeScreen";
import SecondScreen from "@/app/screen/Seco";
import "@/style/global.css";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Second"
        component={SecondScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function Index() {
  return <TabNavigator />;
}
