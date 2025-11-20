import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json()

    const otp = await prisma.oTP.findFirst({
      where: {
        phone,
        code,
        verified: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!otp) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    // Mark OTP as verified
    await prisma.oTP.update({
      where: { id: otp.id },
      data: { verified: true },
    })

    // Create or update user
    const user = await prisma.user.upsert({
      where: { phone },
      update: { phoneVerified: new Date() },
      create: {
        phone,
        phoneVerified: new Date(),
      },
    })

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}


