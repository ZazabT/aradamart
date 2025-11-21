import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useInventoryStore } from '@/stores/inventoryStore';
import { useTransactionStore } from '@/stores/transactionStore';
import AdminProductForm from '@/components/admin/AdminProductForm';

export default function AdminProductsTab() {
  const { products, deleteProduct, adjustStock } = useInventoryStore();
  const { addActivity } = useTransactionStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = (id: string, name: string, sku: string) => {
    Alert.alert('Delete Product', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => {
          deleteProduct(id);
          addActivity('Product Deleted', 'product', `${name} (SKU: ${sku})`);
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

  const handleAdjustStock = (id: string, name: string, adjustment: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const newQuantity = product.quantity + adjustment;
    if (newQuantity < 0) {
      Alert.alert('Error', 'Stock cannot be negative');
      return;
    }

    adjustStock(id, adjustment);
    const action = adjustment > 0 ? 'Stock Increased' : 'Stock Decreased';
    addActivity(action, 'stock', `${name} (SKU: ${product.sku}) - New stock: ${newQuantity}`);
  };

  if (showForm) {
    return <AdminProductForm editingId={editingId} onClose={handleCloseForm} />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Create Button */}
      <View className="bg-white px-5 py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="bg-orange-500 rounded-lg py-3 items-center shadow-md"
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
            <View className="bg-white rounded-lg p-4 mb-3 border border-gray-200 shadow-sm">
              {/* Product Header */}
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                  <Text className="text-sm text-gray-600">SKU: {item.sku}</Text>
                </View>
                <View className="bg-orange-100 rounded-lg px-3 py-1 border border-orange-200">
                  <Text className="text-orange-700 font-bold">${item.price.toFixed(2)}</Text>
                </View>
              </View>

              {/* Stock Info with Adjustment Buttons */}
              <View className="mb-3">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-sm font-semibold text-gray-700">Stock Management</Text>
                  <Text className="text-xs text-gray-500">
                    Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className={`flex-1 rounded-lg p-3 ${item.quantity > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Text className={`text-center font-bold text-lg ${item.quantity > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {item.quantity} units
                    </Text>
                  </View>
                  {/* Stock Adjustment Buttons */}
                  <TouchableOpacity
                    onPress={() => handleAdjustStock(item.id, item.name, -1)}
                    className="bg-red-500 rounded-lg px-3 py-3 items-center justify-center shadow-sm active:bg-red-600"
                  >
                    <Text className="text-white font-bold text-lg">−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleAdjustStock(item.id, item.name, 1)}
                    className="bg-green-500 rounded-lg px-3 py-3 items-center justify-center shadow-sm active:bg-green-600"
                  >
                    <Text className="text-white font-bold text-lg">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Additional Info */}
              <View className="bg-gray-50 rounded-lg p-2 mb-3">
                <Text className="text-xs text-gray-600">
                  Total Value: <Text className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</Text>
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
                  onPress={() => handleDelete(item.id, item.name, item.sku)}
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
