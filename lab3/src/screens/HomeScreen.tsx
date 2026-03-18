import React from "react";
import { View, Text } from "react-native";
import { useThemeParams } from "../context/ThemeContext";
import ScoreBoard from "../components/game/ScoreBoard";
import ClickerObject from "../components/game/ClickerObject";
import { useSustainedCps } from "../hooks/useSustainedCps";

export default function HomeScreen() {
  const { theme } = useThemeParams();
  const isDark = theme === "dark";

  const { registerTap, progress, currentCps, isCompleted, requiredMs } =
    useSustainedCps();

  return (
    <View
      className={`flex-1 items-center justify-between py-10 ${isDark ? "bg-[#1a1a1a]" : "bg-[#f5f5f5]"}`}
    >
      <ScoreBoard
        currentCps={currentCps}
        cpsProgress={progress}
        cpsRequiredMs={requiredMs}
        cpsCompleted={isCompleted}
      />

      <ClickerObject onTapForCps={registerTap} />

      <View
        className={`w-11/12 p-4 rounded-2xl shadow-sm ${isDark ? "bg-zinc-800" : "bg-white"}`}
      >
        <Text
          className={`text-base font-semibold mb-2 ${isDark ? "text-white" : "text-zinc-800"}`}
        >
          Підказки по жестах:
        </Text>
        <Text
          className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          👆 Тап: +1 бал
        </Text>
        <Text
          className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          ✌️ Подвійний тап: +2 бали
        </Text>
        <Text
          className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          ⏱ Довге натискання (3с): +5 балів
        </Text>
        <Text
          className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          ✋ Свайп: +1…+10 балів (випадково)
        </Text>
        <Text
          className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          🤏 Зведення пальців: +3 бали
        </Text>
      </View>
    </View>
  );
}
