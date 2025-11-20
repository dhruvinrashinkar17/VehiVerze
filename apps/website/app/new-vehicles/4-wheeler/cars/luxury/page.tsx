import { NewVehicleSubcategoryContent } from "@/components/new-vehicle-subcategory-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Luxury Cars | 4-Wheeler Premium Vehicles | Vehiverze",
  description: "Explore our collection of brand new luxury cars with premium features and superior comfort.",
}

export default function NewLuxuryPage() {
  return <NewVehicleSubcategoryContent vehicleType="4-Wheeler" mainCategory="Cars" subcategory="Luxury" />
}


