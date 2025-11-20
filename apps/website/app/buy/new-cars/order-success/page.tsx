import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { OrderSuccess } from "@/components/new-car/order-success"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Successful | Vehiverze",
  description: "Your car purchase has been successfully completed. Thank you for choosing Vehiverze.",
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <OrderSuccess />
      <Footer />
    </main>
  )
}


