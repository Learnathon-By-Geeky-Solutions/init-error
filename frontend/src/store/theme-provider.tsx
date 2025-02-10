import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

// Define types for theme
export type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: "system", // Default to 'system' theme
        setTheme: (theme: Theme) =>
          set({
            theme,
          }),
      }),
      {
        name: "theme-storage", // Name for persistence in localStorage
        storage: createJSONStorage(() => localStorage), // Using localStorage
      }
    ),
    { name: "ThemeStore" } // Name for devtools debug
  )
);

// Function to apply theme to document root (HTML)
export const applyTheme = (theme: Theme): Theme => {
  const root = window.document.documentElement;
  const currentTheme = theme;

  root.classList.remove("light", "dark");

  if (currentTheme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(currentTheme);
  }
  return currentTheme;
};

// Subscribe to store and auto-apply theme on state change
useThemeStore.subscribe((state) => applyTheme(state.theme));
