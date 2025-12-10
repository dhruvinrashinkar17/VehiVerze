import { NextResponse } from "next/server";
import { db, otps, users, eq, and, gt } from "@vehiverze/database";

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    const [otp] = await db
      .select()
      .from(otps)
      .where(
        and(
          eq(otps.phone, phone),
          eq(otps.code, code),
          eq(otps.verified, false),
          gt(otps.expiresAt, new Date())
        )
      );

    if (!otp) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    await db.update(otps).set({ verified: true }).where(eq(otps.id, otp.id));

    // Create or update user (upsert)
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.phone, phone));

    let user;
    if (existingUsers.length > 0) {
      // Update existing user
      const [updatedUser] = await db
        .update(users)
        .set({ phoneVerified: new Date() })
        .where(eq(users.phone, phone))
        .returning();
      user = updatedUser;
    } else {
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          phone,
          phoneVerified: new Date(),
        })
        .returning();
      user = newUser;
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
