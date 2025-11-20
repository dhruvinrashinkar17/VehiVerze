"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@vehiverze/ui/input"
import { Search } from "lucide-react"

interface Brand {
  id: string
  name: string
  logo: string
  popular: boolean
}

const carBrands: Brand[] = [
  { id: "maruti-suzuki", name: "Maruti Suzuki", logo: "/placeholder.svg?height=80&width=80", popular: true },
  { id: "hyundai", name: "Hyundai", logo: "/placeholder.svg?height=80&width=80", popular: true },
  { id: "tata", name: "Tata", logo: "/placeholder.svg?height=80&width=80", popular: true },
  { id: "mahindra", name: "Mahindra", logo: "/placeholder.svg?height=80&width=80", popular: true },
  { id: "kia", name: "Kia", logo: "/placeholder.svg?height=80&width=80", popular: true },
  { id: "toyota", name: "Toyota", logo: "/placeholder.svg?height=80&width=80", popular: true },
  { id: "honda", name: "Honda", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "mg", name: "MG", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "volkswagen", name: "Volkswagen", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "skoda", name: "Skoda", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "mercedes-benz", name: "Mercedes-Benz", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "bmw", name: "BMW", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "audi", name: "Audi", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "jeep", name: "Jeep", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "nissan", name: "Nissan", logo: "/placeholder.svg?height=80&width=80", popular: false },
  { id: "renault", name: "Renault", logo: "/placeholder.svg?height=80&width=80", popular: false },
]

export function BrandSelector() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBrands = carBrands.filter((brand) => brand.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const popularBrands = filteredBrands.filter((brand) => brand.popular)
  const otherBrands = filteredBrands.filter((brand) => !brand.popular)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Select a Car Brand</h1>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for a brand..."
            className="pl-10 py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {popularBrands.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Popular Brands</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
              {popularBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/buy/new-cars/${brand.id}/models`}
                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={80}
                    height={80}
                    className="mb-3"
                  />
                  <span className="text-center font-medium">{brand.name}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {otherBrands.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">All Brands</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {otherBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/buy/new-cars/${brand.id}/models`}
                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={80}
                    height={80}
                    className="mb-3"
                  />
                  <span className="text-center font-medium">{brand.name}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {filteredBrands.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No brands found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}


