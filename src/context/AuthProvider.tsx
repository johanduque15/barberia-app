import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../services/api";
import type { LoginResponse, RegisterPayload, User } from "../types/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user && token);

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get<{ user: User }>("/auth/me");
        setUser(response.data.user);
        setToken(storedToken);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
  };

  const register = async (payload: RegisterPayload) => {
    const response = await api.post<LoginResponse>("/auth/register", payload);

    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}