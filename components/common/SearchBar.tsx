/**
 * SearchBar component.
 * Reusable search input with optional debounced change handling.
 */

import { TextInput, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
            color: isDark ? '#fff' : '#000',
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});
