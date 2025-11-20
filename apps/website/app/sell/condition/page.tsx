import { VehicleConditionSelector } from "@/components/vehicle-condition-selector"
import { SellPageFAQs } from "@/components/sell-page-faqs"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function VehicleConditionPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <VehicleConditionSelector />
      </div>
      <SellPageFAQs pageType="condition" />
      <Footer />
    </main>
  )
}


