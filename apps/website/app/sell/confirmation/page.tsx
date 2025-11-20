"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Calendar, MapPin, Phone, ArrowRight, CreditCard, FileCheck } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useRouter, useSearchParams } from "next/navigation"
import confetti from "canvas-confetti"

export default function SellConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const vehicleName = searchParams.get("vehicleName")
  const vehiclePrice = searchParams.get("vehiclePrice")
  const vehicleType = searchParams.get("type")

  const [inspectionDate, setInspectionDate] = useState("Thursday, November 23, 2023")
  const [inspectionTime, setInspectionTime] = useState("11:00 AM - 01:00 PM")

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Get inspection details from localStorage
    if (typeof window !== "undefined") {
      try {
        const inspectionDetails = JSON.parse(localStorage.getItem("inspectionDetails") || "{}")
        setInspectionDate(inspectionDetails.date || "Thursday, November 23, 2023")
        setInspectionTime(inspectionDetails.time || "11:00 AM - 01:00 PM")
      } catch (error) {
        console.error("Error parsing inspection details:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Trigger confetti celebration
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  const getVehicleTypeName = () => {
    switch (vehicleType) {
      case "2-wheeler":
        return "2 Wheeler"
      case "3-wheeler":
        return "3 Wheeler"
      case "4-wheeler":
        return "4 Wheeler"
      case "6-wheeler":
        return "6 Wheeler"
      case "8-wheeler":
        return "8 Wheeler"
      default:
        return "Vehicle"
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="max-w-4xl mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-blue-600 to-green-500 p-8 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Purchase Confirmed!</h1>
            <p className="text-blue-100">Your {getVehicleTypeName()} purchase has been successfully processed.</p>
          </div>

          <div className="p-8">
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Purchase Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FileCheck className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{vehicleName || "Selected Vehicle"}</p>
                    <p className="text-sm text-gray-500">Vehicle purchased successfully</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">₹{vehiclePrice ? Number(vehiclePrice).toLocaleString("en-IN") : "0"}</p>
                    <p className="text-sm text-gray-500">Total purchase amount</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{inspectionDate}</p>
                    <p className="text-sm text-gray-500">{inspectionTime}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Your Home Address</p>
                    <p className="text-sm text-gray-500">Vehicle will be delivered to your location</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Contact Information</p>
                    <p className="text-sm text-gray-500">Our team will call you before delivery</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Payment has been processed successfully</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileCheck className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">
                      Amount: ₹{vehiclePrice ? Number(vehiclePrice).toLocaleString("en-IN") : "0"}
                    </p>
                    <p className="text-sm text-gray-500">Payment confirmed and processed</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
            <ol className="space-y-4 mb-8">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex"
              >
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  1
                </div>
                <p>Your vehicle will be prepared and inspected for delivery.</p>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex"
              >
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  2
                </div>
                <p>We'll contact you to confirm the delivery date and time.</p>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex"
              >
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  3
                </div>
                <p>Your vehicle will be delivered to your location with all documentation.</p>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="flex"
              >
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  4
                </div>
                <p>Enjoy your new vehicle with our warranty and support services.</p>
              </motion.li>
            </ol>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/dashboard/orders")}
                variant="outline"
                className="rounded-xl px-6 py-2"
              >
                View My Orders
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-200/50"
              >
                Back to Home
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}


