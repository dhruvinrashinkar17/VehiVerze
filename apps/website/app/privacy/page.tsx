import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-black/30 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including but not limited to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Vehicle information and details</li>
                <li>Location information</li>
                <li>Device information and usage data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide and improve our services</li>
                <li>Process your vehicle transactions</li>
                <li>Communicate with you about our services</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Service providers and business partners</li>
                <li>Law enforcement when required by law</li>
                <li>Other users when necessary for transactions</li>
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


