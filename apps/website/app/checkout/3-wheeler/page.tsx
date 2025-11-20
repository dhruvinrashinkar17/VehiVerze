import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VehicleCheckout } from "@/components/vehicle-checkout"

export default function ThreeWheelerCheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <VehicleCheckout vehicleType="3-Wheeler" />
      </div>
      <Footer />
    </main>
  )
}


