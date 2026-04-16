import React, { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

function RouteGuard() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAppGroup = segments[0] === '(app)';

    if (!user && inAppGroup) {
      router.replace('/(auth)/login');
    } else if (user && !inAppGroup) {
      router.replace('/(app)');
    }
  }, [user, isLoading, segments, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RouteGuard />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
