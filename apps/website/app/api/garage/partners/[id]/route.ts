import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const partner = await prisma.garagePartner.findUnique({
      where: {
        id: params.id,
      },
      include: {
        bookings: {
          select: {
            id: true,
            bookingId: true,
            status: true,
            bookingDate: true,
            customerName: true,
            vehicleType: true,
            totalAmount: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    })

    if (!partner) {
      return NextResponse.json({ success: false, error: "Garage partner not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: partner,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch garage partner" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const partner = await prisma.garagePartner.update({
      where: {
        id: params.id,
      },
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
        isActive: data.isActive,
        isVerified: data.isVerified,
        rating: data.rating,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      data: partner,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update garage partner" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.garagePartner.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Garage partner deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete garage partner" }, { status: 500 })
  }
}
