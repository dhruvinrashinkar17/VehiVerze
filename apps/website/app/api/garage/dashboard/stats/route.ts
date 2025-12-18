import { NextResponse } from "next/server";
import {
  db,
  garageServiceBookings,
  eq,
  and,
  gte,
  count,
  sum,
  sqlExpr,
} from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

// GET is staff-only (exposes business stats)
export async function GET(request: Request) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get("partnerId");
    const period = searchParams.get("period") || "30"; // days

    const periodDays = Number.parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Base condition for date filter
    const baseConditions = [gte(garageServiceBookings.createdAt, startDate)];

    if (partnerId) {
      baseConditions.push(eq(garageServiceBookings.garagePartnerId, partnerId));
    }

    const whereClause = and(...baseConditions);

    // Get booking statistics
    const totalBookingsResult = await db
      .select({ totalBookings: count() })
      .from(garageServiceBookings)
      .where(whereClause);
    const totalBookings = totalBookingsResult[0]?.totalBookings ?? 0;

    const confirmedResult = await db
      .select({ confirmedBookings: count() })
      .from(garageServiceBookings)
      .where(and(whereClause, eq(garageServiceBookings.status, "confirmed")));
    const confirmedBookings = confirmedResult[0]?.confirmedBookings ?? 0;

    const completedResult = await db
      .select({ completedBookings: count() })
      .from(garageServiceBookings)
      .where(and(whereClause, eq(garageServiceBookings.status, "completed")));
    const completedBookings = completedResult[0]?.completedBookings ?? 0;

    const cancelledResult = await db
      .select({ cancelledBookings: count() })
      .from(garageServiceBookings)
      .where(and(whereClause, eq(garageServiceBookings.status, "cancelled")));
    const cancelledBookings = cancelledResult[0]?.cancelledBookings ?? 0;

    // Get revenue statistics
    const [revenueData] = await db
      .select({
        totalRevenue: sum(garageServiceBookings.totalAmount),
      })
      .from(garageServiceBookings)
      .where(and(whereClause, eq(garageServiceBookings.status, "completed")));

    // Get bookings by vehicle type
    const bookingsByVehicleType = await db
      .select({
        vehicleType: garageServiceBookings.vehicleType,
        _count: count(garageServiceBookings.id),
      })
      .from(garageServiceBookings)
      .where(whereClause)
      .groupBy(garageServiceBookings.vehicleType);

    // Get bookings by status
    const bookingsByStatus = await db
      .select({
        status: garageServiceBookings.status,
        _count: count(garageServiceBookings.id),
      })
      .from(garageServiceBookings)
      .where(whereClause)
      .groupBy(garageServiceBookings.status);

    // Get daily bookings for the period (using raw SQL for date grouping)
    const dailyBookings = await db.execute(sqlExpr`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as bookings,
        SUM(CASE WHEN status = 'completed' THEN CAST(total_amount AS DECIMAL) ELSE 0 END) as revenue
      FROM garage_service_booking 
      WHERE created_at >= ${startDate}
      ${partnerId ? sqlExpr`AND garage_partner_id = ${partnerId}` : sqlExpr``}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalBookings,
          confirmedBookings,
          completedBookings,
          cancelledBookings,
          totalRevenue: revenueData?.totalRevenue || 0,
          completionRate:
            totalBookings > 0
              ? ((completedBookings / totalBookings) * 100).toFixed(1)
              : 0,
        },
        bookingsByVehicleType: bookingsByVehicleType.map((b) => ({
          vehicleType: b.vehicleType,
          _count: { id: b._count },
        })),
        bookingsByStatus: bookingsByStatus.map((b) => ({
          status: b.status,
          _count: { id: b._count },
        })),
        dailyBookings: dailyBookings.rows,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
