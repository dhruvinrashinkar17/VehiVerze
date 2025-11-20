import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VariantSelector } from "@/components/new-car/variant-selector"
import type { Metadata } from "next"

interface VariantPageProps {
  params: {
    brand: string
    model: string
    year: string
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

export function generateMetadata({ params }: VariantPageProps): Metadata {
  const brandName = getBrandName(params.brand)
  const modelName = getModelName(params.model)

  return {
    title: `${brandName} ${modelName} ${params.year} - Select Variant | Vehiverze`,
    description: `Choose the perfect variant for your new ${brandName} ${modelName} ${params.year}.`,
  }
}

export default function VariantPage({ params }: VariantPageProps) {
  const brandName = getBrandName(params.brand)
  const modelName = getModelName(params.model)

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <VariantSelector
        brandId={params.brand}
        modelId={params.model}
        year={params.year}
        brandName={brandName}
        modelName={modelName}
      />
      <Footer />
    </main>
  )
}
