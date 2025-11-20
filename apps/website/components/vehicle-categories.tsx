"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function VehicleCategories() {
  const [activeTab, setActiveTab] = useState("buy")
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  const vehicleTypes = [
    {
      type: "2-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      buyPath: "/buy/2-wheeler",
      sellPath: "/sell/2-wheeler",
    },
    {
      type: "3-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      buyPath: "/buy/3-wheeler",
      sellPath: "/sell/3-wheeler",
    },
    {
      type: "4-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      buyPath: "/buy/4-wheeler",
      sellPath: "/sell/4-wheeler",
    },
    {
      type: "6-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      buyPath: "/buy/6-wheeler",
      sellPath: "/sell/6-wheeler",
    },
    {
      type: "8-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      buyPath: "/buy/more-than-8-wheeler",
      sellPath: "/sell/8-wheeler",
    },
  ]

  // Determine items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(vehicleTypes.length) // Show all on mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4) // Tablet
      } else {
        setItemsPerPage(6) // Desktop/Laptop
      }
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [vehicleTypes.length])

  const handleCardClick = (path: string, applicableVehicles?: string[]) => {
    if (activeTab === "garage") {
      // Store the service info in sessionStorage for the next page
      if (applicableVehicles) {
        sessionStorage.setItem(
          "selectedService",
          JSON.stringify({
            path,
            applicableVehicles,
          }),
        )
      }
      router.push(path)
      return
    }
    if (activeTab === "new-cars") {
      router.push(path)
      return
    }
    router.push(path)
  }

  const handleGarageServiceClick = () => {
    setActiveTab("garage")
    router.push("/garage-services/vehicle-selection")
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {activeTab !== "garage" && <h2 className="text-3xl font-bold text-center mb-6">Browse by Vehicle Category</h2>}

        {/* Enhanced Toggle Section with better UI */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2 sm:inline-flex rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg bg-white p-1.5 max-w-full">
            <button
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 rounded-lg border ${
                activeTab === "buy"
                  ? "bg-blue-600 text-white shadow-md transform scale-105 border-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("buy")
                setCurrentPage(1)
              }}
            >
              Buy
            </button>
            <button
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 rounded-lg border ${
                activeTab === "sell"
                  ? "bg-blue-600 text-white shadow-md transform scale-105 border-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("sell")
                setCurrentPage(1)
              }}
            >
              Sell
            </button>
            <button
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
              onClick={handleGarageServiceClick}
            >
              Garage Service
            </button>
            <button
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 rounded-lg border ${
                activeTab === "new-cars"
                  ? "bg-blue-600 text-white shadow-md transform scale-105 border-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("new-cars")
                setCurrentPage(1)
              }}
            >
              New Vehicle
            </button>
          </div>
        </div>

        {activeTab === "buy" || activeTab === "sell" ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicleTypes.map((vehicle, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 border border-gray-200"
                  onClick={() => handleCardClick(activeTab === "buy" ? vehicle.buyPath : vehicle.sellPath)}
                >
                  <div className="p-6 flex flex-col items-center">
                    <div className="bg-blue-50 p-4 rounded-full mb-4">
                      <img
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.type}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-center text-gray-800">{vehicle.type}</h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NewCarsGrid />
        )}
      </div>
    </section>
  )
}

function NewCarsGrid() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  const vehicleTypes = [
    {
      type: "2-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      path: "/new-vehicles/2-wheeler",
    },
    {
      type: "3-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      path: "/new-vehicles/3-wheeler",
    },
    {
      type: "4-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      path: "/new-vehicles/4-wheeler",
      subCategories: [
        {
          type: "Sedan",
          path: "/new-vehicles/4-wheeler/sedan",
        },
        {
          type: "SUV",
          path: "/new-vehicles/4-wheeler/suv",
        },
        {
          type: "Hatchback",
          path: "/new-vehicles/4-wheeler/hatchback",
        },
        {
          type: "Luxury",
          path: "/new-vehicles/4-wheeler/luxury",
        },
      ],
    },
    {
      type: "6-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      path: "/new-vehicles/6-wheeler",
    },
    {
      type: "More-Than-8-Wheelers",
      image: "/placeholder.svg?height=100&width=100",
      path: "/new-vehicles/more-than-8-wheeler",
    },
  ]

  // Determine items per page based on screen size
  useEffect(() => {
    setItemsPerPage(vehicleTypes.length)
  }, [vehicleTypes.length])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicleTypes.map((vehicle, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 border border-gray-200"
            onClick={() => router.push(vehicle.path)}
          >
            <div className="p-6 flex flex-col items-center">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.type}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800">{vehicle.type}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* No pagination controls - showing all items */}
    </>
  )
}


