import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useProductStore } from '@/stores/productStore';
import { ProductCard } from '@/components/product/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const { items } = useFavoritesStore();
  const { loading } = useProductStore();

  // Items are already the favorite products from the store
  const favoriteProducts = items;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#ff6b35" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">❤️ My Favorites</Text>
        <Text className="text-sm text-gray-600 mt-1">{favoriteProducts.length} items saved</Text>
      </View>

      {/* Empty State */}
      {favoriteProducts.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl mb-4">💔</Text>
          <Text className="text-lg font-semibold text-gray-800">No favorites yet</Text>
          <Text className="text-sm text-gray-600 mt-2">Add products to your favorites!</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'flex-start', gap: 8 }}
          contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 12 }}
        />
      )}
    </SafeAreaView>
  );
}
