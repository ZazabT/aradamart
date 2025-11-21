import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-900">Products</Text>
          <Text className="text-sm text-gray-500">{products.length} items</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="bg-orange-600 rounded-md py-3 items-center active:bg-orange-700"
        >
          <Text className="text-white font-semibold text-base">+ New Product</Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      {products.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-base">No products yet</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
              {/* Product Header */}
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 pr-3">
                  <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
                  <Text className="text-xs text-gray-500 mt-1">SKU: {item.sku}</Text>
                </View>
                <Text className="text-lg font-semibold text-orange-600">${item.price.toFixed(2)}</Text>
              </View>

              {/* Stock Section */}
              <View className="bg-gray-50 rounded-md p-3 mb-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-xs text-gray-600 font-medium">Stock Level</Text>
                    <Text className={`text-sm font-semibold mt-1 ${item.quantity > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                      {item.quantity} units
                    </Text>
                  </View>
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => handleAdjustStock(item.id, item.name, -1)}
                      className="bg-white border border-gray-300 rounded-md px-3 py-2 active:bg-gray-100"
                    >
                      <Text className="text-gray-700 font-semibold">−</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAdjustStock(item.id, item.name, 1)}
                      className="bg-orange-50 border border-orange-200 rounded-md px-3 py-2 active:bg-orange-100"
                    >
                      <Text className="text-orange-600 font-semibold">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="text-xs text-gray-500 mt-2">
                  Total Value: ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleEdit(item.id)}
                  className="flex-1 bg-white border border-orange-200 rounded-md py-2 items-center active:bg-orange-50"
                >
                  <Ionicons name="pencil" size={18} color="#ea580c" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id, item.name, item.sku)}
                  className="flex-1 bg-white border border-gray-300 rounded-md py-2 items-center active:bg-gray-50"
                >
                  <Ionicons name="trash" size={18} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
