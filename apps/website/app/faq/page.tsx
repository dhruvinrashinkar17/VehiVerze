import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { FAQContent } from "@/components/faq-content"

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <FAQContent />
      <Footer />
    </main>
  )
}


