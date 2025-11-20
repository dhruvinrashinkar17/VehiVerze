import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BuyPage } from "@/components/buy-page"

export const metadata: Metadata = {
  title: "Buy Vehicles Online | New & Used Cars, Bikes, Trucks | Vehiverze",
  description:
    "Browse and buy new and used vehicles online. Find the best deals on cars, bikes, auto-rickshaws, trucks, and buses. Secure checkout, instant financing, and verified sellers.",
  keywords:
    "buy vehicles online, buy cars, buy bikes, buy auto-rickshaw, buy truck, buy bus, vehicle purchase, online vehicle shopping, car deals, bike deals, commercial vehicles",
  openGraph: {
    title: "Buy Vehicles Online | New & Used Cars, Bikes, Trucks | Vehiverze",
    description:
      "Browse and buy new and used vehicles online. Find the best deals on cars, bikes, auto-rickshaws, trucks, and buses. Secure checkout, instant financing, and verified sellers.",
    type: "website",
    url: "https://vehiverze.com/buy",
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
    canonical: "https://vehiverze.com/buy",
  },
}

export default function BuyVehiclePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <BuyPage />
      <Footer />
    </main>
  )
}


