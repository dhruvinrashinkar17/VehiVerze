"use client"

import { cn } from "@vehiverze/shared-utils/cn"
import { CheckCircle } from "lucide-react"

interface ServiceStep {
  title: string
  isCompleted: boolean
  isActive: boolean
  number: number
}

interface ServiceStepsProps {
  steps: ServiceStep[]
  className?: string
}

export function ServiceSteps({ steps, className }: ServiceStepsProps) {
  return (
    <div className={cn("flex items-center justify-between w-full max-w-3xl mx-auto mb-8", className)}>
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step.isCompleted ? "bg-green-500" : step.isActive ? "bg-purple-500" : "bg-gray-600",
              )}
            >
              {step.isCompleted ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <span className="text-white">{step.number}</span>
              )}
            </div>
            <span className="text-sm mt-2 text-center">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn("w-16 h-1 mx-2", step.isCompleted ? "bg-green-500" : "bg-gray-600")} />
          )}
        </div>
      ))}
    </div>
  )
}


