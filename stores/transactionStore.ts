/**
 * transactionStore (Zustand).
 * Records all admin actions (product create/update/delete, stock changes, user create/update/delete).
 * Simple activity log for history tracking.
 */

import { create } from 'zustand';

export interface Activity {
  id: string;
  timestamp: string;
  action: string;
  type: 'product' | 'user' | 'stock';
  details: string;
}

interface TransactionStore {
  activities: Activity[];
  addActivity: (action: string, type: 'product' | 'user' | 'stock', details: string) => void;
  getActivities: () => Activity[];
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  activities: [],

  addActivity: (action, type, details) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      type,
      details,
    };
    set(state => ({ activities: [newActivity, ...state.activities] }));
  },

  getActivities: () => get().activities,
}))
