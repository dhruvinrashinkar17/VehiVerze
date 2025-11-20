import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export default function DentingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <GarageServiceDetail
        title="Denting & Painting"
        description="Professional dent removal and painting services to restore your vehicle's appearance"
        image="/placeholder.svg?height=300&width=600"
        benefits={[
          "Restores vehicle appearance",
          "Prevents rust and corrosion",
          "Maintains vehicle value",
          "Color matching expertise",
          "Quality finish guaranteed",
        ]}
      />
      <Footer />
    </main>
  )
}


