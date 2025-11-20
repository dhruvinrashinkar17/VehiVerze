import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const notification = await prisma.notification.create({
      data: {
        type: data.type, // 'booking_confirmed', 'status_update', 'reminder', etc.
        title: data.title,
        message: data.message,
        recipientType: data.recipientType, // 'customer', 'partner', 'admin'
        recipientId: data.recipientId,
        bookingId: data.bookingId,
        isRead: false,
        scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : null,
      },
    })

    // Send immediate notification if not scheduled
    if (!data.scheduledFor) {
      await sendNotification(notification)
    }

    return NextResponse.json({
      success: true,
      data: notification,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const recipientId = searchParams.get("recipientId")
    const recipientType = searchParams.get("recipientType")
    const isRead = searchParams.get("isRead")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const whereClause: any = {}

    if (recipientId) {
      whereClause.recipientId = recipientId
    }

    if (recipientType) {
      whereClause.recipientType = recipientType
    }

    if (isRead !== null) {
      whereClause.isRead = isRead === "true"
    }

    const notifications = await prisma.notification.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.notification.count({
      where: whereClause,
    })

    return NextResponse.json({
      success: true,
      data: notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 })
  }
}

// Helper function to send notifications (implement with your preferred service)
async function sendNotification(notification: any) {
  try {
    // Implement SMS/Email/Push notification logic here
    // Example: await sendSMS(notification.recipientId, notification.message)
    // Example: await sendEmail(notification.recipientId, notification.title, notification.message)
    console.log("Sending notification:", notification)
  } catch (error) {
    console.error("Failed to send notification:", error)
  }
}


