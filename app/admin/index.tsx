import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import AdminProductsTab from './products/tab';
import AdminUsersTab from './users/tab';

export default function AdminScreen() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'products' | 'users'>('products');

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
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold">Admin Dashboard</Text>
            <Text className="text-gray-600 text-sm">Welcome, {currentUser.name}</Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 rounded-lg px-4 py-2"
          >
            <Text className="text-white font-semibold text-sm">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {activeTab === 'products' && <AdminProductsTab />}
        {activeTab === 'users' && <AdminUsersTab />}
      </View>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 flex-row">
        <TouchableOpacity
          onPress={() => setActiveTab('products')}
          className={`flex-1 py-4 items-center border-t-2 ${
            activeTab === 'products' ? 'border-orange-500 bg-orange-50' : 'border-transparent'
          }`}
        >
          <Text className={`font-semibold ${activeTab === 'products' ? 'text-orange-600' : 'text-gray-600'}`}>
            📦 Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('users')}
          className={`flex-1 py-4 items-center border-t-2 ${
            activeTab === 'users' ? 'border-blue-500 bg-blue-50' : 'border-transparent'
          }`}
        >
          <Text className={`font-semibold ${activeTab === 'users' ? 'text-blue-600' : 'text-gray-600'}`}>
            👥 Users
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
