import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export default function CarSpaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <GarageServiceDetail
        title="Car Spa & Cleaning"
        description="Premium car spa and cleaning services for a refreshed vehicle experience"
        image="/placeholder.svg?height=300&width=600"
        benefits={[
          "Thorough interior and exterior cleaning",
          "Specialized treatments for different surfaces",
          "Eco-friendly cleaning products",
          "Odor elimination",
          "Protection against dirt and grime",
        ]}
      />
      <Footer />
    </main>
  )
}


