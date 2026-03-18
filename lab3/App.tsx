import "./global.css";
import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "./src/navigation/RootNavigator";
import { GameProvider } from "./src/context/GameContext";
import { ThemeProvider, useThemeParams } from "./src/context/ThemeContext";

function AppContent() {
  const { theme } = useThemeParams();
  const isDark = theme === "dark";

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
