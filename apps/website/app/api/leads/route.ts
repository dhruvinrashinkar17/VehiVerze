import { NextResponse } from "next/server";
import { db, leads, desc } from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

// POST is public (lead capture form)
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const [lead] = await db
      .insert(leads)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        vehicleType: data.vehicleType,
        brand: data.brand,
        model: data.model,
        year: data.year,
        message: data.message,
      })
      .returning();

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

// GET is staff-only (exposes PII)
export async function GET() {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));

    return NextResponse.json(allLeads);
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
