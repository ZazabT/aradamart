import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAdminUserStore } from '@/stores/adminUserStore';

interface AdminUserFormProps {
  editingId?: string | null;
  onClose: () => void;
}

export default function AdminUserForm({ editingId, onClose }: AdminUserFormProps) {
  const { users, addUser, updateUser } = useAdminUserStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingId) {
      const user = users.find(u => u.id === editingId);
      if (user) {
        setEmail(user.email);
        setName(user.name);
        setRole(user.role);
      }
    }
  }, [editingId, users]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';

    if (!name.trim()) newErrors.name = 'Full name is required';

    // Check for duplicate email (excluding current user if editing)
    if (users.some(u => u.email === email.toLowerCase() && u.id !== editingId)) {
      newErrors.email = 'Email already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    try {
      if (editingId) {
        updateUser(editingId, email, name, role);
        Alert.alert('Success', 'User updated successfully');
      } else {
        addUser(email, name, role);
        Alert.alert('Success', 'User created successfully');
      }
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save user');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 py-4 border-b border-gray-200 flex-row justify-between items-center">
        <Text className="text-xl font-bold">{editingId ? 'Edit User' : 'Create User'}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-gray-600 text-lg">✕</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View className="p-5">
        {/* Email */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Email *</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="e.g., user@example.com"
            keyboardType="email-address"
            className="bg-white border border-gray-300 rounded-lg px-4 py-3"
            editable={!editingId}
          />
          {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>}
        </View>

        {/* Full Name */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Full Name *</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g., John Doe"
            className="bg-white border border-gray-300 rounded-lg px-4 py-3"
          />
          {errors.name && <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>}
        </View>

        {/* Role Selection */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-3">Role *</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setRole('user')}
              className={`flex-1 rounded-lg py-3 items-center border-2 ${
                role === 'user' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
              }`}
            >
              <Text className={`font-semibold ${role === 'user' ? 'text-blue-700' : 'text-gray-700'}`}>
                User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRole('admin')}
              className={`flex-1 rounded-lg py-3 items-center border-2 ${
                role === 'admin' ? 'bg-red-100 border-red-500' : 'bg-white border-gray-300'
              }`}
            >
              <Text className={`font-semibold ${role === 'admin' ? 'text-red-700' : 'text-gray-700'}`}>
                Admin
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 mt-8">
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 bg-gray-300 rounded-lg py-3 items-center"
          >
            <Text className="text-gray-700 font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            className="flex-1 bg-blue-500 rounded-lg py-3 items-center"
          >
            <Text className="text-white font-semibold">{editingId ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
