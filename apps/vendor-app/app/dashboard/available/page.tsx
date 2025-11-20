"use client"

import { useRouter } from "next/navigation"
import { Card } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Clock, Calendar, Hash } from "lucide-react"

const availableVehicles = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    type: "2 Wheeler",
    price: 170000,
    credits: 50,
    datetime: "2025-02-23 : 10:00 AM - 01:00 PM",
    orderNumber: "40001",
  },
  {
    id: 2,
    name: "Bajaj Auto Rickshaw",
    type: "3 Wheeler",
    price: 250000,
    credits: 40,
    datetime: "2025-02-22 : 02:00 PM - 05:00 PM",
    orderNumber: "40002",
  },
  {
    id: 3,
    name: "Tata Nexon EV",
    type: "4 Wheeler",
    price: 500000,
    credits: 65,
    datetime: "2025-02-22 : 01:00 PM - 04:00 PM",
    orderNumber: "40003",
  },
  {
    id: 4,
    name: "Tata LPT 1613",
    type: "6 Wheeler",
    price: 1200000,
    credits: 80,
    datetime: "2025-02-22 : 03:00 PM - 06:00 PM",
    orderNumber: "40004",
  },
  {
    id: 5,
    name: "Ashok Leyland Truck",
    type: "More Than 8 Wheelers",
    price: 1355000,
    credits: 100,
    datetime: "2025-02-22 : 10:00 AM - 01:00 PM",
    orderNumber: "40005",
  },
]

export default function AvailablePage() {
  const router = useRouter()

  const handleVehicleClick = (vehicleId: number) => {
    router.push(`/dashboard/vehicle/${vehicleId}`)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Available</h1>
        <Badge
          variant="outline"
          className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 bg-green-50 border-green-200 font-semibold self-start sm:self-auto text-blue-600"
        >
          {availableVehicles.length} Orders
        </Badge>
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid gap-4 sm:gap-6">
        {availableVehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className="p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-bluee-700 bg-gradient-to-r from-white to-green-50/30"
            onClick={() => handleVehicleClick(vehicle.id)}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {/* Vehicle Info Section */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{vehicle.name}</h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 text-sm font-medium self-start sm:self-auto"
                  >
                    {vehicle.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-black" />
                    <span>{vehicle.datetime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-black" />
                    <span>Order #{vehicle.orderNumber}</span>
                  </div>
                </div>
              </div>

              {/* Price and Credits Section */}
              <div className="flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-end gap-4 lg:gap-2">
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">₹{vehicle.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Base Price</div>
                </div>

                <div className="px-3 py-2 rounded-lg font-bold text-lg text-blue-600 bg-gray-300">
                  {vehicle.credits}
                </div>
              </div>
            </div>

            {/* Timer Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                <div className="text-red-500 text-xl sm:text-2xl font-mono font-bold">00:00:00</div>
                <span className="text-sm text-gray-500 ml-2">Time Remaining</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Section */}
      <div className="flex justify-center pt-4">
        <button className="px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium bg-blue-600 text-white">
          Load More Vehicles
        </button>
      </div>
    </div>
  )
}


