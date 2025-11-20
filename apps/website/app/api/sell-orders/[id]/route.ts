import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.sellOrder.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Failed to fetch sell order:", error)
    return NextResponse.json({ error: "Failed to fetch sell order" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()

    const order = await prisma.sellOrder.update({
      where: {
        id: params.id,
      },
      data,
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Failed to update sell order:", error)
    return NextResponse.json({ error: "Failed to update sell order" }, { status: 500 })
  }
}
