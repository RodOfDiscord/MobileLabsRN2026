import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FileItem as IFileItem } from "../types";
import { FileIcon } from "./FileIcon";
import { formatBytes } from "../utils";

interface FileItemProps {
  item: IFileItem;
  onPress: (item: IFileItem) => void;
  onDelete: (item: IFileItem) => void;
  onInfo: (item: IFileItem) => void;
}

export const FileItem: React.FC<FileItemProps> = ({
  item,
  onPress,
  onDelete,
  onInfo,
}) => (
  <TouchableOpacity
    className="flex-row items-center p-3.5 mb-2 bg-white rounded-xl border border-slate-200 shadow-sm"
    onPress={() => onPress(item)}
    activeOpacity={0.7}
  >
    <View className="w-12 h-12 bg-slate-50 rounded-xl items-center justify-center mr-4 border border-slate-100">
      <FileIcon isDirectory={item.isDirectory} name={item.name} />
    </View>

    <View className="flex-1 justify-center">
      <Text
        className="text-slate-800 font-semibold text-base tracking-tight mb-0.5"
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text className="text-slate-400 text-xs font-medium">
        {item.isDirectory
          ? "Папка"
          : item.size
            ? formatBytes(item.size)
            : "Файл"}
      </Text>
    </View>

    <View className="flex-row gap-2 ml-2">
      <TouchableOpacity
        className="w-10 h-10 items-center justify-center bg-blue-50 rounded-full"
        onPress={() => onInfo(item)}
      >
        <Ionicons name="information-circle-outline" size={22} color="#3b82f6" />
      </TouchableOpacity>
      <TouchableOpacity
        className="w-10 h-10 items-center justify-center bg-red-50 rounded-full"
        onPress={() => onDelete(item)}
      >
        <Ionicons name="trash-outline" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
