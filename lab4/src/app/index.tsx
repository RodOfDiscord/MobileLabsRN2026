import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as FileSystem from "expo-file-system/legacy";
import { Ionicons } from "@expo/vector-icons";

import { useFileSystem } from "../hooks/useFileSystem";
import { MemoryStats } from "../components/MemoryStats";
import { Breadcrumb } from "../components/Breadcrumb";
import { FileItem } from "../components/FileItem";
import { CreateModal } from "../components/CreateModal";
import { ConfirmModal } from "../components/ConfirmModal";
import { FileItem as IFileItem, MemoryInfo, HomeScreenProps } from "../types";
import { LoadingScreen } from "../components/LoadingScreen";

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const {
    getMemoryStats,
    readDirectory,
    createFolder,
    createFile,
    deleteItem,
  } = useFileSystem();
  const insets = useSafeAreaInsets();
  const [memoryStats, setMemoryStats] = useState<MemoryInfo | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(
    (FileSystem as any).documentDirectory || "",
  );
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const [fileList, setFileList] = useState<IFileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modals state
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createMode, setCreateMode] = useState<"file" | "folder">("folder");

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<IFileItem | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    const stats = await getMemoryStats();
    setMemoryStats(stats);

    const items = await readDirectory(currentPath);
    setFileList(items);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentPath) {
      loadData();
    }
  }, [currentPath]);

  React.useEffect(() => {
    // Refresh when returning to this screen
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation, currentPath]);

  const handleNavigateUp = () => {
    if (pathHistory.length === 0) return;
    const newHistory = [...pathHistory];
    const parent = newHistory.pop();
    setPathHistory(newHistory);
    if (parent) setCurrentPath(parent);
  };

  const handleItemPress = (item: IFileItem) => {
    if (item.isDirectory) {
      setPathHistory([...pathHistory, currentPath]);
      setCurrentPath(item.uri);
    } else if (item.name.endsWith(".txt")) {
      navigation.navigate("Editor", { uri: item.uri, name: item.name });
    }
  };

  const handleInfoPress = (item: IFileItem) => {
    navigation.navigate("Details", { uri: item.uri, name: item.name });
  };

  const handleDeletePress = (item: IFileItem) => {
    setItemToDelete(item);
    setConfirmModalVisible(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      setConfirmModalVisible(false);
      setIsLoading(true);
      const success = await deleteItem(itemToDelete.uri);
      if (success) {
        await loadData();
      } else {
        setIsLoading(false);
      }
      setItemToDelete(null);
    }
  };

  const openCreateModal = (mode: "file" | "folder") => {
    setCreateMode(mode);
    setCreateModalVisible(true);
  };

  const handleCreate = async (name: string, content?: string) => {
    setIsLoading(true);
    let success = false;
    if (createMode === "folder") {
      success = await createFolder(currentPath, name);
    } else {
      success = await createFile(currentPath, name, content);
    }

    if (success) {
      await loadData();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View
      className="flex-1 p-4"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <MemoryStats stats={memoryStats} />

      <Breadcrumb
        currentPath={currentPath}
        canNavigateUp={pathHistory.length > 0}
        onNavigateUp={handleNavigateUp}
      />

      <View className="flex-row gap-3 mb-4 mt-2">
        <TouchableOpacity
          className="flex-1 bg-emerald-500 py-3.5 rounded-xl shadow-sm items-center flex-row justify-center"
          onPress={() => openCreateModal("folder")}
          activeOpacity={0.8}
        >
          <Ionicons name="folder-outline" size={18} color="white" />
          <Text className="text-white font-bold text-sm tracking-tight ml-2">
            Нова папка
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-blue-500 py-3.5 rounded-xl shadow-sm items-center flex-row justify-center"
          onPress={() => openCreateModal("file")}
          activeOpacity={0.8}
        >
          <Ionicons name="document-text-outline" size={18} color="white" />
          <Text className="text-white font-bold text-sm tracking-tight ml-2">
            Новий файл
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <LoadingScreen />
      ) : fileList.length === 0 ? (
        <View
          key="empty"
          className="flex-1 justify-center items-center bg-white rounded-2xl border border-slate-200 border-dashed mt-2 will-change-variable"
        >
          <Ionicons
            name="folder-open-outline"
            size={48}
            color="#cbd5e1"
            className="mb-4"
          />
          <Text className="text-slate-400 font-medium">Папка порожня</Text>
        </View>
      ) : (
        <FlatList
          key="list"
          data={fileList}
          keyExtractor={(item) => item.uri}
          renderItem={({ item }) => (
            <FileItem
              item={item}
              onPress={handleItemPress}
              onDelete={handleDeletePress}
              onInfo={handleInfoPress}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
        />
      )}

      <CreateModal
        visible={createModalVisible}
        mode={createMode}
        onClose={() => setCreateModalVisible(false)}
        onCreate={handleCreate}
      />

      <ConfirmModal
        visible={confirmModalVisible}
        itemName={itemToDelete?.name || ""}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={confirmDelete}
      />
    </View>
  );
}
