"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Separator } from "@vehiverze/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"
import { ArrowLeft, Check, CreditCard, Smartphone, Building } from "lucide-react"
import { CelebrationAnimation } from "@/components/celebration-animation"

interface NewVehicleCheckoutProps {
  vehicleType: string
  category: string
  vehicleId: string
}

export function NewVehicleCheckout({ vehicleType, category, vehicleId }: NewVehicleCheckoutProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [showCelebration, setShowCelebration] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    selectedBank: "",
  })

  // Sample vehicle data - would come from API in real app
  const vehicle = {
    id: vehicleId,
    name: "Honda City",
    brand: "Honda",
    price: 1150000,
    variant: "VX CVT",
    color: "Platinum White Pearl",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Automatic", "Petrol", "5 Seater", "Sunroof", "Touchscreen"],
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      setShowCelebration(true)
    }, 2000)
  }

  const handleContinue = () => {
    if (activeTab === "details") {
      setActiveTab("payment")
    }
  }

  const handleCloseCelebration = () => {
    setShowCelebration(false)
    router.push("/new-vehicles/order-success")
  }

  const totalPrice = vehicle.price + 50000 + 25000 + Math.round(vehicle.price * 0.18)

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {showCelebration && (
        <CelebrationAnimation
          isOpen={showCelebration}
          onClose={handleCloseCelebration}
          title="Order Confirmed!"
          message="Your new vehicle order has been placed successfully. Our team will contact you within 24 hours."
          actionText="View Order Details"
          actionLink="/new-vehicles/order-success"
        />
      )}

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <Link href={`/new-vehicles/${vehicleType.toLowerCase()}/${category.toLowerCase()}/details/${vehicleId}`}>
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Complete Your Order</h1>
            <p className="text-gray-600">
              {vehicle.name} - {category} {vehicleType}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="details">Personal Details</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleContinue} className="w-full bg-blue-600 hover:bg-blue-700">
                  Continue to Payment
                </Button>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange} className="space-y-3">
                    <div className="flex items-center space-x-3 border p-4 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border p-4 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value="upi" id="upi" />
                      <Smartphone className="h-5 w-5 text-gray-600" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        UPI Payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border p-4 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Building className="h-5 w-5 text-gray-600" />
                      <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                        Net Banking
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="bg-white border rounded-lg p-6 space-y-4">
                    <h4 className="font-medium">Card Details</h4>
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "upi" && (
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-medium mb-4">UPI Details</h4>
                    <div>
                      <Label htmlFor="upiId">UPI ID *</Label>
                      <Input
                        id="upiId"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="yourname@upi"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "netbanking" && (
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-medium mb-4">Bank Details</h4>
                    <div>
                      <Label htmlFor="selectedBank">Select Bank *</Label>
                      <select
                        id="selectedBank"
                        name="selectedBank"
                        value={formData.selectedBank}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                <Button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="flex items-center space-x-4 mb-6">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h4 className="font-medium">{vehicle.name}</h4>
                <p className="text-sm text-gray-500">{vehicle.variant}</p>
                <p className="text-sm text-gray-500">Color: {vehicle.color}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {vehicle.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Ex-showroom Price</span>
                <span>₹{vehicle.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registration & Insurance</span>
                <span>₹50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Handling Charges</span>
                <span>₹25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>₹{Math.round(vehicle.price * 0.18).toLocaleString()}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Delivery Timeline</h4>
              <p className="text-sm text-blue-700">
                Your new vehicle will be delivered within 4-6 weeks after order confirmation. We'll keep you updated
                throughout the process.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


