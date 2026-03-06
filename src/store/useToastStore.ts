import { create } from 'zustand';

export type ToastType = 'success' | 'info' | 'warning';

interface ToastState {
  toast: { message: string; type: ToastType } | null;
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toast: null,

  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      set((state) => {
        // Only dismiss if it's still the same toast
        if (state.toast?.message === message) {
          return { toast: null };
        }
        return state;
      });
    }, 4000);
  },

  dismissToast: () => set({ toast: null }),
}));
