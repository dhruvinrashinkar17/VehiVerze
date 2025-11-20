import { InspectionBookingForm } from "@/components/inspection-booking-form"
import { SellPageFAQs } from "@/components/sell-page-faqs"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function InspectionBookingPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Book Your Free Inspection</h1>
        <InspectionBookingForm />
      </div>
      <SellPageFAQs pageType="inspection" />
      <Footer />
    </main>
  )
}


