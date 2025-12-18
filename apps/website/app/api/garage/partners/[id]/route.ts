import { NextResponse } from "next/server";
import { db, garagePartners, eq } from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

// GET is public (customer-facing directory)
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [partner] = await db
      .select()
      .from(garagePartners)
      .where(eq(garagePartners.id, params.id));

    if (!partner) {
      return NextResponse.json(
        { success: false, error: "Garage partner not found" },
        { status: 404 }
      );
    }

    // Get recent bookings for this partner (staff-only data, redacted for public)
    // Public users only see basic partner info, not bookings
    return NextResponse.json({
      success: true,
      data: {
        ...partner,
        // Bookings are not included for public requests
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch garage partner" },
      { status: 500 }
    );
  }
}

// PUT is staff-only (modify partner data)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
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
      .where(eq(garagePartners.id, params.id))
      .returning();

    return NextResponse.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update garage partner" },
      { status: 500 }
    );
  }
}

// DELETE is staff-only
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    await db.delete(garagePartners).where(eq(garagePartners.id, params.id));

    return NextResponse.json({
      success: true,
      message: "Garage partner deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete garage partner" },
      { status: 500 }
    );
  }
}
