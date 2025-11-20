"use client"

import { useSearchParams } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VehicleSellCheckout } from "@/components/vehicle-sell-checkout"
import { SellPageFAQs } from "@/components/sell-page-faqs"

export default function SellCheckoutPage() {
  const searchParams = useSearchParams()
  const vehicleType = searchParams.get("type") || "4-wheeler"

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <VehicleSellCheckout vehicleType={vehicleType as string} />
      <SellPageFAQs pageType="checkout" />
      <Footer />
    </main>
  )
}


