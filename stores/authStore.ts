import { create } from 'zustand';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

interface AuthState {
  users: AuthUser[];
  currentUser: AuthUser | null;
  error: string | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  users: [
    { id: 1, name: 'Chala Abebe', email: 'admin@aradamart.com', password: 'admin123', role: 'admin' },
    { id: 2, name: 'Tizazab Ayana', email: 'user@aradamart.com', password: 'user123', role: 'user' },
  ],
  currentUser: null,
  error: null,

  login: (email, password) => {
    const user = get().users.find(u => u.email === email.toLowerCase() && u.password === password);
    if (!user) {
      set({ error: 'Invalid email or password' });
      return false;
    }
    set({ currentUser: user, error: null });
    return true;
  },

  register: (name, email, password) => {
    if (get().users.some(u => u.email === email.toLowerCase())) {
      set({ error: 'Email already exists' });
      return false;
    }
    const newUser: AuthUser = {
      id: Date.now(),
      name: name || 'User',
      email: email.toLowerCase(),
      password,
      role: 'user',
    };
    set(state => ({ users: [...state.users, newUser], currentUser: newUser, error: null }));
    return true;
  },

  logout: () => set({ currentUser: null }),
}));
