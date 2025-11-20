import { NewVehicleTypeContent } from "@/components/new-vehicle-type-content"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{
    vehicleType: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vehicleType } = await params

  const vehicleTypeFormatted = vehicleType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `New ${vehicleTypeFormatted} | Latest Models & Best Prices | Vehiverze`,
    description: `Explore the latest ${vehicleTypeFormatted.toLowerCase()} models with advanced features, competitive prices, and flexible financing options. Find your perfect vehicle today.`,
    keywords: [
      `new ${vehicleType}`,
      `${vehicleType} models`,
      `buy ${vehicleType}`,
      `${vehicleType} price`,
      `latest ${vehicleType}`,
      `${vehicleType} features`,
      `${vehicleType} specifications`,
    ],
    openGraph: {
      title: `New ${vehicleTypeFormatted} | Latest Models | Vehiverze`,
      description: `Discover the latest ${vehicleTypeFormatted.toLowerCase()} with cutting-edge technology and competitive pricing.`,
      images: [`/images/${vehicleType}-og.jpg`],
    },
  }
}

export default async function NewVehicleTypePage({ params }: PageProps) {
  const { vehicleType } = await params

  return <NewVehicleTypeContent vehicleType={vehicleType} />
}
