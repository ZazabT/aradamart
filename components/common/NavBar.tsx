import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface NavBarProps {
  onMenuPress?: () => void;
}

export function NavBar({ onMenuPress }: NavBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const currentUser = useAuthStore((state) => state.currentUser);

  const handleMenuPress = () => {
    setMenuOpen(!menuOpen);
    onMenuPress?.();
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.replace('/users/login');
  };

  return (
    <>
      <View className={`flex-row items-center justify-between px-4 py-3 mt-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <TouchableOpacity onPress={handleMenuPress} className="p-2">
          <Ionicons
            name="menu"
            size={24}
            color={isDark ? '#fff' : '#000'}
          />
        </TouchableOpacity>

        <Text className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          {currentUser?.name || 'AradaMart'}
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
            {currentUser && (
              <View className={`pb-4 mb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <View className="flex-row items-center gap-3 mb-3">
                  <View className="w-12 h-12 bg-orange-500 rounded-full items-center justify-center">
                    <Ionicons name="person" size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className={`font-bold text-base ${isDark ? 'text-white' : 'text-black'}`}>
                      {currentUser.name}
                    </Text>
                    <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {currentUser.email}
                    </Text>
                  </View>
                </View>
              </View>
            )}

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

            <TouchableOpacity onPress={handleLogout} className="flex-row items-center gap-3 py-3 px-3 rounded-lg">
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
