"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface SellingTimelineSelectorProps {
  onSelect: (timeline: string) => void
  onBack: () => void
}

const timelineOptions = ["Immediately", "Within a month", "After a month", "Just checking price"]

export function SellingTimelineSelector({ onSelect, onBack }: SellingTimelineSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-3xl font-bold">When do you want to sell your car?</h2>
      </div>

      <div className="space-y-4">
        {timelineOptions.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="w-full p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-center"
          >
            <span className="text-xl">{option}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


