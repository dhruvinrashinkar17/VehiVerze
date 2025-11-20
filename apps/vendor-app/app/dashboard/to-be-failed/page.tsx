import { Card } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Button } from "@vehiverze/ui/button"

const toBeFailedVehicles = [
  {
    id: 1,
    name: "Maruti Suzuki Swift",
    type: "4 Wheeler",
    price: 550000,
    reason: "Customer unresponsive",
    datetime: "2025-02-22 : 05:00 PM",
    orderNumber: "40007",
  },
  {
    id: 2,
    name: "TVS Jupiter",
    type: "2 Wheeler",
    price: 80000,
    reason: "Price mismatch",
    datetime: "2025-02-23 : 09:00 AM",
    orderNumber: "40008",
  },
]

export default function ToBeFailedPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">To Be Failed</h1>

      <div className="grid gap-4">
        {toBeFailedVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{vehicle.name}</h3>
                <p className="text-gray-500">({vehicle.type})</p>
                <p className="text-sm text-gray-400">{vehicle.datetime}</p>
                <p className="text-sm text-gray-400">Order #{vehicle.orderNumber}</p>
                <Badge variant="destructive">{vehicle.reason}</Badge>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">₹{vehicle.price.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline">Retry</Button>
              <Button variant="destructive">Confirm Failure</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


