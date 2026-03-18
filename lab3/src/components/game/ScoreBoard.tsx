import React from "react";
import { View, Text } from "react-native";
import { useGameParams } from "../../context/GameContext";
import { useThemeParams } from "../../context/ThemeContext";

interface ScoreBoardProps {
  currentCps: number;
  cpsProgress: number;
  cpsRequiredMs: number;
  cpsCompleted: boolean;
}

export default function ScoreBoard({
  currentCps,
  cpsProgress,
  cpsRequiredMs,
  cpsCompleted,
}: ScoreBoardProps) {
  const { score } = useGameParams();
  const { theme } = useThemeParams();
  const isDark = theme === "dark";

  const progressPercent = Math.min((cpsProgress / cpsRequiredMs) * 100, 100);

  return (
    <View
      className={`w-11/12 p-6 rounded-3xl items-center shadow-lg ${isDark ? "bg-zinc-800" : "bg-white"}`}
    >
      <Text
        className={`text-sm uppercase tracking-wider font-semibold mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
      >
        РАХУНОК
      </Text>
      <Text className="text-6xl font-bold text-blue-500 mb-4">{score}</Text>

      <View className="w-full flex-row justify-between items-center px-2">
        <Text
          className={`font-medium ${isDark ? "text-gray-300" : "text-zinc-700"}`}
        >
          Темп (CPS):{" "}
          <Text className="font-bold text-blue-500">{currentCps}</Text>
        </Text>

        <View className="w-32">
          {cpsCompleted ? (
            <Text className="text-green-500 text-xs text-right font-bold uppercase">
              Завдання пройдено!
            </Text>
          ) : (
            <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-blue-500"
                style={{ width: `${progressPercent}%` }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
