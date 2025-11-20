import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BrandSelector } from "@/components/new-car/brand-selector"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy New Cars | Vehiverze",
  description: "Explore and purchase new cars from top brands with the best deals and financing options.",
}

export default function NewCarsPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <BrandSelector />
      <Footer />
    </main>
  )
}


