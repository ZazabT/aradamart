import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useInventoryStore } from '@/stores/inventoryStore';
import { useTransactionStore } from '@/stores/transactionStore';

interface AdminProductFormProps {
  editingId?: string | null;
  onClose: () => void;
}

export default function AdminProductForm({ editingId, onClose }: AdminProductFormProps) {
  const { products, addProduct, updateProduct } = useInventoryStore();
  const { addActivity } = useTransactionStore();
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingId) {
      const product = products.find(p => p.id === editingId);
      if (product) {
        setSku(product.sku);
        setName(product.name);
        setPrice(product.price.toString());
        setQuantity(product.quantity.toString());
      }
    }
  }, [editingId, products]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!sku.trim()) newErrors.sku = 'SKU is required';
    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!price || isNaN(parseFloat(price))) newErrors.price = 'Valid price is required';
    if (!quantity || isNaN(parseInt(quantity))) newErrors.quantity = 'Valid quantity is required';

    // Check for duplicate SKU (excluding current product if editing)
    if (products.some(p => p.sku === sku && p.id !== editingId)) {
      newErrors.sku = 'SKU already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    try {
      if (editingId) {
        updateProduct(editingId, sku, name, parseFloat(price), parseInt(quantity));
        addActivity('Product Updated', 'product', `${name} (SKU: ${sku}) - $${price}`);
        Alert.alert('Success', 'Product updated successfully');
      } else {
        addProduct(sku, name, parseFloat(price), parseInt(quantity));
        addActivity('Product Created', 'product', `${name} (SKU: ${sku}) - $${price}`);
        Alert.alert('Success', 'Product created successfully');
      }
      onClose();
    } catch {
      Alert.alert('Error', 'Failed to save product');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 py-4 border-b border-gray-200 flex-row justify-between items-center">
        <Text className="text-xl font-bold">{editingId ? 'Edit Product' : 'Create Product'}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-gray-600 text-lg">✕</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View className="p-5">
        {/* SKU */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">SKU *</Text>
          <TextInput
            value={sku}
            onChangeText={setSku}
            placeholder="e.g., SKU001"
            className="bg-white border border-gray-300 rounded-lg px-4 py-3"
            editable={!editingId}
          />
          {errors.sku && <Text className="text-red-500 text-sm mt-1">{errors.sku}</Text>}
        </View>

        {/* Product Name */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Product Name *</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g., Laptop Pro"
            className="bg-white border border-gray-300 rounded-lg px-4 py-3"
          />
          {errors.name && <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>}
        </View>

        {/* Price */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Price ($) *</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="e.g., 999.99"
            keyboardType="decimal-pad"
            className="bg-white border border-gray-300 rounded-lg px-4 py-3"
          />
          {errors.price && <Text className="text-red-500 text-sm mt-1">{errors.price}</Text>}
        </View>

        {/* Quantity */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Quantity *</Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            placeholder="e.g., 50"
            keyboardType="number-pad"
            className="bg-white border border-gray-300 rounded-lg px-4 py-3"
          />
          {errors.quantity && <Text className="text-red-500 text-sm mt-1">{errors.quantity}</Text>}
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
            className="flex-1 bg-orange-500 rounded-lg py-3 items-center"
          >
            <Text className="text-white font-semibold">{editingId ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
