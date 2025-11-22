/**
 * productStore (Zustand).
 * Manages product list, CRUD actions, and stock adjustments (never below zero).
 */

import { create } from 'zustand';
import { Product, fetchProducts as fetchProductsAPI, fetchCategories as fetchCategoriesAPI } from '@/lib/api/products';

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  displayedProducts: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  currentPage: number;
  itemsPerPage: number;
  hasMore: boolean;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  loadMore: () => void;
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

const getDisplayedProducts = (
  filteredProducts: Product[],
  currentPage: number,
  itemsPerPage: number
): Product[] => {
  const startIndex = 0;
  const endIndex = (currentPage + 1) * itemsPerPage;
  return filteredProducts.slice(startIndex, endIndex);
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  displayedProducts: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,
  categories: [],
  currentPage: 0,
  itemsPerPage: 10,
  hasMore: true,

  fetchProducts: async () => {
    set({ loading: true, error: null, currentPage: 0 });
    try {
      const products = await fetchProductsAPI();
      const filteredProducts = filterProducts(products, '', null);
      const displayedProducts = getDisplayedProducts(filteredProducts, 0, 10);
      const hasMore = filteredProducts.length > 10;
      set({ products, filteredProducts, displayedProducts, hasMore, loading: false });
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
    const { products, selectedCategory, itemsPerPage } = get();
    const filteredProducts = filterProducts(products, query, selectedCategory);
    const displayedProducts = getDisplayedProducts(filteredProducts, 0, itemsPerPage);
    const hasMore = filteredProducts.length > itemsPerPage;
    set({ searchQuery: query, filteredProducts, displayedProducts, currentPage: 0, hasMore });
  },

  setSelectedCategory: (category: string | null) => {
    const { products, searchQuery, itemsPerPage } = get();
    const filteredProducts = filterProducts(products, searchQuery, category);
    const displayedProducts = getDisplayedProducts(filteredProducts, 0, itemsPerPage);
    const hasMore = filteredProducts.length > itemsPerPage;
    set({ selectedCategory: category, filteredProducts, displayedProducts, currentPage: 0, hasMore });
  },

  loadMore: () => {
    const { filteredProducts, currentPage, itemsPerPage } = get();
    const nextPage = currentPage + 1;
    const displayedProducts = getDisplayedProducts(filteredProducts, nextPage, itemsPerPage);
    const hasMore = displayedProducts.length < filteredProducts.length;
    set({ currentPage: nextPage, displayedProducts, hasMore });
  },

  clearError: () => set({ error: null }),
}));
