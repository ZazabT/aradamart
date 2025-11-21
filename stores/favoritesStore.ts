/**
 * favoritesStore (Zustand).
 * Manages favorite products with add, remove, and toggle actions.
 * Stores full product objects from DummyJSON.
 */

import { create } from 'zustand';
import { Product } from '@/lib/api/products';

interface FavoritesStore {
  items: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  items: [],

  // Add product to favorites
  addFavorite: (product: Product) => {
    const { items } = get();
    const exists = items.find((item) => item.id === product.id);
    if (!exists) {
      set({ items: [...items, product] });
    }
  },

  // Remove product from favorites
  removeFavorite: (productId: number) => {
    const { items } = get();
    set({ items: items.filter((item) => item.id !== productId) });
  },

  // Toggle favorite status
  toggleFavorite: (product: Product) => {
    const { items } = get();
    const index = items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      // Remove if exists
      set({ items: items.filter((item) => item.id !== product.id) });
    } else {
      // Add if doesn't exist
      set({ items: [...items, product] });
    }
  },

  // Clear all favorites
  clearFavorites: () => {
    set({ items: [] });
  },

  // Check if product is favorited
  isFavorite: (productId: number) => {
    const { items } = get();
    return items.some((item) => item.id === productId);
  },
}));
