"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Calendar } from "@vehiverze/ui/calendar"
import { Label } from "@vehiverze/ui/label"
import { MapPin } from "lucide-react"

interface BookInspectionProps {
  formData: any
  onBack: () => void
}

export function BookInspection({ formData, onBack }: BookInspectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [address, setAddress] = useState("")

  const timeSlots = [
    "8:00 AM - 9:30 AM",
    "9:30 AM - 11:00 AM",
    "11:00 AM - 12:30 PM",
    "2:00 PM - 3:30 PM",
    "3:30 PM - 5:00 PM",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle inspection booking
    alert("Inspection booked successfully!")
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/5 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Schedule Free Inspection</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Your Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10"
                placeholder="Enter your address"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border bg-white/5"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="space-y-4">
            <Label>Select Time Slot</Label>
            <p className="text-sm text-gray-400">
              Evaluation takes 45 - 60 mins & will be completed within the specified time slot
            </p>
            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`p-4 rounded-lg border text-center ${
                    selectedTime === slot
                      ? "border-green-500 bg-green-500/10 text-green-500"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Book Free Inspection
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


