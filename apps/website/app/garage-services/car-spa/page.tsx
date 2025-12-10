import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function CarSpaPage() {
  const serviceData = {
    name: "Car Spa & Cleaning",
    description:
      "Premium car spa and cleaning services for a refreshed vehicle experience",
    heroImage: "/placeholder.svg?height=300&width=600",
    startingPrice: 799,
    duration: "1-2 hours",
    rating: 4.8,
    reviews: 2156,
    packages: [
      {
        name: "Quick Wash",
        price: 799,
        duration: "45 mins",
        features: [
          "Exterior Foam Wash",
          "Interior Dusting",
          "Dashboard Wipe",
          "Glass Cleaning",
          "Tire Shine",
          "Air Freshener",
        ],
      },
      {
        name: "Premium Spa",
        price: 1499,
        duration: "1.5 hours",
        features: [
          "Everything in Quick Wash",
          "Interior Vacuuming",
          "Seat Cleaning",
          "Door Panel Cleaning",
          "Boot Cleaning",
          "Mat Washing",
        ],
        popular: true,
      },
      {
        name: "Ultimate Spa",
        price: 2499,
        duration: "2.5 hours",
        features: [
          "Everything in Premium Spa",
          "Engine Bay Cleaning",
          "Leather Treatment",
          "Fabric Protection",
          "Odor Removal",
          "Wax Coating",
        ],
      },
    ],
    benefits: [
      "Thorough interior and exterior cleaning",
      "Specialized treatments for different surfaces",
      "Eco-friendly cleaning products",
      "Odor elimination",
      "Protection against dirt and grime",
    ],
    faqs: [
      {
        question: "How often should I get a car spa?",
        answer:
          "We recommend a car spa every 2-4 weeks depending on usage and environmental conditions.",
      },
      {
        question: "Do you offer doorstep service?",
        answer:
          "Yes, we provide doorstep car spa services at your home or office.",
      },
      {
        question: "What products do you use?",
        answer:
          "We use premium, eco-friendly cleaning products that are safe for your car's surfaces.",
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
