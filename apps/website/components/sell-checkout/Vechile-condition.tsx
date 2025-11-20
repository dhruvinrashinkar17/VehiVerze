"use client"

import { Button } from "@vehiverze/ui/button"
import { Label } from "@vehiverze/ui/label"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"

interface CarConditionProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function CarCondition({ formData, updateFormData, onNext, onBack }: CarConditionProps) {
  const conditions = [
    {
      value: "Fair",
      label: "Fair",
      description: "Vehicle has some cosmetic defects and needs some mechanical repairs",
    },
    {
      value: "Good",
      label: "Good",
      description: "Vehicle has minor cosmetic defects and is mechanically sound",
    },
    {
      value: "Very Good",
      label: "Very Good",
      description: "Vehicle has minimal cosmetic defects and is in excellent mechanical condition",
    },
    {
      value: "Excellent",
      label: "Excellent",
      description: "Vehicle is in exceptional condition and operates perfectly",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Select your car's condition</h2>
        <RadioGroup
          value={formData.condition}
          onValueChange={(value) => updateFormData({ condition: value })}
          className="space-y-4"
        >
          {conditions.map((condition) => (
            <Label
              key={condition.value}
              className="flex items-center space-x-3 space-y-0 cursor-pointer p-4 rounded-lg border border-gray-600 hover:border-gray-400"
            >
              <RadioGroupItem value={condition.value} id={condition.value} />
              <div className="space-y-1">
                <p className="text-lg font-medium">{condition.label}</p>
                <p className="text-gray-400">{condition.description}</p>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  )
}


