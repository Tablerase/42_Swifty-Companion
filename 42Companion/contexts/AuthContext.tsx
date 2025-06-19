import { AuthService } from "@/services/authService";
import { StoredTokenData } from "@/types/auth";
import { router } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextProps {
  token: StoredTokenData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<StoredTokenData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const storedToken = await AuthService.getToken();
      setToken(storedToken);
      setIsAuthenticated(!!storedToken);
    } catch (error) {
      console.error("Auth check failed:", error);
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AuthService.clearToken();
    setToken(null);
    setIsAuthenticated(false);
  };

  // Check status at launch
  useEffect(() => {
    checkAuth();
  }, []);

  // Update route at login
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(protected)/profile");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext
      value={{
        token,
        isAuthenticated,
        isLoading,
        setIsLoading,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext>
  );
};
