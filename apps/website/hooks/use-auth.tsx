"use client";

import { authClient, useSession } from "@/lib/auth-client";

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  logout: () => Promise<void>;
}

export function useAuth(): AuthContextType {
  const { data: session, isPending } = useSession();

  return {
    user: session
      ? {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          phone: (session.user as unknown as { phoneNumber?: string })
            .phoneNumber,
        }
      : null,
    isAuthenticated: !!session,
    isLoading: isPending,
    logout: async () => {
      await authClient.signOut();
    },
  };
}
