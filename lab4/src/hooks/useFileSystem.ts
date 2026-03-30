import * as FileSystem from "expo-file-system/legacy";
import { FileItem, MemoryInfo } from "../types";

// useCallback з [] тут нічого не дає — функції не залежать від стану компонента
const joinPath = (base: string, name: string) =>
  `${base}${base.endsWith("/") ? "" : "/"}${name}`;

export const useFileSystem = () => {
  const getMemoryStats = async (): Promise<MemoryInfo> => {
    try {
      const [free, total] = await Promise.all([
        FileSystem.getFreeDiskStorageAsync(),
        FileSystem.getTotalDiskCapacityAsync(),
      ]);
      return { free, total };
    } catch (e) {
      console.error("Error getting memory stats", e);
      return { free: 0, total: 0 };
    }
  };

  const readDirectory = async (uri: string): Promise<FileItem[]> => {
    try {
      const files = await FileSystem.readDirectoryAsync(uri);
      const fileItems = await Promise.all(
        files.map(async (file) => {
          const fileUri = joinPath(uri, file);
          const info = await FileSystem.getInfoAsync(fileUri);
          return {
            name: file,
            uri: fileUri,
            isDirectory: info.exists ? info.isDirectory : false,
            size: info.exists ? info.size : undefined,
            modificationTime: info.exists ? info.modificationTime : undefined,
          };
        }),
      );
      return fileItems.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    } catch (e) {
      console.error("Error reading directory", e);
      return [];
    }
  };

  const createFolder = async (parentUri: string, folderName: string) => {
    try {
      await FileSystem.makeDirectoryAsync(joinPath(parentUri, folderName), {
        intermediates: true,
      });
      return true;
    } catch (e) {
      console.error("Error creating folder", e);
      return false;
    }
  };

  const createFile = async (
    parentUri: string,
    fileName: string,
    content = "",
  ) => {
    try {
      const nameWithExt = fileName.endsWith(".txt")
        ? fileName
        : `${fileName}.txt`;
      await FileSystem.writeAsStringAsync(
        joinPath(parentUri, nameWithExt),
        content,
      );
      return true;
    } catch (e) {
      console.error("Error creating file", e);
      return false;
    }
  };

  const readFile = async (uri: string): Promise<string> => {
    try {
      return await FileSystem.readAsStringAsync(uri);
    } catch (e) {
      console.error("Error reading file", e);
      return "";
    }
  };

  const modifyFile = async (uri: string, content: string) => {
    try {
      await FileSystem.writeAsStringAsync(uri, content);
      return true;
    } catch (e) {
      console.error("Error modifying file", e);
      return false;
    }
  };

  const deleteItem = async (uri: string) => {
    try {
      await FileSystem.deleteAsync(uri, { idempotent: true });
      return true;
    } catch (e) {
      console.error("Error deleting item", e);
      return false;
    }
  };

  const getFileInfo = async (uri: string) => {
    try {
      return await FileSystem.getInfoAsync(uri);
    } catch (e) {
      console.error("Error getting file info", e);
      return null;
    }
  };

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
