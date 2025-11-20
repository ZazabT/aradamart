import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/users/login');
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#ff6b35" />
    </View>
  );
}
