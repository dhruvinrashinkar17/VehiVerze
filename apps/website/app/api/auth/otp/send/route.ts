import { NextResponse } from "next/server";
import { db, otps } from "@vehiverze/database";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Store in database
    await db.insert(otps).values({
      phone,
      code: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // In production, integrate with SMS service
    // For demo, return OTP
    return NextResponse.json({ success: true, demo_otp: otp });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
