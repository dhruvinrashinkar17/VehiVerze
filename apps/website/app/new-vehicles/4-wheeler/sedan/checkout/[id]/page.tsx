import { NewVehicleCheckout } from "@/components/new-vehicle-checkout"
import type { Metadata } from "next"

interface CheckoutPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: CheckoutPageProps): Metadata {
  return {
    title: `Checkout | Vehiverze`,
    description: "Complete your vehicle purchase with our secure checkout process.",
  }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  return <NewVehicleCheckout vehicleType="4-Wheeler" category="Sedan" vehicleId={params.id} />
}
