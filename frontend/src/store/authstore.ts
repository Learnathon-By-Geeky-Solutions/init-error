import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string | null;
  password: string;
  avatar: string | null;
  socialLinks: string | null;
  verifyCode: string;
  verifyCodeExpiry: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  getLoggedInUser: () => User | null; // Getter for logged-in user
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        login: (user, accessToken) => {
          set({
            user,
            accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        },
        logout: () => {
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          });
        },
        setUser: (user) => {
          set({ user });
        },
        setAccessToken: (token) => {
          set({ accessToken: token });
        },
        getLoggedInUser: () => {
          return get().user; // Return the current user from the state
        },
      }),
      {
        name: "auth-storage", // Name for persistence
        storage: createJSONStorage(() => localStorage), // Using localStorage
      }
    )
  )
);

export default useAuthStore;