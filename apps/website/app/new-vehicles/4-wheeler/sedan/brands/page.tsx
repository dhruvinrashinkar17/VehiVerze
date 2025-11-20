import { CarBrandSelector } from "@/components/car-brand-selector"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sedan Car Brands | Choose Your Preferred Brand | Vehiverze",
  description:
    "Select from top sedan car brands including Honda, Hyundai, Maruti Suzuki, Skoda and more. Find the perfect sedan for your needs.",
  keywords: [
    "sedan brands",
    "sedan cars",
    "Honda City",
    "Hyundai Verna",
    "Maruti Ciaz",
    "Skoda Octavia",
    "sedan car models",
    "family cars",
    "comfortable sedans",
  ],
}

export default function SedanBrandsPage() {
  return <CarBrandSelector carType="sedan" />
}


