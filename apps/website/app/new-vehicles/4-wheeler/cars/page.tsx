import { NewVehicleSubcategoryContent } from "@/components/new-vehicle-subcategory-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Cars | 4-Wheeler Cars | Sedan, SUV, Hatchback, Luxury | Vehiverze",
  description:
    "Explore new cars including Sedan, SUV, Hatchback, and Luxury vehicles. Find the perfect car for your needs with latest features and competitive prices.",
  keywords: [
    "new cars",
    "sedan cars",
    "suv cars",
    "hatchback cars",
    "luxury cars",
    "4 wheeler cars",
    "personal cars",
    "family cars",
  ],
  openGraph: {
    title: "New Cars | 4-Wheeler Personal Vehicles | Vehiverze",
    description: "Discover the latest car models across all categories - Sedan, SUV, Hatchback, and Luxury vehicles.",
    images: ["/images/new-cars-og.jpg"],
  },
}

export default function NewCarsPage() {
  return <NewVehicleSubcategoryContent vehicleType="4-wheeler" category="cars" />
}


