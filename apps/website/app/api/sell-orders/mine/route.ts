import { NextResponse } from "next/server";
import { db, sellOrders, eq, desc, or } from "@vehiverze/database";
import { requireAuth, isAuthError } from "@/lib/domain-user";
import { getSession } from "@/lib/auth";

/**
 * GET /api/sell-orders/mine
 * Returns sell orders for the currently logged-in user.
 * Matches by phone number from Better Auth session.
 */
export async function GET(request: Request) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  try {
    const session = await getSession();
    const phoneNumber = (session?.user as { phoneNumber?: string })
      ?.phoneNumber;

    if (!phoneNumber) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "No phone number associated with account",
      });
    }

    // Normalize phone number for matching
    const normalizedPhone = phoneNumber.replace(/[^0-9]/g, "");
    const last10Digits = normalizedPhone.slice(-10);

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    // Get sell orders matching user's phone number
    const orders = await db
      .select()
      .from(sellOrders)
      .where(
        or(
          eq(sellOrders.sellerPhone, phoneNumber),
          eq(sellOrders.sellerPhone, normalizedPhone),
          eq(sellOrders.sellerPhone, last10Digits),
          eq(sellOrders.sellerPhone, `+91${last10Digits}`)
        )
      )
      .orderBy(desc(sellOrders.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total: orders.length,
      },
    });
  } catch (error) {
    console.error("Failed to fetch user sell orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sell orders" },
      { status: 500 }
    );
  }
}
