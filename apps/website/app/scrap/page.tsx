import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ScrapVehicleContent } from "@/components/scrap-vehicle-content"

export default function ScrapVehiclePage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <ScrapVehicleContent />
      <Footer />
    </main>
  )
}


