import { GarageServicesContent } from "@/components/garage-services-content"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Garage Services | Car Maintenance & Repair | Vehiverze",
  description:
    "Professional garage services including AC repair, servicing, batteries, tyres, detailing, and more. Book certified technicians near you on Vehiverze.",
  keywords: [
    "garage services",
    "car maintenance",
    "vehicle repair",
    "AC service",
    "car servicing",
    "battery replacement",
    "tyre repair",
    "car detailing",
    "car spa",
    "car inspection",
  ],
  openGraph: {
    title: "Garage Services | Professional Car Maintenance | Vehiverze",
    description:
      "Find and book trusted garage services for your vehicle. Expert technicians, transparent pricing, doorstep service.",
    type: "website",
    url: "https://vehiverze.com/garage-services",
    images: [
      {
        url: "/garage-services.jpg",
        width: 1200,
        height: 630,
        alt: "Vehiverze Garage Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage Services | Vehiverze",
    description: "Book professional garage services with certified technicians. Same-day appointments available.",
    images: ["/garage-services.jpg"],
  },
}

export default function GarageServicesPage() {
  return (
    <>
      <NavBar />
      <GarageServicesContent />
      <Footer />
    </>
  )
}


