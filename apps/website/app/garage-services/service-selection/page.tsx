import type { Metadata } from "next"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ServiceSelectionClient from "./ServiceSelectionClient"

export const metadata: Metadata = {
  title: "Select Services | Professional Car Maintenance | Vehiverze",
  description: "Choose from AC repair, car servicing, battery replacement, tyre care, detailing, inspections and more.",
  keywords: ["car services", "maintenance services", "repair services", "professional detailing", "vehiverze garage"],
  openGraph: {
    title: "Professional Garage Services | Vehiverze",
    description: "Browse and select from our comprehensive range of garage services with transparent pricing.",
    type: "website",
    url: "https://vehiverze.com/garage-services/service-selection",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose Services | Vehiverze",
    description: "Select professional garage services for your vehicle.",
  },
}

export default function ServiceSelectionPage() {
  return (
    <>
      <NavBar />
      <ServiceSelectionClient />
      <Footer />
    </>
  )
}


