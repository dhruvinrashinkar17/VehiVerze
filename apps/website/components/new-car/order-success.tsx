"use client"

import Link from "next/link"
import { CheckCircle, Home, FileText } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export function OrderSuccess() {
  useEffect(() => {
    // Trigger confetti animation on component mount
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      )
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>

        <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="bg-white p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <div className="text-left space-y-4">
            <div className="flex">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <span className="flex items-center justify-center h-6 w-6 bg-blue-600 text-white rounded-full">1</span>
              </div>
              <div>
                <h3 className="font-medium">Verification Call</h3>
                <p className="text-gray-600">Our team will call you within 24 hours to verify your details.</p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <span className="flex items-center justify-center h-6 w-6 bg-blue-600 text-white rounded-full">2</span>
              </div>
              <div>
                <h3 className="font-medium">Documentation</h3>
                <p className="text-gray-600">Complete the necessary paperwork for registration and insurance.</p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <span className="flex items-center justify-center h-6 w-6 bg-blue-600 text-white rounded-full">3</span>
              </div>
              <div>
                <h3 className="font-medium">Delivery</h3>
                <p className="text-gray-600">Your vehicle will be ready for delivery within 2-3 weeks.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/track-orders">
            <Button variant="outline" className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              View My Orders
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


