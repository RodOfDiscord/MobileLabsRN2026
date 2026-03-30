import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface FileIconProps {
  isDirectory: boolean;
  name: string;
  size?: number;
}

export const FileIcon: React.FC<FileIconProps> = ({
  isDirectory,
  name,
  size = 28,
}) => {
  if (isDirectory)
    return <Ionicons name="folder" size={size} color="#3b82f6" />;
  if (name.endsWith(".txt"))
    return <Ionicons name="document-text" size={size} color="#3b82f6" />;
  return <Ionicons name="document" size={size} color="#94a3b8" />;
};
