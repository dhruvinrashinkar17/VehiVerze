import { NextResponse } from "next/server";
import { db, vehicles } from "@vehiverze/database";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const [vehicle] = await db
      .insert(vehicles)
      .values({
        ...data,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
