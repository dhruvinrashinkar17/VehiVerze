"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function BrowseVehicleOptions() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("used")

  const vehicleTypes = [
    {
      type: "2-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/buy/2-wheeler",
      description: "Motorcycles, Scooters, and Mopeds",
    },
    {
      type: "3-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/buy/3-wheeler",
      description: "Auto Rickshaws and Three-Wheeler Vehicles",
    },
    {
      type: "4-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/buy/4-wheeler",
      description: "Cars, SUVs, and Passenger Vehicles",
    },
    {
      type: "6-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/buy/6-wheeler",
      description: "Medium Commercial Vehicles and Trucks",
    },
    {
      type: "More-Than-8-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/buy/more-than-8-wheeler",
      description: "Heavy Commercial Vehicles and Large Trucks",
    },
  ]

  const newCarTypes = [
    {
      type: "Sedan",
      image: "/placeholder.svg?height=200&width=200",
      path: "/new-cars/sedan",
      description: "Comfortable, stylish cars with separate trunk space",
    },
    {
      type: "Hatchback",
      image: "/placeholder.svg?height=200&width=200",
      path: "/new-cars/hatchback",
      description: "Compact cars with rear door that opens upward",
    },
    {
      type: "SUV",
      image: "/placeholder.svg?height=200&width=200",
      path: "/new-cars/suv",
      description: "Spacious vehicles with elevated seating and rugged capability",
    },
    {
      type: "Luxury",
      image: "/placeholder.svg?height=200&width=200",
      path: "/new-cars/luxury",
      description: "Premium vehicles with advanced features and superior comfort",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Vehicles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our extensive collection of quality vehicles
          </p>
        </div>

        {/* Toggle Section */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <button
              className={`px-8 py-3 text-lg font-semibold transition ${
                activeTab === "used" ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("used")}
            >
              Used Vehicles
            </button>
            <button
              className={`px-8 py-3 text-lg font-semibold transition ${
                activeTab === "new" ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("new")}
            >
              New Cars
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activeTab === "used"
            ? vehicleTypes.map((vehicle, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
                  onClick={() => router.push(vehicle.path)}
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.type}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{vehicle.type}</h3>
                    <p className="text-gray-600">{vehicle.description}</p>
                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Browse {vehicle.type}
                    </button>
                  </div>
                </div>
              ))
            : newCarTypes.map((car, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
                  onClick={() => router.push(car.path)}
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image src={car.image || "/placeholder.svg"} alt={car.type} fill className="object-contain p-4" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{car.type}</h3>
                    <p className="text-gray-600">{car.description}</p>
                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Browse {car.type}
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}


