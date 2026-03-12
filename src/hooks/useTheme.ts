"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "bamboo-theme";
const EVENT_NAME = "bamboo-theme-change";

function getTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return "dark";
  } catch {
    // localStorage unavailable
  }
  return "light";
}

function subscribe(callback: () => void) {
  // Listen for our custom event (same-tab changes)
  window.addEventListener(EVENT_NAME, callback);
  // Listen for storage events (cross-tab changes)
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);

  const setTheme = useCallback((t: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // localStorage unavailable
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }, []);

  const toggle = useCallback(() => {
    const next = getTheme() === "light" ? "dark" : "light";
    setTheme(next);
  }, [setTheme]);

  return { theme, setTheme, toggle };
}
