import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductCard } from '@/components/product/ProductCard';
import { NavBar } from '@/components/common/NavBar';

const WISHLIST_ITEMS = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'Volumizing mascara',
    price: 9.99,
    discountPercentage: 10.48,
    rating: 4.5,
    stock: 50,
    brand: 'Essence',
    category: 'beauty',
    thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.webp',
    images: ['https://cdn.dummyjson.com/product-images/1/1.webp'],
  },
  {
    id: 2,
    title: 'Red Lipstick',
    description: 'Classic red lipstick',
    price: 12.99,
    discountPercentage: 5,
    rating: 4.2,
    stock: 30,
    brand: 'Chic Cosmetics',
    category: 'beauty',
    thumbnail: 'https://cdn.dummyjson.com/product-images/2/thumbnail.webp',
    images: ['https://cdn.dummyjson.com/product-images/2/1.webp'],
  },
  {
    id: 3,
    title: 'Red Nail Polish',
    description: 'Long-lasting nail polish',
    price: 8.99,
    discountPercentage: 11,
    rating: 4.3,
    stock: 25,
    brand: 'Nail Couture',
    category: 'beauty',
    thumbnail: 'https://cdn.dummyjson.com/product-images/3/thumbnail.webp',
    images: ['https://cdn.dummyjson.com/product-images/3/1.webp'],
  },
  {
    id: 4,
    title: 'Foundation Makeup',
    description: 'Full coverage foundation',
    price: 15.99,
    discountPercentage: 8,
    rating: 4.6,
    stock: 40,
    brand: 'Beauty Pro',
    category: 'beauty',
    thumbnail: 'https://cdn.dummyjson.com/product-images/4/thumbnail.webp',
    images: ['https://cdn.dummyjson.com/product-images/4/1.webp'],
  },
];

export default function WishlistScreen() {
  return (
    <ThemedView style={styles.container}>
      <NavBar />
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>My Wishlist</ThemedText>
        <ThemedText style={styles.count}>{WISHLIST_ITEMS.length} items</ThemedText>
      </ThemedView>

      <FlatList
        data={WISHLIST_ITEMS}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
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
});
