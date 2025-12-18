import { NextResponse } from "next/server";
import { db, healthInsurances } from "@vehiverze/database";
import { getSession } from "@/lib/auth";
import { getOrCreateDomainUser } from "@/lib/domain-user";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const domainUser = await getOrCreateDomainUser(session);
    if (!domainUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const [insurance] = await db
      .insert(healthInsurances)
      .values({
        ...data,
        userId: domainUser.id,
      })
      .returning();

    return NextResponse.json(insurance);
  } catch {
    return NextResponse.json(
      { error: "Failed to create health insurance" },
      { status: 500 }
    );
  }
}
