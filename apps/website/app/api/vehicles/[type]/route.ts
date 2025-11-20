import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { type: string } }) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        type: params.type,
      },
      include: {
        inspection: true,
      },
    })

    return NextResponse.json(vehicles)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 })
  }
}
