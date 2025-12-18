import { NextResponse } from "next/server";
import { requireAuth, isAuthError } from "@/lib/domain-user";

/**
 * GET /api/auth/me
 * Returns the current authenticated user with their domain role.
 * Used by admin panel to verify staff/admin access.
 */
export async function GET() {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  return NextResponse.json({
    id: auth.domainUser.id,
    role: auth.domainUser.role,
    sessionUserId: auth.session.user.id,
  });
}
