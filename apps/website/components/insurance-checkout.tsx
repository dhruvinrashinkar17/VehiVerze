"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"

export function InsuranceCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    alert("Insurance purchase completed successfully!")
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Complete Your Insurance Purchase</h1>

        <div className="max-w-2xl mx-auto bg-black/30 p-8 rounded-lg">
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
              <Label htmlFor="vehicle-number">Vehicle Number</Label>
              <Input id="vehicle-number" placeholder="Enter your vehicle number" required />
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
                  <SelectItem value="net-banking">Net Banking</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t border-gray-600">
              <h3 className="text-xl font-semibold mb-2">Policy Summary</h3>
              <p>Insurance Type: Comprehensive</p>
              <p>Coverage Period: 1 Year</p>
              <p>Premium: $800</p>
              <p>Tax: $40</p>
              <p className="text-xl font-semibold mt-2">Total: $840</p>
            </div>

            <Button type="submit" className="w-full">
              Purchase Insurance
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}


