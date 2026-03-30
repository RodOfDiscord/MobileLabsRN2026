import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface CreateModalProps {
  visible: boolean;
  mode: "file" | "folder";
  onClose: () => void;
  onCreate: (name: string, content?: string) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  visible,
  mode,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (visible) {
      setName("");
      setContent("");
    }
  }, [visible]);

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), mode === "file" ? content : undefined);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center bg-black/50 p-4"
      >
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
          <Text className="text-xl font-bold text-slate-800 mb-5 tracking-tight">
            Створити {mode === "folder" ? "папку" : "текстовий файл"}
          </Text>

          <View className="mb-4">
            <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Назва
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={mode === "folder" ? "Нова папка" : "документ.txt"}
              placeholderTextColor="#94a3b8"
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium"
              autoFocus
            />
          </View>

          {mode === "file" && (
            <View className="mb-6">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Вміст (необов'язково)
              </Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Текст файлу..."
                placeholderTextColor="#94a3b8"
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 h-28 font-medium"
                multiline
                textAlignVertical="top"
              />
            </View>
          )}

          <View className="flex-row justify-end mt-2 gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="px-5 py-3 rounded-xl bg-slate-100"
            >
              <Text className="text-slate-600 font-bold text-sm tracking-tight">
                Скасувати
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCreate}
              className={`px-6 py-3 rounded-xl shadow-sm ${name.trim() ? "bg-blue-600" : "bg-blue-300"}`}
              disabled={!name.trim()}
            >
              <Text className="text-white font-bold text-sm tracking-tight">
                Створити
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
