import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

interface SizeSelectorProps {
  onSizeChange: (size: string) => void;
}

export function SizeSelector({ onSizeChange }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState('L');

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onSizeChange(size);
  };

  return (
    <View className="gap-3">
      <Text className="text-lg font-semibold text-black">Select Size</Text>
      <View className="flex-row gap-2">
        {SIZES.map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => handleSizeSelect(size)}
            className={`flex-1 rounded-lg border-2 py-3 ${
              selectedSize === size
                ? 'border-orange-500 bg-orange-500'
                : 'border-gray-300 bg-white'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                selectedSize === size ? 'text-white' : 'text-black'
              }`}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
