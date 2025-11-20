import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

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
      
      {/* Centered Icon + Title */}
      <View className="mt-24 mb-12 items-center justify-center">
        <View className="w-20 h-20 bg-orange-500 rounded-full shadow-lg items-center justify-center">
          <Ionicons name="person-add" size={40} color="white" />
        </View>

        <Text className="text-4xl font-bold text-gray-900 mt-6">Create Account</Text>
        <Text className="text-gray-500 text-base mt-1">Join AradaMart today</Text>
      </View>

      {/* Name Input */}
      <View className="mb-6">
        <Text className="text-gray-700 font-semibold mb-2 text-sm">Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-50 shadow-sm"
        />
      </View>

      {/* Email Input */}
      <View className="mb-6">
        <Text className="text-gray-700 font-semibold mb-2 text-sm">Email Address</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-50 shadow-sm"
        />
      </View>

      {/* Password Input */}
      <View className="mb-2">
        <Text className="text-gray-700 font-semibold mb-2 text-sm">Password</Text>
        <View className="flex-row items-center border border-gray-300 rounded-xl bg-gray-50 px-4 shadow-sm">
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#9ca3af"
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
        <View className="bg-red-50 border border-red-300 rounded-xl p-3.5 my-5">
          <View className="flex-row items-center gap-2">
            <Ionicons name="alert-circle" size={18} color="#dc2626" />
            <Text className="text-red-700 text-sm font-medium flex-1">{error}</Text>
          </View>
        </View>
      )}

      {/* Register Button */}
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-orange-500 rounded-xl py-4 items-center mt-6 shadow-md active:bg-orange-600"
      >
        <Text className="text-white font-bold text-base">Create Account</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => router.back()} className="py-4">
        <Text className="text-center text-gray-600 text-base">
          Already have an account?{' '}
          <Text className="text-orange-500 font-bold">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
