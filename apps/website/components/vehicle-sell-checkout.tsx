"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"

interface VehicleSellCheckoutProps {
  vehicleType: string
}

export function VehicleSellCheckout({ vehicleType }: VehicleSellCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const vehicleId = searchParams.get("vehicleId")
  const vehicleName = searchParams.get("vehicleName")
  const vehiclePrice = searchParams.get("vehiclePrice")

  const vehicleMap: Record<string, { name: string; price: number }> = {
    "1": { name: "Royal Enfield Classic 350", price: 193000 },
    "2": { name: "Bajaj Pulsar NS200", price: 139000 },
    "3": { name: "Hero Splendor Plus", price: 65000 },
    "4": { name: "Honda CB Shine", price: 85000 },
    "5": { name: "TVS Apache RTR 160", price: 95000 },
    "6": { name: "Yamaha FZ-S FI", price: 115000 },
    "7": { name: "Bajaj RE Compact Auto", price: 280000 },
    "8": { name: "Piaggio Ape City Plus", price: 320000 },
    "9": { name: "Mahindra Alfa Auto", price: 300000 },
    "10": { name: "TVS King Auto", price: 290000 },
    "11": { name: "Maruti Suzuki Fronx", price: 799000 },
    "12": { name: "Tata Nexon", price: 799999 },
    "13": { name: "Hyundai i20", price: 729000 },
    "14": { name: "Honda City", price: 1199000 },
    "15": { name: "Mahindra XUV700", price: 1399000 },
    "16": { name: "Kia Seltos", price: 999000 },
    "17": { name: "Tata LPT 1613", price: 899000 },
    "18": { name: "Eicher Pro 3015", price: 950000 },
    "19": { name: "BharatBenz 1617", price: 920000 },
    "20": { name: "Ashok Leyland Boss 1616", price: 880000 },
    "21": { name: "Tata Signa 4225", price: 1500000 },
    "22": { name: "Volvo FM", price: 1800000 },
    "23": { name: "Scania P410", price: 1900000 },
    "24": { name: "Ashok Leyland 3118 IL", price: 1400000 },
    "25": { name: "Tata Intra V10", price: 599000 },
    "26": { name: "Mahindra Bolero Pik-Up", price: 549000 },
    "27": { name: "Force Traveller Trailer", price: 450000 },
    "28": { name: "Ashok Leyland Mini Truck", price: 520000 },
    "29": { name: "Tata 407 Tipper", price: 750000 },
    "30": { name: "Ashok Leyland Transit Mixer", price: 1100000 },
    "31": { name: "Tata 10 Wheeler", price: 1650000 },
    "32": { name: "Ashok Leyland 12 Wheeler", price: 1800000 },
    "33": { name: "Volvo 14 Wheeler", price: 2100000 },
    "34": { name: "Scania 16 Wheeler", price: 2300000 },
    "35": { name: "Tata 18 Wheeler", price: 2500000 },
    "36": { name: "Ashok Leyland 22 Wheeler", price: 2800000 },
  }

  const getVehicleDetails = () => {
    if (vehicleName && vehiclePrice) {
      return {
        name: decodeURIComponent(vehicleName),
        price: Number.parseInt(vehiclePrice),
      }
    }
    return vehicleMap[vehicleId || ""] || { name: "Selected Vehicle", price: 375000 }
  }

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

  const vehicleDetails = getVehicleDetails()
  const serviceFee = 5000
  const totalAmount = vehicleDetails.price

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push(
        `/sell/confirmation?vehicleName=${encodeURIComponent(vehicleDetails.name)}&vehiclePrice=${vehicleDetails.price}&type=${vehicleType}`,
      )
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      alert("An error occurred during checkout. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Complete Your {getVehicleTypeName()} Purchase</h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter your address" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bank-account">Bank Account Number</Label>
                      <Input id="bank-account" placeholder="Enter your bank account number" required />
                    </div>
                    <div>
                      <Label htmlFor="ifsc-code">IFSC Code</Label>
                      <Input id="ifsc-code" placeholder="Enter your bank's IFSC code" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="payment-method">Preferred Payment Method</Label>
                    <Select onValueChange={setPaymentMethod} required>
                      <SelectTrigger id="payment-method">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Complete Purchase"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border border-gray-200 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Vehicle</p>
                  <p className="font-semibold">{vehicleDetails.name}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Price</span>
                    <span className="font-semibold">₹{vehicleDetails.price.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold">₹{serviceFee.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-lg font-bold text-blue-600">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                  <p>
                    <strong>Note:</strong> Service fee of ₹{serviceFee.toLocaleString("en-IN")} will be deducted from
                    your payout.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}


