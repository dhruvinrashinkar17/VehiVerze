import { NextResponse } from "next/server";
import {
  db,
  payments,
  garageServiceBookings,
  eq,
  desc,
  and,
  count,
} from "@vehiverze/database";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Create payment record
    const [payment] = await db
      .insert(payments)
      .values({
        bookingId: data.bookingId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        paymentGateway: data.paymentGateway,
        transactionId: data.transactionId,
        status: data.status || "pending",
        gatewayResponse: data.gatewayResponse || {},
      })
      .returning();

    // Update booking payment status
    if (data.status === "completed") {
      await db
        .update(garageServiceBookings)
        .set({
          paymentStatus: "paid",
          paidAt: new Date(),
        })
        .where(eq(garageServiceBookings.id, data.bookingId));
    }

    return NextResponse.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process payment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("bookingId");
    const status = searchParams.get("status");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    // Build conditions array
    const conditions = [];

    if (bookingId) {
      conditions.push(eq(payments.bookingId, bookingId));
    }

    if (status) {
      conditions.push(eq(payments.status, status));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const paymentsList = await db
      .select({
        payment: payments,
        booking: {
          bookingId: garageServiceBookings.bookingId,
          customerName: garageServiceBookings.customerName,
          mobile: garageServiceBookings.mobile,
          totalAmount: garageServiceBookings.totalAmount,
        },
      })
      .from(payments)
      .leftJoin(
        garageServiceBookings,
        eq(payments.bookingId, garageServiceBookings.id)
      )
      .where(whereClause)
      .orderBy(desc(payments.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const [{ total }] = await db
      .select({ total: count() })
      .from(payments)
      .where(whereClause);

    // Transform to match expected format
    const transformedPayments = paymentsList.map(({ payment, booking }) => ({
      ...payment,
      booking,
    }));

    return NextResponse.json({
      success: true,
      data: transformedPayments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
