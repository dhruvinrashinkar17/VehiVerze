import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ChallanContent } from "@/components/challan-content"

export const metadata = {
  title: "Check & Pay Challan - Clear Your Traffic Fines | Vehiverze",
  description:
    "Check and pay your traffic challan online. Quick, secure, and hassle-free payment for all your vehicle-related fines and penalties.",
}

export default function ChallanPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <ChallanContent />
      <Footer />
    </main>
  )
}


