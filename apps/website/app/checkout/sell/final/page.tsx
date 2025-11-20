import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { FinalCheckout } from "@/components/final-checkout"

export default function FinalCheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <FinalCheckout />
      <Footer />
    </main>
  )
}


