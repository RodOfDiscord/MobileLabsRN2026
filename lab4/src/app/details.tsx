import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFileSystem } from "../hooks/useFileSystem";
import { FileIcon } from "../components/FileIcon";
import { LoadingScreen } from "../components/LoadingScreen";
import { formatBytes, formatDate } from "../utils";
import { DetailsScreenProps } from "../types";

export default function DetailsScreen({ route }: DetailsScreenProps) {
  const { uri, name } = route.params;
  const insets = useSafeAreaInsets();
  const { getFileInfo } = useFileSystem();
  const [info, setInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFileInfo(uri).then((result) => {
      setInfo(result);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingScreen />;

  if (!info?.exists) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 p-4">
        <Text className="text-xl text-slate-500 font-medium">
          Файл не знайдено
        </Text>
      </View>
    );
  }

  const extension = name.includes(".") ? `.${name.split(".").pop()}` : "немає";
  const { isDirectory, size = 0, modificationTime = 0 } = info;

  return (
    <View
      className="flex-1 bg-slate-50"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView className="flex-1 p-4">
        <View className="bg-white rounded-3xl p-6 items-center shadow-sm border border-slate-100 mb-6 mt-4">
          <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-4 border border-blue-100">
            <FileIcon isDirectory={isDirectory} name={name} size={48} />
          </View>
          <Text className="text-2xl font-bold text-slate-800 text-center tracking-tight mb-1">
            {name}
          </Text>
          <Text className="text-slate-500 font-medium uppercase tracking-wider text-sm">
            {isDirectory ? "Папка" : "Файл"}
          </Text>
        </View>

        <View className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <Row label="Тип" value={isDirectory ? "Папка" : extension} />
          <Row
            label="Розмір"
            value={isDirectory ? "—" : formatBytes(size)}
            dimmed
          />
          <Row label="Змінено" value={formatDate(modificationTime)} last />
        </View>
      </ScrollView>
    </View>
  );
}

const Row = ({
  label,
  value,
  dimmed,
  last,
}: {
  label: string;
  value: string;
  dimmed?: boolean;
  last?: boolean;
}) => (
  <View
    className={`p-5 flex-row justify-between items-center ${!last ? "border-b border-slate-100" : ""} ${dimmed ? "bg-slate-50/50" : ""}`}
  >
    <Text className="text-slate-500 font-semibold text-sm">{label}</Text>
    <Text className="text-slate-800 font-bold text-base">{value}</Text>
  </View>
);
