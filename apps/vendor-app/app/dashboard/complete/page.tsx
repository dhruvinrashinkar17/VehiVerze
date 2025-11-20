"use client"

import Link from "next/link"
import { Card } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Button } from "@vehiverze/ui/button"
import { Eye } from "lucide-react"

const completedVehicles = [
  {
    id: 1,
    name: "Toyota Innova",
    type: "4 Wheeler",
    price: 1800000,
    completionDate: "2025-02-20",
    orderNumber: "40009",
  },
  {
    id: 2,
    name: "Hero Splendor",
    type: "2 Wheeler",
    price: 70000,
    completionDate: "2025-02-21",
    orderNumber: "40010",
  },
  {
    id: 3,
    name: "Tata Prima",
    type: "6 Wheeler",
    price: 2500000,
    completionDate: "2025-02-22",
    orderNumber: "40011",
  },
]

export default function CompletePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Completed</h1>

      <div className="grid gap-4">
        {completedVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{vehicle.name}</h3>
                <p className="text-gray-500">({vehicle.type})</p>
                <p className="text-sm text-gray-400">Completed on: {vehicle.completionDate}</p>
                <p className="text-sm text-gray-400">Order #{vehicle.orderNumber}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div>
                  <div className="text-2xl font-bold text-green-600">₹{vehicle.price.toLocaleString()}</div>
                  <Badge variant="success" className="mt-2">
                    Completed
                  </Badge>
                </div>
                <Link href={`/dashboard/complete/${vehicle.id}`}>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


