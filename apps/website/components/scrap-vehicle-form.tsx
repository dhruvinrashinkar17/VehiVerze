"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Textarea } from "@vehiverze/ui/textarea"
import { useRouter } from "next/navigation"

export function ScrapVehicleForm() {
  const [vehicleType, setVehicleType] = useState("")
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    router.push("/sell/contact")
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
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" placeholder="Enter vehicle brand" required />
        </div>

        <div>
          <Label htmlFor="model">Model</Label>
          <Input id="model" placeholder="Enter vehicle model" required />
        </div>

        <div>
          <Label htmlFor="year">Year</Label>
          <Input id="year" type="number" placeholder="Enter vehicle year" required />
        </div>

        <div>
          <Label htmlFor="condition">Vehicle Condition</Label>
          <Textarea id="condition" placeholder="Describe the current condition of your vehicle" required />
        </div>

        <div>
          <Label htmlFor="location">Pickup Location</Label>
          <Input id="location" placeholder="Enter vehicle pickup location" required />
        </div>

        <Button type="submit" className="w-full">
          Get Scrap Quote
        </Button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Our team will contact you with a quote based on your vehicle's condition and current market rates
        </p>
      </form>
    </div>
  )
}


