import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Product } from '@/lib/api/products';
import { useInventoryStore } from '@/stores/inventoryStore';
import { useTransactionStore } from '@/stores/transactionStore';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { adjustStock, deleteProduct } = useInventoryStore();
  const { addActivity } = useTransactionStore();
  const [localStock, setLocalStock] = useState(product.stock);

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  const originalPrice = product.price.toFixed(2);
  const savings = product.discountPercentage
    ? ((product.price - parseFloat(discountedPrice)).toFixed(2))
    : '0';

  const handleCardPress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/products/${product.id}`);
    }
  };

  return (
    <Pressable
      onPress={handleCardPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`w-1/2 p-2 transition-transform ${isPressed ? 'scale-95' : 'scale-100'}`}
    >
      <View className="rounded-3xl overflow-hidden bg-white shadow-lg">
        {/* Image Container */}
        <View className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            source={{ uri: product.thumbnail || product.images?.[0] }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />

          {/* Gradient Overlay */}
          <View className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Discount Badge */}
          {product.discountPercentage && (
            <View className="absolute top-4 left-4 bg-red-500 rounded-full px-3 py-1 shadow-lg">
              <Text className="text-white text-xs font-bold">
                -{product.discountPercentage.toFixed(0)}%
              </Text>
            </View>
          )}

          {/* Favorite Button */}
          <Pressable
            onPress={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-lg active:scale-90"
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? '#ff6b35' : '#666'}
            />
          </Pressable>

          {/* Stock Badge */}
          {product.stock > 0 && (
            <View className="absolute bottom-4 left-4 bg-green-500 rounded-full px-2 py-1">
              <Text className="text-white text-xs font-bold">
                {product.stock} in stock
              </Text>
            </View>
          )}

          {product.stock === 0 && (
            <View className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Text className="text-white font-bold text-lg">Out of Stock</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Brand */}
          {product.brand && (
            <Text className="text-xs font-semibold text-orange-500 mb-1 uppercase tracking-wider">
              {product.brand}
            </Text>
          )}

          {/* Title */}
          <Text
            className="text-sm font-bold text-gray-900 mb-2 leading-5"
            numberOfLines={2}
          >
            {product.title}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center gap-1 mb-3">
            <View className="flex-row items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <MaterialIcons
                  key={i}
                  name={i < Math.floor(product.rating) ? 'star' : 'star-outline'}
                  size={14}
                  color="#fbbf24"
                />
              ))}
            </View>
            <Text className="text-xs text-gray-600 font-semibold">
              {product.rating.toFixed(1)}
            </Text>
          </View>

          {/* Price Section */}
          <View className="mb-3">
            <View className="flex-row items-baseline gap-2">
              <Text className="text-xl font-bold text-gray-900">
                ${discountedPrice}
              </Text>
              {product.discountPercentage && (
                <Text className="text-xs text-gray-500 line-through">
                  ${originalPrice}
                </Text>
              )}
            </View>
            {product.discountPercentage && (
              <Text className="text-xs text-green-600 font-semibold mt-1">
                Save ${savings}
              </Text>
            )}
          </View>

          {/* Stock Changer */}
          {localStock > 0 ? (
            <View className="flex-row items-center gap-2 bg-orange-50 rounded-xl p-2">
              <Pressable
                onPress={() => {
                  const newStock = localStock - 1;
                  setLocalStock(newStock);
                  adjustStock(product.id.toString(), -1);
                  addActivity('Stock Decreased', 'stock', `${product.title}: ${localStock} → ${newStock}`);
                  if (newStock === 0) {
                    deleteProduct(product.id.toString());
                    addActivity('Product Removed', 'product', `${product.title} removed (stock = 0)`);
                  }
                }}
                className="bg-red-500 rounded-lg p-2 active:bg-red-600"
              >
                <MaterialIcons name="remove" size={18} color="white" />
              </Pressable>
              <Text className="flex-1 text-center font-bold text-gray-800">{localStock}</Text>
              <Pressable
                onPress={() => {
                  const newStock = localStock + 1;
                  setLocalStock(newStock);
                  adjustStock(product.id.toString(), 1);
                  addActivity('Stock Increased', 'stock', `${product.title}: ${localStock} → ${newStock}`);
                }}
                className="bg-green-500 rounded-lg p-2 active:bg-green-600"
              >
                <MaterialIcons name="add" size={18} color="white" />
              </Pressable>
            </View>
          ) : (
            <Pressable
              className="rounded-xl py-2.5 flex-row items-center justify-center gap-2 bg-gray-300"
              disabled={true}
            >
              <MaterialIcons
                name="shopping-cart"
                size={16}
                color="white"
              />
              <Text className="text-white text-xs font-bold">Unavailable</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}
