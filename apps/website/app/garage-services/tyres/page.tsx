import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { GarageServiceDetail } from "@/components/garage-service-detail";
import { SeoSchema } from "@/components/seo-schema";

export const metadata = {
  title: "Tyres & Wheel Care Services | Vehiverze",
  description:
    "Professional tyre replacement, wheel alignment and balancing services for all vehicle types. Book your service now!",
  keywords:
    "tyre service, wheel alignment, wheel balancing, car tyres, bike tyres, tyre replacement",
};

export default function TyresPage() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tyres & Wheel Care Services",
    description:
      "Professional tyre replacement, wheel alignment and balancing services for all vehicle types",
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
  };

  const serviceData = {
    name: "Tyres & Wheel Care",
    description:
      "Professional tyre replacement, wheel alignment and balancing services for optimal vehicle performance and safety",
    heroImage: "/placeholder.svg?height=400&width=600",
    startingPrice: 499,
    duration: "30-60 mins",
    rating: 4.8,
    reviews: 2156,
    packages: [
      {
        name: "Wheel Balancing",
        price: 499,
        duration: "30 mins",
        features: [
          "All 4 Wheels Balanced",
          "Weight Application",
          "Vibration Check",
          "Tyre Pressure Check",
          "Visual Inspection",
          "Road Test",
        ],
      },
      {
        name: "Wheel Alignment",
        price: 799,
        duration: "45 mins",
        features: [
          "Computerized Alignment",
          "Toe, Camber, Caster Check",
          "Steering Wheel Centering",
          "Suspension Inspection",
          "Before/After Report",
          "Road Test",
        ],
        popular: true,
      },
      {
        name: "Complete Tyre Service",
        price: 1299,
        duration: "1 hour",
        features: [
          "Everything Above",
          "Tyre Rotation",
          "Tyre Condition Check",
          "Brake Pad Inspection",
          "Nitrogen Top-up",
          "Tyre Recommendation",
        ],
      },
    ],
    benefits: [
      "Improved vehicle handling and stability",
      "Better fuel efficiency",
      "Enhanced safety on the road",
      "Extended tyre life",
      "Reduced wear on suspension components",
      "Smoother and more comfortable ride",
    ],
    faqs: [
      {
        question: "How often should I get wheel alignment?",
        answer:
          "We recommend wheel alignment every 10,000 km or when you notice uneven tyre wear or the car pulling to one side.",
      },
      {
        question: "What is the difference between balancing and alignment?",
        answer:
          "Balancing ensures weight is evenly distributed on the wheel, while alignment adjusts the angle of the wheels for proper contact with the road.",
      },
      {
        question: "How long do tyres typically last?",
        answer:
          "Tyres typically last 40,000-60,000 km depending on driving habits, road conditions, and proper maintenance.",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />

      {/* SEO Schema */}
      <SeoSchema data={structuredData} />

      <GarageServiceDetail serviceData={serviceData} />
      <Footer />
    </main>
  );
}
