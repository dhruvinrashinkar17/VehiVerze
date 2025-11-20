import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { SellVehicleOptions } from "@/components/sell-vehicle-options"

export default function SellOptionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <SellVehicleOptions />
      <Footer />
    </main>
  )
}


