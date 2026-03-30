import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system/legacy";
import { useFileSystem } from "../hooks/useFileSystem";
import { formatBytes, formatDate } from "../utils";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  Home: undefined;
  Editor: { uri: string; name: string };
  Details: { uri: string; name: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route, navigation }: Props) {
  const { uri, name } = route.params;
  const { getFileInfo } = useFileSystem();

  const [info, setInfo] = useState<FileSystem.FileInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: "Деталі файлу" });
    loadInfo();
  }, [uri]);

  const loadInfo = async () => {
    setIsLoading(true);
    const result = await getFileInfo(uri);
    setInfo(result);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!info || !(info as any).exists) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 p-4">
        <Text className="text-xl text-slate-500 font-medium">
          Файл не знайдено
        </Text>
      </View>
    );
  }

  const extension = name.includes(".") ? name.split(".").pop() : "немає";
  const isDir = (info as any).isDirectory;
  const size = (info as any).size || 0;
  const modificationTime = (info as any).modificationTime || 0;
  const EmojiComponent = isDir ? (
    <Ionicons name="folder" size={48} color="#3b82f6" />
  ) : name.endsWith(".txt") ? (
    <Ionicons name="document-text" size={48} color="#3b82f6" />
  ) : (
    <Ionicons name="document" size={48} color="#94a3b8" />
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 p-4">
        <View className="bg-white rounded-3xl p-6 items-center shadow-sm border border-slate-100 mb-6 mt-4">
          <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-4 border border-blue-100">
            {EmojiComponent}
          </View>
          <Text className="text-2xl font-bold text-slate-800 text-center tracking-tight mb-1">
            {name}
          </Text>
          <Text className="text-slate-500 font-medium uppercase tracking-wider text-sm">
            {isDir ? "Папка" : "Файл"}
          </Text>
        </View>

        <View className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <View className="p-5 border-b border-slate-100 flex-row justify-between items-center">
            <Text className="text-slate-500 font-semibold text-sm">Тип</Text>
            <Text className="text-slate-800 font-bold text-base bg-slate-50 px-3 py-1 rounded-lg">
              {isDir ? "Директорія" : `.${extension}`}
            </Text>
          </View>

          <View className="p-5 border-b border-slate-100 flex-row justify-between items-center bg-slate-50/50">
            <Text className="text-slate-500 font-semibold text-sm">Розмір</Text>
            <Text className="text-slate-800 font-bold text-base">
              {isDir ? "—" : formatBytes(size)}
            </Text>
          </View>

          <View className="p-5 flex-row justify-between items-center">
            <Text className="text-slate-500 font-semibold text-sm">
              Змінено
            </Text>
            <Text className="text-slate-800 font-bold text-base">
              {formatDate(modificationTime)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
