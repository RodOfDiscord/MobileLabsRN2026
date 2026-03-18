import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useThemeParams } from "../context/ThemeContext";
import ScoreBoard from "../components/game/ScoreBoard";
import ClickerObject from "../components/game/ClickerObject";
import { useSustainedCps } from "../hooks/useSustainedCps";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { theme } = useThemeParams();
  const isDark = theme === "dark";

  const { registerTap, progress, currentCps, isCompleted, requiredMs } =
    useSustainedCps();

  const [modalVisible, setModalVisible] = useState(false);

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

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className={`absolute bottom-6 left-6 w-14 h-14 rounded-full items-center justify-center shadow-lg ${isDark ? "bg-zinc-800 border border-zinc-700" : "bg-white border border-gray-200"}`}
      >
        <Ionicons name="help" size={32} color={isDark ? "white" : "#3b82f6"} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/70 px-4">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            className="absolute inset-0"
          />

          <View
            className={`w-full p-6 rounded-3xl shadow-lg border ${isDark ? "bg-zinc-800 border-zinc-700/80" : "bg-gray-100 border-gray-300/80"}`}
          >
            <View className="flex-row justify-between items-center mb-6">
              <Text
                className={`text-xl font-bold ${isDark ? "text-white" : "text-zinc-800"}`}
              >
                Підказки по жестах
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className={`w-8 h-8 rounded-full items-center justify-center ${isDark ? "bg-zinc-700" : "bg-gray-100"}`}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>

            <View>
              {[
                { icon: "finger-print", label: "Тап: +1 бал" },
                { icon: "duplicate-outline", label: "Подвійний тап: +2 бали" },
                {
                  icon: "timer-outline",
                  label: "Довге натискання (3с): +5 балів",
                },
                {
                  icon: "swap-horizontal-outline",
                  label: "Свайп: +1…+10 балів (випадково)",
                },
                { icon: "resize-outline", label: "Зведення пальців: +3 бали" },
              ].map(({ icon, label }, index, arr) => (
                <View
                  key={icon}
                  className={`flex-row items-center ${index < arr.length - 1 ? "mb-4" : ""}`}
                >
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center mr-4 shadow-sm ${isDark ? "bg-zinc-700" : "bg-white border border-gray-200"}`}
                  >
                    <Ionicons
                      name={icon as any}
                      size={24}
                      color={isDark ? "#9ca3af" : "#4b5563"}
                    />
                  </View>
                  <Text
                    className={`text-base flex-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
