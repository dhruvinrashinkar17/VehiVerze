"use client"

import { Button } from "@vehiverze/ui/button"

interface PriceEstimationProps {
  formData: any
  onNext: () => void
  onBack: () => void
}

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

export function PriceEstimation({ formData, onNext, onBack }: PriceEstimationProps) {
  const priceRange = priceRanges[formData.condition as keyof typeof priceRanges]

  return (
    <div className="space-y-8">
      <div className="bg-white/5 rounded-lg p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Estimated Price Range</h2>
          <div className="text-4xl font-bold">
            ₹{priceRange.min} - ₹{priceRange.max}
          </div>
          <p className="text-gray-400">Based on your car's condition: {formData.condition}</p>
        </div>

        <div className="mt-8 p-4 bg-black/20 rounded-lg">
          <p className="text-sm text-gray-300">
            This is an estimated price range. The final price will be determined after physical inspection of your car.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="flex-1">
          Schedule Inspection
        </Button>
      </div>
    </div>
  )
}


