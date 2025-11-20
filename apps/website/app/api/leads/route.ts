import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        vehicleType: data.vehicleType,
        brand: data.brand,
        model: data.model,
        year: data.year,
        message: data.message,
      },
    })

    return NextResponse.json(lead)
  } catch (error) {
    console.error("Failed to create lead:", error)
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(leads)
  } catch (error) {
    console.error("Failed to fetch leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}


