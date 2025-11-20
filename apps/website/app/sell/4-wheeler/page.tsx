import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EnhancedSellFlow } from "@/components/enhanced-sell-flow"
import { VehicleTypeFAQs } from "@/components/sell-page-faqs"
import { SellVehicleSEO } from "@/components/sell-vehicle-seo"

// Define brands specific to 4-wheelers
const fourWheelerBrands = [
  { name: "Maruti Suzuki", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Hyundai", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Tata", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Mahindra", logo: "/placeholder.svg?height=50&width=100", popular: true },
  { name: "Honda", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Toyota", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Kia", logo: "/placeholder.svg?height=50&width=100" },
  { name: "MG", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Skoda", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Volkswagen", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Renault", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Nissan", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Ford", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Jeep", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Mercedes-Benz", logo: "/placeholder.svg?height=50&width=100" },
  { name: "BMW", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Audi", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Lexus", logo: "/placeholder.svg?height=50&width=100" },
]

export default function SellFourWheelerPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="py-8">
        <EnhancedSellFlow vehicleType="4-wheeler" brands={fourWheelerBrands} vehicleTypeName="4 Wheeler" icon="🚗" />
      </div>
      <SellVehicleSEO vehicleType="4-wheeler" />
      <VehicleTypeFAQs vehicleType="4-wheeler" />
      <Footer />
    </main>
  )
}


