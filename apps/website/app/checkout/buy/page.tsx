import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BuyCheckout } from "@/components/buy-checkout"

export const metadata: Metadata = {
  title: "Buy Vehicles Online | Best Deals on Cars, Bikes & Commercial Vehicles | Vehiverze",
  description:
    "Browse and buy new and used vehicles online. Find the best deals on cars, bikes, auto-rickshaws, trucks, and buses. Secure checkout, instant financing options, and verified sellers.",
  keywords:
    "buy vehicles online, buy cars, buy bikes, buy auto-rickshaw, buy truck, buy bus, vehicle purchase, online vehicle shopping, car deals, bike deals",
  openGraph: {
    title: "Buy Vehicles Online | Best Deals on Cars, Bikes & Commercial Vehicles | Vehiverze",
    description:
      "Browse and buy new and used vehicles online. Find the best deals on cars, bikes, auto-rickshaws, trucks, and buses. Secure checkout, instant financing options, and verified sellers.",
    type: "website",
    url: "https://vehiverze.com/checkout/buy",
    siteName: "Vehiverze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Vehicles Online | Vehiverze",
    description: "Find and buy the perfect vehicle with secure checkout and financing options.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://vehiverze.com/checkout/buy",
  },
}

export default function BuyCheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <BuyCheckout />
      <Footer />
    </main>
  )
}


