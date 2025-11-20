import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const partner = await prisma.garagePartner.create({
      data: {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        phone: data.phone,
        email: data.email,
        ownerName: data.ownerName,
        gstNumber: data.gstNumber,
        specialization: data.specialization,
        vehicleTypes: data.vehicleTypes,
        services: data.services,
        workingHours: data.workingHours,
        rating: 4.0, // Default rating
        isActive: true,
        isVerified: false, // Needs admin verification
      },
    })

    return NextResponse.json({
      success: true,
      data: partner,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create garage partner" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")
    const vehicleType = searchParams.get("vehicleType")
    const isActive = searchParams.get("isActive")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (city) {
      whereClause.city = {
        contains: city,
        mode: "insensitive",
      }
    }

    if (vehicleType) {
      whereClause.vehicleTypes = {
        has: vehicleType,
      }
    }

    if (isActive !== null) {
      whereClause.isActive = isActive === "true"
    }

    const partners = await prisma.garagePartner.findMany({
      where: whereClause,
      orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.garagePartner.count({
      where: whereClause,
    })

    return NextResponse.json({
      success: true,
      data: partners,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch garage partners" }, { status: 500 })
  }
}


