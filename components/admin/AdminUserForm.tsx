import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAdminUserStore } from '@/stores/adminUserStore';
import { useTransactionStore } from '@/stores/transactionStore';

interface AdminUserFormProps {
  editingId?: string | null;
  onClose: () => void;
}

export default function AdminUserForm({ editingId, onClose }: AdminUserFormProps) {
  const { users, addUser, updateUser } = useAdminUserStore();
  const { addActivity } = useTransactionStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingId) {
      const user = users.find(u => u.id === editingId);
      if (user) {
        setEmail(user.email);
        setName(user.name);
        setPassword(user.password);
        setConfirmPassword(user.password);
        setRole(user.role);
      }
    }
  }, [editingId, users]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';

    if (!name.trim()) newErrors.name = 'Full name is required';

    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

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
        updateUser(editingId, email, name, password, role);
        addActivity('User Updated', 'user', `${name} (${email}) - ${role.toUpperCase()}`);
        Alert.alert('Success', 'User updated successfully');
      } else {
        addUser(email, name, password, role);
        addActivity('User Created', 'user', `${name} (${email}) - ${role.toUpperCase()}`);
        Alert.alert('Success', 'User created successfully');
      }
      onClose();
    } catch {
      Alert.alert('Error', 'Failed to save user');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-4 border-b border-gray-200 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-gray-900">{editingId ? 'Edit User' : 'Create User'}</Text>
          <Text className="text-sm text-gray-500 mt-1">{editingId ? 'Update user details and password' : 'Add a new user to the system'}</Text>
        </View>
        <TouchableOpacity onPress={onClose} className="p-2">
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View className="p-5">
        {/* Email */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="mail" size={16} color="#6b7280" />
            <Text className="text-gray-700 font-semibold ml-2">Email Address *</Text>
          </View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="user@example.com"
            placeholderTextColor="#d1d5db"
            keyboardType="email-address"
            editable={!editingId}
            className={`bg-gray-50 border rounded-md px-4 py-3 text-gray-900 ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="alert-circle" size={14} color="#ef4444" />
              <Text className="text-red-500 text-sm ml-1">{errors.email}</Text>
            </View>
          )}
        </View>

        {/* Full Name */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="person" size={16} color="#6b7280" />
            <Text className="text-gray-700 font-semibold ml-2">Full Name *</Text>
          </View>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            placeholderTextColor="#d1d5db"
            className={`bg-gray-50 border rounded-md px-4 py-3 text-gray-900 ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="alert-circle" size={14} color="#ef4444" />
              <Text className="text-red-500 text-sm ml-1">{errors.name}</Text>
            </View>
          )}
        </View>

        {/* Password */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="lock-closed" size={16} color="#6b7280" />
            <Text className="text-gray-700 font-semibold ml-2">Password *</Text>
          </View>
          <View className={`flex-row items-center bg-gray-50 border rounded-md px-4 ${
            errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="At least 6 characters"
              placeholderTextColor="#d1d5db"
              secureTextEntry={!showPassword}
              className="flex-1 py-3 text-gray-900"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="alert-circle" size={14} color="#ef4444" />
              <Text className="text-red-500 text-sm ml-1">{errors.password}</Text>
            </View>
          )}
        </View>

        {/* Confirm Password */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="lock-closed" size={16} color="#6b7280" />
            <Text className="text-gray-700 font-semibold ml-2">Confirm Password *</Text>
          </View>
          <View className={`flex-row items-center bg-gray-50 border rounded-md px-4 ${
            errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter password"
              placeholderTextColor="#d1d5db"
              secureTextEntry={!showConfirmPassword}
              className="flex-1 py-3 text-gray-900"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="p-2">
              <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="alert-circle" size={14} color="#ef4444" />
              <Text className="text-red-500 text-sm ml-1">{errors.confirmPassword}</Text>
            </View>
          )}
        </View>

        {/* Role Selection */}
        <View className="mb-8">
          <View className="flex-row items-center mb-3">
            <Ionicons name="shield" size={16} color="#6b7280" />
            <Text className="text-gray-700 font-semibold ml-2">User Role *</Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setRole('user')}
              className={`flex-1 rounded-md py-4 items-center border-2 flex-row justify-center gap-2 ${
                role === 'user' ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <Ionicons name="person-circle" size={18} color={role === 'user' ? '#2563eb' : '#9ca3af'} />
              <Text className={`font-semibold ${role === 'user' ? 'text-blue-700' : 'text-gray-700'}`}>
                User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRole('admin')}
              className={`flex-1 rounded-md py-4 items-center border-2 flex-row justify-center gap-2 ${
                role === 'admin' ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <Ionicons name="shield-checkmark" size={18} color={role === 'admin' ? '#dc2626' : '#9ca3af'} />
              <Text className={`font-semibold ${role === 'admin' ? 'text-red-700' : 'text-gray-700'}`}>
                Admin
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 mt-4 border-t border-gray-200 pt-6">
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 bg-gray-100 border border-gray-300 rounded-md py-3 items-center active:bg-gray-200"
          >
            <Text className="text-gray-700 font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            className="flex-1 bg-blue-600 rounded-md py-3 items-center active:bg-blue-700 flex-row justify-center gap-2"
          >
            <Ionicons name={editingId ? 'checkmark-done' : 'add-circle'} size={18} color="white" />
            <Text className="text-white font-semibold">{editingId ? 'Update User' : 'Create User'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
