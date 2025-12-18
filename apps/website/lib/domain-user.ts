import { db, users, eq } from "@vehiverze/database";
import { NextResponse } from "next/server";
import { getSession } from "./auth";

export type UserRole = "user" | "staff" | "admin";

export interface DomainUser {
  id: string;
  role: UserRole;
}

type BetterAuthUserLike = {
  email?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
};

export interface BetterAuthSessionLike {
  user?: BetterAuthUserLike | null;
}

function getNonTempEmail(session: BetterAuthSessionLike): string | undefined {
  const email = session.user?.email ?? null;
  if (!email) return undefined;
  if (email.endsWith("@vehiverze.local")) return undefined;
  return email;
}

function getPhoneCandidates(session: BetterAuthSessionLike): string[] {
  const candidates = new Set<string>();

  const rawPhone = session.user?.phoneNumber ?? null;
  if (rawPhone) candidates.add(rawPhone);

  const digitsOnlyFromPhone = rawPhone ? rawPhone.replace(/[^0-9]/g, "") : "";
  if (digitsOnlyFromPhone) {
    candidates.add(digitsOnlyFromPhone);
    if (digitsOnlyFromPhone.length > 10) {
      candidates.add(digitsOnlyFromPhone.slice(-10));
    }
    candidates.add(`+${digitsOnlyFromPhone}`);
  }

  const email = session.user?.email ?? null;
  if (email && email.endsWith("@vehiverze.local")) {
    const localPart = email.replace(/@vehiverze\.local$/, "");
    const emailDigits = localPart.replace(/[^0-9]/g, "");

    if (emailDigits) {
      candidates.add(emailDigits);
      if (emailDigits.length > 10) {
        candidates.add(emailDigits.slice(-10));
      }
      candidates.add(`+${emailDigits}`);
    }
  }

  return Array.from(candidates);
}

function buildUpdateValues(session: BetterAuthSessionLike): {
  phoneVerified: Date;
  email?: string;
  name?: string;
} {
  const values: {
    phoneVerified: Date;
    email?: string;
    name?: string;
  } = {
    phoneVerified: new Date(),
  };

  const email = getNonTempEmail(session);
  if (email) values.email = email;

  const name = session.user?.name ?? null;
  if (name) values.name = name;

  return values;
}

export async function getOrCreateDomainUser(
  session: BetterAuthSessionLike
): Promise<DomainUser | null> {
  const phoneCandidates = getPhoneCandidates(session);
  if (phoneCandidates.length === 0) return null;

  for (const phone of phoneCandidates) {
    const [existing] = await db
      .select({ id: users.id, role: users.role })
      .from(users)
      .where(eq(users.phone, phone));

    if (existing) {
      await db
        .update(users)
        .set(buildUpdateValues(session))
        .where(eq(users.id, existing.id));

      return { id: existing.id, role: existing.role as UserRole };
    }
  }

  const email = getNonTempEmail(session);
  const name = session.user?.name ?? null;
  const phone = phoneCandidates[0];

  if (!phone) return null;

  const [created] = await db
    .insert(users)
    .values({
      phone,
      phoneVerified: new Date(),
      email: email ?? null,
      name: name ?? null,
    })
    .returning({ id: users.id, role: users.role });

  return created ? { id: created.id, role: created.role as UserRole } : null;
}

// ============================================
// AUTH HELPERS FOR ROUTE PROTECTION
// ============================================

export interface AuthResult {
  session: NonNullable<Awaited<ReturnType<typeof getSession>>>;
  domainUser: DomainUser;
}

export type AuthError = {
  error: string;
  status: 401 | 403;
};

/**
 * Require authenticated user (any role)
 */
export async function requireAuth(): Promise<AuthResult | NextResponse> {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const domainUser = await getOrCreateDomainUser(session);
  if (!domainUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return { session, domainUser };
}

/**
 * Require staff or admin role
 */
export async function requireStaff(): Promise<AuthResult | NextResponse> {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  if (
    result.domainUser.role !== "staff" &&
    result.domainUser.role !== "admin"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return result;
}

/**
 * Require admin role
 */
export async function requireAdmin(): Promise<AuthResult | NextResponse> {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  if (result.domainUser.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return result;
}

/**
 * Check if result is an error response
 */
export function isAuthError(
  result: AuthResult | NextResponse
): result is NextResponse {
  return result instanceof NextResponse;
}
