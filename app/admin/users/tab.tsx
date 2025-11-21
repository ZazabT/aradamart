import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAdminUserStore } from '@/stores/adminUserStore';
import { useTransactionStore } from '@/stores/transactionStore';
import AdminUserForm from '@/components/admin/AdminUserForm';

export default function AdminUsersTab() {
  const { users, deleteUser } = useAdminUserStore();
  const { addActivity } = useTransactionStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;

  const handleDelete = (id: string, name: string, email: string, role: string) => {
    Alert.alert('Delete User', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => {
          deleteUser(id);
          addActivity('User Deleted', 'user', `${name} (${email}) - Role: ${role}`);
        },
        style: 'destructive',
      },
    ]);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  if (showForm) {
    return <AdminUserForm editingId={editingId} onClose={handleCloseForm} />;
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-900">Users</Text>
          <Text className="text-sm text-gray-500">{users.length} members</Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-2 mb-4">
          <View className="flex-1 bg-red-50 rounded-md p-3 items-center border border-red-100">
            <Text className="text-2xl font-bold text-red-600">{adminCount}</Text>
            <Text className="text-xs text-red-600 font-medium mt-1">Admins</Text>
          </View>
          <View className="flex-1 bg-blue-50 rounded-md p-3 items-center border border-blue-100">
            <Text className="text-2xl font-bold text-blue-600">{userCount}</Text>
            <Text className="text-xs text-blue-600 font-medium mt-1">Users</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 rounded-md px-3 mb-4 border border-gray-200">
          <Ionicons name="search" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search by name or email..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 py-2 px-2 text-sm text-gray-900"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="bg-blue-600 rounded-md py-3 items-center active:bg-blue-700"
        >
          <Text className="text-white font-semibold text-base">+ New User</Text>
        </TouchableOpacity>
      </View>

      {/* Users List */}
      {users.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-base">No users yet</Text>
        </View>
      ) : filteredUsers.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="search" size={48} color="#d1d5db" />
          <Text className="text-gray-400 text-base mt-3">No users found</Text>
          <Text className="text-gray-400 text-sm mt-1">Try a different search</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-4 mb-3 border border-gray-200 shadow-sm">
              {/* User Header with Avatar */}
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center flex-1 pr-3">
                  {/* Avatar */}
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${item.role === 'admin' ? 'bg-red-100' : 'bg-blue-100'}`}>
                    <Text className="text-lg font-bold">
                      {item.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
                    <Text className="text-xs text-gray-500 mt-1">{item.email}</Text>
                  </View>
                </View>
                <View className={`rounded-full px-3 py-1 ${item.role === 'admin' ? 'bg-red-100' : 'bg-blue-100'}`}>
                  <Text className={`text-xs font-bold ${item.role === 'admin' ? 'text-red-600' : 'text-blue-600'}`}>
                    {item.role === 'admin' ? '👑 ADMIN' : '👤 USER'}
                  </Text>
                </View>
              </View>

              {/* Role & Status Section */}
              <View className="bg-gray-50 rounded-md p-3 mb-4 border border-gray-100">
                <View className="flex-row items-center justify-between mb-3">
                  <View>
                    <Text className="text-xs text-gray-600 font-medium">Account Status</Text>
                    <View className="flex-row items-center gap-1 mt-1">
                      <View className={`w-2 h-2 rounded-full ${item.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`} />
                      <Text className="text-sm font-semibold text-gray-900">Active</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs text-gray-600 font-medium">Role</Text>
                    <Text className={`text-sm font-semibold mt-1 ${item.role === 'admin' ? 'text-red-600' : 'text-blue-600'}`}>
                      {item.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </Text>
                  </View>
                </View>
                <View className="border-t border-gray-200 pt-3 gap-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-gray-600 font-medium">📅 Joined</Text>
                    <Text className="text-xs text-gray-700 font-semibold">{new Date(item.createdAt).toLocaleDateString()}</Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-gray-600 font-medium">🔐 Password</Text>
                    <Text className="text-xs text-gray-700 font-mono bg-gray-200 px-2 py-1 rounded">••••••</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleEdit(item.id)}
                  className="flex-1 bg-white border border-blue-200 rounded-md py-2.5 items-center active:bg-blue-50 flex-row justify-center gap-1"
                >
                  <Ionicons name="pencil" size={16} color="#2563eb" />
                  <Text className="text-blue-600 font-semibold text-xs">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id, item.name, item.email, item.role)}
                  className="flex-1 bg-white border border-red-200 rounded-md py-2.5 items-center active:bg-red-50 flex-row justify-center gap-1"
                >
                  <Ionicons name="trash" size={16} color="#dc2626" />
                  <Text className="text-red-600 font-semibold text-xs">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
