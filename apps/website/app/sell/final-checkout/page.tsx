"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SellFinalCheckout } from "@/components/sell-final-checkout"

export default function SellFinalCheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const vehicleType = searchParams.get("type") || "4-wheeler"

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <SellFinalCheckout vehicleType={vehicleType} />
      <Footer />
    </main>
  )
}


