"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Skeleton } from "@vehiverze/ui/skeleton"
import { Separator } from "@vehiverze/ui/separator"
import { vendorsDb } from "@/lib/mock-data/stores"
import { useState, useEffect } from "react"
import {
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  Package,
  Calendar,
  FileText,
  Camera,
  ArrowLeft,
  Edit,
  Trash2,
  X,
} from "lucide-react"

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b p-6">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VendorDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [vendor, setVendor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSuspended, setIsSuspended] = useState(vendor?.status === "Suspended")
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    serviceTypes: [] as string[],
  })

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const foundVendor = vendorsDb.getById(id as string)
        if (!foundVendor) {
          setError("Vendor not found")
        } else {
          setVendor(foundVendor)
          setIsSuspended(foundVendor.status === "Suspended")
        }
      } catch (err) {
        setError("Failed to load vendor")
      } finally {
        setLoading(false)
      }
    }

    fetchVendor()
  }, [id])

  useEffect(() => {
    if (vendor) {
      setEditFormData({
        name: vendor.name,
        ownerName: vendor.ownerName,
        phone: vendor.phone,
        email: vendor.email,
        address: vendor.address,
        city: vendor.city,
        pincode: vendor.pincode,
        serviceTypes: vendor.serviceTypes,
      })
    }
  }, [vendor])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    const updatedVendor = vendorsDb.update(id as string, editFormData)
    if (updatedVendor) {
      setVendor(updatedVendor)
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditFormData({
      name: vendor.name,
      ownerName: vendor.ownerName,
      phone: vendor.phone,
      email: vendor.email,
      address: vendor.address,
      city: vendor.city,
      pincode: vendor.pincode,
      serviceTypes: vendor.serviceTypes,
    })
    setIsEditing(false)
  }

  const handleSuspendToggle = () => {
    const newStatus = isSuspended ? "Active" : "Suspended"
    const updatedVendor = vendorsDb.update(id as string, { status: newStatus })
    if (updatedVendor) {
      setVendor(updatedVendor)
      setIsSuspended(!isSuspended)
    }
  }

  const EditVendorModal = () => {
    if (!isEditing) return null

    const availableServiceTypes = ["2-Wheelers", "3-Wheelers", "4-Wheelers", "6-Wheelers", "More-Than-8-Wheelers"]

    const toggleServiceType = (type: string) => {
      setEditFormData((prev) => ({
        ...prev,
        serviceTypes: prev.serviceTypes.includes(type)
          ? prev.serviceTypes.filter((t) => t !== type)
          : [...prev.serviceTypes, type],
      }))
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Edit Vendor Details</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Shop Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Owner Name</label>
                <input
                  type="text"
                  value={editFormData.ownerName}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, ownerName: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  type="text"
                  value={editFormData.city}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, city: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pincode</label>
                <input
                  type="text"
                  value={editFormData.pincode}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, pincode: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Shop Address</label>
              <textarea
                value={editFormData.address}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Vehicle Types</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableServiceTypes.map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={editFormData.serviceTypes.includes(type) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleServiceType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveEdit} className="flex-1">
                Save Changes
              </Button>
              <Button onClick={handleCancelEdit} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const OrderHistoryModal = () => {
    if (!showOrderHistory) return null

    const orderStats = {
      completed: Math.floor(vendor.totalOrders * (vendor.completionRate / 100)),
      failed: Math.floor(vendor.totalOrders * 0.1),
      inProgress: Math.floor(vendor.totalOrders * 0.15),
      cancelled:
        vendor.totalOrders -
        Math.floor(vendor.totalOrders * (vendor.completionRate / 100)) -
        Math.floor(vendor.totalOrders * 0.1) -
        Math.floor(vendor.totalOrders * 0.15),
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order History - {vendor.name}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowOrderHistory(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{orderStats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{orderStats.inProgress}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{orderStats.failed}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{orderStats.cancelled}</div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Performance Overview</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium text-green-600">{vendor.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Orders:</span>
                  <span className="font-medium">{vendor.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{vendor.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error || !vendor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl font-semibold mb-4">{error || "Vendor not found"}</h3>
            <Button onClick={() => router.back()}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      case "Pending Verification":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Vendor Details</h1>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{vendor.name}</h2>
                <p className="text-muted-foreground text-lg">{vendor.ownerName}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{vendor.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleEditClick}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Shop Name</label>
                    <p className="text-lg font-medium">{vendor.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Owner Name</label>
                    <p className="text-lg font-medium">{vendor.ownerName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{vendor.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{vendor.email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Shop Address</label>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-lg">{vendor.address}</p>
                      <p className="text-muted-foreground">
                        {vendor.city}, {vendor.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Vehicle Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {vendor.serviceTypes.map((type: string) => (
                    <Badge key={type} variant="outline" className="px-3 py-1">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">PAN Card</label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">PAN: {vendor.documents.pan}</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        View Document
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Aadhar Card Front</label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Aadhar Front</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        View Document
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Aadhar Card Back</label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Aadhar Back</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        View Document
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Shop Photo</label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                      <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Shop Photo</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        View Photo
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-bold text-lg">{vendor.totalOrders}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-bold text-lg text-green-600">{vendor.completionRate}%</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-lg">{vendor.rating.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Registration Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
                  <p className="text-lg font-medium">{new Date(vendor.registrationDate).toLocaleDateString()}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">GST Number</label>
                  <p className="text-lg font-medium">{vendor.documents.gst}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bank Account</label>
                  <p className="text-lg font-medium">{vendor.documents.bankAccount}</p>
                  <p className="text-sm text-muted-foreground">IFSC: {vendor.documents.ifsc}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="default">
                  Assign Order
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Send Message
                </Button>
                <Button className="w-full bg-transparent" variant="outline" onClick={() => setShowOrderHistory(true)}>
                  View Order History
                </Button>
                <Button
                  className="w-full"
                  variant={isSuspended ? "default" : "destructive"}
                  onClick={handleSuspendToggle}
                >
                  {isSuspended ? "Activate Vendor" : "Suspend Vendor"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <OrderHistoryModal />
      <EditVendorModal />
    </div>
  )
}


