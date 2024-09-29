import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import AirQualityDetails from "./src/screens/AirQualityDetails";
import SoilQualityScreen from "screens/SoilQualityScreen";
import WaterQualityScreen from "screens/WaterQualityScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AirQualityDetails"
      component={AirQualityDetails}
      options={{ title: "Air Quality Details" }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "HomeTab") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Soil") {
              iconName = focused ? "leaf" : "leaf-outline";
            } else if (route.name === "Water") {
              iconName = focused ? "water" : "water-outline";
            } else {
              iconName = "help-outline"; // Default icon if none of the conditions are met
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{ title: "Home", headerShown: false }}
        />
        <Tab.Screen name="Soil" component={SoilQualityScreen} />
        <Tab.Screen name="Water" component={WaterQualityScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
