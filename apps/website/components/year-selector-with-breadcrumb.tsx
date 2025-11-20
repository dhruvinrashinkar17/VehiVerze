"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { SellFlowHeader } from "./sell-flow-header"

interface YearSelectorWithBreadcrumbProps {
  onSelect: (year: number) => void
  onBack: () => void
}

export function YearSelectorWithBreadcrumb({ onSelect, onBack }: YearSelectorWithBreadcrumbProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i)

  return (
    <div className="container mx-auto px-4 py-8">
      <SellFlowHeader step={1} title="Select Manufacturing Year" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h3 className="text-xl font-semibold ml-2">Select the car manufacturing year</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onSelect(year)}
              className="p-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-center transition-colors"
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


