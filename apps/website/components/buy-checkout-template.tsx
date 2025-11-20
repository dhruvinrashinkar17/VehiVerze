"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Checkbox } from "@vehiverze/ui/checkbox"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

interface BuyCheckoutTemplateProps {
  vehicleType: string
  price: number
  tax: number
  image?: string
}

export function BuyCheckoutTemplate({ vehicleType, price, tax, image }: BuyCheckoutTemplateProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [deliveryOption, setDeliveryOption] = useState("home-delivery")
  const [financing, setFinancing] = useState(false)
  const router = useRouter()

  const totalPrice = price + tax
  const deliveryFee = deliveryOption === "home-delivery" ? 999 : 0
  const grandTotal = totalPrice + deliveryFee

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, we would submit the form data to an API
    router.push("/buy/order-success")
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="container mx-auto px-4 py-12 bg-white">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8">Complete Your {vehicleType} Purchase</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-md border border-gray-100 p-8 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b border-gray-200 pb-2">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" placeholder="Enter your full name" required />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                      </div>

                      <div>
                        <Label htmlFor="alternate-phone">Alternate Phone (Optional)</Label>
                        <Input id="alternate-phone" type="tel" placeholder="Enter alternate phone number" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b border-gray-200 pb-2">Delivery Information</h2>

                    <div>
                      <Label htmlFor="delivery-option">Delivery Option</Label>
                      <Select defaultValue={deliveryOption} onValueChange={setDeliveryOption} required>
                        <SelectTrigger id="delivery-option">
                          <SelectValue placeholder="Select delivery option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home-delivery">Home Delivery (₹999)</SelectItem>
                          <SelectItem value="showroom-pickup">Showroom Pickup (Free)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input id="address" placeholder="Enter your address" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Enter city" required />
                      </div>

                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="Enter state" required />
                      </div>

                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" placeholder="Enter pincode" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b border-gray-200 pb-2">Payment Information</h2>

                    <div>
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select onValueChange={setPaymentMethod} required>
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit-card">Credit Card</SelectItem>
                          <SelectItem value="debit-card">Debit Card</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="net-banking">Net Banking</SelectItem>
                          <SelectItem value="emi">EMI</SelectItem>
                          <SelectItem value="loan">Vehicle Loan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(paymentMethod === "loan" || paymentMethod === "emi") && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="financing"
                            checked={financing}
                            onCheckedChange={(checked) => setFinancing(checked as boolean)}
                          />
                          <label htmlFor="financing" className="text-sm">
                            I would like to apply for financing
                          </label>
                        </div>

                        {financing && (
                          <>
                            <div>
                              <Label htmlFor="loan-amount">Loan Amount</Label>
                              <Input
                                id="loan-amount"
                                type="number"
                                placeholder="Enter loan amount"
                                defaultValue={totalPrice}
                              />
                            </div>

                            <div>
                              <Label htmlFor="loan-tenure">Loan Tenure (in months)</Label>
                              <Select defaultValue="36">
                                <SelectTrigger id="loan-tenure">
                                  <SelectValue placeholder="Select loan tenure" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="12">12 months</SelectItem>
                                  <SelectItem value="24">24 months</SelectItem>
                                  <SelectItem value="36">36 months</SelectItem>
                                  <SelectItem value="48">48 months</SelectItem>
                                  <SelectItem value="60">60 months</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the terms and conditions
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Complete Purchase
                  </Button>
                </form>
              </div>
            </div>

            {/* Right column - Order Summary */}
            <div>
              <div className="bg-white shadow-md border border-gray-100 p-6 rounded-lg sticky top-4">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

                {image && (
                  <div className="mb-4">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${vehicleType} image`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <p className="text-lg">Vehicle: {vehicleType} Model XYZ</p>
                  <p>Color: Metallic Silver</p>
                  <p>Variant: Premium</p>
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>₹{price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>{deliveryOption === "home-delivery" ? "₹999" : "Free"}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 mt-2">
                    <span>Total:</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="font-semibold">Need Help?</h3>
                  <p className="text-sm">Contact our customer support at:</p>
                  <p className="text-sm">support@vehiverse.com</p>
                  <p className="text-sm">+91 1234567890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}


