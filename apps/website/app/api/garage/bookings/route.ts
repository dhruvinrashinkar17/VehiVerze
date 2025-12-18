import { NextResponse } from "next/server";
import {
  db,
  garageServiceBookings,
  garagePartners,
  eq,
  desc,
  and,
  count,
} from "@vehiverze/database";
import { requireAuth, requireStaff, isAuthError } from "@/lib/domain-user";

// POST requires auth (user creates booking)
export async function POST(request: Request) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  try {
    const data = await request.json();

    // Generate booking ID
    const bookingId =
      "VZ-GS-" + Math.random().toString(36).substring(2, 11).toUpperCase();

    // Create garage booking with null garagePartnerId for manual staff assignment
    const [booking] = await db
      .insert(garageServiceBookings)
      .values({
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
        garagePartnerId: null, // Will be assigned by staff
      })
      .returning();

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Failed to create booking" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking.bookingId,
        id: booking.id,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// GET is staff-only (lists all bookings with PII)
export async function GET(request: Request) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const bookingIdParam = searchParams.get("bookingId");
    const mobile = searchParams.get("mobile");
    const status = searchParams.get("status");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    // Build conditions array
    const conditions = [];

    if (bookingIdParam) {
      conditions.push(eq(garageServiceBookings.bookingId, bookingIdParam));
    }

    if (mobile) {
      conditions.push(eq(garageServiceBookings.mobile, mobile));
    }

    if (status) {
      conditions.push(eq(garageServiceBookings.status, status));
    }

    // Get bookings with partner info
    const bookingsQuery = db
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
      .orderBy(desc(garageServiceBookings.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const countQuery = db
      .select({ total: count() })
      .from(garageServiceBookings);

    // Apply where clause only if conditions exist
    const bookings =
      conditions.length > 0
        ? await bookingsQuery.where(and(...conditions))
        : await bookingsQuery;

    const countResult =
      conditions.length > 0
        ? await countQuery.where(and(...conditions))
        : await countQuery;

    const total = countResult[0]?.total ?? 0;

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
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
