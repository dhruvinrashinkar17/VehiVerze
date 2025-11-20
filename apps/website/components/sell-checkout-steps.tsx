"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { CarDetails } from "./sell-checkout/car-details"
import { CarCondition } from "./sell-checkout/Vechile-condition"
import { PriceEstimation } from "./sell-checkout/price-estimation"
import { BookInspection } from "./sell-checkout/book-inspection"

const steps = [
  { id: 1, title: "Basic details", component: CarDetails },
  { id: 2, title: "Car condition", component: CarCondition },
  { id: 3, title: "Price estimate", component: PriceEstimation },
  { id: 4, title: "Book inspection", component: BookInspection },
]

export function SellCheckoutSteps() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [formData, setFormData] = useState({
    brand: "Maruti Suzuki",
    model: "Baleno DELTA",
    variant: "PETROL 1.2",
    year: "2025",
    location: "DL-08",
    condition: "Very Good",
  })

  const handleNext = () => {
    setCompletedSteps([...completedSteps, currentStep])
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  const CurrentStepComponent = steps[currentStep - 1]?.component

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                completedSteps.includes(step.id)
                  ? "bg-green-500"
                  : step.id === currentStep
                    ? "bg-white/10"
                    : "bg-gray-300"
              }`}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <span className={step.id === currentStep ? "text-white" : "text-gray-600"}>{step.id}</span>
              )}
            </div>
            <div className="ml-2">{step.title}</div>
            {step.id !== steps.length && <div className="w-24 h-1 bg-gray-300 mx-4" />}
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      {CurrentStepComponent && (
        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </div>
  )
}


