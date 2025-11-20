import { CarBrandSelector } from "@/components/car-brand-selector"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SUV Car Brands | Choose Your Preferred Brand | Vehiverze",
  description:
    "Select from top SUV car brands including Tata, Mahindra, Hyundai, Kia and more. Find the perfect SUV for your adventures.",
  keywords: [
    "SUV brands",
    "SUV cars",
    "Tata Harrier",
    "Mahindra XUV700",
    "Hyundai Creta",
    "Kia Seltos",
    "SUV models",
    "family SUV",
    "off-road vehicles",
  ],
}

export default function SUVBrandsPage() {
  return <CarBrandSelector carType="suv" />
}


