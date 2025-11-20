interface SellPageTitleProps {
  vehicleType?: string
  brand?: string
  model?: string
  year?: string
  variant?: string
  fuelType?: string
  kilometers?: string
}

export function SellPageTitle({ vehicleType, brand, model, year, variant, fuelType, kilometers }: SellPageTitleProps) {
  let title = "Sell your old"

  if (vehicleType) title += ` ${vehicleType}`
  if (brand) title += ` ${brand}`
  if (model) title += ` ${model}`
  if (year) title += ` ${year}`
  if (variant) title += ` ${variant}`
  if (fuelType) title += ` ${fuelType}`
  if (kilometers) title += ` ${kilometers} km`

  return <h1 className="text-3xl font-bold mb-6 text-center md:text-left">{title}</h1>
}


