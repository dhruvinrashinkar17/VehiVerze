import { NewVehicleCategoryContent } from "@/components/new-vehicle-category-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Hatchback Cars | Vehiverze",
  description: "Explore our collection of brand new hatchback cars with the latest features and technology.",
}

export default function NewHatchbackPage() {
  return <NewVehicleCategoryContent vehicleType="4-Wheeler" category="Hatchback" />
}


