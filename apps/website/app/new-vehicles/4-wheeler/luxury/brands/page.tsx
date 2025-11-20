import { CarBrandSelector } from "@/components/car-brand-selector"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luxury Car Brands | Choose Your Preferred Brand | Vehiverze",
  description:
    "Select from premium luxury car brands including BMW, Mercedes, Audi, Jaguar and more. Find the perfect luxury car with cutting-edge technology.",
  keywords: [
    "luxury car brands",
    "luxury cars",
    "BMW 3 Series",
    "Mercedes C-Class",
    "Audi A4",
    "Jaguar XE",
    "premium cars",
    "luxury sedans",
    "high-end vehicles",
  ],
}

export default function LuxuryBrandsPage() {
  return <CarBrandSelector carType="luxury" />
}


