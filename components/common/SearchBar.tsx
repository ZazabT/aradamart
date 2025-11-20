import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ 
  placeholder = 'Search products...', 
  value, 
  onChangeText 
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="px-4 py-3">
      <View className={`flex-row items-center rounded-2xl px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <Ionicons
          name="search"
          size={20}
          color={isDark ? '#9ca3af' : '#6b7280'}
        />
        <TextInput
          className={`flex-1 ml-3 text-base ${isDark ? 'text-white' : 'text-black'}`}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
          value={value}
          onChangeText={onChangeText}
        />
        {value && (
          <Ionicons
            name="close-circle"
            size={20}
            color={isDark ? '#9ca3af' : '#9ca3af'}
            onPress={() => onChangeText('')}
          />
        )}
      </View>
    </View>
  );
}
