import { NewVehicleTypeContent } from "@/components/new-vehicle-type-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New 2-Wheelers | Motorcycles & Scooters | Vehiverze",
  description:
    "Explore our collection of brand new motorcycles, scooters, and electric bikes with the latest features and technology.",
}

export default function NewTwoWheelerPage() {
  return <NewVehicleTypeContent vehicleType="2-Wheelers" />
}


