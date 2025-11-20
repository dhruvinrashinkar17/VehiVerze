"use client"

import { useState } from "react"
import { Card, CardContent } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Input } from "@vehiverze/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { vendorSellRequestsDb, type VendorSellRequest } from "@/lib/mock-data/vendor-sell-requests"
import Link from "next/link"
import { Search } from "lucide-react"
import Image from "next/image"

export default function VendorSellRequestsPage() {
  const [requests, setRequests] = useState<VendorSellRequest[]>(vendorSellRequestsDb.getAll())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("all")

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.vendorName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || req.status === statusFilter
    const matchesVehicleType = vehicleTypeFilter === "all" || req.vehicleType === vehicleTypeFilter

    return matchesSearch && matchesStatus && matchesVehicleType
  })

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Accepted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Vendor Sell Requests</h1>
        <p className="text-muted-foreground mt-2">Manage vehicle submissions from vendors</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{requests.length}</div>
            <p className="text-sm text-muted-foreground">Total Requests</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-500">
              {requests.filter((r) => r.status === "Pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-500">
              {requests.filter((r) => r.status === "Accepted").length}
            </div>
            <p className="text-sm text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-500">
              {requests.filter((r) => r.status === "Rejected").length}
            </div>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by brand, model, or vendor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="2 Wheeler">2 Wheeler</SelectItem>
                <SelectItem value="3 Wheeler">3 Wheeler</SelectItem>
                <SelectItem value="4 Wheeler">4 Wheeler</SelectItem>
                <SelectItem value="6 Wheeler">6 Wheeler</SelectItem>
                <SelectItem value="8 Wheeler">8 Wheeler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="pt-6 text-center text-muted-foreground">
              No requests found matching your filters
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Link key={request.id} href={`/admin/vendor-sell-requests/${request.id}`}>
              <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Vehicle Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <Image
                        src={request.vehicleImage || "/placeholder.svg"}
                        alt={`${request.brand} ${request.model}`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Vehicle Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {request.brand} {request.model} ({request.year})
                          </h3>
                          <p className="text-sm text-muted-foreground">{request.variant}</p>
                        </div>
                        <Badge className={`${statusColors[request.status]} border`}>{request.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <p className="font-medium">{request.vehicleType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Vendor:</span>
                          <p className="font-medium">{request.vendorName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span>
                          <p className="font-medium">₹{request.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Submitted:</span>
                          <p className="font-medium">{new Date(request.submissionDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}


