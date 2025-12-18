import { NextResponse } from "next/server";
import { db, sellOrders, desc } from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

// POST is public (sell flow submission)
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const [order] = await db
      .insert(sellOrders)
      .values({
        vehicleType: data.vehicleType,
        brand: data.brand,
        model: data.model,
        variant: data.variant,
        year: data.year,
        kilometers: data.kilometers,
        condition: data.condition,
        registrationNo: data.registrationNo,
        location: data.location,

        sellerName: data.sellerName,
        sellerEmail: data.sellerEmail,
        sellerPhone: data.sellerPhone,
        sellerAddress: data.sellerAddress,

        inspectionDate: data.inspectionDate,
        inspectionTime: data.inspectionTime,
        inspectionAddress: data.inspectionAddress,

        estimatedPriceMin: Number.parseFloat(
          data.estimatedPriceMin.replace(/,/g, "")
        ).toString(),
        estimatedPriceMax: Number.parseFloat(
          data.estimatedPriceMax.replace(/,/g, "")
        ).toString(),

        status: "PENDING",
      })
      .returning();

    return NextResponse.json(order);
  } catch (error) {
    console.error("Failed to create sell order:", error);
    return NextResponse.json(
      { error: "Failed to create sell order" },
      { status: 500 }
    );
  }
}

// GET is staff-only (exposes seller PII)
export async function GET() {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const orders = await db
      .select()
      .from(sellOrders)
      .orderBy(desc(sellOrders.createdAt));

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to fetch sell orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch sell orders" },
      { status: 500 }
    );
  }
}
