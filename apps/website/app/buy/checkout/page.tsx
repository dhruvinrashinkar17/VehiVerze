import type { Metadata } from "next"
import { BuyCheckout } from "@/components/buy-checkout"

export const metadata: Metadata = {
  title: "Secure Vehicle Checkout | Complete Your Purchase | Vehiverze",
  description:
    "Complete your vehicle purchase securely on Vehiverze. Review order details, apply financing, and finalize your purchase. Fast, secure, and transparent checkout process.",
  keywords:
    "vehicle checkout, buy vehicle online, secure payment, vehicle financing, EMI options, RC transfer, vehicle purchase",
  openGraph: {
    title: "Secure Vehicle Checkout | Vehiverze",
    description: "Complete your vehicle purchase securely. Review details, apply financing, and finalize your order.",
    type: "website",
    url: "https://vehiverze.com/buy/checkout",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Vehicle Checkout | Vehiverze",
    description: "Complete your vehicle purchase securely with instant financing options.",
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://vehiverze.com/buy/checkout",
  },
}

export default function CheckoutPage({ searchParams }: { searchParams: { vehicleId: string } }) {
  return <BuyCheckout vehicleId={searchParams.vehicleId} />
}


