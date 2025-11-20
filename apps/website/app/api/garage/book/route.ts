import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const booking = await prisma.garageBooking.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create garage booking" }, { status: 500 })
  }
}


