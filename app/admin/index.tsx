import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function AdminScreen() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.replace('/users/login');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.replace('/users/login');
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      <Text className="text-3xl font-bold mb-2">Admin Dashboard</Text>
      <Text className="text-gray-600 mb-8">Welcome, {currentUser.name}</Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-orange-500 rounded-xl px-8 py-3"
      >
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
