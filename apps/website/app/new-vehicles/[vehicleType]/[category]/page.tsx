import { NewVehicleCategoryContent } from "@/components/new-vehicle-category-content"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{
    vehicleType: string
    category: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vehicleType, category } = await params

  const vehicleTypeFormatted = vehicleType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const categoryFormatted = category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `New ${categoryFormatted} ${vehicleTypeFormatted} | Best Prices & Features | Vehiverze`,
    description: `Explore the latest ${categoryFormatted} ${vehicleTypeFormatted} models with advanced features, competitive prices, and flexible financing options. Find your perfect vehicle today.`,
    keywords: [
      `new ${category}`,
      `${category} models`,
      `${vehicleType} ${category}`,
      `buy ${category}`,
      `${category} price`,
      `latest ${category} models`,
      `${category} features`,
      `${category} specifications`,
    ],
    openGraph: {
      title: `New ${categoryFormatted} ${vehicleTypeFormatted} | Vehiverze`,
      description: `Discover the latest ${categoryFormatted} models with cutting-edge technology and competitive pricing.`,
      images: [`/images/${category}-models-og.jpg`],
    },
  }
}

export default async function NewVehicleCategoryPage({ params }: PageProps) {
  const { vehicleType, category } = await params

  return <NewVehicleCategoryContent vehicleType={vehicleType} category={category} />
}
