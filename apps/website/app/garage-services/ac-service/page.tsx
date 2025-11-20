import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export default function ACServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <GarageServiceDetail
        title="AC Service & Repair"
        description="Complete air conditioning service and repair solutions for your vehicle"
        image="/placeholder.svg?height=300&width=600"
        benefits={[
          "Improved cooling efficiency",
          "Better air quality inside the vehicle",
          "Reduced fuel consumption",
          "Extended AC system lifespan",
          "Prevention of major AC system failures",
        ]}
      />
      <Footer />
    </main>
  )
}


