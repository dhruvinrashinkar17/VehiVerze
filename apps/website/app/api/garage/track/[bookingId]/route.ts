import { NextResponse } from "next/server";
import {
  db,
  garageServiceBookings,
  garagePartners,
  payments,
  eq,
} from "@vehiverze/database";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await params;

    // Get booking with partner info
    const [result] = await db
      .select({
        booking: garageServiceBookings,
        partner: {
          name: garagePartners.name,
          address: garagePartners.address,
          phone: garagePartners.phone,
          rating: garagePartners.rating,
        },
      })
      .from(garageServiceBookings)
      .leftJoin(
        garagePartners,
        eq(garageServiceBookings.garagePartnerId, garagePartners.id)
      )
      .where(eq(garageServiceBookings.bookingId, bookingId));

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Get payments for this booking
    const bookingPayments = await db
      .select({
        amount: payments.amount,
        status: payments.status,
        paymentMethod: payments.paymentMethod,
        createdAt: payments.createdAt,
      })
      .from(payments)
      .where(eq(payments.bookingId, result.booking.id));

    // Generate timeline based on booking status
    const timeline = generateServiceTimeline(result.booking);

    return NextResponse.json({
      success: true,
      data: {
        booking: {
          ...result.booking,
          garagePartner: result.partner,
          payments: bookingPayments,
        },
        timeline,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to track booking" },
      { status: 500 }
    );
  }
}

interface BookingForTimeline {
  createdAt: Date;
  status: string;
  estimatedCompletionTime: Date | null;
  actualCompletionTime: Date | null;
  cancelledAt: Date | null;
  updatedAt: Date;
}

function generateServiceTimeline(booking: BookingForTimeline) {
  const timeline = [
    {
      step: 1,
      title: "Booking Confirmed",
      description: "Your service booking has been confirmed",
      status: "completed",
      timestamp: booking.createdAt,
    },
  ];

  if (booking.status === "in_progress" || booking.status === "completed") {
    timeline.push({
      step: 2,
      title: "Service Started",
      description: "Your vehicle service has begun",
      status: "completed",
      timestamp: booking.estimatedCompletionTime || booking.updatedAt,
    });
  }

  if (booking.status === "completed") {
    timeline.push({
      step: 3,
      title: "Service Completed",
      description: "Your vehicle service has been completed",
      status: "completed",
      timestamp: booking.actualCompletionTime || booking.updatedAt,
    });
  }

  if (booking.status === "cancelled") {
    timeline.push({
      step: 2,
      title: "Booking Cancelled",
      description: "Your booking has been cancelled",
      status: "cancelled",
      timestamp: booking.cancelledAt ?? booking.updatedAt,
    });
  }

  return timeline;
}
