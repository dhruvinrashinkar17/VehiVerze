import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export default function DetailingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <GarageServiceDetail
        title="Detailing Services"
        description="Comprehensive vehicle detailing services for interior and exterior"
        image="/placeholder.svg?height=300&width=600"
        benefits={[
          "Deep cleaning of interior and exterior",
          "Protection against environmental damage",
          "Restoration of vehicle's original shine",
          "Removal of tough stains and odors",
          "Enhanced vehicle appearance",
        ]}
      />
      <Footer />
    </main>
  )
}


