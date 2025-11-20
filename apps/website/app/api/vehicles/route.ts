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

    const vehicle = await prisma.vehicle.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 })
  }
}


