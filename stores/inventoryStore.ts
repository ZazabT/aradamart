/**
 * inventoryStore (Zustand).
 * Manages admin inventory: products with SKU, name, price, quantity.
 * Supports CRUD operations and stock adjustments (never below zero).
 */

import { create } from 'zustand';

export interface InventoryProduct {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  lastUpdated: string;
}

interface InventoryStore {
  products: InventoryProduct[];
  addProduct: (sku: string, name: string, price: number, quantity: number) => void;
  updateProduct: (id: string, sku: string, name: string, price: number, quantity: number) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (id: string, adjustment: number) => void;
  getProductBySku: (sku: string) => InventoryProduct | undefined;
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  products: [
    {
      id: '1',
      sku: 'SKU001',
      name: 'Laptop Pro',
      price: 999.99,
      quantity: 15,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      sku: 'SKU002',
      name: 'Wireless Mouse',
      price: 29.99,
      quantity: 50,
      lastUpdated: new Date().toISOString(),
    },
  ],

  addProduct: (sku, name, price, quantity) => {
    const newProduct: InventoryProduct = {
      id: Date.now().toString(),
      sku,
      name,
      price,
      quantity,
      lastUpdated: new Date().toISOString(),
    };
    set(state => ({ products: [...state.products, newProduct] }));
  },

  updateProduct: (id, sku, name, price, quantity) => {
    set(state => ({
      products: state.products.map(p =>
        p.id === id
          ? { ...p, sku, name, price, quantity, lastUpdated: new Date().toISOString() }
          : p
      ),
    }));
  },

  deleteProduct: (id) => {
    set(state => ({
      products: state.products.filter(p => p.id !== id),
    }));
  },

  adjustStock: (id, adjustment) => {
    set(state => ({
      products: state.products.map(p => {
        if (p.id === id) {
          const newQuantity = Math.max(0, p.quantity + adjustment);
          return { ...p, quantity: newQuantity, lastUpdated: new Date().toISOString() };
        }
        return p;
      }),
    }));
  },

  getProductBySku: (sku) => {
    return get().products.find(p => p.sku === sku);
  },
}));
