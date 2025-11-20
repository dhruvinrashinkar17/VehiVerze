import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { SellCheckout } from "@/components/sell-checkout"

export default function SellCheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <SellCheckout />
      <Footer />
    </main>
  )
}


