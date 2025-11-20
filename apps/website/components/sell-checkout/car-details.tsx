"use client"

import { Button } from "@vehiverze/ui/button"
import Image from "next/image"

interface CarDetailsProps {
  formData: any
  onNext: () => void
}

export function CarDetails({ formData, onNext }: CarDetailsProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-8">
        <Image src="/placeholder.svg" alt="Car Brand" width={64} height={64} className="rounded-full" />
        <div>
          <h2 className="text-2xl font-semibold">
            {formData.brand} {formData.model}
          </h2>
          <p className="text-gray-400">
            {formData.year} | {formData.variant} | {formData.location}
          </p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          EDIT
        </Button>
      </div>

      <Button onClick={onNext} className="w-full">
        Continue
      </Button>
    </div>
  )
}


