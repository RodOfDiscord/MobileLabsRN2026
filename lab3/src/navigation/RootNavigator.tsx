import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ChallengesScreen from "../screens/ChallengesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { useThemeParams } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  const { theme } = useThemeParams();

  const isDark = theme === "dark";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
        },
        headerTintColor: isDark ? "#ffffff" : "#000000",
        tabBarStyle: {
          backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
          borderTopColor: isDark ? "#333333" : "#e5e5e5",
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: isDark ? "#888888" : "#8e8e93",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "play";

          if (route.name === "Home") {
            iconName = focused ? "play" : "play-outline";
          } else if (route.name === "Challenges") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Gesture Clicker" }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{ title: "Challenges" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}
