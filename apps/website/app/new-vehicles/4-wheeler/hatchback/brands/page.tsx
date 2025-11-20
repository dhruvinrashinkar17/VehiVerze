import { CarBrandSelector } from "@/components/car-brand-selector"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hatchback Car Brands | Choose Your Preferred Brand | Vehiverze",
  description:
    "Select from top hatchback car brands including Maruti Suzuki, Hyundai, Tata, Honda and more. Find the perfect hatchback for city driving.",
  keywords: [
    "hatchback brands",
    "hatchback cars",
    "Maruti Swift",
    "Hyundai i20",
    "Tata Altroz",
    "Honda Jazz",
    "compact cars",
    "city cars",
    "fuel efficient cars",
  ],
}

export default function HatchbackBrandsPage() {
  return <CarBrandSelector carType="hatchback" />
}


