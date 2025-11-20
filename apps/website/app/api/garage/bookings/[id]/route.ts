import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const booking = await prisma.garageServiceBooking.findUnique({
      where: {
        id: params.id,
      },
      include: {
        garagePartner: {
          select: {
            name: true,
            address: true,
            phone: true,
            rating: true,
            specialization: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const booking = await prisma.garageServiceBooking.update({
      where: {
        id: params.id,
      },
      data: {
        status: data.status,
        garagePartnerId: data.garagePartnerId,
        estimatedCompletionTime: data.estimatedCompletionTime ? new Date(data.estimatedCompletionTime) : null,
        actualCompletionTime: data.actualCompletionTime ? new Date(data.actualCompletionTime) : null,
        serviceNotes: data.serviceNotes,
        finalAmount: data.finalAmount,
        updatedAt: new Date(),
      },
    })

    // Send status update notification
    // await sendStatusUpdateNotification(booking)

    return NextResponse.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update booking" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const booking = await prisma.garageServiceBooking.findUnique({
      where: { id: params.id },
    })

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    // Check if booking can be cancelled (e.g., not within 2 hours of service time)
    const bookingDateTime = new Date(
      `${booking.bookingDate.toISOString().split("T")[0]}T${getTimeSlotStartTime(booking.timeSlot)}`,
    )
    const now = new Date()
    const timeDiff = bookingDateTime.getTime() - now.getTime()
    const hoursDiff = timeDiff / (1000 * 3600)

    if (hoursDiff < 2) {
      return NextResponse.json(
        { success: false, error: "Cannot cancel booking within 2 hours of service time" },
        { status: 400 },
      )
    }

    await prisma.garageServiceBooking.update({
      where: { id: params.id },
      data: {
        status: "cancelled",
        cancelledAt: new Date(),
      },
    })

    // Send cancellation notification
    // await sendCancellationNotification(booking)

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to cancel booking" }, { status: 500 })
  }
}

function getTimeSlotStartTime(timeSlot: string): string {
  const timeSlotMap: { [key: string]: string } = {
    "9-11": "09:00:00",
    "11-1": "11:00:00",
    "2-4": "14:00:00",
    "4-6": "16:00:00",
  }
  return timeSlotMap[timeSlot] || "09:00:00"
}
