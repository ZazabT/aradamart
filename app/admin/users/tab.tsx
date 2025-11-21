import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useAdminUserStore } from '@/stores/adminUserStore';
import { useTransactionStore } from '@/stores/transactionStore';
import AdminUserForm from '@/components/admin/AdminUserForm';

export default function AdminUsersTab() {
  const { users, deleteUser } = useAdminUserStore();
  const { addActivity } = useTransactionStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
    <View className="flex-1 bg-gray-50">
      {/* Create Button */}
      <View className="bg-white px-5 py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="bg-blue-500 rounded-lg py-3 items-center shadow-md"
        >
          <Text className="text-white font-bold text-lg">+ Create User</Text>
        </TouchableOpacity>
      </View>

      {/* Users List */}
      {users.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">No users yet</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-4 mb-3 border border-gray-200 shadow-sm">
              {/* User Header */}
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                  <Text className="text-sm text-gray-600">{item.email}</Text>
                </View>
                <View className={`rounded-full px-3 py-1 ${item.role === 'admin' ? 'bg-red-100' : 'bg-blue-100'}`}>
                  <Text className={`text-xs font-bold ${item.role === 'admin' ? 'text-red-700' : 'text-blue-700'}`}>
                    {item.role === 'admin' ? '👑 ADMIN' : '👤 USER'}
                  </Text>
                </View>
              </View>

              {/* Info Section */}
              <View className="bg-gray-50 rounded-lg p-2 mb-3">
                <Text className="text-xs text-gray-600">
                  Created: <Text className="font-bold text-gray-800">{new Date(item.createdAt).toLocaleDateString()}</Text>
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleEdit(item.id)}
                  className="flex-1 bg-blue-500 rounded-lg py-2 items-center shadow-sm"
                >
                  <Text className="text-white font-semibold">✏️ Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id, item.name, item.email, item.role)}
                  className="flex-1 bg-red-500 rounded-lg py-2 items-center shadow-sm"
                >
                  <Text className="text-white font-semibold">🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
