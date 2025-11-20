import type { Metadata } from "next"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import CheckoutClient from "./CheckoutClient"

export const metadata: Metadata = {
  title: "Complete Your Booking | Garage Services Checkout | Vehiverze",
  description: "Finalize your garage service booking. Secure payment and instant confirmation.",
  keywords: ["garage checkout", "service booking confirmation", "car service payment", "vehiverze booking"],
  openGraph: {
    title: "Confirm Your Garage Service Booking | Vehiverze",
    description: "Complete your booking with secure payment. Instant confirmation and service details.",
    type: "website",
    url: "https://vehiverze.com/garage-services/checkout",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout | Vehiverze",
    description: "Complete your garage service booking securely.",
  },
}

export default function CheckoutPage() {
  return (
    <>
      <NavBar />
      <CheckoutClient />
      <Footer />
    </>
  )
}


