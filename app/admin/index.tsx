import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import AdminProductsTab from './products/tab';
import AdminUsersTab from './users/tab';
import AdminActivityTab from './activity/tab';

export default function AdminScreen() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'products' | 'users' | 'activity'>('products');

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
      <View className="bg-orange-500 px-5 py-5 border-b-2 border-orange-600">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-3xl font-bold text-white">Admin Dashboard</Text>
            <Text className="text-orange-100 text-sm mt-1">Welcome, {currentUser.name}</Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-600 rounded-lg px-4 py-2 shadow-lg"
          >
            <Text className="text-white font-bold text-sm">Logout</Text>
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
      <View className="bg-white border-t-2 border-gray-200 flex-row shadow-lg">
        <TouchableOpacity
          onPress={() => setActiveTab('products')}
          className={`flex-1 py-4 items-center ${
            activeTab === 'products' ? 'bg-orange-50' : 'bg-white'
          }`}
        >
          <Text className={`text-2xl mb-1 ${activeTab === 'products' ? 'opacity-100' : 'opacity-60'}`}>
            📦
          </Text>
          <Text className={`font-bold text-xs ${activeTab === 'products' ? 'text-orange-600' : 'text-gray-600'}`}>
            Products
          </Text>
          {activeTab === 'products' && <View className="w-8 h-1 bg-orange-500 rounded-full mt-1" />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('users')}
          className={`flex-1 py-4 items-center ${
            activeTab === 'users' ? 'bg-blue-50' : 'bg-white'
          }`}
        >
          <Text className={`text-2xl mb-1 ${activeTab === 'users' ? 'opacity-100' : 'opacity-60'}`}>
            👥
          </Text>
          <Text className={`font-bold text-xs ${activeTab === 'users' ? 'text-blue-600' : 'text-gray-600'}`}>
            Users
          </Text>
          {activeTab === 'users' && <View className="w-8 h-1 bg-blue-500 rounded-full mt-1" />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('activity')}
          className={`flex-1 py-4 items-center ${
            activeTab === 'activity' ? 'bg-purple-50' : 'bg-white'
          }`}
        >
          <Text className={`text-2xl mb-1 ${activeTab === 'activity' ? 'opacity-100' : 'opacity-60'}`}>
            📊
          </Text>
          <Text className={`font-bold text-xs ${activeTab === 'activity' ? 'text-purple-600' : 'text-gray-600'}`}>
            Activity
          </Text>
          {activeTab === 'activity' && <View className="w-8 h-1 bg-purple-500 rounded-full mt-1" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
