import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "./types";
import GamesList from "../screens/GamesList";
import GamesGallery from "../screens/GamesGallery";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Profile from '../screens/Profile';
const Tab = createBottomTabNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Tab.Navigator 
      initialRouteName="Home"       
      screenOptions={({ route }) => ({
        headerShown: true,
        animation: 'fade',
        headerStyle: {
        backgroundColor: "#1e1e2e",
    },
    headerTitleStyle: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 18,
    },
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#6c5ce7",
        tabBarInactiveTintColor: "#a0a0a0",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIcon: ({ focused, color, size }) => {
          const iconSize = focused ? 22 : 20;
          let iconName: React.ComponentProps<typeof Ionicons>["name"] = "ellipse";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Gallery") {            
            iconName = focused ? "image" : "image-outline";
          }
          else if (route.name === "Profile") {            
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={GamesList} />
      <Tab.Screen name="Gallery" component={GamesGallery} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#1e1e2e", 
    borderTopWidth: 0,
    height: 64, 
    paddingTop: 6,
    paddingBottom: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarItem: {
    paddingVertical: 0,
    margin: 0,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,    
    color: "#fff",
  },
});