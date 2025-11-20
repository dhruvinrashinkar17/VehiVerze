import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceBooking } from "@/components/garage-service-booking"

export default function GarageServiceBookingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <GarageServiceBooking />
      <Footer />
    </main>
  )
}


