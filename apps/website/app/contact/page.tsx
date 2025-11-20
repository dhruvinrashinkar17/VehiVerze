import { NavBar } from "@/components/nav-bar"
import type { Metadata } from "next"
import { ContactContent } from "@/components/contact-content"

export const metadata: Metadata = {
  title: "Contact Us - Vehiverze | Get in Touch",
  description:
    "Contact Vehiverze for any questions about buying, selling vehicles, garage services, or insurance. We're here to help you with all your vehicle needs.",
  keywords: "contact vehiverze, customer support, vehicle help, car support, bike support",
}

export default function ContactPage() {
  return <ContactContent />
}


