import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import {
  loginSchema,
  LoginValues,
  signupSchema,
  SignupValues,
} from "@/types/authschema";
import { ApiResponse } from "@/types/api-success-type";

export interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signup: (
    userData: SignupValues
  ) => Promise<{ status: boolean; message: string }>;
  login: (
    credentials: LoginValues
  ) => Promise<{ status: boolean; message: string }>;
  logout: () => Promise<{ status: boolean; message: string }>;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        // Signup action
        signup: async (userData) => {
          try {
            set({ loading: true });
            // Validate the input data using the signupSchema
            const validatedData = signupSchema.parse(userData);

            // Simulate an API call for signup
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(validatedData),
              }
            );
            set({ loading: false });
            if (response.ok) {
              return { status: true, message: "Signup successfull" }; // Signup successful
            } else {
              const data = (await response.json()) as ApiResponse;
              throw new Error(data.message || "Signup failed");
            }
          } catch (error) {
            set({ loading: false });
            let message;
            if (error instanceof Error) {
              message = error.message;
            }
            console.error("Signup error:", error);
            return {
              status: false,
              message: message || "Signup failed",
            }; // Signup failed
          }
        },

        // Login action
        login: async (credentials) => {
          try {
            set({ loading: true });
            const validatedData = loginSchema.parse(credentials);

            // Simulate an API call for login
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(validatedData),
              }
            );
            set({ loading: false });
            const data = await response.json();

            if (response.ok) {
              set({ isAuthenticated: true, user: data.loginUser as User });
              return { status: true, message: "Login sccessfull" };
            } else {
              throw new Error(data.message || "Login failed");
            }
          } catch (error) {
            set({ loading: false });
            let message;
            if (error instanceof Error) {
              message = error.message;
            }
            console.error("Login error:", error);
            return {
              status: false,
              message: message || "Login failed",
            }; // Login failed
          }
        },

        // Logout action
        logout: async () => {
          try {
            set({ loading: true });
            await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/auth/signout`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            set({ loading: false, isAuthenticated: false, user: null });
            return { status: true, message: "Logout successfull" };
          } catch (error) {
            set({ loading: false });
            let message;
            if (error instanceof Error) {
              message = error.message;
            }
            console.error("Logout error:", error);
            return {
              status: false,
              message: message || "Logout failed",
            }; // Logout failed
          }
        },
      }),
      {
        name: "auth-storage", // Unique name for local storage
        storage: createJSONStorage(() => localStorage), // Use localStorage
      }
    )
  )
);

export default useAuthStore;
