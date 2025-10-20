import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/index';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User) => void;
  logout: () => void;
}

/**
 * Zustand store for authentication state
 * - Persists user data to localStorage
 * - Provides login/logout functionality
 * - Accessible from any component using: const { user, setUser, logout } = useAuthStore()
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
