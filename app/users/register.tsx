import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, error } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    const ok = register(name, email, password);
    if (!ok) return;

    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white px-6">
      
      {/* Centered Logo + Title */}
      <View className="mt-12 mb-12 items-center justify-center">
        <Image
          source={require('@/assets/images/arada.png')}
          style={{ width: 200, height: 200 }}
          className="rounded-3xl"
          resizeMode="contain"
        />

        <Text className="text-4xl font-bold text-gray-900 mt-8">Create Account</Text>
        <Text className="text-gray-500 text-base mt-2">Join AradaMart today</Text>
      </View>

      {/* Name Input */}
      <View className="mb-6">
        <View className="flex-row items-center mb-2">
          <Ionicons name="person" size={16} color="#6b7280" />
          <Text className="text-gray-700 font-semibold ml-2 text-sm">Full Name *</Text>
        </View>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#d1d5db"
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
        />
      </View>

      {/* Email Input */}
      <View className="mb-6">
        <View className="flex-row items-center mb-2">
          <Ionicons name="mail" size={16} color="#6b7280" />
          <Text className="text-gray-700 font-semibold ml-2 text-sm">Email Address *</Text>
        </View>
        <TextInput
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#d1d5db"
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
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
            placeholder="At least 6 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#d1d5db"
            className="flex-1 py-3 text-base"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="p-2"
          >
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

      {/* Register Button */}
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-orange-500 rounded-lg py-4 items-center mt-8 active:bg-orange-600 flex-row justify-center gap-2"
      >
        <Ionicons name="person-add" size={20} color="white" />
        <Text className="text-white font-bold text-base">Create Account</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => router.back()} className="py-5">
        <Text className="text-center text-gray-600 text-base">
          Already have an account?{' '}
          <Text className="text-orange-500 font-bold">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
