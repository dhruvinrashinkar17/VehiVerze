"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface KilometersSelectorProps {
  onSelect: (kilometers: string) => void
  onBack: () => void
}

const kilometerRanges = [
  "0 Km - 10,000 Km",
  "10,000 Km - 20,000 Km",
  "20,000 Km - 30,000 Km",
  "30,000 Km - 40,000 Km",
  "40,000 Km - 50,000 Km",
  "50,000 Km - 60,000 Km",
]

export function KilometersSelector({ onSelect, onBack }: KilometersSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-3xl font-bold">Select the kilometers driven by your car</h2>
      </div>

      <div className="space-y-4">
        {kilometerRanges.map((range) => (
          <button
            key={range}
            onClick={() => onSelect(range)}
            className="w-full p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-center"
            aria-label={`Sell your old car with ${range} driven`}
          >
            <span className="text-xl">{range}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


