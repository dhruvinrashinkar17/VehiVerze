"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Textarea } from "@vehiverze/ui/textarea"
import { ArrowLeft, CreditCard, Smartphone, Building, CheckCircle } from "lucide-react"

interface NewVehicleModelCheckoutProps {
  vehicleType: string
  category: string
  modelId: string
}

export function NewVehicleModelCheckout({ vehicleType, category, modelId }: NewVehicleModelCheckoutProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock vehicle data
  const vehicleData = {
    name: "Honda City ZX CVT",
    price: "₹15,20,000",
    image: "/placeholder.svg?height=200&width=300",
    variant: "ZX CVT",
    color: "Platinum White Pearl",
    features: ["CVT Automatic", "Honda SENSING", "Sunroof", "Wireless Charger"],
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/new-vehicles/order-success")
    }, 3000)
  }

  const formatCategoryName = (cat: string) => {
    return cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" className="mr-3" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Complete your vehicle purchase</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Personal Details</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-4"></div>
            <div className={`flex items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="Enter your phone number" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea id="address" placeholder="Enter your complete address" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Enter your city" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input id="pincode" placeholder="Enter PIN code" className="mt-1" />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button onClick={() => setCurrentStep(2)} className="bg-blue-600 hover:bg-blue-700">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>

                {/* Payment Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "upi" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <Smartphone className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="font-medium">UPI Payment</p>
                    <p className="text-sm text-gray-600">PhonePe, GPay, Paytm</p>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "netbanking" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <Building className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="font-medium">Net Banking</p>
                    <p className="text-sm text-gray-600">All major banks</p>
                  </div>
                </div>

                {/* Payment Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input id="cardName" placeholder="Name on card" className="mt-1" />
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div>
                    <Label htmlFor="upiId">UPI ID *</Label>
                    <Input id="upiId" placeholder="yourname@upi" className="mt-1" />
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div>
                    <Label htmlFor="bank">Select Bank *</Label>
                    <select id="bank" className="w-full p-2 border rounded-md mt-1">
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handlePayment} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
                    {isProcessing ? "Processing..." : "Complete Payment"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                <img
                  src={vehicleData.image || "/placeholder.svg"}
                  alt={vehicleData.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold">{vehicleData.name}</h4>
                  <p className="text-sm text-gray-600">Variant: {vehicleData.variant}</p>
                  <p className="text-sm text-gray-600">Color: {vehicleData.color}</p>
                </div>
                <div className="space-y-2">
                  {vehicleData.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Price Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Ex-showroom Price</span>
                  <span>₹13,50,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration</span>
                  <span>₹75,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance</span>
                  <span>₹65,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Accessories</span>
                  <span>₹30,000</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-blue-600">{vehicleData.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">🎉 Special Offers</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Zero down payment available</li>
                <li>• Extended warranty included</li>
                <li>• Free home delivery</li>
                <li>• 7-day money back guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


