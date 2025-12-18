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
import { requireStaff, isAuthError } from "@/lib/domain-user";

// POST is staff-only (create payment records)
export async function POST(request: Request) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

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

// GET is staff-only (exposes financial records)
export async function GET(request: Request) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

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

    const paymentsQuery = db
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
      .orderBy(desc(payments.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const countQuery = db.select({ total: count() }).from(payments);

    // Apply where clause only if conditions exist
    const paymentsList =
      conditions.length > 0
        ? await paymentsQuery.where(and(...conditions))
        : await paymentsQuery;

    const countResult =
      conditions.length > 0
        ? await countQuery.where(and(...conditions))
        : await countQuery;

    const total = countResult[0]?.total ?? 0;

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
