/**
 * CategoryScroll component.
 * Horizontal scrollable category list.
 */

import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CategoryScrollProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryScroll({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryScrollProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === null && styles.categoryButtonActive,
            {
              backgroundColor: selectedCategory === null 
                ? '#2563eb' 
                : isDark ? '#374151' : '#e5e7eb',
            }
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text
            style={[
              styles.categoryText,
              {
                color: selectedCategory === null ? '#fff' : isDark ? '#fff' : '#000',
              }
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {categories.filter(Boolean).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
              {
                backgroundColor: selectedCategory === category 
                  ? '#2563eb' 
                  : isDark ? '#374151' : '#e5e7eb',
              }
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: selectedCategory === category ? '#fff' : isDark ? '#fff' : '#000',
                }
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#2563eb',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
