import { GarageServiceDetail } from "@/components/garage-service-detail"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TruckMaintenancePage() {
  const serviceData = {
    name: "Truck Maintenance",
    description: "Comprehensive maintenance for commercial vehicles and heavy trucks",
    heroImage: "/truck-maintenance-service.png",
    startingPrice: 2499,
    duration: "4-6 hours",
    rating: 4.6,
    reviews: 892,
    packages: [
      {
        name: "Basic Maintenance",
        price: 2499,
        duration: "4 hours",
        features: [
          "Engine Oil Change",
          "Filter Replacements",
          "Brake System Check",
          "Tire Inspection",
          "Battery Check",
          "Basic Diagnostics",
        ],
      },
      {
        name: "Standard Maintenance",
        price: 3999,
        duration: "5 hours",
        features: [
          "Everything in Basic Maintenance",
          "Transmission Service",
          "Differential Check",
          "Suspension Inspection",
          "Cooling System Service",
          "Electrical System Check",
        ],
        popular: true,
      },
      {
        name: "Complete Overhaul",
        price: 7999,
        duration: "1-2 days",
        features: [
          "Everything in Standard Maintenance",
          "Engine Overhaul",
          "Transmission Overhaul",
          "Complete Brake Service",
          "Suspension Overhaul",
          "Full Vehicle Inspection",
        ],
      },
    ],
    benefits: [
      "Reduces downtime",
      "Improves fuel efficiency",
      "Extends vehicle life",
      "Ensures safety compliance",
      "Maintains load capacity",
    ],
    faqs: [
      {
        question: "How often should trucks be serviced?",
        answer: "Commercial trucks should be serviced every 3-4 months or 15,000-20,000 km depending on usage.",
      },
      {
        question: "Do you handle fleet maintenance?",
        answer: "Yes, we offer special fleet maintenance packages with bulk discounts and priority service.",
      },
      {
        question: "What about emergency breakdown service?",
        answer: "We provide 24/7 emergency breakdown service for commercial vehicles.",
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


