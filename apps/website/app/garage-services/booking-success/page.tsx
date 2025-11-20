import type { Metadata } from "next"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import BookingSuccessClient from "./BookingSuccessClient"

export const metadata: Metadata = {
  title: "Booking Confirmed | Your Garage Service Appointment | Vehiverze",
  description: "Your garage service booking is confirmed. Track your appointment and manage your bookings.",
  keywords: ["booking confirmation", "service confirmation", "appointment confirmed", "vehiverze garage"],
  openGraph: {
    title: "Your Garage Service is Booked | Vehiverze",
    description: "Congratulations! Your garage service appointment is confirmed. Track it on Vehiverze.",
    type: "website",
    url: "https://vehiverze.com/garage-services/booking-success",
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking Confirmed | Vehiverze",
    description: "Your garage service appointment has been successfully booked.",
  },
}

export default function GarageBookingSuccessPage() {
  return (
    <>
      <NavBar />
      <BookingSuccessClient />
      <Footer />
    </>
  )
}


