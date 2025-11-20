"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import Image from "next/image"

interface FuelTypeSelectorProps {
  onSelect: (fuelType: string) => void
  onBack: () => void
}

const fuelTypes = [
  {
    type: "Petrol",
    icon: "/placeholder.svg?height=50&width=50",
    color: "bg-purple-100 text-purple-900",
  },
  {
    type: "Diesel",
    icon: "/placeholder.svg?height=50&width=50",
    color: "bg-amber-100 text-amber-900",
  },
  {
    type: "CNG",
    icon: "/placeholder.svg?height=50&width=50",
    color: "bg-blue-100 text-blue-900",
  },
]

export function FuelTypeSelector({ onSelect, onBack }: FuelTypeSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-3xl font-bold">Select the fuel type of your car</h2>
      </div>

      <div>
        <h3 className="text-xl mb-6">SELECT FUEL TYPE</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {fuelTypes.map((fuel) => (
            <button
              key={fuel.type}
              onClick={() => onSelect(fuel.type)}
              className="p-8 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-center space-y-4"
              aria-label={`Sell your old car with ${fuel.type} fuel type`}
            >
              <Image src={fuel.icon || "/placeholder.svg"} alt={fuel.type} width={50} height={50} className="mx-auto" />
              <span className="text-xl">{fuel.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


