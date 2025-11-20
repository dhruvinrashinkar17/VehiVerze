import { NewVehicleCategoryContent } from "@/components/new-vehicle-category-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New SUV Cars | Vehiverze",
  description: "Explore our collection of brand new SUV cars with the latest features and technology.",
}

export default function NewSUVPage() {
  return <NewVehicleCategoryContent vehicleType="4-Wheeler" category="SUV" />
}


