"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Shield, CheckCircle } from "lucide-react"

const insuranceTypes = [
  "Third-Party Liability",
  "Comprehensive Coverage",
  "Personal Accident Cover",
  "Zero Depreciation Cover",
  "Engine Protection Cover",
  "Roadside Assistance Cover",
  "No Claim Bonus Protection",
  "Passenger Cover",
  "Consumables Cover",
  "Return to Invoice",
]

export function InsuranceServicesContent() {
  const [vehicleType, setVehicleType] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    alert("Insurance quote request submitted successfully!")
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Insurance Services</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get an Insurance Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Select onValueChange={setVehicleType}>
                  <SelectTrigger id="vehicle-type">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-wheeler">2 Wheeler</SelectItem>
                    <SelectItem value="3-wheeler">3 Wheeler</SelectItem>
                    <SelectItem value="4-wheeler">4 Wheeler</SelectItem>
                    <SelectItem value="6-wheeler">6 Wheeler</SelectItem>
                    <SelectItem value="8-wheeler">8 Wheeler</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {vehicleType && (
                <>
                  <div>
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="Enter vehicle make" />
                  </div>

                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="Enter vehicle model" />
                  </div>

                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" placeholder="Enter vehicle year" type="number" />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="insurance-type">Insurance Type</Label>
                <Select>
                  <SelectTrigger id="insurance-type">
                    <SelectValue placeholder="Select insurance type" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(" ", "-")}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Get Quote
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Insurance Options</h2>
            <ul className="space-y-4">
              {insuranceTypes.map((type) => (
                <li key={type} className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#4ADE80]" />
                  <span>{type}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-black/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Why Choose Our Insurance Services?</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  <span>Competitive Rates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  <span>Quick and Easy Claims Process</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  <span>24/7 Customer Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  <span>Customizable Coverage Options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


