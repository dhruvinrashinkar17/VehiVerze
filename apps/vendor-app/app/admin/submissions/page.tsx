"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Button } from "@vehiverze/ui/button"
import { Badge } from "@vehiverze/ui/badge"
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react"

// Mock data for vendor submissions
const mockSubmissions = [
  {
    id: 1,
    vendorName: "Demo Account",
    vendorEmail: "vehiverzedemo@vehiverze.com",
    vehicleType: "4 Wheelers",
    brand: "Maruti",
    model: "Swift",
    year: 2022,
    price: 500000,
    location: "Mumbai, Maharashtra",
    status: "pending",
    submittedDate: "2024-10-28",
    photoCount: 5,
  },
  {
    id: 2,
    vendorName: "John Dealer",
    vendorEmail: "john@dealer.com",
    vehicleType: "2 Wheelers",
    brand: "Hero",
    model: "Splendor",
    year: 2023,
    price: 75000,
    location: "Delhi",
    status: "approved",
    submittedDate: "2024-10-27",
    photoCount: 4,
  },
  {
    id: 3,
    vendorName: "Raj Motors",
    vendorEmail: "raj@motors.com",
    vehicleType: "6 Wheelers",
    brand: "Tata",
    model: "LPT 1613",
    year: 2021,
    price: 1200000,
    location: "Bangalore, Karnataka",
    status: "rejected",
    submittedDate: "2024-10-26",
    photoCount: 6,
    rejectionReason: "Photos are unclear. Please resubmit with better quality images.",
  },
  {
    id: 4,
    vendorName: "Priya Autos",
    vendorEmail: "priya@autos.com",
    vehicleType: "4 Wheelers",
    brand: "Hyundai",
    model: "Creta",
    year: 2023,
    price: 850000,
    location: "Pune, Maharashtra",
    status: "pending",
    submittedDate: "2024-10-25",
    photoCount: 7,
  },
]

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions)
  const [selectedSubmission, setSelectedSubmission] = useState<(typeof mockSubmissions)[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = (id: number) => {
    setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status: "approved" } : sub)))
    setShowDetails(false)
  }

  const handleReject = (id: number) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason")
      return
    }
    setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status: "rejected", rejectionReason } : sub)))
    setRejectionReason("")
    setShowDetails(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const pendingCount = submissions.filter((s) => s.status === "pending").length
  const approvedCount = submissions.filter((s) => s.status === "approved").length
  const rejectedCount = submissions.filter((s) => s.status === "rejected").length

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Submissions</h1>
          <p className="text-gray-600 mt-2">Review and manage vehicle listings from vendors</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Submissions</p>
                  <p className="text-3xl font-bold">{submissions.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Vendor</th>
                    <th className="text-left py-3 px-4 font-semibold">Vehicle</th>
                    <th className="text-left py-3 px-4 font-semibold">Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Location</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Submitted</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold">{submission.vendorName}</p>
                          <p className="text-sm text-gray-600">{submission.vendorEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold">
                            {submission.brand} {submission.model}
                          </p>
                          <p className="text-sm text-gray-600">{submission.year}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold">₹{submission.price.toLocaleString()}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm">{submission.location}</p>
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(submission.status)}</td>
                      <td className="py-3 px-4">
                        <p className="text-sm">{submission.submittedDate}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedSubmission(submission)
                            setShowDetails(true)
                          }}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Modal */}
      {showDetails && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Submission Details</CardTitle>
              <button onClick={() => setShowDetails(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Vendor Info */}
              <div>
                <h3 className="font-semibold mb-3">Vendor Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{selectedSubmission.vendorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{selectedSubmission.vendorEmail}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div>
                <h3 className="font-semibold mb-3">Vehicle Details</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Brand</p>
                    <p className="font-semibold">{selectedSubmission.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Model</p>
                    <p className="font-semibold">{selectedSubmission.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="font-semibold">{selectedSubmission.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold">₹{selectedSubmission.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{selectedSubmission.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Photos</p>
                    <p className="font-semibold">{selectedSubmission.photoCount} uploaded</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-semibold mb-3">Current Status</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedSubmission.status)}
                  {selectedSubmission.status === "rejected" && selectedSubmission.rejectionReason && (
                    <div className="ml-4 text-sm text-red-600">Reason: {selectedSubmission.rejectionReason}</div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {selectedSubmission.status === "pending" && (
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Rejection Reason (if rejecting)</label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Provide a reason for rejection..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedSubmission.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve & Publish
                    </Button>
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={() => handleReject(selectedSubmission.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}

              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowDetails(false)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


