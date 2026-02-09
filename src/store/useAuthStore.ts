import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, JobSeekerProfile, HiringProfile, OrganizationProfile } from '../types/index';
import {
  mockJobSeekerProfiles,
  mockHiringProfiles,
  mockOrganizationProfiles
} from '../data/mockUsers';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  jobSeekerProfile: JobSeekerProfile | null;
  hiringProfile: HiringProfile | null;
  organizationProfile: OrganizationProfile | null;

  // Actions
  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
}

/**
 * Zustand store for authentication and user profile state
 * - Persists user data + profiles to localStorage
 * - login() loads matching profiles from mock data
 * - Accessible from any component using: const { user, login, logout } = useAuthStore()
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      jobSeekerProfile: null,
      hiringProfile: null,
      organizationProfile: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          jobSeekerProfile: null,
          hiringProfile: null,
          organizationProfile: null,
        }),

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          jobSeekerProfile: user.isLookingForJob ? (mockJobSeekerProfiles[user.id] ?? null) : null,
          hiringProfile: user.isHiring ? (mockHiringProfiles[user.id] ?? null) : null,
          organizationProfile: user.accountType === 'Organization' ? (mockOrganizationProfiles[user.id] ?? null) : null,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          jobSeekerProfile: null,
          hiringProfile: null,
          organizationProfile: null,
        }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
