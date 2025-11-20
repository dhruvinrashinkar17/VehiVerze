import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Checkout } from "@/components/new-car/checkout"
import type { Metadata } from "next"

interface CheckoutPageProps {
  params: {
    brand: string
    model: string
    year: string
    variant: string
    transmission: string
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

// This would typically come from an API
const getTransmissionName = (transmissionId: string): string => {
  const transmissions: Record<string, string> = {
    manual: "Manual",
    automatic: "Automatic",
    // Add more as needed
  }

  return transmissions[transmissionId] || transmissionId
}

export function generateMetadata({ params }: CheckoutPageProps): Metadata {
  const brandName = getBrandName(params.brand)
  const modelName = getModelName(params.model)

  return {
    title: `Checkout - ${brandName} ${modelName} | Vehiverze`,
    description: `Complete your purchase of the ${brandName} ${modelName} ${params.year}.`,
  }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const brandName = getBrandName(params.brand)
  const modelName = getModelName(params.model)
  const variantName = getVariantName(params.variant)
  const transmissionName = getTransmissionName(params.transmission)

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <Checkout
        brandId={params.brand}
        modelId={params.model}
        year={params.year}
        variantId={params.variant}
        transmissionId={params.transmission}
        brandName={brandName}
        modelName={modelName}
        variantName={variantName}
        transmissionName={transmissionName}
      />
      <Footer />
    </main>
  )
}
