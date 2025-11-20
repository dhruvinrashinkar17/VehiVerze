import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { PartnerContent } from "@/components/partner-content"

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <PartnerContent />
      <Footer />
    </main>
  )
}


