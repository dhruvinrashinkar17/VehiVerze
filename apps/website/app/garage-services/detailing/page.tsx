import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function DetailingPage() {
  const serviceData = {
    name: "Detailing Services",
    description:
      "Comprehensive vehicle detailing services for interior and exterior",
    heroImage: "/placeholder.svg?height=300&width=600",
    startingPrice: 1999,
    duration: "3-4 hours",
    rating: 4.9,
    reviews: 1523,
    packages: [
      {
        name: "Basic Detailing",
        price: 1999,
        duration: "3 hours",
        features: [
          "Exterior Hand Wash",
          "Interior Vacuuming",
          "Dashboard Cleaning",
          "Window Cleaning",
          "Tire Dressing",
          "Air Freshener",
        ],
      },
      {
        name: "Premium Detailing",
        price: 3499,
        duration: "4 hours",
        features: [
          "Everything in Basic Detailing",
          "Clay Bar Treatment",
          "Paint Polish",
          "Leather Conditioning",
          "Engine Bay Cleaning",
          "Headlight Restoration",
        ],
        popular: true,
      },
      {
        name: "Ultimate Detailing",
        price: 5999,
        duration: "6 hours",
        features: [
          "Everything in Premium Detailing",
          "Ceramic Coating",
          "Paint Correction",
          "Fabric Protection",
          "Odor Elimination",
          "Complete Restoration",
        ],
      },
    ],
    benefits: [
      "Deep cleaning of interior and exterior",
      "Protection against environmental damage",
      "Restoration of vehicle's original shine",
      "Removal of tough stains and odors",
      "Enhanced vehicle appearance",
    ],
    faqs: [
      {
        question: "How long does a full detailing take?",
        answer:
          "A full detailing service typically takes 4-6 hours depending on the package and vehicle condition.",
      },
      {
        question: "How often should I get my car detailed?",
        answer:
          "We recommend detailing every 3-4 months to maintain your vehicle's appearance and protection.",
      },
      {
        question: "Do you use eco-friendly products?",
        answer:
          "Yes, we use high-quality, eco-friendly cleaning products that are safe for your vehicle and the environment.",
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
