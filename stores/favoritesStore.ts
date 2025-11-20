/**
 * favoritesStore (Zustand).
 * Holds favorite product IDs and exposes toggle helpers.
 */

import { create } from 'zustand';

interface FavoritesStore {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  addFavorite: (productId: number) => void;
  removeFavorite: (productId: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  toggleFavorite: (productId: number) => {
    const { favorites } = get();
    if (favorites.includes(productId)) {
      set({ favorites: favorites.filter((id) => id !== productId) });
    } else {
      set({ favorites: [...favorites, productId] });
    }
  },

  addFavorite: (productId: number) => {
    const { favorites } = get();
    if (!favorites.includes(productId)) {
      set({ favorites: [...favorites, productId] });
    }
  },

  removeFavorite: (productId: number) => {
    const { favorites } = get();
    set({ favorites: favorites.filter((id) => id !== productId) });
  },
}));
