"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Button } from "@vehiverze/ui/button"
import { biddingDb } from "@/lib/mock-data/live-bidding"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LiveBiddingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [session, setSession] = useState(biddingDb.getById(params.id as string))
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setSession(biddingDb.getById(params.id as string))
    }, 2000)
    return () => clearInterval(interval)
  }, [params.id])

  useEffect(() => {
    if (!session) return

    const updateTimer = () => {
      const now = new Date()
      const endTime = new Date(session.biddingEndTime)
      const diff = endTime.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining("Ended")
      } else {
        const hours = Math.floor(diff / 3600000)
        const minutes = Math.floor((diff % 3600000) / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [session])

  if (!session) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Session not found</p>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    Live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Ended: "bg-red-500/10 text-red-500 border-red-500/20",
    Upcoming: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  }

  const handleEndBidding = () => {
    biddingDb.endBidding(session.id)
    setSession(biddingDb.getById(session.id))
  }

  const handleExtendBidding = () => {
    const newEndTime = new Date(new Date().getTime() + 3600000).toISOString()
    biddingDb.extendBidding(session.id, newEndTime)
    setSession(biddingDb.getById(session.id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/live-bidding">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {session.brand} {session.model} ({session.year})
          </h1>
          <p className="text-muted-foreground mt-1">{session.vehicleType}</p>
        </div>
        <div className="ml-auto">
          <Badge className={`${statusColors[session.status]} border`}>{session.status}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-full h-96 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={session.images[selectedImageIndex] || "/placeholder.svg"}
                    alt={`${session.brand} ${session.model}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                {session.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {session.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          selectedImageIndex === index ? "border-primary" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Details */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Brand</span>
                  <p className="font-semibold">{session.brand}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Model</span>
                  <p className="font-semibold">{session.model}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Year</span>
                  <p className="font-semibold">{session.year}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Variant</span>
                  <p className="font-semibold">{session.variant}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Fuel Type</span>
                  <p className="font-semibold">{session.fuelType}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Transmission</span>
                  <p className="font-semibold">{session.transmission}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Kilometers Driven</span>
                  <p className="font-semibold">{session.kilometersDriven}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Ownership</span>
                  <p className="font-semibold">{session.ownershipHistory}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Description</span>
                <p className="mt-2">{session.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Bids Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>All Bids ({session.bids.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Vendor Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Phone</th>
                      <th className="text-right py-3 px-4 font-semibold">Bid Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {session.bids
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((bid, index) => (
                        <tr
                          key={bid.id}
                          className={`border-b border-border transition-colors ${
                            bid.amount === session.highestBid ? "bg-emerald-500/5" : ""
                          }`}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {bid.amount === session.highestBid && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                              <span className="font-medium">{bid.vendorName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <a href={`tel:${bid.vendorPhone}`} className="text-primary hover:underline">
                              {bid.vendorPhone}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span
                              className={`font-semibold ${bid.amount === session.highestBid ? "text-emerald-500" : ""}`}
                            >
                              ₹{bid.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(bid.timestamp).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Bidding Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Bidding Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={`${statusColors[session.status]} border mt-2`}>{session.status}</Badge>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Started</span>
                <p className="font-semibold mt-1">{new Date(session.biddingStartTime).toLocaleString()}</p>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Ends</span>
                <p className="font-semibold mt-1">{new Date(session.biddingEndTime).toLocaleString()}</p>
              </div>

              {session.status === "Live" && (
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">{timeRemaining}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Highest Bid */}
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-500">Highest Bid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-emerald-500">₹{session.highestBid.toLocaleString()}</p>
              </div>
              {session.winningVendorName && (
                <div>
                  <span className="text-sm text-muted-foreground">By</span>
                  <p className="font-semibold">{session.winningVendorName}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Controls */}
          {session.status === "Live" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Admin Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleExtendBidding} variant="outline" className="w-full bg-transparent">
                  Extend Bidding (1h)
                </Button>
                <Button onClick={handleEndBidding} variant="destructive" className="w-full">
                  End Bidding Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Customer Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Name</span>
                <p className="font-semibold">{session.customerName}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


