import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConfirmModalProps {
  visible: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ visible, itemName, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
          <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="warning-outline" size={28} color="#ef4444" />
          </View>
          
          <Text className="text-xl font-bold text-slate-800 mb-2 tracking-tight">
            Підтвердження
          </Text>
          
          <Text className="text-slate-600 mb-8 text-base leading-tight font-medium">
            Ви дійсно хочете видалити «{itemName}»? Цю дію неможливо скасувати.
          </Text>

          <View className="flex-row justify-end gap-3">
            <TouchableOpacity 
              onPress={onClose}
              className="px-5 py-3 rounded-xl bg-slate-100"
            >
              <Text className="text-slate-600 font-bold text-sm tracking-tight">Скасувати</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleConfirm}
              className="px-6 py-3 rounded-xl bg-red-500 shadow-sm"
            >
              <Text className="text-white font-bold text-sm tracking-tight">Видалити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
