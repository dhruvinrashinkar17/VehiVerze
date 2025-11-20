import { NewVehicleDetails } from "@/components/new-vehicle-details"
import type { Metadata } from "next"

interface VehicleDetailsPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: VehicleDetailsPageProps): Metadata {
  return {
    title: `Vehicle Details | Vehiverze`,
    description: "Detailed information about this vehicle including specifications, features, and pricing.",
  }
}

export default function VehicleDetailsPage({ params }: VehicleDetailsPageProps) {
  return <NewVehicleDetails vehicleType="4-Wheeler" category="Sedan" vehicleId={params.id} />
}
