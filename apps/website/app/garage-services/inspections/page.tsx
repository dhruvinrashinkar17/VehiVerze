import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function InspectionsPage() {
  const serviceData = {
    name: "Car Inspections",
    description:
      "Comprehensive vehicle inspection services to ensure safety and performance",
    heroImage: "/placeholder.svg?height=300&width=600",
    startingPrice: 499,
    duration: "1-2 hours",
    rating: 4.9,
    reviews: 3241,
    packages: [
      {
        name: "Basic Inspection",
        price: 499,
        duration: "45 mins",
        features: [
          "Engine Health Check",
          "Battery Test",
          "Tire Condition Check",
          "Brake Inspection",
          "Fluid Level Check",
          "Basic Report",
        ],
      },
      {
        name: "Pre-Purchase Inspection",
        price: 999,
        duration: "1.5 hours",
        features: [
          "Everything in Basic",
          "Accident History Check",
          "OBD Diagnostic Scan",
          "Suspension Check",
          "Test Drive Assessment",
          "Detailed Report",
        ],
        popular: true,
      },
      {
        name: "Comprehensive Inspection",
        price: 1499,
        duration: "2 hours",
        features: [
          "Everything in Pre-Purchase",
          "Underbody Inspection",
          "AC System Check",
          "Electrical System Test",
          "Paint Thickness Check",
          "Video Documentation",
        ],
      },
    ],
    benefits: [
      "Detailed multi-point inspection",
      "Early detection of potential issues",
      "Safety verification",
      "Performance evaluation",
      "Digital inspection report",
    ],
    faqs: [
      {
        question: "What does the inspection cover?",
        answer:
          "Our inspection covers engine, transmission, brakes, suspension, electrical systems, and overall safety checks.",
      },
      {
        question: "How long is the inspection report valid?",
        answer:
          "The inspection report is valid for 30 days from the date of inspection.",
      },
      {
        question: "Can I use this for insurance purposes?",
        answer:
          "Yes, our comprehensive inspection report is accepted by most insurance companies.",
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
