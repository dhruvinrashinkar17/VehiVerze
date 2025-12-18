import { NextResponse } from "next/server";
import {
  db,
  garageServiceBookings,
  garagePartners,
  eq,
  desc,
  or,
} from "@vehiverze/database";
import { requireAuth, isAuthError } from "@/lib/domain-user";
import { getSession } from "@/lib/auth";

/**
 * GET /api/garage/bookings/mine
 * Returns garage service bookings for the currently logged-in user.
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
    // The booking uses the phone number the customer entered at checkout
    const normalizedPhone = phoneNumber.replace(/[^0-9]/g, "");
    const last10Digits = normalizedPhone.slice(-10);

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    // Get bookings matching user's phone number
    const bookings = await db
      .select({
        booking: garageServiceBookings,
        partner: {
          name: garagePartners.name,
          address: garagePartners.address,
          phone: garagePartners.phone,
          rating: garagePartners.rating,
        },
      })
      .from(garageServiceBookings)
      .leftJoin(
        garagePartners,
        eq(garageServiceBookings.garagePartnerId, garagePartners.id)
      )
      .where(
        or(
          eq(garageServiceBookings.mobile, phoneNumber),
          eq(garageServiceBookings.mobile, normalizedPhone),
          eq(garageServiceBookings.mobile, last10Digits),
          eq(garageServiceBookings.mobile, `+91${last10Digits}`)
        )
      )
      .orderBy(desc(garageServiceBookings.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    // Transform to match expected format
    const transformedBookings = bookings.map(({ booking, partner }) => ({
      ...booking,
      garagePartner: partner,
    }));

    return NextResponse.json({
      success: true,
      data: transformedBookings,
      pagination: {
        page,
        limit,
        total: transformedBookings.length,
      },
    });
  } catch (error) {
    console.error("Failed to fetch user bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
