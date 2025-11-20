"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CheckCircle2, Info } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface Step {
  id: number
  title: string
  completed: boolean
  current: boolean
}

const steps: Step[] = [
  { id: 1, title: "Basic details", completed: true, current: false },
  { id: 2, title: "Car condition", completed: true, current: false },
  { id: 3, title: "Price estimate", completed: false, current: true },
  { id: 4, title: "Book inspection", completed: false, current: false },
  { id: 5, title: "Inspection booked", completed: false, current: false },
]

const conditions = ["Fair", "Good", "Very Good", "Excellent"]

const priceRanges = {
  Fair: {
    min: "4,04,490",
    max: "4,59,617",
  },
  Good: {
    min: "4,47,804",
    max: "5,46,247",
  },
  "Very Good": {
    min: "5,42,309",
    max: "5,91,530",
  },
  Excellent: {
    min: "5,81,686",
    max: "6,01,374",
  },
}

export function VehicleConditionSelector() {
  const [selectedCondition, setSelectedCondition] = useState("Very Good")
  const router = useRouter()

  const selectedRange = priceRanges[selectedCondition as keyof typeof priceRanges]

  const handleBookInspection = async () => {
    try {
      const response = await fetch("/api/sell-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          condition: selectedCondition,
          estimatedPriceMin: selectedRange.min,
          estimatedPriceMax: selectedRange.max,
          status: "PENDING_INSPECTION",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save condition")
      }

      router.push("/sell/inspection-booking")
    } catch (error) {
      console.error("Error saving condition:", error)
      alert("Failed to proceed. Please try again.")
    }
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Progress Steps */}
      <div className="col-span-3">
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-4">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                  step.completed ? "bg-green-500" : step.current ? "bg-orange-500" : "bg-gray-200"
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <span className={step.current ? "text-white" : "text-gray-600"}>{step.id}</span>
                )}
              </div>
              <div>
                <h3 className={`font-medium ${step.current ? "text-orange-500" : "text-gray-900"}`}>{step.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-6">
        <div className="space-y-8">
          {/* Vehicle Details */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/design-mode/image.png"
              alt="Maruti Suzuki"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Maruti Suzuki Baleno DELTA</h2>
              <p className="text-gray-500">2025 | Petrol | DL-08</p>
            </div>
          </div>

          {/* Price Estimate Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Price estimate</h3>
              <Button variant="outline" size="sm" className="text-orange-500">
                <Info className="w-4 h-4 mr-2" />
                KNOW HOW
              </Button>
            </div>

            <h4 className="text-lg mb-4">Select Your Car Condition</h4>

            {/* Condition Selector */}
            <div className="space-y-8">
              <div className="relative pt-8">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-2 bg-orange-500 rounded-full transition-all"
                    style={{
                      width: `${((conditions.indexOf(selectedCondition) + 1) / conditions.length) * 100}%`,
                    }}
                  />
                  {conditions.map((condition, index) => (
                    <button
                      key={condition}
                      onClick={() => setSelectedCondition(condition)}
                      className={`absolute w-6 h-6 rounded-full -mt-2 transition-all ${
                        conditions.indexOf(selectedCondition) >= index
                          ? "bg-orange-500"
                          : "bg-gray-200 border-2 border-white"
                      }`}
                      style={{ left: `${((index + 1) / conditions.length) * 100 - 3}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                {conditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => setSelectedCondition(condition)}
                    className={`text-sm font-medium ${
                      selectedCondition === condition ? "text-orange-500" : "text-gray-500"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gray-900">
                ₹{selectedRange.min} - ₹{selectedRange.max}
              </div>
              <p className="text-sm text-gray-500 mt-2">You may get a better price upon inspection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-3">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <Image
                src="/images/design-mode/image.png"
                alt="Inspection"
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">What's Next?</h3>
              <p className="text-sm text-gray-500">
                We'll make you an offer after our expert physically verifies your car's condition
              </p>
            </div>
          </div>
          <Button onClick={handleBookInspection} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            BOOK INSPECTION
          </Button>
        </div>
      </div>
    </div>
  )
}


