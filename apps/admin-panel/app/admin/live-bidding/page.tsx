"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Input } from "@vehiverze/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { biddingDb, type LiveBiddingSession } from "@/lib/mock-data/live-bidding"
import Link from "next/link"
import { Search, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function LiveBiddingPage() {
  const [sessions, setSessions] = useState<LiveBiddingSession[]>(biddingDb.getAll())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("all")

  useEffect(() => {
    const interval = setInterval(() => {
      setSessions(biddingDb.getAll())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.customerName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    const matchesVehicleType = vehicleTypeFilter === "all" || session.vehicleType === vehicleTypeFilter

    return matchesSearch && matchesStatus && matchesVehicleType
  })

  const statusColors: Record<string, string> = {
    Live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Ended: "bg-red-500/10 text-red-500 border-red-500/20",
    Upcoming: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  }

  const statusIndicators: Record<string, string> = {
    Live: "🟢",
    Ended: "🔴",
    Upcoming: "🟡",
  }

  const stats = {
    total: sessions.length,
    live: sessions.filter((s) => s.status === "Live").length,
    ended: sessions.filter((s) => s.status === "Ended").length,
    upcoming: sessions.filter((s) => s.status === "Upcoming").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Live Bidding Watch</h1>
        <p className="text-muted-foreground mt-2">Monitor all bidding sessions and manage bids</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Sessions</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-500">{stats.live}</div>
            <p className="text-sm text-muted-foreground">Live Now</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-500">{stats.upcoming}</div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-500">{stats.ended}</div>
            <p className="text-sm text-muted-foreground">Ended</p>
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
                placeholder="Search by brand, model, or customer name..."
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
                <SelectItem value="Live">Live</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Ended">Ended</SelectItem>
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

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSessions.length === 0 ? (
          <Card className="bg-card border-border md:col-span-2 lg:col-span-3">
            <CardContent className="pt-6 text-center text-muted-foreground">
              No bidding sessions found matching your filters
            </CardContent>
          </Card>
        ) : (
          filteredSessions.map((session) => (
            <Link key={session.id} href={`/admin/live-bidding/${session.id}`}>
              <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer h-full">
                <CardContent className="pt-6 space-y-4">
                  {/* Image */}
                  <div className="w-full h-40 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={session.vehicleImage || "/placeholder.svg"}
                      alt={`${session.brand} ${session.model}`}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Vehicle Info */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">
                          {session.brand} {session.model} ({session.year})
                        </h3>
                        <p className="text-sm text-muted-foreground">{session.vehicleType}</p>
                      </div>
                      <Badge className={`${statusColors[session.status]} border text-xs`}>
                        {statusIndicators[session.status]} {session.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Bidding Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Highest Bid:</span>
                      <span className="font-semibold text-primary">₹{session.highestBid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Bids:</span>
                      <span className="font-semibold">{session.bids.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ends:</span>
                      <span className="font-semibold">{new Date(session.biddingEndTime).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Bid Trend */}
                  <div className="flex items-center gap-2 text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                    <TrendingUp className="h-3 w-3" />
                    {session.bids.length} bids placed
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


