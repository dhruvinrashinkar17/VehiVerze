import { NewVehicleOrderSuccessClient } from "@/app/new-vehicles/order-success/page.client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Successful! Your Vehicle Purchase is Confirmed | Vehiverze",
  description:
    "Congratulations! Your vehicle order has been successfully placed. Track your order status and get ready for delivery.",
  robots: "noindex, nofollow", // Success pages shouldn't be indexed
}

export default function OrderSuccessPage() {
  return <NewVehicleOrderSuccessClient />
}


