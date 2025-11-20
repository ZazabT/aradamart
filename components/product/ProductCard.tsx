/**
 * ProductCard component.
 * Displays product image, title, price, rating, category, and stock status.
 */

import { Image } from 'expo-image';
import { View, Text, Pressable } from 'react-native';
import { Product } from '@/lib/api/products';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  return (
    <Pressable className="flex-1 mx-1.5 my-2" onPress={onPress}>
      <View className="bg-white rounded-lg overflow-hidden shadow-md">
        {/* Image Container */}
        <View className="w-full h-40 bg-gray-100 relative">
          <Image
            source={{ uri: product.thumbnail }}
            className="w-full h-full"
            contentFit="cover"
          />
          {product.discountPercentage && (
            <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded">
              <Text className="text-white text-xs font-bold">
                -{product.discountPercentage.toFixed(0)}%
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="p-3">
          <Text className="text-xs text-gray-500 capitalize mb-1">
            {product.category}
          </Text>
          <Text className="text-sm font-semibold text-gray-800 mb-2" numberOfLines={2}>
            {product.title}
          </Text>

          {/* Price */}
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-base font-bold text-blue-600">
              ${discountedPrice}
            </Text>
            {product.discountPercentage && (
              <Text className="text-xs text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Footer */}
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-gray-600 font-medium">
              ⭐ {product.rating.toFixed(1)}
            </Text>
            <Text className={`text-xs font-semibold ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
