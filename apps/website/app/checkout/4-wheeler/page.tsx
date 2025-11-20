import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VehicleCheckout } from "@/components/vehicle-checkout"

export const metadata: Metadata = {
  title: "4 Wheeler Checkout | Complete Your Car Purchase | Vehiverze",
  description:
    "Checkout your 4-wheeler purchase. Review car details, apply financing, and complete your order securely. Fast delivery and RC transfer included.",
  keywords: "4 wheeler checkout, car purchase, car checkout, vehicle financing, car delivery",
  robots: {
    index: false,
    follow: false,
  },
}

export default function FourWheelerCheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <VehicleCheckout vehicleType="4-Wheeler" />
      </div>
      <Footer />
    </main>
  )
}


