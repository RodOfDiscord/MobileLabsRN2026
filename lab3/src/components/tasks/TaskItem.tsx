import React from "react";
import { View, Text } from "react-native";
import { Challenge } from "../../types";
import { useGameParams } from "../../context/GameContext";
import { useThemeParams } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface TaskItemProps {
  challenge: Challenge;
}

export default function TaskItem({ challenge }: TaskItemProps) {
  const { theme } = useThemeParams();
  const gameState = useGameParams();
  const isDark = theme === "dark";

  let currentProgress = 0;
  let isCompleted = false;

  switch (challenge.type) {
    case "tap_count":
      currentProgress = gameState.tapCount;
      isCompleted = currentProgress >= challenge.target;
      break;
    case "double_tap_count":
      currentProgress = gameState.doubleTapCount;
      isCompleted = currentProgress >= challenge.target;
      break;
    case "long_press":
      currentProgress = gameState.longPressActivated ? 1 : 0;
      isCompleted = gameState.longPressActivated;
      break;
    case "pan":
      currentProgress = gameState.panActivated ? 1 : 0;
      isCompleted = gameState.panActivated;
      break;
    case "fling_right":
      currentProgress = gameState.flingRightCount;
      isCompleted = currentProgress >= challenge.target;
      break;
    case "fling_left":
      currentProgress = gameState.flingLeftCount ? 1 : 0;
      isCompleted = gameState.flingLeftCount;
      break;
    case "pinch":
      currentProgress = gameState.pinchActivated ? 1 : 0;
      isCompleted = gameState.pinchActivated;
      break;
    case "score":
      currentProgress = gameState.score;
      isCompleted = currentProgress >= challenge.target;
      break;
    case "sustained_cps":
      currentProgress = gameState.sustainedCpsCompleted ? 1 : 0;
      isCompleted = gameState.sustainedCpsCompleted;
      break;
  }

  const displayProgress = Math.min(currentProgress, challenge.target);
  const isBooleanTarget =
    challenge.type === "long_press" ||
    challenge.type === "pan" ||
    challenge.type === "fling_left" ||
    challenge.type === "pinch" ||
    challenge.type === "sustained_cps";

  return (
    <View
      className={`p-4 mb-4 rounded-2xl flex-row items-center justify-between shadow-sm ${isCompleted ? (isDark ? "bg-green-900/30 border border-green-800" : "bg-green-50") : isDark ? "bg-zinc-800" : "bg-white"}`}
    >
      <View className="flex-1 mr-4">
        <Text
          className={`text-lg font-bold ${isDark ? "text-white" : "text-zinc-800"} ${isCompleted ? "line-through opacity-70" : ""}`}
        >
          {challenge.title}
        </Text>
        <Text
          className={`text-sm mt-1 mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {challenge.description}
        </Text>

        {!isCompleted && !isBooleanTarget && (
          <View className="mt-1 flex-row items-center">
            <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
              <View
                className={`h-full ${isDark ? "bg-blue-400" : "bg-blue-500"}`}
                style={{
                  width: `${(displayProgress / challenge.target) * 100}%`,
                }}
              />
            </View>
            <Text
              className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              {`${displayProgress}/${challenge.target}`}
            </Text>
          </View>
        )}
      </View>

      <View
        className={`w-8 h-8 rounded-full items-center justify-center ${isCompleted ? "bg-green-500" : isDark ? "bg-zinc-700" : "bg-gray-200 border border-gray-300"}`}
      >
        {isCompleted && <Ionicons name="checkmark" size={20} color="white" />}
      </View>
    </View>
  );
}
