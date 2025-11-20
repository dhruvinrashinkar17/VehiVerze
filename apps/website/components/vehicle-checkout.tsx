"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Checkbox } from "@vehiverze/ui/checkbox"

interface VehicleCheckoutProps {
  vehicleType: string
}

export function VehicleCheckout({ vehicleType }: VehicleCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    alert(`${vehicleType} purchase completed successfully!`)
  }

  return (
    <div className="max-w-2xl mx-auto bg-black/30 p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Complete Your {vehicleType} Purchase</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="full-name">Full Name</Label>
          <Input id="full-name" placeholder="Enter your full name" required />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" required />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="Enter your phone number" required />
        </div>

        <div>
          <Label htmlFor="address">Delivery Address</Label>
          <Input id="address" placeholder="Enter your address" required />
        </div>

        <div>
          <Label htmlFor="payment-method">Payment Method</Label>
          <Select onValueChange={setPaymentMethod} required>
            <SelectTrigger id="payment-method">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="debit-card">Debit Card</SelectItem>
              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              <SelectItem value="loan">Vehicle Loan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {paymentMethod === "loan" && (
          <div>
            <Label htmlFor="loan-amount">Loan Amount</Label>
            <Input id="loan-amount" type="number" placeholder="Enter loan amount" />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <label htmlFor="terms" className="text-sm text-gray-200">
            I agree to the terms and conditions
          </label>
        </div>

        <div className="pt-4 border-t border-gray-600">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <p>Vehicle: {vehicleType} Model XYZ</p>
          <p>Price: ₹25,000</p>
          <p>Tax: ₹2,000</p>
          <p className="text-xl font-semibold mt-2">Total: ₹27,000</p>
        </div>

        <Button type="submit" className="w-full">
          Complete Purchase
        </Button>
      </form>
    </div>
  )
}


