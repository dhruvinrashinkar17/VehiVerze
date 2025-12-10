import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function WindshieldsPage() {
  const serviceData = {
    name: "Windshields & Lights",
    description:
      "Repair and replacement services for windshields and vehicle lights",
    heroImage: "/placeholder.svg?height=300&width=600",
    startingPrice: 499,
    duration: "1-3 hours",
    rating: 4.7,
    reviews: 1456,
    packages: [
      {
        name: "Chip Repair",
        price: 499,
        duration: "30 mins",
        features: [
          "Windshield Chip Repair",
          "Crack Assessment",
          "Resin Filling",
          "UV Curing",
          "Quality Check",
          "Warranty Included",
        ],
      },
      {
        name: "Windshield Replacement",
        price: 4999,
        duration: "2-3 hours",
        features: [
          "OEM Quality Glass",
          "Professional Installation",
          "Weather Seal Check",
          "Sensor Calibration",
          "Clean-up Service",
          "1 Year Warranty",
        ],
        popular: true,
      },
      {
        name: "Complete Light Service",
        price: 1999,
        duration: "1-2 hours",
        features: [
          "Headlight Restoration",
          "Bulb Replacement",
          "Fog Light Service",
          "Tail Light Check",
          "Alignment Adjustment",
          "Electrical Check",
        ],
      },
    ],
    benefits: [
      "Improved visibility and safety",
      "Quick windshield repair or replacement",
      "Headlight restoration",
      "Light bulb replacement",
      "Insurance claim assistance",
    ],
    faqs: [
      {
        question: "Can small chips be repaired?",
        answer:
          "Yes, chips smaller than a quarter can usually be repaired. Larger cracks may require replacement.",
      },
      {
        question: "How long does windshield replacement take?",
        answer:
          "Windshield replacement takes 2-3 hours, including curing time for the adhesive.",
      },
      {
        question: "Do you cover insurance claims?",
        answer:
          "Yes, we work with all major insurance companies and can assist with the claim process.",
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
