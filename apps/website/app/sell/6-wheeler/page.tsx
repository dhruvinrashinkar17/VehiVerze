import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EnhancedSellFlow } from "@/components/enhanced-sell-flow"
import { VehicleTypeFAQs } from "@/components/sell-page-faqs"
import { SellVehicleSEO } from "@/components/sell-vehicle-seo"

// Define brands specific to 6-wheelers
const sixWheelerBrands = [
  { name: "Tata", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Ashok Leyland", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Eicher", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "BharatBenz", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Mahindra", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Force", logo: "/placeholder.svg?height=50&width=100" },
  { name: "SML Isuzu", logo: "/placeholder.svg?height=50&width=100" },
  { name: "AMW", logo: "/placeholder.svg?height=50&width=100" },
]

export default function SellSixWheelerPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="py-8">
        <EnhancedSellFlow vehicleType="6-wheeler" brands={sixWheelerBrands} vehicleTypeName="6 Wheeler" icon="🚚" />
      </div>
      <SellVehicleSEO vehicleType="6-wheeler" />
      <VehicleTypeFAQs vehicleType="6-wheeler" />
      <Footer />
    </main>
  )
}


