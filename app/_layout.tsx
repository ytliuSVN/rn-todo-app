import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to lock screen on app start
    router.replace('/(modal)/lock');
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name='(modal)/lock'
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
