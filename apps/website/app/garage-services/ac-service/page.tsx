import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function ACServicePage() {
  const serviceData = {
    name: "AC Service & Repair",
    description:
      "Complete air conditioning service and repair solutions for your vehicle",
    heroImage: "/placeholder.svg?height=300&width=600",
    startingPrice: 999,
    duration: "1-2 hours",
    rating: 4.8,
    reviews: 2341,
    packages: [
      {
        name: "AC Gas Top-up",
        price: 999,
        duration: "45 mins",
        features: [
          "AC Performance Check",
          "Gas Level Check",
          "Gas Top-up (R134a)",
          "Cooling Efficiency Test",
          "Leak Detection",
          "System Pressure Check",
        ],
      },
      {
        name: "AC Service",
        price: 1999,
        duration: "1.5 hours",
        features: [
          "Everything in Gas Top-up",
          "Cabin Filter Replacement",
          "Condenser Cleaning",
          "Evaporator Cleaning",
          "Blower Motor Check",
          "Thermostat Check",
        ],
        popular: true,
      },
      {
        name: "Complete AC Overhaul",
        price: 3999,
        duration: "3-4 hours",
        features: [
          "Everything in AC Service",
          "Compressor Check",
          "Compressor Oil Top-up",
          "Complete System Flush",
          "All Component Testing",
          "1 Year Warranty",
        ],
      },
    ],
    benefits: [
      "Improved cooling efficiency",
      "Better air quality inside the vehicle",
      "Reduced fuel consumption",
      "Extended AC system lifespan",
      "Prevention of major AC system failures",
    ],
    faqs: [
      {
        question: "How often should AC be serviced?",
        answer:
          "AC should be serviced once a year or when you notice reduced cooling performance.",
      },
      {
        question: "What causes AC to stop cooling?",
        answer:
          "Common causes include low refrigerant, clogged filters, faulty compressor, or electrical issues.",
      },
      {
        question: "How long does AC gas last?",
        answer:
          "AC gas typically lasts 2-3 years. If it needs frequent refilling, there may be a leak in the system.",
      },
    ],
  };

  return (
    <>
      <NavBar />
      <GarageServiceDetail serviceData={serviceData} />
      <Footer />
    </>
  );
}
