import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Purpose: Provide dark/light theme state with localStorage persistence.
 * Special Conditions:
 *   - Defaults to dark when no saved preference exists.
 *   - Never reads window/localStorage when window is unavailable (prerender safety).
 *   - Prefers data-theme already set by the inline boot script (avoids FOUC mismatch).
 * Context: Wraps the app; ThemeToggle and metadata consumers use this.
 */

const STORAGE_KEY = "portfolio-theme";
const ThemeContext = createContext(null);

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const fromDom = document.documentElement.getAttribute("data-theme");
    if (fromDom === "light" || fromDom === "dark") {
      return fromDom;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch {
    // Ignore storage access errors (private mode, prerender quirks)
  }

  return "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0e1114" : "#f4f6f8");
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore persistence failures
    }
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next === "light" ? "light" : "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
