import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export const metadata = {
  title: "Insurance Claims Assistance | Vehicle Marketplace",
  description: "Professional assistance with insurance claim processing and repairs for all vehicle types",
}

export default function InsuranceClaimsPage() {
  return (
    <main>
      <NavBar />
      <GarageServiceDetail
        title="Insurance Claims Assistance"
        description="Our experienced team provides comprehensive support for processing insurance claims and completing all necessary repairs, making the process smooth and hassle-free for you."
        image="/placeholder.svg?height=400&width=600"
        benefits={[
          "Complete assistance with insurance claim filing",
          "Direct coordination with insurance companies",
          "Detailed damage assessment and documentation",
          "Transparent cost estimates for repairs",
          "Quality repairs using OEM or insurance-approved parts",
          "Regular updates on repair progress",
          "Final inspection to ensure quality repairs",
          "Assistance with claim settlement",
          "All work backed by our service guarantee",
        ]}
      />
      <Footer />
    </main>
  )
}


