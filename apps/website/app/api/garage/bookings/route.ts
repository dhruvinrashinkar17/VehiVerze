import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Generate booking ID
    const bookingId = "VZ-GS-" + Math.random().toString(36).substr(2, 9).toUpperCase()

    // Create garage booking
    const booking = await prisma.garageServiceBooking.create({
      data: {
        bookingId,
        vehicleType: data.vehicleType,
        brand: data.brand,
        model: data.model,
        year: Number.parseInt(data.year),
        variant: data.variant || null,
        transmission: data.transmission || null,
        registrationNumber: data.registrationNumber,
        selectedServices: data.selectedServices,
        bookingDate: new Date(data.bookingDate),
        timeSlot: data.timeSlot,
        pickupDrop: data.pickupDrop || false,
        additionalNotes: data.additionalNotes || null,
        customerName: data.customerName,
        mobile: data.mobile,
        email: data.email || null,
        address: data.address,
        paymentMethod: data.paymentMethod,
        totalAmount: data.totalAmount,
        status: "confirmed",
        // Assign to a garage partner (you can implement logic to assign based on location, availability, etc.)
        garagePartnerId: "default-garage-id",
      },
    })

    // Send confirmation SMS/Email (implement your notification service)
    // await sendBookingConfirmation(booking)

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking.bookingId,
        id: booking.id,
        status: booking.status,
      },
    })
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get("bookingId")
    const mobile = searchParams.get("mobile")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (bookingId) {
      whereClause.bookingId = bookingId
    }

    if (mobile) {
      whereClause.mobile = mobile
    }

    if (status) {
      whereClause.status = status
    }

    const bookings = await prisma.garageServiceBooking.findMany({
      where: whereClause,
      include: {
        garagePartner: {
          select: {
            name: true,
            address: true,
            phone: true,
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.garageServiceBooking.count({
      where: whereClause,
    })

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 })
  }
}


