import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export default function InspectionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <GarageServiceDetail
        title="Car Inspections"
        description="Comprehensive vehicle inspection services to ensure safety and performance"
        image="/placeholder.svg?height=300&width=600"
        benefits={[
          "Detailed multi-point inspection",
          "Early detection of potential issues",
          "Safety verification",
          "Performance evaluation",
          "Digital inspection report",
        ]}
      />
      <Footer />
    </main>
  )
}


