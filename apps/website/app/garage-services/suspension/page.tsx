import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export const metadata = {
  title: "Suspension & Fitments Services | Vehicle Marketplace",
  description: "Professional suspension repair, replacement and upgrade services for all vehicle types",
}

export default function SuspensionPage() {
  return (
    <main>
      <NavBar />
      <GarageServiceDetail
        title="Suspension & Fitments Services"
        description="Our expert technicians provide comprehensive suspension repair, replacement, and upgrade services to ensure your vehicle handles smoothly and safely on any road condition."
        image="/placeholder.svg?height=400&width=600"
        benefits={[
          "Complete suspension system diagnosis and repair",
          "Shock absorber and strut replacement",
          "Coil spring and leaf spring services",
          "Control arm and bushing replacement",
          "Stabilizer bar link replacement",
          "Ball joint inspection and replacement",
          "Wheel alignment after suspension work",
          "Performance suspension upgrades available",
          "All work backed by our service guarantee",
        ]}
      />
      <Footer />
    </main>
  )
}


