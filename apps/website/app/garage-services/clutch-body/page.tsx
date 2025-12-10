import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Clutch & Body Parts Services | Vehiverze",
  description:
    "Professional clutch replacement and body part repair services for all vehicle types",
};

export default function ClutchBodyPage() {
  const serviceData = {
    name: "Clutch & Body Parts",
    description:
      "Our skilled technicians provide expert clutch replacement and body part repair services to keep your vehicle performing at its best and looking great.",
    heroImage: "/placeholder.svg?height=400&width=600",
    startingPrice: 2999,
    duration: "3-6 hours",
    rating: 4.7,
    reviews: 987,
    packages: [
      {
        name: "Clutch Inspection",
        price: 499,
        duration: "1 hour",
        features: [
          "Clutch Performance Test",
          "Pedal Play Check",
          "Clutch Fluid Level",
          "Release Bearing Check",
          "Flywheel Inspection",
          "Diagnostic Report",
        ],
      },
      {
        name: "Clutch Replacement",
        price: 6999,
        duration: "4-5 hours",
        features: [
          "Everything in Inspection",
          "Clutch Plate Replacement",
          "Pressure Plate Replacement",
          "Release Bearing Replacement",
          "Clutch Adjustment",
          "Road Test & Warranty",
        ],
        popular: true,
      },
      {
        name: "Complete Clutch Kit",
        price: 9999,
        duration: "5-6 hours",
        features: [
          "Everything in Replacement",
          "Flywheel Resurfacing",
          "Pilot Bearing Replacement",
          "Clutch Cable/Hydraulics",
          "Premium Parts Only",
          "1 Year Warranty",
        ],
      },
    ],
    benefits: [
      "Complete clutch system diagnosis",
      "Flywheel resurfacing and replacement",
      "Body panel repair and replacement",
      "Bumper repair and replacement",
      "Quality OEM and aftermarket parts",
    ],
    faqs: [
      {
        question: "How do I know if my clutch needs replacement?",
        answer:
          "Signs include slipping clutch, difficulty shifting, unusual noises, or a high clutch pedal engagement point.",
      },
      {
        question: "How long does a clutch last?",
        answer:
          "A clutch typically lasts 60,000-100,000 km depending on driving habits and conditions.",
      },
      {
        question: "Can I drive with a worn clutch?",
        answer:
          "Driving with a worn clutch can cause further damage. We recommend inspection as soon as you notice issues.",
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
