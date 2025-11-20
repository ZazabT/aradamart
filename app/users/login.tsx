import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const ok = login(email, password);
    if (!ok) return;
    
    const user = useAuthStore.getState().currentUser;
    if (user?.role === 'admin') {
      router.replace('/admin');
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6 pb-12">
        <View className="mb-10">
          <View className="w-16 h-16 bg-orange-500 rounded-full items-center justify-center mb-4">
            <Ionicons name="storefront" size={32} color="white" />
          </View>
          <Text className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</Text>
          <Text className="text-gray-500 text-base">Sign in to AradaMart</Text>
        </View>

        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2.5 text-sm">Email Address</Text>
          <TextInput
            placeholder="admin@aradamart.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#d1d5db"
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
          />
        </View>

        <View className="mb-1">
          <Text className="text-gray-700 font-semibold mb-2.5 text-sm">Password</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl bg-gray-50 px-4">
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#d1d5db"
              className="flex-1 py-3.5 text-base"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>
        </View>

        {error && (
          <View className="bg-red-50 border border-red-300 rounded-xl p-3.5 mb-6 mt-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="alert-circle" size={18} color="#dc2626" />
              <Text className="text-red-700 text-sm font-medium flex-1">{error}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-orange-500 rounded-xl py-4 items-center mb-3 mt-6 active:bg-orange-600"
        >
          <Text className="text-white font-bold text-base">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/users/register')} className="py-3">
          <Text className="text-center text-gray-600 text-base">
            Don&apos;t have an account?{' '}
            <Text className="text-orange-500 font-bold">Create one</Text>
          </Text>
        </TouchableOpacity>

        <View className="mt-10 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="information-circle" size={18} color="#1e40af" />
            <Text className="text-blue-900 font-bold text-sm">Demo Accounts</Text>
          </View>
          <View className="gap-2.5 ml-6">
            <Text className="text-blue-800 text-xs leading-5">
              <Text className="font-semibold">Admin:</Text> admin@aradamart.com / admin123
            </Text>
            <Text className="text-blue-800 text-xs leading-5">
              <Text className="font-semibold">User:</Text> user@aradamart.com / user123
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
