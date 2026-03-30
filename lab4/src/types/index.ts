import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface FileItem {
  name: string;
  uri: string;
  isDirectory: boolean;
  size?: number;
  modificationTime?: number;
}

export interface MemoryInfo {
  total: number;
  free: number;
}

export type RootStackParamList = {
  Home: undefined;
  Editor: { uri: string; name: string };
  Details: { uri: string; name: string };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
export type EditorScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Editor"
>;
export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Details"
>;
