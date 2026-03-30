import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFileSystem } from "../hooks/useFileSystem";
import { LoadingScreen } from "../components/LoadingScreen";
import { EditorScreenProps } from "../types";

export default function EditorScreen({ route, navigation }: EditorScreenProps) {
  const { uri, name } = route.params;
  const insets = useSafeAreaInsets();
  const { readFile, modifyFile } = useFileSystem();

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: name });
    readFile(uri).then((text) => {
      setContent(text);
      setIsLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await modifyFile(uri, content);
    setIsSaving(false);
    if (success) navigation.goBack();
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <View
      className="flex-1 bg-slate-50"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 p-4"
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
      >
        <TextInput
          value={content}
          onChangeText={setContent}
          className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 text-slate-800 text-base shadow-sm font-medium leading-relaxed"
          multiline
          textAlignVertical="top"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          className="mt-4 bg-blue-600 py-4 rounded-xl shadow-md items-center justify-center flex-row"
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.8}
        >
          {isSaving ? (
            <Text className="text-white font-bold text-base">Збереження…</Text>
          ) : (
            <View className="flex-row items-center">
              <Ionicons name="save-outline" size={20} color="white" />
              <Text className="text-white font-bold text-base tracking-wide ml-2">
                Зберегти
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
