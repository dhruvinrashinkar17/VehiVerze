import type { Metadata } from "next"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import BookingDetailsClient from "./BookingDetailsClient"

export const metadata: Metadata = {
  title: "Schedule Your Service | Garage Booking | Vehiverze",
  description: "Choose your preferred date and time slot for garage services. Quick and easy appointment scheduling.",
  keywords: ["garage booking", "service scheduling", "appointment booking", "car service", "vehiverze"],
  openGraph: {
    title: "Schedule Your Garage Service | Vehiverze",
    description: "Book your preferred date and time for professional car maintenance services.",
    type: "website",
    url: "https://vehiverze.com/garage-services/booking-details",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule Service | Vehiverze",
    description: "Choose date and time for your garage service appointment.",
  },
}

export default function BookingDetailsPage() {
  return (
    <>
      <NavBar />
      <BookingDetailsClient />
      <Footer />
    </>
  )
}


