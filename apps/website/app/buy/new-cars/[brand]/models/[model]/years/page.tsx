import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { YearSelector } from "@/components/new-car/year-selector"
import type { Metadata } from "next"

interface YearPageProps {
  params: {
    brand: string
    model: string
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

export function generateMetadata({ params }: YearPageProps): Metadata {
  const brandName = getBrandName(params.brand)
  const modelName = getModelName(params.model)

  return {
    title: `${brandName} ${modelName} - Select Year | Vehiverze`,
    description: `Choose the manufacturing year for your new ${brandName} ${modelName}.`,
  }
}

export default function YearPage({ params }: YearPageProps) {
  const brandName = getBrandName(params.brand)
  const modelName = getModelName(params.model)

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <YearSelector brandId={params.brand} modelId={params.model} brandName={brandName} modelName={modelName} />
      <Footer />
    </main>
  )
}
