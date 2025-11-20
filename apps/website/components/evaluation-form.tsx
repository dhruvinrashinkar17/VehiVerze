"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Calendar } from "@vehiverze/ui/calendar"
import { MapPin } from "lucide-react"

const timeSlots = ["8:00 AM - 9:30 AM", "9:30 AM - 11:00 AM", "11:00 AM - 12:30 PM", "12:30 PM - 2:00 PM"]

export function EvaluationForm() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSlot, setSelectedSlot] = useState("")
  const [address, setAddress] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit evaluation booking
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold text-purple-900 text-center mb-8">
        Schedule a free evaluation to get the exact price of your car
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-gray-700 font-medium">Your Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-10"
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-gray-700 font-medium">Select Date</label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </div>

        <div className="space-y-4">
          <label className="text-gray-700 font-medium">Select Time Slot</label>
          <p className="text-sm text-gray-500">
            Evaluation takes 45 - 60 mins & will be completed within the specified time slot
          </p>
          <div className="grid grid-cols-2 gap-4">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`p-4 rounded-lg border text-center ${
                  selectedSlot === slot
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-lg py-6">
          Book Free Evaluation
        </Button>
      </form>
    </div>
  )
}


