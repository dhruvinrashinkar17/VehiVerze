import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EnhancedSellFlow } from "@/components/enhanced-sell-flow"
import { VehicleTypeFAQs } from "@/components/sell-page-faqs"
import { SellVehicleSEO } from "@/components/sell-vehicle-seo"

// Define brands specific to 8-wheelers
const eightWheelerBrands = [
  { name: "Tata", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Ashok Leyland", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Volvo", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Scania", logo: "/placeholder.svg?height=50&width=100" },
  { name: "BharatBenz", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Eicher", logo: "/placeholder.svg?height=50&width=100" },
  { name: "MAN", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Mahindra", logo: "/placeholder.svg?height=50&width=100" },
]

export default function SellEightWheelerPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="py-8">
        <EnhancedSellFlow vehicleType="8-wheeler" brands={eightWheelerBrands} vehicleTypeName="8 Wheeler" icon="🚛" />
      </div>
      <SellVehicleSEO vehicleType="8-wheeler" />
      <VehicleTypeFAQs vehicleType="8-wheeler" />
      <Footer />
    </main>
  )
}


