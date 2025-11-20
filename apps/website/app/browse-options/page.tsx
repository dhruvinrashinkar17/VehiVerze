import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BrowseVehicleOptions } from "@/components/browse-vehicle-options"

export default function BrowseOptionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <BrowseVehicleOptions />
      <Footer />
    </main>
  )
}


