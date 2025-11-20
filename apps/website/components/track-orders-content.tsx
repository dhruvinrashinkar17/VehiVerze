"use client"

import { useState } from "react"
import {
  User,
  MapPin,
  CreditCard,
  FileText,
  LogOut,
  Car,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Tabs, TabsContent } from "@vehiverze/ui/tabs"
import { Badge } from "@vehiverze/ui/badge"
import { Separator } from "@vehiverze/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@vehiverze/ui/collapsible"

export function TrackOrdersContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [activeTab, setActiveTab] = useState("orders")
  const [expandedOrders, setExpandedOrders] = useState<string[]>([])

  // Sample user data
  const userData = {
    name: "Rajesh Kumar",
    phone: "+91 9812345678",
    email: "rajesh.kumar@email.com",
    avatar: "/placeholder.svg?height=200&width=200",
  }

  // Simplified orders data
  const ordersData = [
    {
      id: "WPH-YGCAD4XF",
      type: "Sell Order",
      vehicleName: "Maruti Swift VDI 2018",
      price: "₹4,65,000",
      status: "Failed",
      statusMessage: "Documents needed",
      date: "15 Aug 2023",
      vehicleDetails: {
        brand: "Maruti Suzuki",
        model: "Swift VDI",
        year: "2018",
        fuelType: "Diesel",
        kilometers: "45,000 km",
      },
      nextStep: "Upload missing documents to continue",
    },
    {
      id: "WLA-JSVL9VRW",
      type: "Buy Order",
      vehicleName: "Honda City ZX CVT 2020",
      price: "₹8,75,000",
      status: "In Progress",
      statusMessage: "Inspection scheduled",
      date: "02 Sep 2023",
      vehicleDetails: {
        brand: "Honda",
        model: "City ZX CVT",
        year: "2020",
        fuelType: "Petrol",
        kilometers: "28,000 km",
      },
      nextStep: "Vehicle inspection on 5th Sep",
    },
    {
      id: "WLA-8EEZOBNF",
      type: "Sell Order",
      vehicleName: "Hyundai i20 Sportz 2019",
      price: "₹5,95,000",
      status: "Completed",
      statusMessage: "Payment received",
      date: "10 Sep 2023",
      vehicleDetails: {
        brand: "Hyundai",
        model: "i20 Sportz",
        year: "2019",
        fuelType: "Diesel",
        kilometers: "52,000 km",
      },
      nextStep: "Order completed successfully",
    },
  ]

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Failed":
        return "bg-red-50 text-red-700 border-red-200"
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Completed":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Simple Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <Card className="mb-6 shadow-sm border border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                  <img
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{userData.name}</h3>
                <p className="text-gray-600 text-sm">{userData.phone}</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-11 ${activeTab === "profile" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-3 h-4 w-4" />
                    My Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-11 ${activeTab === "orders" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <FileText className="mr-3 h-4 w-4" />
                    My Orders
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-11 ${activeTab === "address" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setActiveTab("address")}
                  >
                    <MapPin className="mr-3 h-4 w-4" />
                    My Address
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-11 ${activeTab === "payment" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-3 h-4 w-4" />
                    Payment
                  </Button>
                  <Separator className="my-3" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-11 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Simple Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="profile">
                <Card className="shadow-sm border border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">My Profile</CardTitle>
                    <p className="text-gray-600 text-sm">Update your personal information</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <Input defaultValue={userData.name} className="h-11" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input defaultValue={userData.phone} disabled className="h-11 bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <Input type="email" defaultValue={userData.email} className="h-11" />
                    </div>
                    <Button className="h-11 px-6">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">My Orders</h2>
                    <p className="text-gray-600 text-sm">Track your vehicle orders</p>
                  </div>

                  <div className="space-y-4">
                    {ordersData.map((order) => (
                      <Card key={order.id} className="shadow-sm border border-gray-200">
                        <CardContent className="p-6">
                          {/* Basic Order Info */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-50 rounded-lg">
                                <Car className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{order.vehicleName}</h3>
                                <p className="text-sm text-gray-600">
                                  {order.type} • {order.date}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">{order.price}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusIcon(order.status)}
                                <Badge className={`${getStatusColor(order.status)} text-xs`}>{order.status}</Badge>
                              </div>
                            </div>
                          </div>

                          {/* Status Message */}
                          <div className="rounded-lg p-3 mb-4 bg-blue-700">
                            <p className="text-sm text-card-foreground">
                              <strong>Status:</strong> {order.statusMessage}
                            </p>
                            <p className="text-sm mt-1 text-card-foreground">{order.nextStep}</p>
                          </div>

                          {/* Expandable Details */}
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-between p-0 h-auto text-blue-600 hover:text-blue-700"
                                onClick={() => toggleOrderExpansion(order.id)}
                              >
                                <span className="text-sm font-medium">
                                  {expandedOrders.includes(order.id) ? "Hide Details" : "View Details"}
                                </span>
                                {expandedOrders.includes(order.id) ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                <h4 className="font-medium text-gray-900 mb-3">Vehicle Information</h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <p className="text-gray-600">Brand</p>
                                    <p className="font-medium text-gray-900">{order.vehicleDetails.brand}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Model</p>
                                    <p className="font-medium text-gray-900">{order.vehicleDetails.model}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Year</p>
                                    <p className="font-medium text-gray-900">{order.vehicleDetails.year}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Fuel Type</p>
                                    <p className="font-medium text-gray-900">{order.vehicleDetails.fuelType}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-gray-600">Kilometers Driven</p>
                                    <p className="font-medium text-gray-900">{order.vehicleDetails.kilometers}</p>
                                  </div>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>

                          {/* Action Buttons */}
                          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                            {order.status === "Failed" && <Button className="flex-1 h-10">Try Again</Button>}
                            {order.status === "In Progress" && <Button className="flex-1 h-10">Track Progress</Button>}
                            {order.status === "Completed" && (
                              <Button variant="outline" className="flex-1 h-10 bg-transparent">
                                Download Receipt
                              </Button>
                            )}
                            <Button variant="outline" className="h-10 px-6 bg-transparent">
                              Contact Support
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="address">
                <Card className="shadow-sm border border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">My Address</CardTitle>
                    <p className="text-gray-600 text-sm">Manage your delivery address</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">Home Address</p>
                          <p className="text-gray-600 text-sm">123 Main Street, Apartment 4B</p>
                          <p className="text-gray-600 text-sm">Mumbai, Maharashtra 400001</p>
                          <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
                            <Phone className="h-4 w-4" />
                            +91 9876543210
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full h-11">Add New Address</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card className="shadow-sm border border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">Payment Methods</CardTitle>
                    <p className="text-gray-600 text-sm">Manage your payment options</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-gray-400 mt-1" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">Credit Card</p>
                          <p className="text-gray-600 text-sm">**** **** **** 4567</p>
                          <p className="text-gray-600 text-sm">Expires: 05/25</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full h-11">Add Payment Method</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}


