import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { TransmissionSelector } from "@/components/new-car/transmission-selector"
import type { Metadata } from "next"

interface TransmissionPageProps {
  params: {
    brand: string
    model: string
    year: string
    variant: string
  }
}

// This would typically come from an API
const getBrandName = (brandId: string): string => {
  const brands: Record<string, string> = {
    "maruti-suzuki": "Maruti Suzuki",
    hyundai: "Hyundai",
    tata: "Tata",
    mahindra: "Mahindra",
    kia: "Kia",
    toyota: "Toyota",
    // Add more as needed
  }

  return brands[brandId] || brandId
}

// This would typically come from an API
const getModelName = (modelId: string): string => {
  const models: Record<string, string> = {
    swift: "Swift",
    baleno: "Baleno",
    dzire: "Dzire",
    i20: "i20",
    creta: "Creta",
    venue: "Venue",
    // Add more as needed
  }

  return models[modelId] || modelId
}

// This would typically come from an API
const getVariantName = (variantId: string): string => {
  const variants: Record<string, string> = {
    base: "Base",
    mid: "Mid",
    top: "Top",
    // Add more as needed
  }

  return variants[variantId] || variantId
}

export function generateMetadata({ params }: TransmissionPageProps): Metadata {
  const brandName = getBrandName(params.brand)
  const modelName = getModelName(params.model)
  const variantName = getVariantName(params.variant)

  return {
    title: `${brandName} ${modelName} ${params.year} ${variantName} - Select Transmission | Vehiverze`,
    description: `Choose the transmission type for your new ${brandName} ${modelName} ${params.year} ${variantName}.`,
  }
}

export default function TransmissionPage({ params }: TransmissionPageProps) {
  const brandName = getBrandName(params.brand)
  const modelName = getModelName(params.model)
  const variantName = getVariantName(params.variant)

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <TransmissionSelector
        brandId={params.brand}
        modelId={params.model}
        year={params.year}
        variantId={params.variant}
        brandName={brandName}
        modelName={modelName}
        variantName={variantName}
      />
      <Footer />
    </main>
  )
}
