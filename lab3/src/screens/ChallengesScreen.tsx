import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useThemeParams } from '../context/ThemeContext';
import { CHALLENGES } from '../constants/taskDefinitions';
import TaskItem from '../components/tasks/TaskItem';

export default function ChallengesScreen() {
  const { theme } = useThemeParams();
  const isDark = theme === 'dark';

  return (
    <View className={`flex-1 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]'}`}>
      <FlatList
        data={CHALLENGES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <TaskItem challenge={item} />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-6">
            <Text className={`${isDark ? 'text-white' : 'text-zinc-800'}`}>Завдання відсутні</Text>
          </View>
        }
      />
    </View>
  );
}
