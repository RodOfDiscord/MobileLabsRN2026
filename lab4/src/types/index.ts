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
