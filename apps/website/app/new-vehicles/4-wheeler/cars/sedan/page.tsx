import { NewVehicleSubcategoryContent } from "@/components/new-vehicle-subcategory-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Sedan Cars | 4-Wheeler Personal Vehicles | Vehiverze",
  description: "Explore our collection of brand new sedan cars with elegant design and comfortable interiors.",
}

export default function NewSedanPage() {
  return <NewVehicleSubcategoryContent vehicleType="4-Wheeler" mainCategory="Cars" subcategory="Sedan" />
}


