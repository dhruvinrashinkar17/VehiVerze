import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId: data.bookingId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        paymentGateway: data.paymentGateway,
        transactionId: data.transactionId,
        status: data.status || "pending",
        gatewayResponse: data.gatewayResponse || {},
      },
    })

    // Update booking payment status
    if (data.status === "completed") {
      await prisma.garageServiceBooking.update({
        where: { id: data.bookingId },
        data: {
          paymentStatus: "paid",
          paidAt: new Date(),
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: payment,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process payment" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get("bookingId")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (bookingId) {
      whereClause.bookingId = bookingId
    }

    if (status) {
      whereClause.status = status
    }

    const payments = await prisma.payment.findMany({
      where: whereClause,
      include: {
        booking: {
          select: {
            bookingId: true,
            customerName: true,
            mobile: true,
            totalAmount: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.payment.count({
      where: whereClause,
    })

    return NextResponse.json({
      success: true,
      data: payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch payments" }, { status: 500 })
  }
}


