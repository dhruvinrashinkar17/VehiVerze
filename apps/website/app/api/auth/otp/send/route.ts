import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Deprecated. Use Better Auth OTP endpoints under /api/auth/*.",
    },
    { status: 410 }
  );
}
