"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"
import { Card, CardContent } from "@vehiverze/ui/card"
import { ChevronDown, Filter, Search } from "lucide-react"

const carBrands = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Kia",
  "Toyota",
  "Honda",
  "MG",
  "Volkswagen",
  "Skoda",
]

const priceRanges = ["Under ₹5 Lakh", "₹5-10 Lakh", "₹10-15 Lakh", "₹15-20 Lakh", "₹20-30 Lakh", "Above ₹30 Lakh"]

const carTypes = ["Hatchback", "Sedan", "SUV", "MUV", "Luxury"]

const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]

const newCars = [
  {
    id: 1,
    name: "Maruti Suzuki Fronx",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹7.51 - 13.03 Lakh",
    type: "SUV",
    fuel: "Petrol, CNG",
    rating: 4.3,
    launchDate: "April 2023",
  },
  {
    id: 2,
    name: "Hyundai Creta",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹10.87 - 19.20 Lakh",
    type: "SUV",
    fuel: "Petrol, Diesel",
    rating: 4.5,
    launchDate: "January 2023",
  },
  {
    id: 3,
    name: "Tata Nexon",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹8.10 - 15.50 Lakh",
    type: "SUV",
    fuel: "Petrol, Diesel, Electric",
    rating: 4.4,
    launchDate: "September 2023",
  },
  {
    id: 4,
    name: "Mahindra XUV700",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹13.99 - 26.99 Lakh",
    type: "SUV",
    fuel: "Petrol, Diesel",
    rating: 4.7,
    launchDate: "October 2022",
  },
  {
    id: 5,
    name: "Kia Seltos",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹10.90 - 20.30 Lakh",
    type: "SUV",
    fuel: "Petrol, Diesel",
    rating: 4.6,
    launchDate: "July 2023",
  },
  {
    id: 6,
    name: "Toyota Innova Hycross",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹18.30 - 30.00 Lakh",
    type: "MUV",
    fuel: "Petrol, Hybrid",
    rating: 4.8,
    launchDate: "December 2022",
  },
]

export function NewCarsContent() {
  const [activeTab, setActiveTab] = useState("popular")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">New Cars in India</h1>
          <p className="text-gray-600">Explore the latest car models with best deals and financing options</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search cars by brand, model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">All Brands</option>
                {carBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">All Types</option>
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">All Fuel Types</option>
                {fuelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="popular" onClick={() => setActiveTab("popular")}>
              Popular
            </TabsTrigger>
            <TabsTrigger value="latest" onClick={() => setActiveTab("latest")}>
              Latest
            </TabsTrigger>
            <TabsTrigger value="upcoming" onClick={() => setActiveTab("upcoming")}>
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="electric" onClick={() => setActiveTab("electric")}>
              Electric
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCars.map((car) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{car.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">{car.price}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{car.type}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{car.fuel}</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        ★ {car.rating}/5
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <span className="text-sm text-gray-500">Launched: {car.launchDate}</span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="latest" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCars
                .filter((car) => new Date(car.launchDate).getFullYear() >= 2023)
                .map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold">{car.name}</h3>
                      <p className="text-lg font-bold text-gray-900 mt-1">{car.price}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{car.type}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{car.fuel}</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          ★ {car.rating}/5
                        </span>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <span className="text-sm text-gray-500">Launched: {car.launchDate}</span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">Coming Soon</h3>
              <p className="mt-2 text-gray-500">Stay tuned for upcoming car models</p>
            </div>
          </TabsContent>

          <TabsContent value="electric" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCars
                .filter((car) => car.fuel.includes("Electric"))
                .map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold">{car.name}</h3>
                      <p className="text-lg font-bold text-gray-900 mt-1">{car.price}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{car.type}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{car.fuel}</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          ★ {car.rating}/5
                        </span>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <span className="text-sm text-gray-500">Launched: {car.launchDate}</span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


