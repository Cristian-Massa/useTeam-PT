"use client";
import { NotInsideHookException } from "@/core/exceptions/not-inside-hook-exception";
import { useRefresh } from "@/core/hooks/mutation/useRefresh";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: string | null;
  handleUser: (user: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUser(token);
  }, []);
  const handleUser = (token: string | null) => {
    setUser(token);
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new NotInsideHookException(
      "useAuth must be used within an AuthProvider"
    );
  }
  return context;
};
