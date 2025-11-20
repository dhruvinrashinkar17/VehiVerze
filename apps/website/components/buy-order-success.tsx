"use client"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CelebrationEffect } from "@/components/celebration-effect"
import { Check, Download, Calendar, Clock, MapPin } from "lucide-react"

export function BuyOrderSuccess() {
  const router = useRouter()

  // Generate a random order ID
  const orderId = `VB${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`

  // Current date + 7 days for estimated delivery
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <CelebrationEffect duration={5000} particleCount={100} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
            <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been confirmed.</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold">{orderId}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-semibold">
                  {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex items-start space-x-2">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-semibold">
                    {deliveryDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2 mt-4 md:mt-0">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Location</p>
                  <p className="font-semibold">Your registered address</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Verification Call</p>
                  <p className="text-sm text-gray-600">
                    Our team will call you within 24 hours to verify your order details.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Delivery Schedule</p>
                  <p className="text-sm text-gray-600">
                    We'll coordinate with you to schedule a convenient delivery time.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                  <Download className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Documentation</p>
                  <p className="text-sm text-gray-600">
                    Prepare necessary documents for vehicle registration and transfer.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <Button onClick={() => router.push(`/track-orders?orderId=${orderId}`)} className="w-full md:w-auto">
              Track Your Order
            </Button>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button variant="outline" onClick={() => router.push("/")}>
                Return to Home
              </Button>
              <Button variant="outline" onClick={() => router.push("/buy")}>
                Browse More Vehicles
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}


