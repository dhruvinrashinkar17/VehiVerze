import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EnhancedSellFlow } from "@/components/enhanced-sell-flow"
import { VehicleTypeFAQs } from "@/components/sell-page-faqs"
import { SellVehicleSEO } from "@/components/sell-vehicle-seo"

// Define brands specific to 3-wheelers
const threeWheelerBrands = [
  { name: "Bajaj", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Piaggio", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Mahindra", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "TVS", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Atul", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Kinetic", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Force", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Lohia", logo: "/placeholder.svg?height=50&width=100" },
]

export default function SellThreeWheelerPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="py-8">
        <EnhancedSellFlow vehicleType="3-wheeler" brands={threeWheelerBrands} vehicleTypeName="3 Wheeler" icon="🛺" />
      </div>
      <SellVehicleSEO vehicleType="3-wheeler" />
      <VehicleTypeFAQs vehicleType="3-wheeler" />
      <Footer />
    </main>
  )
}


