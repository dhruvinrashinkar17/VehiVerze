import { NewVehicleTypeContent } from "@/components/new-vehicle-type-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Heavy Vehicles | Trucks & Specialized Vehicles | Vehiverze",
  description: "Explore our collection of brand new heavy trucks and specialized vehicles for industrial transport.",
}

export default function NewMoreThanEightWheelerPage() {
  return <NewVehicleTypeContent vehicleType="More-than-8-Wheelers" />
}


