"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"

export function InsuranceServicesForm() {
  const [vehicleType, setVehicleType] = useState("")
  const [insuranceType, setInsuranceType] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    alert("Insurance quote request submitted successfully!")
  }

  return (
    <div className="max-w-2xl mx-auto bg-black/30 p-8 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="vehicle-type">Vehicle Type</Label>
          <Select onValueChange={setVehicleType} required>
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

        <div>
          <Label htmlFor="insurance-type">Insurance Type</Label>
          <Select onValueChange={setInsuranceType} required>
            <SelectTrigger id="insurance-type">
              <SelectValue placeholder="Select insurance type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="third-party">Third Party Liability</SelectItem>
              <SelectItem value="comprehensive">Comprehensive Coverage</SelectItem>
              <SelectItem value="zero-dep">Zero Depreciation Cover</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="vehicle-make">Vehicle Make</Label>
          <Input id="vehicle-make" placeholder="Enter vehicle make" required />
        </div>

        <div>
          <Label htmlFor="vehicle-model">Vehicle Model</Label>
          <Input id="vehicle-model" placeholder="Enter vehicle model" required />
        </div>

        <div>
          <Label htmlFor="vehicle-year">Vehicle Year</Label>
          <Input id="vehicle-year" type="number" placeholder="Enter vehicle year" required />
        </div>

        <Button type="submit" className="w-full">
          Get Quote
        </Button>
      </form>
    </div>
  )
}


