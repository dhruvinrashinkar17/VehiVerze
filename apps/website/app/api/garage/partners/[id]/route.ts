import { NextResponse } from "next/server";
import {
  db,
  garagePartners,
  garageServiceBookings,
  eq,
  desc,
} from "@vehiverze/database";

export async function GET(
  request: Request,
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

    // Get recent bookings for this partner
    const bookings = await db
      .select({
        id: garageServiceBookings.id,
        bookingId: garageServiceBookings.bookingId,
        status: garageServiceBookings.status,
        bookingDate: garageServiceBookings.bookingDate,
        customerName: garageServiceBookings.customerName,
        vehicleType: garageServiceBookings.vehicleType,
        totalAmount: garageServiceBookings.totalAmount,
      })
      .from(garageServiceBookings)
      .where(eq(garageServiceBookings.garagePartnerId, params.id))
      .orderBy(desc(garageServiceBookings.createdAt))
      .limit(10);

    return NextResponse.json({
      success: true,
      data: {
        ...partner,
        bookings,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch garage partner" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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
