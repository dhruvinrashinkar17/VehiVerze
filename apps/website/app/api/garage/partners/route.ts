import { NextResponse } from "next/server";
import {
  db,
  garagePartners,
  eq,
  ilike,
  desc,
  and,
  count,
} from "@vehiverze/database";
import { arrayContains } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const [partner] = await db
      .insert(garagePartners)
      .values({
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        phone: data.phone,
        email: data.email,
        ownerName: data.ownerName,
        gstNumber: data.gstNumber,
        specialization: data.specialization,
        vehicleTypes: data.vehicleTypes,
        services: data.services,
        workingHours: data.workingHours,
        rating: 4.0, // Default rating
        isActive: true,
        isVerified: false, // Needs admin verification
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create garage partner" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const vehicleType = searchParams.get("vehicleType");
    const isActive = searchParams.get("isActive");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    // Build conditions array
    const conditions = [];

    if (city) {
      conditions.push(ilike(garagePartners.city, `%${city}%`));
    }

    if (vehicleType) {
      conditions.push(
        arrayContains(garagePartners.vehicleTypes, [vehicleType])
      );
    }

    if (isActive !== null) {
      conditions.push(eq(garagePartners.isActive, isActive === "true"));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const partners = await db
      .select()
      .from(garagePartners)
      .where(whereClause)
      .orderBy(desc(garagePartners.rating), desc(garagePartners.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const [{ total }] = await db
      .select({ total: count() })
      .from(garagePartners)
      .where(whereClause);

    return NextResponse.json({
      success: true,
      data: partners,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch garage partners" },
      { status: 500 }
    );
  }
}
