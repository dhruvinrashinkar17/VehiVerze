import { NextResponse } from "next/server";
import { db, healthInsurances } from "@vehiverze/database";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const [insurance] = await db
      .insert(healthInsurances)
      .values({
        ...data,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json(insurance);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create health insurance" },
      { status: 500 }
    );
  }
}
