import { db, users, eq } from "@vehiverze/database";

export interface DomainUser {
  id: string;
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
      .select({ id: users.id })
      .from(users)
      .where(eq(users.phone, phone));

    if (existing) {
      await db
        .update(users)
        .set(buildUpdateValues(session))
        .where(eq(users.id, existing.id));

      return { id: existing.id };
    }
  }

  const email = getNonTempEmail(session);
  const name = session.user?.name ?? null;

  const [created] = await db
    .insert(users)
    .values({
      phone: phoneCandidates[0],
      phoneVerified: new Date(),
      ...(email ? { email } : {}),
      ...(name ? { name } : {}),
    })
    .returning({ id: users.id });

  return created ? { id: created.id } : null;
}
