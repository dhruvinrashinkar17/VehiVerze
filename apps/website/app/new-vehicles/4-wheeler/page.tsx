import { NewVehicleTypeContent } from "@/components/new-vehicle-type-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New 4-Wheelers | Cars & Commercial Vehicles | Vehiverze",
  description:
    "Explore our collection of brand new cars and commercial vehicles with the latest features and technology.",
}

export default function NewFourWheelerPage() {
  return <NewVehicleTypeContent vehicleType="4-Wheelers" />
}


