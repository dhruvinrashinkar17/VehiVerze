"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { AssignVendorModal } from "@/components/modals/assign-vendor-modal"
import { ReschedulePickupModal } from "@/components/modals/reschedule-pickup-modal"
import { FailLeadModal } from "@/components/modals/fail-lead-modal"
import { ordersDb } from "@/lib/mock-data"
import type { Order } from "@/lib/mock-data"
import { useEffect } from "react"
import { Skeleton } from "@vehiverze/ui/skeleton"

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal states
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showFailModal, setShowFailModal] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const foundOrder = ordersDb.getById(id as string)
        if (!foundOrder) {
          setError("Order not found")
        } else {
          setOrder(foundOrder)
        }
      } catch (err) {
        setError("Failed to load order")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  const handleAssignVendor = async (vendorId: string) => {
    if (!order) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update order with vendor
      const updatedOrder = ordersDb.update(order.id, {
        ...order,
        vendor: vendorId,
        status: "Assigned to Vendor",
      })
      setOrder(updatedOrder || null)
    } catch (error) {
      console.error("Error assigning vendor:", error)
      throw error
    }
  }

  const handleReschedulePickup = async (date: Date, time: string) => {
    if (!order) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update order with new pickup time
      const updatedOrder = ordersDb.update(order.id, {
        ...order,
        pickup: date.toISOString(),
        pickupTime: time,
      })
      setOrder(updatedOrder || null)
    } catch (error) {
      console.error("Error rescheduling pickup:", error)
      throw error
    }
  }

  const handleFailLead = async () => {
    if (!order) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update order status
      const updatedOrder = ordersDb.update(order.id, {
        ...order,
        status: "Cancelled by Vehiverze",
      })
      setOrder(updatedOrder || null)
    } catch (error) {
      console.error("Error failing lead:", error)
      throw error
    }
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error || !order) {
    return (
      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardContent className="flex flex-col items-center justify-center h-[400px]">
          <h3 className="text-xl font-semibold mb-4">{error || "Order not found"}</h3>
          <Button onClick={() => router.back()}>Go Back</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-500">{order.type}</Badge>
                <Badge
                  variant="secondary"
                  className={
                    order.status === "Completed" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <CardTitle>{order.model}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Token</div>
                  <div>{order.token}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Pickup</div>
                  <div>{new Date(order.pickup).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Service Type</div>
                  <div>{order.serviceType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Vendor</div>
                  <div>{order.vendor || "No vendor assigned!"}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-medium">Vehicle Details</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Brand</div>
                    <div>{order.specs.brand}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Model</div>
                    <div>{order.specs.model}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Manufacturing Year</div>
                    <div>{order.specs.manufacturingYear}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Variant</div>
                    <div>{order.specs.variant}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Ownership History</div>
                    <div>{order.specs.ownershipHistory}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Fuel Type</div>
                    <div>{order.specs.fuelType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Kilometers Driven</div>
                    <div>{order.specs.kilometersDriven}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">City</div>
                    <div>{order.specs.city}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Planning to sell?</div>
                    <div>{order.specs.planningToSell}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Price Estimate?</div>
                    <div>{order.specs.priceEstimate}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-medium">Pricing</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400"> Price </div>
                    <div>₹{order.pricing.quoted.toLocaleString()}</div>
                  </div>
                  {order.pricing.requote && (
                    <div>
                      <div className="text-sm text-gray-400">Requoted Price</div>
                      <div>₹{order.pricing.requote.toLocaleString()}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowAssignModal(true)}
                >
                  Assign
                </Button>
                <Button
                  variant="default"
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => setShowRescheduleModal(true)}
                >
                  Reschedule
                </Button>
                <Button variant="destructive" onClick={() => setShowFailModal(true)}>
                  Fail Lead
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Name</div>
                  <div>{order.customer.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div>{order.customer.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div>{order.customer.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Payment Method</div>
                  <div>{order.customer.payment}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Address</div>
                <div>{order.customer.address}</div>
                <div>
                  {order.customer.city}, {order.customer.pincode}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle>Leads Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.logs.map((log, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-sm text-gray-400">{new Date(log.timestamp).toLocaleString()}</div>
                    <div>{log.action}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <AssignVendorModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={handleAssignVendor}
      />

      <ReschedulePickupModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        onReschedule={handleReschedulePickup}
      />

      <FailLeadModal isOpen={showFailModal} onClose={() => setShowFailModal(false)} onConfirm={handleFailLead} />
    </>
  )
}


