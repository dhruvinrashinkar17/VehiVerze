import { NewVehicleCategoryContent } from "@/components/new-vehicle-category-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Sedan Cars | Vehiverze",
  description: "Explore our collection of brand new sedan cars with the latest features and technology.",
}

export default function NewSedanPage() {
  return <NewVehicleCategoryContent vehicleType="4-Wheeler" category="Sedan" />
}


