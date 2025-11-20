"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"

export function OffersSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const offers = [
    {
      title: "Special Discount",
      description: "Stay tuned for exciting updates—get extra value on your vehicle sale!",
      background: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      title: "Premium Service",
      description: "Stay tuned for exciting updates—exclusive maintenance packages coming soon!",
      background: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      title: "Insurance Deals",
      description: "Stay tuned for exciting updates—special insurance offers on the way!",
      background: "bg-gradient-to-br from-green-500 to-green-700",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">OUR OFFERS TO OUR PRECIOUS CUSTOMERS</h2>
        <div className="relative">
          <Button variant="ghost" className="absolute left-0 top-1/2 -translate-y-1/2 z-10" onClick={prevSlide}>
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {offers.map((offer, index) => (
                <Card key={index} className="w-full flex-shrink-0">
                  <CardContent
                    className={`${offer.background} p-12 text-center text-white min-h-[300px] flex flex-col items-center justify-center`}
                  >
                    <h3 className="text-3xl font-bold mb-4">{offer.title}</h3>
                    <p className="text-lg opacity-90">{offer.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Button variant="ghost" className="absolute right-0 top-1/2 -translate-y-1/2 z-10" onClick={nextSlide}>
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </section>
  )
}


