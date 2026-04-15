import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Каталог товарів', headerLargeTitle: true }} />
      <Stack.Screen name="details/[id]" options={{ title: 'Деталі', headerBackTitle: 'Назад' }} />
    </Stack>
  );
}
