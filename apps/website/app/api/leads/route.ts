import { NextResponse } from "next/server";
import { db, leads, desc } from "@vehiverze/database";

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

export async function GET() {
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
