import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GarageServiceDetail } from "@/components/garage-service-detail"

export default function BatteriesPage() {
  const serviceData = {
    name: "Battery Service & Replacement",
    description: "Professional battery replacement and maintenance services for all vehicle types",
    heroImage: "/placeholder.svg?height=300&width=600",
    startingPrice: 899,
    duration: "30-45 minutes",
    rating: 4.7,
    reviews: 1523,
    packages: [
      {
        name: "Battery Check",
        price: 199,
        duration: "15 minutes",
        features: ["Battery voltage test", "Terminal cleaning", "Load test", "Visual inspection", "Performance report"],
      },
      {
        name: "Battery Replacement",
        price: 899,
        duration: "30 minutes",
        features: [
          "Remove old battery",
          "Install new battery",
          "Terminal cleaning & protection",
          "System check",
          "6-month warranty",
          "Old battery disposal",
        ],
        popular: true,
      },
      {
        name: "Premium Battery + Service",
        price: 1299,
        duration: "45 minutes",
        features: [
          "Premium long-life battery",
          "Complete electrical system check",
          "Alternator test",
          "Starter motor check",
          "12-month warranty",
          "Free pickup & drop",
        ],
      },
    ],
    benefits: [
      "Reliable starting power",
      "Extended battery life",
      "Roadside assistance available",
      "Warranty on new batteries",
      "Proper disposal of old batteries",
    ],
    faqs: [
      {
        question: "How do I know if my battery needs replacement?",
        answer:
          "Signs include slow engine cranking, dim headlights, dashboard warning lights, or a battery that's over 3-4 years old.",
      },
      {
        question: "What warranty do you provide on batteries?",
        answer: "We provide 6-12 months warranty depending on the battery type and package selected.",
      },
      {
        question: "Do you dispose of old batteries properly?",
        answer:
          "Yes, we ensure environmentally responsible disposal of all old batteries at certified recycling centers.",
      },
    ],
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#ffffff]">
      <NavBar />
      <GarageServiceDetail serviceData={serviceData} />
      <Footer />
    </main>
  )
}


