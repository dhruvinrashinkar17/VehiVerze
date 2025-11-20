import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const order = await prisma.sellOrder.create({
      data: {
        vehicleType: data.vehicleType,
        brand: data.brand,
        model: data.model,
        variant: data.variant,
        year: data.year,
        kilometers: data.kilometers,
        condition: data.condition,
        registrationNo: data.registrationNo,
        location: data.location,

        sellerName: data.sellerName,
        sellerEmail: data.sellerEmail,
        sellerPhone: data.sellerPhone,
        sellerAddress: data.sellerAddress,

        inspectionDate: data.inspectionDate,
        inspectionTime: data.inspectionTime,
        inspectionAddress: data.inspectionAddress,

        estimatedPriceMin: Number.parseFloat(data.estimatedPriceMin.replace(/,/g, "")),
        estimatedPriceMax: Number.parseFloat(data.estimatedPriceMax.replace(/,/g, "")),

        status: "PENDING",
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Failed to create sell order:", error)
    return NextResponse.json({ error: "Failed to create sell order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const orders = await prisma.sellOrder.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Failed to fetch sell orders:", error)
    return NextResponse.json({ error: "Failed to fetch sell orders" }, { status: 500 })
  }
}


