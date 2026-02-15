import { create } from 'zustand';
import type { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  isLoading: boolean;
  hasMore: boolean;
  page: number;

  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  appendNotifications: (notifications: Notification[], hasMore: boolean) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  setUnreadCount: (count: number) => void;
  setConnected: (connected: boolean) => void;
  setLoading: (loading: boolean) => void;
  incrementPage: () => void;
  reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isConnected: false,
  isLoading: false,
  hasMore: true,
  page: 1,

  setNotifications: (notifications) =>
    set({ notifications, page: 1 }),

  addNotification: (notification) =>
    set((state) => {
      // Deduplicate by id
      const exists = state.notifications.some((n) => n.id === notification.id);
      if (exists) return state;
      return { notifications: [notification, ...state.notifications] };
    }),

  appendNotifications: (newNotifications, hasMore) =>
    set((state) => {
      const existingIds = new Set(state.notifications.map((n) => n.id));
      const unique = newNotifications.filter((n) => !existingIds.has(n.id));
      return {
        notifications: [...state.notifications, ...unique],
        hasMore,
      };
    }),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - (state.notifications.find((n) => n.id === id && !n.isRead) ? 1 : 0)),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),

  setUnreadCount: (count) => set({ unreadCount: count }),
  setConnected: (connected) => set({ isConnected: connected }),
  setLoading: (loading) => set({ isLoading: loading }),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),

  reset: () =>
    set({
      notifications: [],
      unreadCount: 0,
      isConnected: false,
      isLoading: false,
      hasMore: true,
      page: 1,
    }),
}));
