"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface VariantSelectorProps {
  onSelect: (variant: string) => void
  onBack: () => void
}

const variants = [
  { name: "GLAM", years: "2005 - 2010" },
  { name: "LXI", years: "2007 - 2011" },
  { name: "VXI", years: "2007 - 2011" },
  { name: "VXI ABS", years: "2007 - 2011" },
]

export function VariantSelector({ onSelect, onBack }: VariantSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-3xl font-bold"></h2>
      </div>

      <div>
        <h3 className="text-xl mb-6"></h3>
        <div className="space-y-4">
          {variants.map((variant) => (
            <button
              key={variant.name}
              onClick={() => onSelect(variant.name)}
              className="w-full p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-left"
              aria-label={`Sell your old car ${variant.name} variant`}
            >
              <span className="text-xl font-semibold">{variant.name}</span>
              <span className="text-gray-400 ml-4">[{variant.years}]</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


