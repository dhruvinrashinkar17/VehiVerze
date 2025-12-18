"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useAuth, type StaffUser } from "@/hooks/use-auth";

interface AuthContextType {
  user: StaffUser | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  roleError: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
