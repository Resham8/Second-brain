import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  message: string;
  type?: ToastType;
}

interface ToastStore {
  toast: Toast | null;
  showToast: (toast: Toast) => void;
  hideToast: () => void;
}

export const useToastState = create<ToastStore>((set) => ({
  toast: null,
  showToast: (toast) => {
    set({ toast });
    setTimeout(() => set({ toast: null }), 3000);
  },
  hideToast: () => set({ toast: null }),
}));

