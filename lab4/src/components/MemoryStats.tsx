import React from 'react';
import { View, Text } from 'react-native';
import { formatBytes } from '../utils';
import { MemoryInfo } from '../types';

interface MemoryStatsProps {
  stats: MemoryInfo | null;
}

export const MemoryStats: React.FC<MemoryStatsProps> = ({ stats }) => {
  if (!stats) return null;

  const used = stats.total - stats.free;
  const usedPercentage = Math.min(100, Math.max(0, (used / stats.total) * 100));

  return (
    <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-4">
      <Text className="text-lg font-bold text-slate-800 mb-3 tracking-tight">Внутрішня пам'ять</Text>
      
      <View className="h-2.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
        <View 
          className="h-full bg-blue-500 rounded-full" 
          style={{ width: `${usedPercentage}%` }} 
        />
      </View>

      <View className="flex-row justify-between mb-3">
        <View>
          <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Використано</Text>
          <Text className="text-base font-bold text-slate-700">{formatBytes(used)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Всього</Text>
          <Text className="text-base font-bold text-slate-700">{formatBytes(stats.total)}</Text>
        </View>
      </View>
      
      <View className="pt-3 border-t border-slate-100 flex-row justify-between items-center">
        <Text className="text-sm font-medium text-slate-500">Доступно</Text>
        <Text className="text-sm font-bold text-emerald-600">{formatBytes(stats.free)}</Text>
      </View>
    </View>
  );
};
