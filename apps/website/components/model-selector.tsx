"use client"

import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

const popularModels = {
  "4-wheeler": [
    { name: "Baleno", image: "/placeholder.svg?height=100&width=200" },
    { name: "Swift", image: "/placeholder.svg?height=100&width=200" },
    { name: "Wagon R 1.0", image: "/placeholder.svg?height=100&width=200" },
    { name: "Alto 800", image: "/placeholder.svg?height=100&width=200" },
  ],
  "2-wheeler": [
    { name: "Splendor", image: "/placeholder.svg?height=100&width=200" },
    { name: "Activa", image: "/placeholder.svg?height=100&width=200" },
    { name: "Pulsar", image: "/placeholder.svg?height=100&width=200" },
    { name: "Classic 350", image: "/placeholder.svg?height=100&width=200" },
  ],
  "3-wheeler": [
    { name: "RE Compact", image: "/placeholder.svg?height=100&width=200" },
    { name: "Ape City", image: "/placeholder.svg?height=100&width=200" },
    { name: "Maxima", image: "/placeholder.svg?height=100&width=200" },
    { name: "Alfa", image: "/placeholder.svg?height=100&width=200" },
  ],
  "6-wheeler": [
    { name: "1109", image: "/placeholder.svg?height=100&width=200" },
    { name: "Eicher Pro", image: "/placeholder.svg?height=100&width=200" },
    { name: "Tata 407", image: "/placeholder.svg?height=100&width=200" },
    { name: "Mahindra Furio", image: "/placeholder.svg?height=100&width=200" },
  ],
  "8-wheeler": [
    { name: "Tata Prima", image: "/placeholder.svg?height=100&width=200" },
    { name: "BharatBenz 3723R", image: "/placeholder.svg?height=100&width=200" },
    { name: "Eicher Pro 6049", image: "/placeholder.svg?height=100&width=200" },
    { name: "Ashok Leyland 3118", image: "/placeholder.svg?height=100&width=200" },
  ],
}

const otherModels = {
  "4-wheeler": ["Alto K10", "Brezza", "Celerio", "Ciaz", "Dzire", "Eeco", "Fronx", "Grand Vitara"],
  "2-wheeler": ["Passion", "Shine", "Unicorn", "Access", "Jupiter", "Apache", "Bullet", "FZ"],
  "3-wheeler": ["Ape Xtra", "Ape Auto DX", "Ape City Plus", "Maxima Z", "Alfa DX", "Compact 4S"],
  "6-wheeler": ["Tata LPT 1613", "Eicher Pro 3015", "BharatBenz 1617", "Ashok Leyland Boss 1616"],
  "8-wheeler": ["Volvo FM", "Scania P410", "Tata Signa 4225", "Ashok Leyland 3118 IL"],
}

interface ModelSelectorProps {
  brand: string
  vehicleType?: string
  onSelect: (model: string) => void
  onBack?: () => void
}

export function ModelSelector({ brand, vehicleType = "4-wheeler", onSelect, onBack }: ModelSelectorProps) {
  const models = popularModels[vehicleType as keyof typeof popularModels] || popularModels["4-wheeler"]
  const others = otherModels[vehicleType as keyof typeof otherModels] || otherModels["4-wheeler"]

  // Format vehicle type for display (e.g., "4-wheeler" to "Car")
  const getFormattedVehicleType = () => {
    switch (vehicleType) {
      case "2-wheeler":
        return "Bike"
      case "3-wheeler":
        return "Auto Rickshaw"
      case "4-wheeler":
        return "Car"
      case "6-wheeler":
        return "Medium Truck"
      case "8-wheeler":
        return "Heavy Truck"
      default:
        return "Vehicle"
    }
  }

  return (
    <div className="space-y-8">
      {onBack && (
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-3xl font-bold">Select the model of your {getFormattedVehicleType()}</h2>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={`Search your ${getFormattedVehicleType()} model`}
          className="w-full pl-12 pr-6 py-4 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <h3 className="text-xl mb-6">POPULAR {brand.toUpperCase()} MODELS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {models.map((model) => (
            <button
              key={model.name}
              onClick={() => onSelect(model.name)}
              className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-black"
              aria-label={`Sell your old ${getFormattedVehicleType()} ${brand} ${model.name}`}
            >
              <Image
                src={model.image || "/placeholder.svg"}
                alt={`${brand} ${model.name}`}
                width={200}
                height={100}
                className="mb-4 rounded"
              />
              <span className="text-lg">{model.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl mb-6">OTHER MODELS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {others.map((model) => (
            <button
              key={model}
              onClick={() => onSelect(model)}
              className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-black"
              aria-label={`Sell your old ${getFormattedVehicleType()} ${brand} ${model}`}
            >
              <span>{model}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


