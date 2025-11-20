import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-black/30 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Vehiverze, you accept and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
              <p>Users must:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of their account</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in fraudulent activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Vehicle Listings</h2>
              <p>When listing a vehicle:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>All information must be accurate and truthful</li>
                <li>Images must be current and represent the actual vehicle</li>
                <li>Pricing must be reasonable and market-appropriate</li>
                <li>Sellers must have legal right to sell the vehicle</li>
              </ul>
            </section>

            {/* Add more sections as needed */}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}


