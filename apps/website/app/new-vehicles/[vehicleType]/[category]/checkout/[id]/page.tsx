import { NewVehicleCheckout } from "@/components/new-vehicle-checkout"
import type { Metadata } from "next"

interface VehicleCheckoutPageProps {
  params: Promise<{
    vehicleType: string
    category: string
    id: string
  }>
}

export async function generateMetadata({ params }: VehicleCheckoutPageProps): Promise<Metadata> {
  const { vehicleType, category } = await params
  return {
    title: `Checkout - ${category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} ${vehicleType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} | Vehiverze`,
    description: `Complete your purchase for this ${category.replace("-", " ")} ${vehicleType.replace("-", " ")}.`,
  }
}

export default async function VehicleCheckoutPage({ params }: VehicleCheckoutPageProps) {
  const { vehicleType, category, id } = await params
  return <NewVehicleCheckout vehicleType={vehicleType} category={category} vehicleId={id} />
}
