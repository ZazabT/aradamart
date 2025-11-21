/**
 * adminUserStore (Zustand).
 * Manages admin-controlled users: email, full name, role.
 * Supports CRUD operations.
 */

import { create } from 'zustand';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

interface AdminUserStore {
  users: AdminUser[];
  addUser: (email: string, name: string, role: 'admin' | 'user') => void;
  updateUser: (id: string, email: string, name: string, role: 'admin' | 'user') => void;
  deleteUser: (id: string) => void;
  getUserByEmail: (email: string) => AdminUser | undefined;
}

export const useAdminUserStore = create<AdminUserStore>((set, get) => ({
  users: [
    {
      id: '1',
      email: 'admin@aradamart.com',
      name: 'Chala Abebe',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'user@aradamart.com',
      name: 'Tizazab Ayana',
      role: 'user',
      createdAt: new Date().toISOString(),
    },
  ],

  addUser: (email, name, role) => {
    const newUser: AdminUser = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    };
    set(state => ({ users: [...state.users, newUser] }));
  },

  updateUser: (id, email, name, role) => {
    set(state => ({
      users: state.users.map(u =>
        u.id === id
          ? { ...u, email, name, role }
          : u
      ),
    }));
  },

  deleteUser: (id) => {
    set(state => ({
      users: state.users.filter(u => u.id !== id),
    }));
  },

  getUserByEmail: (email) => {
    return get().users.find(u => u.email === email);
  },
}));
