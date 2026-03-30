import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BreadcrumbProps {
  currentPath: string;
  onNavigateUp: () => void;
  canNavigateUp: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPath, onNavigateUp, canNavigateUp }) => {
  return (
    <View className="flex-row items-center bg-slate-100 p-3 mb-3 rounded-xl border border-slate-200">
      {canNavigateUp && (
        <TouchableOpacity
          onPress={onNavigateUp}
          className="mr-3 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-sm"
        >
          <View className="flex-row items-center">
            <Ionicons name="arrow-up" size={16} color="#334155" />
            <Text className="text-slate-700 font-semibold text-sm ml-1">Вгору</Text>
          </View>
        </TouchableOpacity>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
        <Text className="text-slate-600 text-sm font-medium tracking-tight pr-4" numberOfLines={1}>
          {currentPath}
        </Text>
      </ScrollView>
    </View>
  );
};
