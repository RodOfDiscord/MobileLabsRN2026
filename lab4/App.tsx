import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootLayout from "./src/app/_layout";

export default function App() {
  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  );
}
