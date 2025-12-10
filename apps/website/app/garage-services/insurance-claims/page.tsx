import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Insurance Claims Assistance | Vehiverze",
  description:
    "Professional assistance with insurance claim processing and repairs for all vehicle types",
};

export default function InsuranceClaimsPage() {
  const serviceData = {
    name: "Insurance Claims Assistance",
    description:
      "Our experienced team provides comprehensive support for processing insurance claims and completing all necessary repairs, making the process smooth and hassle-free for you.",
    heroImage: "/placeholder.svg?height=400&width=600",
    startingPrice: 0,
    duration: "Varies",
    rating: 4.9,
    reviews: 1567,
    packages: [
      {
        name: "Claim Filing Assistance",
        price: 0,
        duration: "1-2 days",
        features: [
          "Free Damage Assessment",
          "Documentation Support",
          "Insurance Coordination",
          "Claim Filing Help",
          "Status Updates",
          "Expert Guidance",
        ],
      },
      {
        name: "Minor Repair Claims",
        price: 5000,
        duration: "3-5 days",
        features: [
          "Everything in Filing",
          "Dent & Scratch Repairs",
          "Glass Replacement",
          "Light Repairs",
          "Quality Parts",
          "Warranty on Repairs",
        ],
        popular: true,
      },
      {
        name: "Major Accident Claims",
        price: 15000,
        duration: "7-14 days",
        features: [
          "Everything in Minor",
          "Major Body Work",
          "Mechanical Repairs",
          "Frame Straightening",
          "OEM Parts Available",
          "Full Restoration",
        ],
      },
    ],
    benefits: [
      "Complete insurance claim filing assistance",
      "Direct coordination with insurance companies",
      "Detailed damage assessment and documentation",
      "Quality repairs using approved parts",
      "All work backed by service guarantee",
    ],
    faqs: [
      {
        question: "Do you work with all insurance companies?",
        answer:
          "Yes, we work with all major insurance companies in India and can coordinate directly with them.",
      },
      {
        question: "How long does the claim process take?",
        answer:
          "The timeline varies based on damage extent and insurance company, typically 3-14 days.",
      },
      {
        question: "Do I need to pay upfront?",
        answer:
          "In most cases, we can work directly with your insurance company. Only deductibles may need to be paid upfront.",
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
