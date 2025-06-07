import { create } from "zustand";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean; 
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: true,

  login: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true, loading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false, loading: false });
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, isAuthenticated: true, loading: false });
    } else {
      set({ token: null, isAuthenticated: false, loading: false });
    }
  },
}));
