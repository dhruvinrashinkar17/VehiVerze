import { NewVehicleTypeContent } from "@/components/new-vehicle-type-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New 6-Wheelers | Medium Trucks & Buses | Vehiverze",
  description: "Explore our collection of brand new medium trucks and buses for commercial transport.",
}

export default function NewSixWheelerPage() {
  return <NewVehicleTypeContent vehicleType="6-Wheelers" />
}


