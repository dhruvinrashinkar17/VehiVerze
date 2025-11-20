import { NextResponse } from "next/server"

// Services data by vehicle type
const servicesByVehicleType = {
  "2w": [
    {
      id: "oil-change",
      name: "Oil Change",
      price: 299,
      time: "30 min",
      description: "Engine oil and filter replacement",
    },
    {
      id: "brake-adjustment",
      name: "Brake Adjustment",
      price: 199,
      time: "45 min",
      description: "Brake cable and pad adjustment",
    },
    {
      id: "chain-lubrication",
      name: "Chain Lubrication",
      price: 149,
      time: "20 min",
      description: "Chain cleaning and lubrication",
    },
    { id: "tire-change", name: "Tire Change", price: 99, time: "30 min", description: "Tire replacement service" },
    {
      id: "general-service",
      name: "General Service",
      price: 799,
      time: "2 hours",
      description: "Complete vehicle checkup and maintenance",
    },
    {
      id: "battery-check",
      name: "Battery Check",
      price: 99,
      time: "15 min",
      description: "Battery health and charging system check",
    },
    {
      id: "spark-plug",
      name: "Spark Plug Replacement",
      price: 199,
      time: "30 min",
      description: "Spark plug inspection and replacement",
    },
  ],
  "3w": [
    {
      id: "battery-check",
      name: "Battery Check",
      price: 199,
      time: "30 min",
      description: "Battery and electrical system check",
    },
    {
      id: "suspension",
      name: "Suspension Service",
      price: 899,
      time: "2 hours",
      description: "Suspension system inspection and repair",
    },
    {
      id: "brake-service",
      name: "Brake Service",
      price: 599,
      time: "1 hour",
      description: "Complete brake system service",
    },
    {
      id: "electricals",
      name: "Electrical Service",
      price: 499,
      time: "1 hour",
      description: "Electrical system diagnosis and repair",
    },
    {
      id: "general-service",
      name: "General Service",
      price: 1299,
      time: "3 hours",
      description: "Comprehensive vehicle maintenance",
    },
    {
      id: "engine-tuning",
      name: "Engine Tuning",
      price: 799,
      time: "2 hours",
      description: "Engine performance optimization",
    },
  ],
  "4w": [
    {
      id: "oil-change",
      name: "Oil Change",
      price: 899,
      time: "45 min",
      description: "Engine oil and filter replacement",
    },
    {
      id: "ac-service",
      name: "AC Service",
      price: 1299,
      time: "2 hours",
      description: "Air conditioning system service",
    },
    {
      id: "brake-service",
      name: "Brake Service",
      price: 1599,
      time: "2 hours",
      description: "Complete brake system service",
    },
    {
      id: "tire-rotation",
      name: "Tire Rotation",
      price: 299,
      time: "30 min",
      description: "Tire rotation and balancing",
    },
    {
      id: "battery-replacement",
      name: "Battery Replacement",
      price: 3999,
      time: "1 hour",
      description: "Car battery replacement",
    },
    {
      id: "clutch-engine",
      name: "Clutch/Engine Overhaul",
      price: 15999,
      time: "1 day",
      description: "Major engine and clutch repair",
    },
    {
      id: "periodic-service",
      name: "Periodic Service",
      price: 2999,
      time: "4 hours",
      description: "Scheduled maintenance service",
    },
    {
      id: "wheel-alignment",
      name: "Wheel Alignment",
      price: 599,
      time: "1 hour",
      description: "Wheel alignment and balancing",
    },
  ],
  "6w": [
    {
      id: "engine-diagnostics",
      name: "Engine Diagnostics",
      price: 1999,
      time: "2 hours",
      description: "Complete engine system diagnosis",
    },
    {
      id: "tire-alignment",
      name: "Tire Alignment",
      price: 899,
      time: "1 hour",
      description: "Commercial vehicle tire alignment",
    },
    {
      id: "brake-system",
      name: "Brake System Service",
      price: 2999,
      time: "3 hours",
      description: "Heavy-duty brake system service",
    },
    {
      id: "load-bearing-check",
      name: "Load Bearing Check",
      price: 1499,
      time: "1 hour",
      description: "Chassis and load bearing inspection",
    },
    {
      id: "general-maintenance",
      name: "General Maintenance",
      price: 4999,
      time: "6 hours",
      description: "Complete vehicle maintenance",
    },
    {
      id: "transmission-service",
      name: "Transmission Service",
      price: 3999,
      time: "4 hours",
      description: "Transmission system service",
    },
  ],
  "8w": [
    {
      id: "engine-overhaul",
      name: "Engine Overhaul",
      price: 25999,
      time: "2 days",
      description: "Complete engine rebuild",
    },
    {
      id: "suspension",
      name: "Suspension Service",
      price: 8999,
      time: "1 day",
      description: "Heavy-duty suspension service",
    },
    {
      id: "differential-service",
      name: "Differential Service",
      price: 5999,
      time: "4 hours",
      description: "Differential system service",
    },
    {
      id: "brake-system",
      name: "Brake System Service",
      price: 7999,
      time: "6 hours",
      description: "Commercial brake system overhaul",
    },
    {
      id: "transmission",
      name: "Transmission Service",
      price: 18999,
      time: "1 day",
      description: "Complete transmission service",
    },
    {
      id: "fleet-maintenance",
      name: "Fleet Maintenance",
      price: 35999,
      time: "2 days",
      description: "Comprehensive fleet maintenance package",
    },
    {
      id: "hydraulic-system",
      name: "Hydraulic System",
      price: 4999,
      time: "3 hours",
      description: "Hydraulic system service and repair",
    },
  ],
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const vehicleType = searchParams.get("type")

    if (vehicleType && servicesByVehicleType[vehicleType as keyof typeof servicesByVehicleType]) {
      return NextResponse.json({
        success: true,
        data: servicesByVehicleType[vehicleType as keyof typeof servicesByVehicleType],
      })
    }

    return NextResponse.json({
      success: true,
      data: servicesByVehicleType,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 })
  }
}


