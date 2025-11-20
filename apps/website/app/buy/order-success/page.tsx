import type { Metadata } from "next"
import { BuyOrderSuccess } from "@/components/buy-order-success"

export const metadata: Metadata = {
  title: "Order Confirmed | Your Vehicle Purchase is Complete | Vehiverze",
  description:
    "Your vehicle purchase has been confirmed! Track your order, schedule delivery, and manage your RC transfer. Thank you for choosing Vehiverze.",
  keywords: "order confirmation, vehicle purchase confirmed, delivery tracking, RC transfer status",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://vehiverze.com/buy/order-success",
  },
}

export default function OrderSuccessPage() {
  return <BuyOrderSuccess />
}


