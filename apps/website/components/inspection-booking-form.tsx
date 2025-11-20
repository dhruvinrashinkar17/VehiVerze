"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Calendar } from "@vehiverze/ui/calendar"
import { Label } from "@vehiverze/ui/label"
import { MapPin } from "lucide-react"

export function InspectionBookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const timeSlots = [
    "8:00 AM - 9:30 AM",
    "9:30 AM - 11:00 AM",
    "11:00 AM - 12:30 PM",
    "2:00 PM - 3:30 PM",
    "3:30 PM - 5:00 PM",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/sell-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Add vehicle details from previous steps (stored in state/context)
          inspectionDate: selectedDate,
          inspectionTime: selectedTime,
          inspectionAddress: address,
          status: "INSPECTION_SCHEDULED",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to book inspection")
      }

      router.push("/sell/confirmation")
    } catch (error) {
      console.error("Error booking inspection:", error)
      alert("Failed to book inspection. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Your Address</Label>
        <div className="relative">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Add Your Address"
            className="pl-10"
            required
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Select Date</Label>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          disabled={(date) => date < new Date()}
        />
      </div>

      <div className="space-y-4">
        <Label>Select Time Slot</Label>
        <p className="text-sm text-gray-500">
          Evaluation takes 45 - 60 mins & will be completed within the specified time slot
        </p>
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedTime(slot)}
              className={`p-4 rounded-lg border ${
                selectedTime === slot
                  ? "border-orange-500 bg-orange-50 text-orange-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6" disabled={loading}>
        {loading ? "Booking..." : "BOOK FREE INSPECTION"}
      </Button>
    </form>
  )
}


