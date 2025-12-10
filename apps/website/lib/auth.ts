import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export interface AuthUser {
  id: string;
  name?: string;
  phone: string;
  email?: string;
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}

const SESSION_COOKIE_NAME = "vehiverze_session";

/**
 * Get the current authenticated user from the request
 * Returns null if not authenticated
 */
export async function auth(req?: NextRequest): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    // Parse and validate session
    const session = JSON.parse(sessionCookie.value) as AuthSession;

    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Create a new session for a user
 */
export async function createSession(user: AuthUser): Promise<AuthSession> {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // 7 day session

  const session: AuthSession = {
    user,
    expires: expires.toISOString(),
  };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  });

  return session;
}

/**
 * Destroy the current session (logout)
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Middleware helper to check authentication
 * Returns unauthorized response if not authenticated
 */
export async function requireAuth(
  req: NextRequest
): Promise<AuthSession | NextResponse> {
  const session = await auth(req);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "Authentication required" },
      { status: 401 }
    );
  }

  return session;
}

/**
 * Type guard to check if result is an AuthSession
 */
export function isAuthSession(
  result: AuthSession | NextResponse
): result is AuthSession {
  return "user" in result && "expires" in result;
}
