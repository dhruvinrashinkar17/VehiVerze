import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export const metadata = {
  title: "Clutch & Body Parts Services | Vehicle Marketplace",
  description: "Professional clutch replacement and body part repair services for all vehicle types",
}

export default function ClutchBodyPage() {
  return (
    <main>
      <NavBar />
      <GarageServiceDetail
        title="Clutch & Body Parts Services"
        description="Our skilled technicians provide expert clutch replacement and body part repair services to keep your vehicle performing at its best and looking great."
        image="/placeholder.svg?height=400&width=600"
        benefits={[
          "Complete clutch system diagnosis and replacement",
          "Flywheel resurfacing and replacement",
          "Pressure plate and release bearing services",
          "Body panel repair and replacement",
          "Bumper repair and replacement",
          "Door, hood, and trunk lid repairs",
          "Fender repair and replacement",
          "Quality OEM and aftermarket parts available",
          "All work backed by our service guarantee",
        ]}
      />
      <Footer />
    </main>
  )
}


