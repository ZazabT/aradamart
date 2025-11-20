import { useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useProductStore } from '@/stores/productStore';
import { ProductCard } from '@/components/product/ProductCard';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SearchBar } from '@/components/common/SearchBar';
import { CategoryScroll } from '@/components/common/CategoryScroll';
import { NavBar } from '@/components/common/NavBar';

export default function HomeScreen() {
  const { 
    filteredProducts, 
    loading, 
    error, 
    fetchProducts,
    fetchCategories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <ThemedText style={styles.loadingText}>Loading products...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
        <Text 
          style={styles.retryButton}
          onPress={() => fetchProducts()}
        >
          Retry
        </Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <NavBar />
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <CategoryScroll 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
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
    backgroundColor: '#2563eb',
    color: '#fff',
    borderRadius: 8,
    fontWeight: '600',
    overflow: 'hidden',
  },
});
