"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export type UserRole = "user" | "staff" | "admin";

export interface StaffUser {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
}

interface AuthState {
  user: StaffUser | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  roleError: string | null;
}

interface AuthContextType extends AuthState {
  logout: () => Promise<void>;
  checkRole: () => Promise<void>;
}

export function useAuth(): AuthContextType {
  const { data: session, isPending: sessionLoading } = useSession();
  const [role, setRole] = useState<UserRole | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);
  const [roleError, setRoleError] = useState<string | null>(null);

  const checkRole = async () => {
    if (!session?.user?.id) {
      setRole(null);
      return;
    }

    setRoleLoading(true);
    setRoleError(null);

    try {
      // Call the website's API to get the domain user with role
      const baseUrl =
        process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to verify role");
      }

      const data = await response.json();
      setRole(data.role as UserRole);

      if (data.role !== "staff" && data.role !== "admin") {
        setRoleError("Access denied. Staff or admin role required.");
      }
    } catch {
      setRoleError("Failed to verify permissions");
      setRole(null);
    } finally {
      setRoleLoading(false);
    }
  };

  // Check role when session changes
  useEffect(() => {
    if (session?.user?.id) {
      checkRole();
    } else {
      setRole(null);
      setRoleError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  const isLoading = sessionLoading || roleLoading;
  const isStaff = role === "staff" || role === "admin";
  const isAdmin = role === "admin";

  return {
    user: session
      ? {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          phone: (session.user as unknown as { phoneNumber?: string })
            .phoneNumber,
          role: role || "user",
        }
      : null,
    isAuthenticated: !!session,
    isStaff,
    isAdmin,
    isLoading,
    roleError,
    logout: async () => {
      await authClient.signOut();
      setRole(null);
    },
    checkRole,
  };
}
