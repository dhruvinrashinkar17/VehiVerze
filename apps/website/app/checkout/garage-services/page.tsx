import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServicesCheckout } from "@/components/garage-services-checkout"

export default function GarageServicesCheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <GarageServicesCheckout />
      <Footer />
    </main>
  )
}


