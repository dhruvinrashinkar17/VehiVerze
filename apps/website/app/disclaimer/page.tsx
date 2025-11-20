import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer | Vehiverze",
  description:
    "Read the legal disclaimer for Vehiverze including information accuracy, liabilities, and third-party links.",
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9] text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-black/30 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
          <p className="text-gray-300 mb-8">
            The information on this website is provided for general informational purposes only.
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. No Warranties</h2>
              <p className="text-gray-300">
                Vehiverze makes no representations or warranties regarding the accuracy, completeness, or reliability of
                any information, listings, or content on the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">2. Limitation of Liability</h2>
              <p className="text-gray-300">
                In no event shall Vehiverze be liable for any direct, indirect, incidental, or consequential damages
                arising out of the use of, or inability to use, the platform or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">3. External Links</h2>
              <p className="text-gray-300">
                Our site may contain links to third-party websites. Vehiverze is not responsible for the content,
                privacy policies, or practices of any third-party sites or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Testimonials and Reviews</h2>
              <p className="text-gray-300">
                Testimonials are individual experiences, which may not be representative. Results may vary based on
                vehicle condition and other factors.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">5. Changes</h2>
              <p className="text-gray-300">We may update this Disclaimer. Changes become effective when posted.</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}


