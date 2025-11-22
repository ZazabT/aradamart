import { CategoryScroll } from '@/components/common/CategoryScroll';
import { NavBar } from '@/components/common/NavBar';
import { SearchBar } from '@/components/common/SearchBar';
import { ProductCard } from '@/components/product/ProductCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useProductStore } from '@/stores/productStore';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  const { 
    displayedProducts, 
    loading, 
    error, 
    fetchProducts,
    fetchCategories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    hasMore,
    loadMore,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff6b35" />
        <ThemedText style={styles.loadingText}>Loading products...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
        <Text style={styles.retryButton} onPress={() => fetchProducts()}>
          Retry
        </Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <NavBar />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <CategoryScroll 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FlatList
        data={displayedProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        onEndReached={() => hasMore && loadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={hasMore ? <LoadingFooter /> : null}
      />
    </ThemedView>
  );
}

function LoadingFooter() {
  return (
    <ThemedView style={styles.loadingFooter}>
      <ActivityIndicator size="small" color="#ff6b35" />
      <ThemedText style={styles.loadingFooterText}>Loading more...</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#ff6b35',
    color: '#fff',
    borderRadius: 8,
    fontWeight: '600',
  },
  loadingFooter: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loadingFooterText: {
    fontSize: 14,
    marginTop: 8,
  },
});
