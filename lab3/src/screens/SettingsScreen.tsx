import React from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { useGameParams } from '../context/GameContext';
import { useThemeParams } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeParams();
  const { resetProgress } = useGameParams();
  const isDark = theme === 'dark';

  const handleReset = () => {
    Alert.alert(
      "Скинути прогрес?",
      "Ви впевнені, що хочете видалити всі бали та прогрес завдань?",
      [
        {
          text: "Скасувати",
          style: "cancel"
        },
        { 
          text: "Скинути", 
          onPress: resetProgress,
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View className={`flex-1 p-6 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]'}`}>
      <View className={`p-4 rounded-xl mb-6 flex-row items-center justify-between shadow-sm ${isDark ? 'bg-zinc-800' : 'bg-white'}`}>
        <View>
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-zinc-800'}`}>Темна тема</Text>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Перемикання вигляду застосунку</Text>
        </View>
        <Switch 
          value={isDark} 
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#3b82f6' }}
          thumbColor={isDark ? '#fff' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity 
        onPress={handleReset}
        className="bg-red-500 p-4 rounded-xl items-center shadow-sm"
      >
        <Text className="text-white text-lg font-bold">Очистити прогрес</Text>
      </TouchableOpacity>
    </View>
  );
}
