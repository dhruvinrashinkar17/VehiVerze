import { GarageServiceDetail } from "@/components/garage-service-detail";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function DentingPage() {
  const serviceData = {
    name: "Denting & Painting",
    description:
      "Professional dent removal and painting services to restore your vehicle's appearance",
    heroImage: "/placeholder.svg?height=300&width=600",
    startingPrice: 2999,
    duration: "2-5 days",
    rating: 4.7,
    reviews: 1892,
    packages: [
      {
        name: "Minor Dent Repair",
        price: 2999,
        duration: "1-2 days",
        features: [
          "Small Dent Removal",
          "Scratch Touch-up",
          "Spot Painting",
          "Color Matching",
          "Clear Coat Application",
          "Polish & Buff",
        ],
      },
      {
        name: "Panel Repair",
        price: 5999,
        duration: "2-3 days",
        features: [
          "Full Panel Dent Repair",
          "Deep Scratch Removal",
          "Panel Painting",
          "Primer Application",
          "Clear Coat Protection",
          "Final Polish",
        ],
        popular: true,
      },
      {
        name: "Full Body Paint",
        price: 15999,
        duration: "4-5 days",
        features: [
          "Complete Body Restoration",
          "All Dent Repairs",
          "Full Body Painting",
          "Rust Treatment",
          "Premium Paint Quality",
          "Ceramic Clear Coat",
        ],
      },
    ],
    benefits: [
      "Restores vehicle appearance",
      "Prevents rust and corrosion",
      "Maintains vehicle value",
      "Color matching expertise",
      "Quality finish guaranteed",
    ],
    faqs: [
      {
        question: "How long does dent repair take?",
        answer:
          "Minor dents can be repaired in 1-2 days, while major bodywork may take 4-5 days.",
      },
      {
        question: "Do you provide color matching?",
        answer:
          "Yes, we use computerized color matching to ensure perfect match with your vehicle's original color.",
      },
      {
        question: "What warranty do you offer on painting?",
        answer:
          "We offer a 6-month warranty on all painting work against peeling, fading, or discoloration.",
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
