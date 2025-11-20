import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
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
      <View
        style={[
          styles.navbar,
          {
            backgroundColor: isDark ? '#1f2937' : '#fff',
            borderBottomColor: isDark ? '#374151' : '#e5e7eb',
          },
        ]}
      >
        <TouchableOpacity onPress={handleMenuPress} style={styles.hamburger}>
          <Ionicons
            name="menu"
            size={24}
            color={isDark ? '#fff' : '#000'}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.title,
            {
              color: isDark ? '#fff' : '#000',
            },
          ]}
        >
          Tizazab Ayana
        </Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={isDark ? '#fff' : '#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
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
          style={styles.overlay}
          onPress={() => setMenuOpen(false)}
        >
          <View
            style={[
              styles.menu,
              {
                backgroundColor: isDark ? '#1f2937' : '#fff',
              },
            ]}
          >
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons
                name="home-outline"
                size={20}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.menuText, { color: isDark ? '#fff' : '#000' }]}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons
                name="heart-outline"
                size={20}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.menuText, { color: isDark ? '#fff' : '#000' }]}>
                Favorites
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons
                name="settings-outline"
                size={20}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.menuText, { color: isDark ? '#fff' : '#000' }]}>
                Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons
                name="log-out-outline"
                size={20}
                color="#ef4444"
              />
              <Text style={[styles.menuText, { color: '#ef4444' }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  hamburger: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    padding: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  menu: {
    width: '70%',
    paddingTop: 60,
    paddingHorizontal: 16,
    gap: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
