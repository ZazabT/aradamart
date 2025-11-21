import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="products" />
        <Stack.Screen name="users" />
        <Stack.Screen name="activity" />
      </Stack>
    </SafeAreaView>
  );
}
