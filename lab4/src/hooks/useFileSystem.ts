import * as FileSystem from "expo-file-system/legacy";
import { useCallback } from "react";
import { FileItem, MemoryInfo } from "../types";

export const useFileSystem = () => {
  const getMemoryStats = useCallback(async (): Promise<MemoryInfo> => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      return { free, total };
    } catch (e) {
      console.error("Error getting memory stats", e);
      return { free: 0, total: 0 };
    }
  }, []);

  const readDirectory = useCallback(
    async (uri: string): Promise<FileItem[]> => {
      try {
        const files = await FileSystem.readDirectoryAsync(uri);
        const fileItems: FileItem[] = [];

        for (const file of files) {
          const fileUri = `${uri}${uri.endsWith("/") ? "" : "/"}${file}`;
          const info = await FileSystem.getInfoAsync(fileUri);

          fileItems.push({
            name: file,
            uri: fileUri,
            isDirectory: info.exists ? info.isDirectory : false,
            size: info.exists ? info.size : undefined,
            modificationTime: info.exists ? info.modificationTime : undefined,
          });
        }

        // Sort: folders first, then alphabetical
        return fileItems.sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1;
          if (!a.isDirectory && b.isDirectory) return 1;
          return a.name.localeCompare(b.name);
        });
      } catch (e) {
        console.error("Error reading directory", e);
        return [];
      }
    },
    [],
  );

  const createFolder = useCallback(
    async (parentUri: string, folderName: string) => {
      try {
        const newUri = `${parentUri}${parentUri.endsWith("/") ? "" : "/"}${folderName}`;
        await FileSystem.makeDirectoryAsync(newUri, { intermediates: true });
        return true;
      } catch (e) {
        console.error("Error creating folder", e);
        return false;
      }
    },
    [],
  );

  const createFile = useCallback(
    async (parentUri: string, fileName: string, content: string = "") => {
      try {
        const nameWithExt = fileName.endsWith(".txt")
          ? fileName
          : `${fileName}.txt`;
        const newUri = `${parentUri}${parentUri.endsWith("/") ? "" : "/"}${nameWithExt}`;
        await FileSystem.writeAsStringAsync(newUri, content);
        return true;
      } catch (e) {
        console.error("Error creating file", e);
        return false;
      }
    },
    [],
  );

  const readFile = useCallback(async (uri: string): Promise<string> => {
    try {
      return await FileSystem.readAsStringAsync(uri);
    } catch (e) {
      console.error("Error reading file", e);
      return "";
    }
  }, []);

  const modifyFile = useCallback(async (uri: string, content: string) => {
    try {
      await FileSystem.writeAsStringAsync(uri, content);
      return true;
    } catch (e) {
      console.error("Error modifying file", e);
      return false;
    }
  }, []);

  const deleteItem = useCallback(async (uri: string) => {
    try {
      await FileSystem.deleteAsync(uri, { idempotent: true });
      return true;
    } catch (e) {
      console.error("Error deleting item", e);
      return false;
    }
  }, []);

  const getFileInfo = useCallback(async (uri: string) => {
    try {
      return await FileSystem.getInfoAsync(uri);
    } catch (e) {
      console.error("Error getting file info", e);
      return null;
    }
  }, []);

  return {
    getMemoryStats,
    readDirectory,
    createFolder,
    createFile,
    readFile,
    modifyFile,
    deleteItem,
    getFileInfo,
  };
};
