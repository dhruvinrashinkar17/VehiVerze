import { NavBar } from "@/components/navbar"
import { SellVehicleSEO } from "@/components/sell-vehicle-seo"
import { Footer } from "@/components/footer"
import { EnhancedSellFlow } from "@/components/enhanced-sell-flow"
import { VehicleTypeFAQs } from "@/components/sell-page-faqs"

// Define brands specific to 2-wheelers
const twoWheelerBrands = [
  { name: "Honda", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Hero", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Bajaj", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "TVS", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Royal Enfield", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Yamaha", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Suzuki", logo: "/placeholder.svg?height=50&width=100" },
  { name: "KTM", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Jawa", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Triumph", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Harley Davidson", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Kawasaki", logo: "/placeholder.svg?height=50&width=100" },
]

export default function SellTwoWheelerPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="py-8">
        <EnhancedSellFlow vehicleType="2-wheeler" brands={twoWheelerBrands} vehicleTypeName="2 Wheeler" icon="🏍️" />
      </div>
      <SellVehicleSEO vehicleType="2-wheeler" />
      <VehicleTypeFAQs vehicleType="2-wheeler" />
      <Footer />
    </main>
  )
}


