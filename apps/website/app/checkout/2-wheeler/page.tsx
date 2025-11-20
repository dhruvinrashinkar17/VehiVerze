import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VehicleCheckout } from "@/components/vehicle-checkout"

export const metadata: Metadata = {
  title: "2 Wheeler Checkout | Complete Your Bike Purchase | Vehiverze",
  description:
    "Checkout your 2-wheeler purchase. Review bike details, apply financing, and complete your order securely. Fast delivery and RC transfer included.",
  keywords: "2 wheeler checkout, bike purchase, motorcycle checkout, scooter purchase, bike financing",
  robots: {
    index: false,
    follow: false,
  },
}

export default function TwoWheelerCheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <VehicleCheckout vehicleType="2-Wheeler" />
      </div>
      <Footer />
    </main>
  )
}


