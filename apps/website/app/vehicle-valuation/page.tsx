import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VehicleValuationContent } from "@/components/vehicle-valuation-content"

export const metadata = {
  title: "Vehicle Valuation - Get Your Vehicle's Worth | Vehiverze",
  description:
    "Get an accurate valuation for your vehicle in minutes. Know the true market value of your car, bike, or commercial vehicle with Vehiverze's valuation tool.",
}

export default function VehicleValuationPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <VehicleValuationContent />
      <Footer />
    </main>
  )
}


