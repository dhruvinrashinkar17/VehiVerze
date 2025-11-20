import { NewVehicleTypeContent } from "@/components/new-vehicle-type-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New 3-Wheelers | Auto Rickshaw & Goods Carrier | Vehiverze",
  description:
    "Explore our collection of brand new auto rickshaws, goods carriers, and e-rickshaws for commercial use.",
}

export default function NewThreeWheelerPage() {
  return <NewVehicleTypeContent vehicleType="3-Wheelers" />
}


