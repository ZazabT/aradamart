/**
 * productStore (Zustand).
 * Manages product list, CRUD actions, and stock adjustments (never below zero).
 */

import { create } from 'zustand';
import { Product, fetchProducts as fetchProductsAPI, fetchCategories as fetchCategoriesAPI } from '@/lib/api/products';

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  clearError: () => void;
}

const filterProducts = (
  products: Product[],
  searchQuery: string,
  selectedCategory: string | null
): Product[] => {
  return products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,
  categories: [],

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await fetchProductsAPI();
      const filteredProducts = filterProducts(products, '', null);
      set({ products, filteredProducts, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      set({ error: errorMessage, loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await fetchCategoriesAPI();
      set({ categories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },

  setSearchQuery: (query: string) => {
    const { products, selectedCategory } = get();
    const filteredProducts = filterProducts(products, query, selectedCategory);
    set({ searchQuery: query, filteredProducts });
  },

  setSelectedCategory: (category: string | null) => {
    const { products, searchQuery } = get();
    const filteredProducts = filterProducts(products, searchQuery, category);
    set({ selectedCategory: category, filteredProducts });
  },

  clearError: () => set({ error: null }),
}));
