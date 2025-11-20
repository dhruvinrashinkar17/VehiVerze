import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VehicleCheckout } from "@/components/vehicle-checkout"

export const metadata: Metadata = {
  title: "6 Wheeler Checkout | Complete Your Truck Purchase | Vehiverze",
  description:
    "Checkout your 6-wheeler purchase. Review truck details, apply financing, and complete your order securely. Commercial vehicle delivery and RC transfer included.",
  keywords: "6 wheeler checkout, truck purchase, commercial vehicle, truck financing, truck delivery",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SixWheelerCheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <VehicleCheckout vehicleType="6-Wheeler" />
      </div>
      <Footer />
    </main>
  )
}


