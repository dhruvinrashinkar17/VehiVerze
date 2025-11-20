import { NewVehicleModelCheckout } from "@/components/new-vehicle-model-checkout"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{
    vehicleType: string
    category: string
    modelId: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vehicleType, category, modelId } = await params

  return {
    title: `Checkout - Buy Your New Vehicle | Secure Payment | Vehiverze`,
    description: `Complete your vehicle purchase with our secure checkout process. Multiple payment options, instant confirmation, and doorstep delivery available.`,
    keywords: [
      "vehicle checkout",
      "buy vehicle online",
      "secure payment",
      "vehicle financing",
      "online car purchase",
      "vehicle delivery",
    ],
    robots: "noindex, nofollow", // Checkout pages shouldn't be indexed
  }
}

export default async function ModelCheckoutPage({ params }: PageProps) {
  const { vehicleType, category, modelId } = await params

  return <NewVehicleModelCheckout vehicleType={vehicleType} category={category} modelId={modelId} />
}
