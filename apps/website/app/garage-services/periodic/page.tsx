import { GarageServiceDetail } from "@/components/garage-service-detail"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PeriodicServicePage() {
  const serviceData = {
    name: "Periodic Service",
    description: "Complete vehicle health checkup with oil change, filter replacement, and multi-point inspection",
    heroImage: "/car-periodic-service.png",
    startingPrice: 1299,
    duration: "2-3 hours",
    rating: 4.8,
    reviews: 2847,
    packages: [
      {
        name: "Basic Service",
        price: 1299,
        duration: "2 hours",
        features: [
          "Engine Oil Change",
          "Oil Filter Replacement",
          "Air Filter Check",
          "Battery Check",
          "Brake Fluid Check",
          "Basic Visual Inspection",
        ],
      },
      {
        name: "Standard Service",
        price: 1899,
        duration: "2.5 hours",
        features: [
          "Everything in Basic Service",
          "Coolant Top-up",
          "Brake Pad Inspection",
          "Tire Pressure Check",
          "Lights & Electrical Check",
          "Windshield Washer Refill",
        ],
        popular: true,
      },
      {
        name: "Premium Service",
        price: 2499,
        duration: "3 hours",
        features: [
          "Everything in Standard Service",
          "AC Filter Replacement",
          "Fuel Filter Check",
          "Suspension Check",
          "Exhaust System Check",
          "Complete Diagnostic Scan",
        ],
      },
    ],
    benefits: [
      "Extends vehicle life",
      "Improves fuel efficiency",
      "Prevents major breakdowns",
      "Maintains warranty",
      "Better resale value",
    ],
    faqs: [
      {
        question: "How often should I get periodic service?",
        answer: "We recommend periodic service every 6 months or 10,000 km, whichever comes first.",
      },
      {
        question: "What type of engine oil do you use?",
        answer: "We use high-quality synthetic or semi-synthetic oil based on your vehicle's requirements.",
      },
      {
        question: "Do you provide warranty on the service?",
        answer: "Yes, we provide 30-day warranty on all periodic service work.",
      },
    ],
  }

  return (
    <>
      <NavBar />
      <GarageServiceDetail serviceData={serviceData} />
      <Footer />
    </>
  )
}


