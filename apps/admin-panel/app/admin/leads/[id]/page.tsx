"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Skeleton } from "@vehiverze/ui/skeleton"
import { leadsDb } from "@/lib/mock-data/stores"
import { useState, useEffect } from "react"
import { ordersDb } from "@/lib/mock-data"

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

export default function LeadDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const foundLead = leadsDb.getById(id as string)
        if (!foundLead) {
          setError("Lead not found")
        } else {
          setLead(foundLead)
        }
      } catch (err) {
        setError("Failed to load lead")
      } finally {
        setLoading(false)
      }
    }

    fetchLead()
  }, [id])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error || !lead) {
    return (
      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardContent className="flex flex-col items-center justify-center h-[400px]">
          <h3 className="text-xl font-semibold mb-4">{error || "Lead not found"}</h3>
          <Button onClick={() => router.back()}>Go Back</Button>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Qualified":
        return "bg-green-500/20 text-green-500"
      case "Failed":
        return "bg-red-500/20 text-red-500"
      case "Converted":
        return "bg-purple-500/20 text-purple-500"
      case "New":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-yellow-500/20 text-yellow-500"
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
          </div>
          <CardTitle>{lead.customerName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Phone</div>
              <div>{lead.phone}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Email</div>
              <div>{lead.email}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Service Type</div>
              <div>{lead.serviceType}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Vehicle Type</div>
              <div>{lead.vehicleType}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Model</div>
              <div>{lead.model}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">City</div>
              <div>{lead.city}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Assigned To</div>
              <div>{lead.assignedTo}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium">Notes</div>
            <div className="text-sm text-gray-400">{lead.notes}</div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                // Update lead status to converted
                const updatedLead = leadsDb.update(lead.id, { ...lead, status: "Converted" })
                setLead(updatedLead)

                // Create a new order from this lead
                const newOrder = {
                  date: new Date().toISOString(),
                  model: lead.model,
                  city: lead.city,
                  type: lead.vehicleType,
                  serviceType: lead.serviceType,
                  status: "Pending",
                  token: Math.random().toString(36).substr(2, 10).toUpperCase(),
                  pickup: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
                  vendor: null,
                  specs: {
                    ram: "4GB",
                    storage: "64GB",
                    age: "12 Months",
                    screenCondition: "Good",
                    physicalCondition: "Good",
                    bodyCondition: "Good",
                    accessories: "Original",
                  },
                  pricing: {
                    quoted: Math.floor(Math.random() * 50000) + 10000,
                    requote: null,
                  },
                  customer: {
                    name: lead.customerName,
                    email: lead.email,
                    phone: lead.phone,
                    address: "Address from lead",
                    pincode: "400001",
                    city: lead.city,
                    payment: "Cash",
                  },
                  logs: [
                    {
                      timestamp: new Date().toISOString(),
                      action: "Order created from lead conversion",
                    },
                  ],
                }

                // Add to orders database
                ordersDb.create(newOrder)

                // Show success message and redirect
                alert("Lead successfully converted to order!")
                router.push("/admin/orders")
              }}
            >
              Convert to Order
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Update lead status to failed
                const updatedLead = leadsDb.update(lead.id, { ...lead, status: "Failed" })
                setLead(updatedLead)

                // Create a failed order entry
                const failedOrder = {
                  date: new Date().toISOString(),
                  model: lead.model,
                  city: lead.city,
                  type: lead.vehicleType,
                  serviceType: lead.serviceType,
                  status: "Cancelled by Vehiverze",
                  token: Math.random().toString(36).substr(2, 10).toUpperCase(),
                  pickup: new Date().toISOString(),
                  vendor: null,
                  specs: {
                    ram: "N/A",
                    storage: "N/A",
                    age: "N/A",
                    screenCondition: "N/A",
                    physicalCondition: "N/A",
                    bodyCondition: "N/A",
                    accessories: "N/A",
                  },
                  pricing: {
                    quoted: 0,
                    requote: null,
                  },
                  customer: {
                    name: lead.customerName,
                    email: lead.email,
                    phone: lead.phone,
                    address: "Address from failed lead",
                    pincode: "400001",
                    city: lead.city,
                    payment: "Cash",
                  },
                  logs: [
                    {
                      timestamp: new Date().toISOString(),
                      action: "Lead marked as failed",
                    },
                  ],
                }

                // Add to orders database as failed
                ordersDb.create(failedOrder)

                // Show success message and redirect
                alert("Lead marked as failed!")
                router.push("/admin/failed")
              }}
            >
              Mark as Failed
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardHeader>
          <CardTitle>Lead Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div>
                <div className="text-sm font-medium">Lead Created</div>
                <div className="text-sm text-gray-400">{new Date(lead.date).toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div>
                <div className="text-sm font-medium">Last Contact</div>
                <div className="text-sm text-gray-400">{new Date(lead.lastContact).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


