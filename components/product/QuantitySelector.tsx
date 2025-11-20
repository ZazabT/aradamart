import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface QuantitySelectorProps {
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({ onQuantityChange }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <View className="flex-row items-center gap-4">
      <TouchableOpacity
        onPress={handleDecrement}
        className="rounded-lg border-2 border-gray-300 p-2"
      >
        <MaterialIcons name="remove" size={20} color="black" />
      </TouchableOpacity>

      <Text className="w-8 text-center text-lg font-semibold">{quantity}</Text>

      <TouchableOpacity
        onPress={handleIncrement}
        className="rounded-lg border-2 border-gray-300 p-2"
      >
        <MaterialIcons name="add" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}
