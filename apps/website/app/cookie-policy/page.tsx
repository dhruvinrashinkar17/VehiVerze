import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Vehiverze",
  description:
    "Learn how Vehiverze uses cookies and similar technologies to provide a secure and personalized experience. Manage your cookie preferences anytime.",
}

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9] text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-black/30 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-gray-300 mb-8">
            This Cookie Policy explains how Vehiverze uses cookies and similar technologies on our website and apps.
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. What Are Cookies?</h2>
              <p className="text-gray-300">
                Cookies are small text files stored on your device when you visit a website. They help us remember your
                preferences, improve performance, and enhance security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">2. Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Essential Cookies: Required for core functionality like secure login and page navigation.</li>
                <li>Performance Cookies: Help us understand how users interact with the site to improve usability.</li>
                <li>Functional Cookies: Remember choices such as language, city, or saved filters.</li>
                <li>
                  Analytics Cookies: Provide aggregated usage data to help us improve features and content relevance.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">3. How We Use Cookies</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Keeping you signed in securely</li>
                <li>Saving your preferred city and vehicle filters</li>
                <li>Measuring performance and diagnosing issues</li>
                <li>Improving content relevance and personalization</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Managing Your Preferences</h2>
              <p className="text-gray-300">
                You can control cookies through your browser settings. Disabling some cookies may impact site
                functionality. For detailed steps, see your browser&apos;s help documentation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">5. Updates to This Policy</h2>
              <p className="text-gray-300">
                We may update this Cookie Policy from time to time. Changes are effective when posted on this page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
              <p className="text-gray-300">
                For questions about this Cookie Policy, contact our support team via the Contact page.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}


