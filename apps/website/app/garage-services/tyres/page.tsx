import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"
import { SeoSchema } from "@/components/seo-schema"

export const metadata = {
  title: "Tyres & Wheel Care Services | Vehiverze",
  description:
    "Professional tyre replacement, wheel alignment and balancing services for all vehicle types. Book your service now!",
  keywords: "tyre service, wheel alignment, wheel balancing, car tyres, bike tyres, tyre replacement",
}

export default function TyresPage() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tyres & Wheel Care Services",
    description: "Professional tyre replacement, wheel alignment and balancing services for all vehicle types",
    provider: {
      "@type": "Organization",
      name: "Vehiverze",
      url: "https://vehiverze.com",
    },
    areaServed: "India",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tyre Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tyre Replacement",
          },
          price: "1999",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wheel Alignment",
          },
          price: "599",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wheel Balancing",
          },
          price: "499",
          priceCurrency: "INR",
        },
      ],
    },
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />

      {/* SEO Schema */}
      <SeoSchema data={structuredData} />

      <GarageServiceDetail
        title="Tyres & Wheel Care"
        description="Professional tyre replacement, wheel alignment and balancing services for optimal vehicle performance and safety"
        image="/placeholder.svg?height=400&width=600"
        benefits={[
          "Improved vehicle handling and stability",
          "Better fuel efficiency",
          "Enhanced safety on the road",
          "Extended tyre life",
          "Reduced wear on suspension components",
          "Smoother and more comfortable ride",
        ]}
      />
      <Footer />
    </main>
  )
}


