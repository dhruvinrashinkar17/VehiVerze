import { NewVehicleModelDetails } from "@/components/new-vehicle-model-details"
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

  // In a real app, you'd fetch the model data here
  const modelName = `Model ${modelId}` // This would be fetched from your data source

  return {
    title: `${modelName} - Specifications, Features & Price | Vehiverze`,
    description: `Detailed specifications, features, and pricing information for ${modelName}. Compare variants, view images, and book your test drive today.`,
    keywords: [
      modelName,
      `${modelName} specifications`,
      `${modelName} price`,
      `${modelName} features`,
      `${modelName} review`,
      `buy ${modelName}`,
      `${modelName} variants`,
    ],
    openGraph: {
      title: `${modelName} - Complete Details & Best Price | Vehiverze`,
      description: `Explore ${modelName} with detailed specifications, features, and competitive pricing. Book your test drive now.`,
      images: [`/images/${modelName.toLowerCase().replace(/\s+/g, "-")}-og.jpg`],
    },
  }
}

export default async function ModelDetailsPage({ params }: PageProps) {
  const { vehicleType, category, modelId } = await params

  return <NewVehicleModelDetails vehicleType={vehicleType} category={category} modelId={modelId} />
}
