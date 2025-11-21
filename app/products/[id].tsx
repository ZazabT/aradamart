import { ImageGallery } from '@/components/product/ImageGallery';
import { QuantitySelector } from '@/components/product/QuantitySelector';
import { SizeSelector } from '@/components/product/SizeSelector';
import { fetchProductById, Product } from '@/lib/api/products';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const { toggleFavorite, isFavorite: checkIsFavorite } = useFavoritesStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      setIsFavorite(checkIsFavorite(Number(id)));
    }
  }, [id, checkIsFavorite]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch {
        Alert.alert('Error', 'Failed to load product details');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, router]);

  const handleAddToCart = () => {
    Alert.alert(
      'Added to Cart',
      `${quantity}x ${product?.title} (Size: ${selectedSize}) added to cart!`
    );
  };

  const handleBuyNow = () => {
    Alert.alert(
      'Buy Now',
      `Proceeding to checkout with ${quantity}x ${product?.title} (Size: ${selectedSize})`
    );
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product);
      setIsFavorite(!isFavorite);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#ff6b35" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-600">Product not found</Text>
      </SafeAreaView>
    );
  }

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  const savings = product.discountPercentage
    ? (product.price - parseFloat(discountedPrice)).toFixed(2)
    : '0';

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header - Safe Area Compliant */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full bg-gradient-to-br from-gray-100 to-gray-200 p-3 active:from-gray-200 active:to-gray-300"
        >
          <MaterialIcons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">Details</Text>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          className={`rounded-full p-3 ${
            isFavorite
              ? 'bg-red-100 active:bg-red-200'
              : 'bg-gradient-to-br from-gray-100 to-gray-200 active:from-gray-200 active:to-gray-300'
          }`}
        >
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={isFavorite ? '#dc2626' : '#666'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Image Gallery */}
        <View className="px-4 pt-4">
          <ImageGallery
            images={product.images || []}
            thumbnail={product.thumbnail}
          />
        </View>

        {/* Product Title & Category */}
        <View className="mt-6 px-4 gap-2">
          <Text className="text-3xl font-bold text-black">
            {product.title}
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="bg-orange-100 rounded-full px-3 py-1">
              <Text className="text-xs font-bold text-orange-600 uppercase">
                {product.category}
              </Text>
            </View>
            {product.brand && (
              <View className="bg-blue-100 rounded-full px-3 py-1">
                <Text className="text-xs font-bold text-blue-600">
                  {product.brand}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Rating Section */}
        <View className="mt-4 px-4">
          <View className="flex-row items-center gap-3 bg-yellow-50 rounded-2xl p-3">
            <View className="flex-row items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <MaterialIcons
                  key={i}
                  name={i < Math.floor(product.rating) ? 'star' : 'star-outline'}
                  size={18}
                  color="#fbbf24"
                />
              ))}
            </View>
            <Text className="font-bold text-black text-lg">
              {product.rating.toFixed(1)}
            </Text>
            <Text className="text-gray-600 text-sm">(128 reviews)</Text>
          </View>
        </View>

        {/* Price Section */}
        <View className="mt-6 px-4">
          <View className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4">
            <View className="flex-row items-baseline gap-3">
              <Text className="text-5xl font-bold text-black">
                ${discountedPrice}
              </Text>
              {product.discountPercentage && (
                <View className="gap-1">
                  <Text className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </Text>
                  <View className="bg-red-500 rounded-lg px-2 py-1">
                    <Text className="text-white text-xs font-bold">
                      Save ${savings}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Size Selector */}
        <View className="mt-6 px-4">
          <SizeSelector onSizeChange={setSelectedSize} />
        </View>

        {/* Quantity Selector */}
        <View className="mt-6 px-4">
          <Text className="mb-3 text-lg font-bold text-black">Quantity</Text>
          <QuantitySelector onQuantityChange={setQuantity} />
        </View>

        {/* Description */}
        <View className="mt-6 px-4">
          <Text className="mb-3 text-lg font-bold text-black">Description</Text>
          <View className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <Text className="leading-6 text-gray-700 text-sm">
              {product.description}
            </Text>
            <TouchableOpacity className="mt-3">
              <Text className="font-bold text-orange-500 text-sm">
                Learn More →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Cards */}
        <View className="mt-6 gap-3 px-4">
          {product.stock !== undefined && (
            <View className="flex-row items-center gap-3 bg-green-50 rounded-2xl p-4 border border-green-200">
              <View className="bg-green-100 rounded-full p-3">
                <MaterialIcons name="inventory-2" size={24} color="#16a34a" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-gray-600">
                  Stock Available
                </Text>
                <Text className="text-lg font-bold text-green-700 mt-0.5">
                  {product.stock} units
                </Text>
              </View>
            </View>
          )}

          {product.rating && (
            <View className="flex-row items-center gap-3 bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <View className="bg-blue-100 rounded-full p-3">
                <MaterialIcons name="verified" size={24} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-gray-600">
                  Quality Rating
                </Text>
                <Text className="text-lg font-bold text-blue-700 mt-0.5">
                  {product.rating > 4 ? 'Highly Rated' : 'Good Quality'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons - Bottom Safe Area */}
      <View className="border-t border-gray-200 bg-white px-4 py-4 gap-3">
        <View className="flex-row gap-3">
          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 rounded-2xl border-2 border-orange-500 py-4 active:bg-orange-50"
          >
            <View className="flex-row items-center justify-center gap-2">
              <MaterialIcons name="add-shopping-cart" size={20} color="#ff6b35" />
              <Text className="font-bold text-orange-500 text-base">
                Add Cart
              </Text>
            </View>
          </TouchableOpacity>

          {/* Buy Now Button */}
          <TouchableOpacity
            onPress={handleBuyNow}
            className="flex-1 rounded-2xl bg-orange-500 py-4 shadow-lg active:shadow-md"
            >
            <View className="flex-row items-center justify-center gap-2">
                <MaterialIcons name="shopping-bag" size={20} color="white" />
                <Text className="font-bold text-white text-base">Buy Now</Text>
            </View>
            </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}
