import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './index';
import EditorScreen from './editor';
import DetailsScreen from './details';

type RootStackParamList = {
  Home: undefined;
  Editor: { uri: string; name: string };
  Details: { uri: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#f8fafc' },
        headerTintColor: '#1e293b',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Менеджер файлів' }} 
      />
      <Stack.Screen 
        name="Editor" 
        component={EditorScreen} 
        options={{ title: 'Редактор' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ 
          title: 'Деталі',
          presentation: 'modal',
        }} 
      />
    </Stack.Navigator>
  );
}
