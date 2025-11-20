import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
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
    <View className="w-1/2 p-1">
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {/* Image */}
        <View className="w-full h-48 bg-gray-100 relative">
          <Image
            source={{ uri: product.thumbnail || product.images?.[0] }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
          
          {/* Heart Icon */}
          <Pressable className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm">
            <Ionicons name="heart-outline" size={20} color="#ff6b35" />
          </Pressable>

          {/* Discount Badge */}
          {product.discountPercentage && (
            <View className="absolute top-3 left-3 bg-orange-500 px-2 py-1 rounded">
              <Text className="text-white text-xs font-bold">
                -{product.discountPercentage.toFixed(0)}%
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Brand */}
          {product.brand && (
            <Text className="text-xs text-gray-500 mb-1">
              {product.brand}
            </Text>
          )}

          {/* Title */}
          <Text className="text-sm font-semibold text-gray-800 mb-2" numberOfLines={2}>
            {product.title}
          </Text>

          {/* Price */}
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-lg font-bold text-gray-900">
              ${discountedPrice}
            </Text>
            {product.discountPercentage && (
              <Text className="text-xs text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Rating & Stock */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={16} color="#ff6b35" />
              <Text className="text-sm font-semibold text-gray-800">
                {product.rating.toFixed(1)}
              </Text>
              <Text className="text-xs text-gray-500">
                ({product.stock})
              </Text>
            </View>

            {/* Add to Cart Button */}
            <Pressable className={`p-2 rounded-lg ${product.stock > 0 ? 'bg-orange-500' : 'bg-gray-300'}`}>
              <Ionicons name="bag" size={18} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
