"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

const years = Array.from({ length: 18 }, (_, i) => 2025 - i)

interface YearSelectorProps {
  onSelect: (year: string) => void
  onBack: () => void
}

export function YearSelector({ onSelect, onBack }: YearSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-3xl font-bold">Select the car manufacturing year</h2>
      </div>

      <div className="year-grid">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelect(year.toString())}
            className="p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
            aria-label={`Sell your old car from ${year}`}
          >
            <span className="text-xl">{year}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


