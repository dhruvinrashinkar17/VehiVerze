interface SellFlowTitleProps {
  vehicleType?: string
  brand?: string
  model?: string
  year?: string
  variant?: string
  fuelType?: string
  kilometers?: string
  step?: number
}

export function SellFlowTitle({
  vehicleType,
  brand,
  model,
  year,
  variant,
  fuelType,
  kilometers,
  step = 0,
}: SellFlowTitleProps) {
  // Format vehicle type (e.g., "4-wheeler" to "Car")
  const formatVehicleType = (type: string) => {
    switch (type) {
      case "2-wheeler":
        return "Bike"
      case "3-wheeler":
        return "Auto Rickshaw"
      case "4-wheeler":
        return "Car"
      case "6-wheeler":
        return "Medium Truck"
      case "8-wheeler":
        return "Heavy Truck"
      default:
        return type.replace("-", " ")
    }
  }

  let title = "Sell your old"

  if (vehicleType) {
    title += ` ${formatVehicleType(vehicleType)}`
  }

  if (brand && step >= 3) {
    title += ` ${brand}`
  }

  if (model && step >= 4) {
    title += ` ${model}`
  }

  if (year && step >= 5) {
    title += ` ${year}`
  }

  if (variant && step >= 6) {
    title += ` ${variant}`
  }

  if (fuelType && step >= 7) {
    title += ` ${fuelType}`
  }

  if (kilometers && step >= 8) {
    title += ` ${kilometers}`
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">{title}</h1>
      </div>
    </div>
  )
}


