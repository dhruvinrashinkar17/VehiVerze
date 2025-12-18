import { NextResponse } from "next/server";
import {
  db,
  notifications,
  eq,
  desc,
  and,
  count,
  type Notification,
} from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

// POST is staff-only (create system notifications)
export async function POST(request: Request) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const data = await request.json();

    const [notification] = await db
      .insert(notifications)
      .values({
        type: data.type, // 'booking_confirmed', 'status_update', 'reminder', etc.
        title: data.title,
        message: data.message,
        recipientType: data.recipientType, // 'customer', 'partner', 'admin'
        recipientId: data.recipientId,
        bookingId: data.bookingId,
        isRead: false,
        scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : null,
      })
      .returning();

    // Send immediate notification if not scheduled
    if (!data.scheduledFor && notification) {
      await sendNotification(notification);
    }

    return NextResponse.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create notification" },
      { status: 500 }
    );
  }
}

// GET is staff-only (exposes notification data)
export async function GET(request: Request) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const recipientId = searchParams.get("recipientId");
    const recipientType = searchParams.get("recipientType");
    const isRead = searchParams.get("isRead");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "20");

    // Build conditions array
    const conditions = [];

    if (recipientId) {
      conditions.push(eq(notifications.recipientId, recipientId));
    }

    if (recipientType) {
      conditions.push(eq(notifications.recipientType, recipientType));
    }

    if (isRead !== null) {
      conditions.push(eq(notifications.isRead, isRead === "true"));
    }

    const notificationsQuery = db
      .select()
      .from(notifications)
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const countQuery = db.select({ total: count() }).from(notifications);

    // Apply where clause only if conditions exist
    const notificationsList =
      conditions.length > 0
        ? await notificationsQuery.where(and(...conditions))
        : await notificationsQuery;

    const countResult =
      conditions.length > 0
        ? await countQuery.where(and(...conditions))
        : await countQuery;

    const total = countResult[0]?.total ?? 0;

    return NextResponse.json({
      success: true,
      data: notificationsList,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// Helper function to send notifications (implement with your preferred service)
async function sendNotification(notification: Notification) {
  try {
    // Implement SMS/Email/Push notification logic here
    // Example: await sendSMS(notification.recipientId, notification.message)
    // Example: await sendEmail(notification.recipientId, notification.title, notification.message)
    console.log("Sending notification:", notification);
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
}
