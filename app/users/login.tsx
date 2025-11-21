import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    <View className="flex-1 bg-white px-6">
      {/* Top Logo Section */}
      <View className="mt-12 mb-12 items-center justify-center">
        <Image
          source={require('@/assets/images/arada.png')}
          style={{ width: 200, height: 200 }}
          className="rounded-3xl"
          resizeMode="contain"
        />

        <Text className="text-4xl font-bold text-gray-900 mt-8">Welcome Back</Text>
        <Text className="text-gray-500 text-base mt-2">Sign in to AradaMart</Text>
      </View>

      {/* Email Input */}
      <View className="mb-6">
        <View className="flex-row items-center mb-2">
          <Ionicons name="mail" size={16} color="#6b7280" />
          <Text className="text-gray-700 font-semibold ml-2 text-sm">Email Address *</Text>
        </View>
        <TextInput
          placeholder="admin@aradamart.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#d1d5db"
          className="border border-gray-300 rounded-lg px-4 py-3"
        />
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <View className="flex-row items-center mb-2">
          <Ionicons name="lock-closed" size={16} color="#6b7280" />
          <Text className="text-gray-700 font-semibold ml-2 text-sm">Password *</Text>
        </View>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4">
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#d1d5db"
            className="flex-1 py-3 text-base"
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

      {/* Error Box */}
      {error && (
        <View className="bg-red-50 border border-red-300 rounded-lg p-3.5 my-5">
          <View className="flex-row items-center gap-2">
            <Ionicons name="alert-circle" size={18} color="#dc2626" />
            <Text className="text-red-700 text-sm font-medium flex-1">{error}</Text>
          </View>
        </View>
      )}

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-orange-500 rounded-lg py-4 items-center mt-8 active:bg-orange-600 flex-row justify-center gap-2"
      >
        <Ionicons name="log-in" size={20} color="white" />
        <Text className="text-white font-bold text-base">Sign In</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => router.push('/users/register')} className="py-5">
        <Text className="text-center text-gray-600 text-base">
          Don&apos;t have an account?{' '}
          <Text className="text-orange-500 font-bold">Create one</Text>
        </Text>
      </TouchableOpacity>

      {/* Demo Accounts Box */}
      <View className="mt-10 p-5 bg-orange-50 border border-orange-200 rounded-lg">
        <View className="flex-row items-center gap-2 mb-3">
          <Ionicons name="information-circle" size={20} color="#ea580c" />
          <Text className="text-orange-900 font-bold text-sm">Demo Accounts</Text>
        </View>
        <View className="gap-2 ml-6">
          <Text className="text-orange-800 text-xs leading-5">
            <Text className="font-semibold text-orange-900">Admin:</Text> admin@aradamart.com / admin123
          </Text>
          <Text className="text-orange-800 text-xs leading-5">
            <Text className="font-semibold text-orange-900">User:</Text> user@aradamart.com / user123
          </Text>
        </View>
      </View>
    </View>
  );
}
