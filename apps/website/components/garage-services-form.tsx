"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Textarea } from "@vehiverze/ui/textarea"
import { Checkbox } from "@vehiverze/ui/checkbox"

export function GarageServicesForm() {
  const [vehicleType, setVehicleType] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [isPickupRequired, setIsPickupRequired] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    alert("Garage service booked successfully!")
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
          <Label htmlFor="service-type">Service Type</Label>
          <Select onValueChange={setServiceType} required>
            <SelectTrigger id="service-type">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular-service">Regular Service</SelectItem>
              <SelectItem value="repair">Repair</SelectItem>
              <SelectItem value="inspection">Inspection</SelectItem>
              <SelectItem value="custom">Custom Work</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Service Description</Label>
          <Textarea id="description" placeholder="Describe the service you need" required />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="pickup"
            checked={isPickupRequired}
            onCheckedChange={(checked) => setIsPickupRequired(checked as boolean)}
          />
          <label
            htmlFor="pickup"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Pickup Required
          </label>
        </div>

        {isPickupRequired && (
          <div>
            <Label htmlFor="pickup-address">Pickup Address</Label>
            <Input id="pickup-address" placeholder="Enter pickup address" />
          </div>
        )}

        <Button type="submit" className="w-full">
          Book Service
        </Button>
      </form>
    </div>
  )
}


