"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { useIntersection } from "@/hooks/use-intersection"

interface Vehicle {
  id: number
  name: string
  type: string
  price: number
  status: string
  datetime: string
  orderNumber: string
  currentBid?: number
  highestBidder?: string
  timeLeft?: string
}

// Simulated data - in real app, this would come from an API
const generateVehicles = (start: number, end: number): Vehicle[] => {
  return Array.from({ length: end - start }, (_, i) => ({
    id: start + i,
    name: `Vehicle ${start + i}`,
    type: ["2 Wheeler", "4 Wheeler", "6 Wheeler", "8 Wheeler"][Math.floor(Math.random() * 4)],
    price: Math.floor(Math.random() * 1000000) + 100000,
    status: ["Inspection Scheduled", "Paperwork Pending", "Under Negotiation"][Math.floor(Math.random() * 3)],
    datetime: "2025-02-23 : 11:00 AM",
    orderNumber: `4000${start + i}`,
    currentBid: Math.floor(Math.random() * 1000000) + 100000,
    highestBidder: "Vendor #" + Math.floor(Math.random() * 100),
    timeLeft: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
  }))
}

export default function InProgressPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(generateVehicles(0, 10))
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersection(loadMoreRef)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newVehicles = generateVehicles(vehicles.length, vehicles.length + 10)
    setVehicles((prev) => [...prev, ...newVehicles])
    setLoading(false)
    if (vehicles.length >= 50) setHasMore(false) // Example limit
  }, [loading, hasMore, vehicles.length])

  useEffect(() => {
    if (isIntersecting) {
      loadMore()
    }
  }, [isIntersecting, loadMore])

  const placeBid = (vehicleId: number, amount: number) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === vehicleId
          ? {
              ...vehicle,
              currentBid: amount,
              highestBidder: "Your Bid",
            }
          : vehicle,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">In Progress</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {vehicles.length} Orders
        </Badge>
      </div>

      <div className="grid gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{vehicle.name}</h3>
                <p className="text-gray-500">({vehicle.type})</p>
                <p className="text-sm text-gray-400">{vehicle.datetime}</p>
                <p className="text-sm text-gray-400">Order #{vehicle.orderNumber}</p>
                <Badge variant="secondary">{vehicle.status}</Badge>
              </div>

              <div className="space-y-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₹{vehicle.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Base Price</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Bid:</span>
                    <span className="font-bold">₹{vehicle.currentBid?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Highest Bidder:</span>
                    <span className="font-bold">{vehicle.highestBidder}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Left:</span>
                    <span className="font-bold text-red-500">{vehicle.timeLeft}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input type="number" placeholder="Your bid amount" className="text-right" min={vehicle.currentBid} />
                  <Button
                    onClick={() => placeBid(vehicle.id, vehicle.currentBid! + 1000)}
                    className="whitespace-nowrap"
                  >
                    Place Bid
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
          {loading && <div className="text-gray-500">Loading more...</div>}
          {!hasMore && <div className="text-gray-500">No more items</div>}
        </div>
      </div>
    </div>
  )
}


