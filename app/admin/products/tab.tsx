import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { useInventoryStore } from '@/stores/inventoryStore';
import AdminProductForm from '@/components/admin/AdminProductForm';

export default function AdminProductsTab() {
  const { products, deleteProduct } = useInventoryStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Product', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => deleteProduct(id),
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
    return <AdminProductForm editingId={editingId} onClose={handleCloseForm} />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Create Button */}
      <View className="bg-white px-5 py-3 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="bg-orange-500 rounded-lg py-3 items-center"
        >
          <Text className="text-white font-bold text-lg">+ Create Product</Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      {products.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">No products yet</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
              {/* Product Header */}
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                  <Text className="text-sm text-gray-600">SKU: {item.sku}</Text>
                </View>
                <View className="bg-orange-100 rounded-lg px-3 py-1">
                  <Text className="text-orange-700 font-bold">${item.price.toFixed(2)}</Text>
                </View>
              </View>

              {/* Stock Info */}
              <View className="flex-row items-center mb-3">
                <View className={`flex-1 rounded-lg p-2 ${item.quantity > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Text className={`text-sm font-semibold ${item.quantity > 0 ? 'text-green-700' : 'text-red-700'}`}>
                    Stock: {item.quantity}
                  </Text>
                </View>
                <Text className="text-xs text-gray-500 ml-2">
                  Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleEdit(item.id)}
                  className="flex-1 bg-blue-500 rounded-lg py-2 items-center"
                >
                  <Text className="text-white font-semibold">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id, item.name)}
                  className="flex-1 bg-red-500 rounded-lg py-2 items-center"
                >
                  <Text className="text-white font-semibold">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
