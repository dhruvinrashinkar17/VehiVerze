import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sitemap | Vehiverze",
  description:
    "Browse the Vehiverze sitemap to quickly access vehicle buying, selling, garage services, and support pages.",
}

const sections: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Buy",
    links: [
      { label: "All Vehicles", href: "/buy" },
      { label: "2 Wheelers", href: "/buy/2-wheeler" },
      { label: "3 Wheelers", href: "/buy/3-wheeler" },
      { label: "4 Wheelers", href: "/buy/4-wheeler" },
      { label: "6 Wheelers", href: "/buy/6-wheeler" },
      { label: "8+ Wheelers", href: "/buy/more-than-8-wheeler" },
    ],
  },
  {
    title: "Sell",
    links: [
      { label: "Sell Vehicle", href: "/sell" },
      { label: "Sell 2 Wheeler", href: "/sell/2-wheeler" },
      { label: "Sell 3 Wheeler", href: "/sell/3-wheeler" },
      { label: "Sell 4 Wheeler", href: "/sell/4-wheeler" },
      { label: "Sell 6 Wheeler", href: "/sell/6-wheeler" },
      { label: "Sell 8 Wheeler", href: "/sell/8-wheeler" },
      { label: "Sell 8+ Wheelers", href: "/sell/more-than-8-wheeler" },
    ],
  },
  {
    title: "Garage Services",
    links: [
      { label: "Overview", href: "/garage-services" },
      { label: "AC Service", href: "/garage-services/ac-service" },
      { label: "Batteries", href: "/garage-services/batteries" },
      { label: "Car Spa", href: "/garage-services/car-spa" },
      { label: "Clutch & Body", href: "/garage-services/clutch-body" },
      { label: "Denting & Painting", href: "/garage-services/denting" },
      { label: "Inspections", href: "/garage-services/inspections" },
      { label: "Suspension", href: "/garage-services/suspension" },
      { label: "Tyres", href: "/garage-services/tyres" },
      { label: "Windshields", href: "/garage-services/windshields" },
      { label: "Truck Maintenance", href: "/garage-services/truck-maintenance" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Vehicle Valuation", href: "/vehicle-valuation" },
      { label: "Check & Pay Challan", href: "/challan" },
      { label: "Check Vehicle Details", href: "/vehicle-details" },
      { label: "Explore New Vehicles", href: "/new-vehicles" },
      { label: "Scrap Your Vehicle", href: "/scrap" },
      { label: "EMI Calculator", href: "/emi-calculator" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Partner with Us", href: "/partner" },
      { label: "Contact", href: "/contact" },
      { label: "Customer Support", href: "/customer-support" },
    ],
  },
  {
    title: "Legal & Policies",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Refund & Cancellation", href: "/refund-cancellation" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "XML Sitemap", href: "/sitemap.xml" },
      { label: "Robots.txt", href: "/robots.txt" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9] text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div key={section.title} className="bg-black/30 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-gray-200 hover:text-white underline underline-offset-4">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}


