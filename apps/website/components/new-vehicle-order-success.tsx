"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { CheckCircle, Download, Truck, Phone, MessageCircle, Calendar } from "lucide-react"

export function NewVehicleOrderSuccess() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Mock order data
  const orderData = {
    orderId: "VHZ" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    vehicleName: "Honda City ZX CVT",
    amount: "₹15,20,000",
    deliveryDate: "15-20 business days",
    dealerName: "Honda Authorized Dealer",
    dealerPhone: "+91 98765 43210",
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 3 + "s",
                  backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>
        </div>
      )}

      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Order Successful!</h1>
            <p className="text-xl text-gray-600 mb-2">Congratulations! Your vehicle purchase has been confirmed.</p>
            <p className="text-lg text-blue-600 font-semibold">Order ID: {orderData.orderId}</p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt={orderData.vehicleName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{orderData.vehicleName}</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">{orderData.amount}</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Order ID</span>
                  <span>{orderData.orderId}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Vehicle</span>
                  <span>{orderData.vehicleName}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Total Amount</span>
                  <span className="font-bold text-blue-600">{orderData.amount}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Expected Delivery</span>
                  <span>{orderData.deliveryDate}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium">Dealer</span>
                  <span>{orderData.dealerName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">What Happens Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Dealer Contact</h3>
                <p className="text-gray-600 text-sm">
                  Our dealer will contact you within 24 hours to confirm your order and discuss delivery details.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Documentation</h3>
                <p className="text-gray-600 text-sm">
                  Complete the required documentation and financing formalities with our assistance.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Your vehicle will be delivered to your doorstep or you can collect it from the showroom.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
              <Download className="h-5 w-5 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" className="flex items-center justify-center bg-transparent">
              <Truck className="h-5 w-5 mr-2" />
              Track Order
            </Button>
            <Button variant="outline" className="flex items-center justify-center bg-transparent">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Delivery
            </Button>
            <Button variant="outline" className="flex items-center justify-center bg-transparent">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Support
            </Button>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to assist you with any questions about your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="flex items-center justify-center bg-transparent">
                <Phone className="h-5 w-5 mr-2" />
                Call: {orderData.dealerPhone}
              </Button>
              <Button variant="outline" className="flex items-center justify-center bg-transparent">
                <MessageCircle className="h-5 w-5 mr-2" />
                Live Chat Support
              </Button>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-8">
            <Link href="/new-vehicles">
              <Button variant="outline" className="mr-4 bg-transparent">
                Browse More Vehicles
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .confetti-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 3s linear infinite;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}


