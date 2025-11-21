import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminActivityTab from './activity/tab';
import AdminProductsTab from './products/tab';
import AdminUsersTab from './users/tab';

export default function AdminScreen() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'products' | 'users' | 'activity'>('products');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.replace('/auth/login');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']} className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white px-5 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
            <Text className="text-gray-500 text-xs mt-1">{currentUser.name}</Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="border border-orange-600 rounded-md p-2.5 active:bg-orange-50"
          >
            <Ionicons name="log-out" size={20} color="#ea580c" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {activeTab === 'products' && <AdminProductsTab />}
        {activeTab === 'users' && <AdminUsersTab />}
        {activeTab === 'activity' && <AdminActivityTab />}
      </View>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 flex-row mb-5">
        <TouchableOpacity
          onPress={() => setActiveTab('products')}
          className={`flex-1 py-3 items-center ${
            activeTab === 'products' ? 'border-t-2 border-orange-600' : 'border-t-2 border-transparent'
          }`}
        >
          <Text className={`font-medium text-md mt-1 ${activeTab === 'products' ? 'text-gray-900' : 'text-gray-500'}`}>
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('users')}
          className={`flex-1 py-3 items-center ${
            activeTab === 'users' ? 'border-t-2 border-orange-600' : 'border-t-2 border-transparent'
          }`}
        >
          <Text className={`font-medium text-md mt-1 ${activeTab === 'users' ? 'text-gray-900' : 'text-gray-500'}`}>
            Users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('activity')}
          className={`flex-1 py-3 items-center ${
            activeTab === 'activity' ? 'border-t-2 border-orange-600' : 'border-t-2 border-transparent'
          }`}
        >
          <Text className={`font-medium text-md mt-1 ${activeTab === 'activity' ? 'text-gray-900' : 'text-gray-500'}`}>
            Activity
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
