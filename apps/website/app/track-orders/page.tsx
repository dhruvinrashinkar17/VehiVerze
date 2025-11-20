import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { TrackOrdersContent } from "@/components/track-orders-content"

export default function TrackOrdersPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <TrackOrdersContent />
      <Footer />
    </main>
  )
}


