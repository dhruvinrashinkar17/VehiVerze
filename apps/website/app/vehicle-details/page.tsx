import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VehicleDetailsContent } from "@/components/vehicle-details-content"

export const metadata = {
  title: "Check Vehicle Details - Comprehensive Vehicle Information | Vehiverze",
  description:
    "Get complete information about any vehicle including registration details, ownership history, insurance status, and more with our vehicle details lookup tool.",
}

export default function VehicleDetailsPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <VehicleDetailsContent />
      <Footer />
    </main>
  )
}


