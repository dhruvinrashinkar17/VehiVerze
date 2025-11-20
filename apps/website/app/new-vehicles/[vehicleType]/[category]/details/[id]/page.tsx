import { NewVehicleDetails } from "@/components/new-vehicle-details"
import type { Metadata } from "next"

interface VehicleDetailsPageProps {
  params: Promise<{
    vehicleType: string
    category: string
    id: string
  }>
}

export async function generateMetadata({ params }: VehicleDetailsPageProps): Promise<Metadata> {
  const { vehicleType, category } = await params
  return {
    title: `${category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} ${vehicleType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Details | Vehiverze`,
    description: `Detailed information about this ${category.replace("-", " ")} ${vehicleType.replace("-", " ")} including specifications, features, and pricing.`,
  }
}

export default async function VehicleDetailsPage({ params }: VehicleDetailsPageProps) {
  const { vehicleType, category, id } = await params
  return <NewVehicleDetails vehicleType={vehicleType} category={category} vehicleId={id} />
}
