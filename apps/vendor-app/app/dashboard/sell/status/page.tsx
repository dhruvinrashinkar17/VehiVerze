"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Button } from "@vehiverze/ui/button"
import { Badge } from "@vehiverze/ui/badge"

// Mock data for vendor's submissions
const mockVendorSubmissions = [
  {
    id: 1,
    referenceId: "VV-SELL-12345678",
    vehicleType: "4 Wheelers",
    brand: "Maruti",
    model: "Swift",
    year: 2022,
    price: 500000,
    status: "pending",
    submittedDate: "2024-10-28",
    message: "Your listing is under review. We'll notify you within 1-2 business days.",
  },
  {
    id: 2,
    referenceId: "VV-SELL-87654321",
    vehicleType: "2 Wheelers",
    brand: "Hero",
    model: "Splendor",
    year: 2023,
    price: 75000,
    status: "approved",
    submittedDate: "2024-10-20",
    approvedDate: "2024-10-22",
    message: "Your vehicle is now live on Vehiverze.com!",
  },
  {
    id: 3,
    referenceId: "VV-SELL-11223344",
    vehicleType: "4 Wheelers",
    brand: "Hyundai",
    model: "Creta",
    year: 2021,
    price: 650000,
    status: "rejected",
    submittedDate: "2024-10-15",
    rejectedDate: "2024-10-17",
    rejectionReason: "Photos are unclear. Please resubmit with better quality images.",
    message: "Your listing was rejected. Please review the reason and resubmit.",
  },
]

export default function SubmissionStatusPage() {
  const [submissions] = useState(mockVendorSubmissions)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-6 w-6 text-yellow-500" />
      case "approved":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "rejected":
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved & Live</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 text-white bg-blue-600">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold">Submission Status</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="mx-auto max-w-4xl space-y-6">
          <section>
            <h2 className="mb-2 text-2xl font-bold">Your Vehicle Listings</h2>
            <p className="text-gray-600 mb-6">Track the status of your submitted vehicles</p>

            {submissions.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-600">No submissions yet. Start by selling a vehicle!</p>
                  <Link href="/dashboard/sell" className="mt-4 inline-block">
                    <Button className="bg-blue-600 hover:bg-blue-700">Sell a Vehicle</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 gap-4">
                        {/* Left Section */}
                        <div className="flex gap-4 flex-1">
                          <div className="flex-shrink-0">{getStatusIcon(submission.status)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">
                                {submission.brand} {submission.model}
                              </h3>
                              {getStatusBadge(submission.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {submission.vehicleType} • {submission.year} • ₹{submission.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Reference ID: <strong>{submission.referenceId}</strong>
                            </p>
                            <p className="text-sm text-gray-600 mt-2">{submission.message}</p>

                            {submission.status === "rejected" && submission.rejectionReason && (
                              <div className="mt-3 bg-red-50 border border-red-200 rounded p-3">
                                <p className="text-sm font-semibold text-red-800 mb-1">Rejection Reason:</p>
                                <p className="text-sm text-red-700">{submission.rejectionReason}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="text-xs text-gray-600">Submitted</p>
                            <p className="text-sm font-semibold">{submission.submittedDate}</p>
                          </div>

                          {submission.status === "approved" && submission.approvedDate && (
                            <div className="text-right">
                              <p className="text-xs text-green-600">Approved</p>
                              <p className="text-sm font-semibold text-green-700">{submission.approvedDate}</p>
                            </div>
                          )}

                          {submission.status === "rejected" && submission.rejectedDate && (
                            <div className="text-right">
                              <p className="text-xs text-red-600">Rejected</p>
                              <p className="text-sm font-semibold text-red-700">{submission.rejectedDate}</p>
                            </div>
                          )}

                          {submission.status === "rejected" && (
                            <Link href="/dashboard/sell">
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 mt-2">
                                Resubmit
                              </Button>
                            </Link>
                          )}

                          {submission.status === "approved" && (
                            <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                              View Listing
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Info Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-800">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold">Submit Your Vehicle</p>
                  <p>Fill in vehicle details and upload photos</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold">Admin Review</p>
                  <p>Our team verifies details and photos (1-2 business days)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold">Approval & Publishing</p>
                  <p>Once approved, your vehicle goes live on Vehiverze.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}


