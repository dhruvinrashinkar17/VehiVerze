import { NextResponse } from "next/server";
import {
  db,
  garageServiceBookings,
  garagePartners,
  eq,
} from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

// GET is staff-only (exposes booking PII)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const [result] = await db
      .select({
        booking: garageServiceBookings,
        partner: {
          name: garagePartners.name,
          address: garagePartners.address,
          phone: garagePartners.phone,
          rating: garagePartners.rating,
          specialization: garagePartners.specialization,
        },
      })
      .from(garageServiceBookings)
      .leftJoin(
        garagePartners,
        eq(garageServiceBookings.garagePartnerId, garagePartners.id)
      )
      .where(eq(garageServiceBookings.id, id));

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result.booking,
        garagePartner: result.partner,
      },
    });
  } catch (error) {
    console.error("Failed to fetch booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// PUT is staff-only (update booking status, assign partner)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const data = await request.json();

    const [booking] = await db
      .update(garageServiceBookings)
      .set({
        status: data.status,
        garagePartnerId: data.garagePartnerId,
        estimatedCompletionTime: data.estimatedCompletionTime
          ? new Date(data.estimatedCompletionTime)
          : null,
        actualCompletionTime: data.actualCompletionTime
          ? new Date(data.actualCompletionTime)
          : null,
        serviceNotes: data.serviceNotes,
        finalAmount: data.finalAmount,
        paymentStatus: data.paymentStatus,
        paidAt: data.paidAt ? new Date(data.paidAt) : null,
        updatedAt: new Date(),
      })
      .where(eq(garageServiceBookings.id, id))
      .returning();

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Failed to update booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE is staff-only (cancel booking)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const [booking] = await db
      .select()
      .from(garageServiceBookings)
      .where(eq(garageServiceBookings.id, id));

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    await db
      .update(garageServiceBookings)
      .set({
        status: "cancelled",
        cancelledAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(garageServiceBookings.id, id));

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
