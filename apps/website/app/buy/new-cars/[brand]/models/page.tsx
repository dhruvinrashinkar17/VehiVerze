import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ModelSelector } from "@/components/new-car/model-selector"
import type { Metadata } from "next"

interface ModelPageProps {
  params: {
    brand: string
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
    honda: "Honda",
    mg: "MG",
    volkswagen: "Volkswagen",
    skoda: "Skoda",
    "mercedes-benz": "Mercedes-Benz",
    bmw: "BMW",
    audi: "Audi",
    jeep: "Jeep",
    nissan: "Nissan",
    renault: "Renault",
  }

  return brands[brandId] || brandId
}

export function generateMetadata({ params }: ModelPageProps): Metadata {
  const brandName = getBrandName(params.brand)

  return {
    title: `${brandName} Models | Vehiverze`,
    description: `Explore all ${brandName} car models available for purchase at Vehiverze.`,
  }
}

export default function ModelPage({ params }: ModelPageProps) {
  const brandName = getBrandName(params.brand)

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <ModelSelector brandId={params.brand} brandName={brandName} />
      <Footer />
    </main>
  )
}
