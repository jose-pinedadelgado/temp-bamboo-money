"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import * as api from "@/lib/api";
import type { ApiUser } from "@/lib/api";

interface AuthState {
  user: ApiUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check existing session on mount
  useEffect(() => {
    api.auth
      .me()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const res = await api.auth.login(username, password);
      if (res.ok && res.user) {
        setUser(res.user);
        return true;
      }
      setError(res.error || "Invalid credentials");
      return false;
    } catch {
      setError("Unable to connect to server");
      return false;
    }
  }, []);

  const register = useCallback(async (username: string, password: string, email?: string): Promise<boolean> => {
    setError(null);
    try {
      const res = await api.auth.register(username, password, email);
      if (res.ok && res.user) {
        setUser(res.user);
        return true;
      }
      setError(res.error || "Registration failed");
      return false;
    } catch {
      setError("Unable to connect to server");
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch {
      // Logout locally even if server call fails
    }
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
