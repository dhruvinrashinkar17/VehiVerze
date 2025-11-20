"use client"

import { useEffect, useRef } from "react"

export function BrandsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = containerRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    const clientWidth = scrollContainer.clientWidth

    if (scrollWidth <= clientWidth) return

    const scroll = () => {
      if (!scrollContainer) return

      if (scrollContainer.scrollLeft >= scrollWidth - clientWidth) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const intervalId = setInterval(scroll, 20)
    return () => clearInterval(intervalId)
  }, [])

  const brands = [
    "Bajaj",
    "TVS",
    "Royal Enfield",
    "Suzuki",
    "Yamaha",
    "KTM",
    "Jawa",
    "Benelli",
    "Honda",
    "Hero",
    "Mahindra",
    "Tata",
    "Hyundai",
    "Maruti Suzuki",
    "Toyota",
    "Kia",
    "MG",
    "Skoda",
    "Volkswagen",
    "Mercedes-Benz",
    "BMW",
    "Audi",
  ]

  return (
    <div className="bg-black text-white py-6 overflow-hidden">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {brands.map((brand, index) => (
          <div key={index} className="text-xl md:text-2xl font-bold px-8 inline-block">
            {brand}
          </div>
        ))}
        {/* Duplicate brands to create seamless loop */}
        {brands.map((brand, index) => (
          <div key={`duplicate-${index}`} className="text-xl md:text-2xl font-bold px-8 inline-block">
            {brand}
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}


