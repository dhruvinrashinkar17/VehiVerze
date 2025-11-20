import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const partnerId = searchParams.get("partnerId")
    const period = searchParams.get("period") || "30" // days

    const periodDays = Number.parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - periodDays)

    const whereClause: any = {
      createdAt: {
        gte: startDate,
      },
    }

    if (partnerId) {
      whereClause.garagePartnerId = partnerId
    }

    // Get booking statistics
    const totalBookings = await prisma.garageServiceBooking.count({
      where: whereClause,
    })

    const confirmedBookings = await prisma.garageServiceBooking.count({
      where: {
        ...whereClause,
        status: "confirmed",
      },
    })

    const completedBookings = await prisma.garageServiceBooking.count({
      where: {
        ...whereClause,
        status: "completed",
      },
    })

    const cancelledBookings = await prisma.garageServiceBooking.count({
      where: {
        ...whereClause,
        status: "cancelled",
      },
    })

    // Get revenue statistics
    const revenueData = await prisma.garageServiceBooking.aggregate({
      where: {
        ...whereClause,
        status: "completed",
      },
      _sum: {
        totalAmount: true,
      },
    })

    // Get bookings by vehicle type
    const bookingsByVehicleType = await prisma.garageServiceBooking.groupBy({
      by: ["vehicleType"],
      where: whereClause,
      _count: {
        id: true,
      },
    })

    // Get bookings by status
    const bookingsByStatus = await prisma.garageServiceBooking.groupBy({
      by: ["status"],
      where: whereClause,
      _count: {
        id: true,
      },
    })

    // Get daily bookings for the period
    const dailyBookings = await prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as bookings,
        SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) as revenue
      FROM garage_service_booking 
      WHERE created_at >= ${startDate}
      ${partnerId ? `AND garage_partner_id = '${partnerId}'` : ""}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalBookings,
          confirmedBookings,
          completedBookings,
          cancelledBookings,
          totalRevenue: revenueData._sum.totalAmount || 0,
          completionRate: totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(1) : 0,
        },
        bookingsByVehicleType,
        bookingsByStatus,
        dailyBookings,
      },
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}


