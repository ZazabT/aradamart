import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
    <View className={`px-4 py-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="flex-row items-center justify-between mb-4">
        <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          Categories
        </Text>
        <TouchableOpacity onPress={() => onSelectCategory(null)}>
          <Text className="text-sm text-gray-400 font-medium">See All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        <TouchableOpacity
          className={`px-6 py-3 rounded-2xl ${
            selectedCategory === null 
              ? 'bg-orange-500' 
              : isDark ? 'bg-gray-700' : 'bg-[#f6f6f6]'
          }`}
          onPress={() => onSelectCategory(null)}
        >
          <Text className={`text-base font-normal ${selectedCategory === null ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            All
          </Text>
        </TouchableOpacity>

        {categories.filter(Boolean).map((category) => (
          <TouchableOpacity
            key={category}
            className={`px-6 py-3 rounded-2xl ${
              selectedCategory === category 
                ? 'bg-orange-500' 
                : isDark ? 'bg-gray-700' : 'bg-[#f6f6f6]'
            }`}
            onPress={() => onSelectCategory(category)}
          >
            <Text className={`text-base font-normal ${selectedCategory === category ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
