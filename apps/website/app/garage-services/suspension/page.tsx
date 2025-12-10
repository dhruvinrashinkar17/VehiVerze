import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Suspension & Fitments Services | Vehiverze",
  description:
    "Professional suspension repair, replacement and upgrade services for all vehicle types",
};

export default function SuspensionPage() {
  const serviceData = {
    name: "Suspension & Fitments",
    description:
      "Our expert technicians provide comprehensive suspension repair, replacement, and upgrade services to ensure your vehicle handles smoothly and safely on any road condition.",
    heroImage: "/placeholder.svg?height=400&width=600",
    startingPrice: 1499,
    duration: "2-4 hours",
    rating: 4.8,
    reviews: 1234,
    packages: [
      {
        name: "Suspension Check",
        price: 499,
        duration: "1 hour",
        features: [
          "Complete Suspension Inspection",
          "Shock Absorber Test",
          "Bushing Condition Check",
          "Ball Joint Assessment",
          "Steering Linkage Check",
          "Detailed Report",
        ],
      },
      {
        name: "Shock Replacement",
        price: 3999,
        duration: "2-3 hours",
        features: [
          "Everything in Check",
          "Shock Absorber Replacement",
          "Strut Mount Check",
          "Dust Boot Replacement",
          "Wheel Alignment",
          "Road Test",
        ],
        popular: true,
      },
      {
        name: "Complete Overhaul",
        price: 8999,
        duration: "4-5 hours",
        features: [
          "Everything in Shock Replacement",
          "Control Arm Bushings",
          "Ball Joint Replacement",
          "Stabilizer Links",
          "Coil Spring Check",
          "1 Year Warranty",
        ],
      },
    ],
    benefits: [
      "Complete suspension system diagnosis",
      "Shock absorber and strut replacement",
      "Control arm and bushing replacement",
      "Ball joint inspection and replacement",
      "Wheel alignment after suspension work",
    ],
    faqs: [
      {
        question: "How do I know if my suspension needs repair?",
        answer:
          "Signs include bumpy rides, uneven tire wear, pulling to one side, or unusual noises over bumps.",
      },
      {
        question: "How long do shock absorbers last?",
        answer:
          "Shock absorbers typically last 50,000-100,000 km depending on driving conditions.",
      },
      {
        question: "Do I need alignment after suspension work?",
        answer:
          "Yes, wheel alignment is recommended after any suspension repair to ensure proper handling.",
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
