import React from "react";
import { View, ActivityIndicator } from "react-native";

export const LoadingScreen = () => (
  <View className="flex-1 justify-center items-center bg-slate-50">
    <ActivityIndicator size="large" color="#3b82f6" />
  </View>
);
