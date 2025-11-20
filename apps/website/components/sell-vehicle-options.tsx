"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export function SellVehicleOptions() {
  const router = useRouter()

  const vehicleTypes = [
    {
      type: "2-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/sell/2-wheeler",
      description: "Motorcycles, Scooters, and Mopeds",
    },
    {
      type: "3-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/sell/3-wheeler",
      description: "Auto Rickshaws and Three-Wheeler Vehicles",
    },
    {
      type: "4-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/sell/4-wheeler",
      description: "Cars, SUVs, and Passenger Vehicles",
    },
    {
      type: "6-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/sell/6-wheeler",
      description: "Medium Commercial Vehicles and Trucks",
    },
    {
      type: "More-Than-8-Wheelers",
      image: "/placeholder.svg?height=200&width=200",
      path: "/sell/8-wheeler",
      description: "Heavy Commercial Vehicles and Large Trucks",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sell Your Vehicle</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your vehicle type to get started with our hassle-free selling process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {vehicleTypes.map((vehicle, index) => (
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
                <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Sell {vehicle.type}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


