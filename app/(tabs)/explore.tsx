import { FlatList, StyleSheet, View, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductCard } from '@/components/product/ProductCard';
import { NavBar } from '@/components/common/NavBar';
import { useFavoritesStore } from '@/stores/favoritesStore';

export default function ExploreScreen() {
  const { items: favoriteProducts } = useFavoritesStore();

  return (
    <ThemedView style={styles.container}>
      <NavBar />
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>❤️ Explore Favorites</ThemedText>
        <ThemedText style={styles.count}>{favoriteProducts.length} items saved</ThemedText>
      </ThemedView>

      {favoriteProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Add products to your favorites to see them here!</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: '#9ca3af',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 8,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});
