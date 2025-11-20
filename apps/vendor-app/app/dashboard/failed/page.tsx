import { Card } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"

const failedVehicles = [
  {
    id: 1,
    name: "Hyundai i20",
    type: "4 Wheeler",
    price: 700000,
    failureReason: "Deal cancelled by customer",
    failureDate: "2025-02-19",
    orderNumber: "40012",
  },
  {
    id: 2,
    name: "Yamaha FZ",
    type: "2 Wheeler",
    price: 110000,
    failureReason: "Vehicle condition mismatch",
    failureDate: "2025-02-20",
    orderNumber: "40013",
  },
]

export default function FailedPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Failed Orders</h1>

      <div className="grid gap-4">
        {failedVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{vehicle.name}</h3>
                <p className="text-gray-500">({vehicle.type})</p>
                <p className="text-sm text-gray-400">Failed on: {vehicle.failureDate}</p>
                <p className="text-sm text-gray-400">Order #{vehicle.orderNumber}</p>
                <Badge variant="destructive">{vehicle.failureReason}</Badge>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">₹{vehicle.price.toLocaleString()}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


