import type { Metadata } from "next"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import VehicleSelectionClient from "./VehicleSelectionClient"

export const metadata: Metadata = {
  title: "Select Your Vehicle | Garage Services Booking | Vehiverze",
  description:
    "Choose your vehicle type and proceed to book professional garage services. 2-wheeler, 3-wheeler, 4-wheeler support.",
  keywords: ["vehicle selection", "garage booking", "car service booking", "mechanic services", "vehiverze"],
  openGraph: {
    title: "Select Vehicle for Garage Services | Vehiverze",
    description: "Start your garage service booking journey. Select your vehicle type for available services.",
    type: "website",
    url: "https://vehiverze.com/garage-services/vehicle-selection",
  },
  twitter: {
    card: "summary_large_image",
    title: "Select Your Vehicle | Vehiverze",
    description: "Choose your vehicle for professional garage services.",
  },
}

export default function VehicleSelectionPage() {
  return (
    <>
      <NavBar />
      <VehicleSelectionClient />
      <Footer />
    </>
  )
}


