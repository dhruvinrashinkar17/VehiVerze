import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export default function WindshieldsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <GarageServiceDetail
        title="Windshields & Lights"
        description="Repair and replacement services for windshields and vehicle lights"
        image="/placeholder.svg?height=300&width=600"
        benefits={[
          "Improved visibility and safety",
          "Quick windshield repair or replacement",
          "Headlight restoration",
          "Light bulb replacement",
          "Insurance claim assistance",
        ]}
      />
      <Footer />
    </main>
  )
}


