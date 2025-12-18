import { NextResponse } from "next/server";
import { db, garagePartners, eq } from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

// GET is public (customer-facing directory)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [partner] = await db
      .select()
      .from(garagePartners)
      .where(eq(garagePartners.id, id));

    if (!partner) {
      return NextResponse.json(
        { success: false, error: "Garage partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    console.error("Failed to fetch garage partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch garage partner" },
      { status: 500 }
    );
  }
}

// PUT is staff-only (modify partner data)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const data = await request.json();

    const [partner] = await db
      .update(garagePartners)
      .set({
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
        isActive: data.isActive,
        isVerified: data.isVerified,
        rating: data.rating,
        updatedAt: new Date(),
      })
      .where(eq(garagePartners.id, id))
      .returning();

    if (!partner) {
      return NextResponse.json(
        { success: false, error: "Garage partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    console.error("Failed to update garage partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update garage partner" },
      { status: 500 }
    );
  }
}

// DELETE is staff-only
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const [deleted] = await db
      .delete(garagePartners)
      .where(eq(garagePartners.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Garage partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Garage partner deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete garage partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete garage partner" },
      { status: 500 }
    );
  }
}
