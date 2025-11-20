"use client"

import { Breadcrumb } from "./breadcrumb"

interface SellFlowHeaderProps {
  step: number
  title: string
  subtitle?: string
}

export function SellFlowHeader({ step, title, subtitle }: SellFlowHeaderProps) {
  // Define breadcrumb items based on the current step
  const breadcrumbItems = [{ label: "Sell", href: "/sell" }, { label: "Sell Car" }]

  return (
    <div className="mb-8">
      <Breadcrumb items={breadcrumbItems} title="Sell Your Used Car for Instant Cash – Vehiverze" />

      <div className="flex items-center justify-between mb-6 mt-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center w-full max-w-md">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i < step
                    ? "bg-green-500 text-white"
                    : i === step
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {i}
              </div>
              {i < 4 && <div className={`h-1 flex-1 ${i < step ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


