"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, type User } from "@/lib/api";
import { getToken, removeToken, setToken } from "@/lib/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string | undefined,
    password: string
  ) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }
    const me = await api.getMe();
    setUser(me);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = getToken();
        if (token) {
          const me = await api.getMe();
          if (mounted) setUser(me);
        }
      } catch {
        removeToken();
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onUnauthorized = () => setUser(null);
    window.addEventListener("satusurvey:unauthorized", onUnauthorized);
    return () =>
      window.removeEventListener("satusurvey:unauthorized", onUnauthorized);
  }, []);

  const login = async (username: string, password: string) => {
    const { access_token } = await api.login(username, password);
    setToken(access_token);
    try {
      const me = await api.getMe();
      setUser(me);
    } catch (error) {
      removeToken();
      setUser(null);
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string | undefined,
    password: string
  ) => {
    await api.register({ username, email: email || null, password });
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, loading, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
