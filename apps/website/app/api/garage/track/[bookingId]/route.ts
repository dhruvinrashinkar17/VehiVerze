import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { bookingId: string } }) {
  try {
    const booking = await prisma.garageServiceBooking.findUnique({
      where: {
        bookingId: params.bookingId,
      },
      include: {
        garagePartner: {
          select: {
            name: true,
            address: true,
            phone: true,
            rating: true,
          },
        },
        payments: {
          select: {
            amount: true,
            status: true,
            paymentMethod: true,
            createdAt: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    // Generate timeline based on booking status
    const timeline = generateServiceTimeline(booking)

    return NextResponse.json({
      success: true,
      data: {
        booking,
        timeline,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to track booking" }, { status: 500 })
  }
}

function generateServiceTimeline(booking: any) {
  const timeline = [
    {
      step: 1,
      title: "Booking Confirmed",
      description: "Your service booking has been confirmed",
      status: "completed",
      timestamp: booking.createdAt,
    },
  ]

  if (booking.status === "in_progress" || booking.status === "completed") {
    timeline.push({
      step: 2,
      title: "Service Started",
      description: "Your vehicle service has begun",
      status: "completed",
      timestamp: booking.estimatedCompletionTime || booking.updatedAt,
    })
  }

  if (booking.status === "completed") {
    timeline.push({
      step: 3,
      title: "Service Completed",
      description: "Your vehicle service has been completed",
      status: "completed",
      timestamp: booking.actualCompletionTime || booking.updatedAt,
    })
  }

  if (booking.status === "cancelled") {
    timeline.push({
      step: 2,
      title: "Booking Cancelled",
      description: "Your booking has been cancelled",
      status: "cancelled",
      timestamp: booking.cancelledAt,
    })
  }

  return timeline
}
