import { useState } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

interface NavBarProps {
  onMenuPress?: () => void;
}

export function NavBar({ onMenuPress }: NavBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuPress = () => {
    setMenuOpen(!menuOpen);
    onMenuPress?.();
  };

  return (
    <>
      <View className={`flex-row items-center justify-between px-4 py-3 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <TouchableOpacity onPress={handleMenuPress} className="p-2">
          <Ionicons
            name="menu"
            size={24}
            color={isDark ? '#fff' : '#000'}
          />
        </TouchableOpacity>

        <Text className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          Tizazab Ayana
        </Text>

        <View className="flex-row gap-3">
          <TouchableOpacity className="p-2">
            <Ionicons
              name="notifications-outline"
              size={24}
              color={isDark ? '#fff' : '#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Ionicons
              name="bag-outline"
              size={24}
              color={isDark ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          onPress={() => setMenuOpen(false)}
        >
          <View className={`w-7/12 h-full pt-16 px-4 gap-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <TouchableOpacity className="flex-row items-center gap-3 py-3 px-3 rounded-lg">
              <Ionicons
                name="home-outline"
                size={20}
                color={isDark ? '#fff' : '#000'}
              />
              <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-3 py-3 px-3 rounded-lg">
              <Ionicons
                name="heart-outline"
                size={20}
                color={isDark ? '#fff' : '#000'}
              />
              <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                Favorites
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-3 py-3 px-3 rounded-lg">
              <Ionicons
                name="settings-outline"
                size={20}
                color={isDark ? '#fff' : '#000'}
              />
              <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-3 py-3 px-3 rounded-lg">
              <Ionicons
                name="log-out-outline"
                size={20}
                color="#ef4444"
              />
              <Text className="text-base font-medium text-red-500">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
