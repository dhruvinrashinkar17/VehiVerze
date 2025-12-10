import { NextResponse } from "next/server";
import {
  db,
  garageServiceBookings,
  garagePartners,
  eq,
} from "@vehiverze/database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
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
      .where(eq(garageServiceBookings.id, params.id));

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
    return NextResponse.json(
      { success: false, error: "Failed to fetch booking" },
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
        updatedAt: new Date(),
      })
      .where(eq(garageServiceBookings.id, params.id))
      .returning();

    // Send status update notification
    // await sendStatusUpdateNotification(booking)

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [booking] = await db
      .select()
      .from(garageServiceBookings)
      .where(eq(garageServiceBookings.id, params.id));

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Check if booking can be cancelled (e.g., not within 2 hours of service time)
    const bookingDateTime = new Date(
      `${booking.bookingDate.toISOString().split("T")[0]}T${getTimeSlotStartTime(booking.timeSlot)}`
    );
    const now = new Date();
    const timeDiff = bookingDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot cancel booking within 2 hours of service time",
        },
        { status: 400 }
      );
    }

    await db
      .update(garageServiceBookings)
      .set({
        status: "cancelled",
        cancelledAt: new Date(),
      })
      .where(eq(garageServiceBookings.id, params.id));

    // Send cancellation notification
    // await sendCancellationNotification(booking)

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}

function getTimeSlotStartTime(timeSlot: string): string {
  const timeSlotMap: { [key: string]: string } = {
    "9-11": "09:00:00",
    "11-1": "11:00:00",
    "2-4": "14:00:00",
    "4-6": "16:00:00",
  };
  return timeSlotMap[timeSlot] || "09:00:00";
}
