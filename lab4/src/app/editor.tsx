import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFileSystem } from "../hooks/useFileSystem";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  Home: undefined;
  Editor: { uri: string; name: string };
  Details: { uri: string; name: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Editor">;

export default function EditorScreen({ route, navigation }: Props) {
  const { uri, name } = route.params;
  const { readFile, modifyFile } = useFileSystem();

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: name });
    loadContent();
  }, [uri, name]);

  const loadContent = async () => {
    setIsLoading(true);
    const text = await readFile(uri);
    setContent(text);
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await modifyFile(uri, content);
    setIsSaving(false);
    if (success) {
      navigation.goBack();
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
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
            <ActivityIndicator color="#ffffff" className="mr-2" />
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
    </SafeAreaView>
  );
}
