import React from "react";
import { View, Text } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useGameGestures } from "../../hooks/useGameGestures";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ClickerObjectProps {
  onTapForCps?: () => void;
}

export default function ClickerObject({ onTapForCps }: ClickerObjectProps) {
  const { gesture, animatedValues } = useGameGestures(onTapForCps);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: animatedValues.translateX.value },
      { translateY: animatedValues.translateY.value },
      {
        scale: animatedValues.tapScale.value * animatedValues.pinchScale.value,
      },
      { rotateZ: `${animatedValues.rotation.value}deg` },
    ],
  }));

  return (
    <View className="flex-1 items-center justify-center w-full my-8">
      <GestureDetector gesture={gesture}>
        <Animated.View
          className="w-48 h-48 rounded-full bg-blue-500 items-center justify-center shadow-2xl elevation-xl"
          style={style}
        >
          <View className="w-40 h-40 rounded-full items-center justify-center">
            <MaterialIcons name="ads-click" size={64} color="white" />
            <Text className="text-white font-bold text-lg mt-2 tracking-widest text-center">
              Tap Me
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
