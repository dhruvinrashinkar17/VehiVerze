"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Search, CreditCard, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"

export function ChallanContent() {
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [dlNumber, setDlNumber] = useState("")
  const [challanNumber, setChallanNumber] = useState("")
  const [searchType, setSearchType] = useState("vehicle")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      // Generate random challan data
      const randomChallans = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
        id: `CH${Math.floor(Math.random() * 10000000)}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        violation: ["Speeding", "Red Light Violation", "No Parking", "No Helmet", "Wrong Side Driving"][
          Math.floor(Math.random() * 5)
        ],
        amount: Math.floor(Math.random() * 5000) + 500,
        status: Math.random() > 0.5 ? "Unpaid" : "Paid",
        location: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"][Math.floor(Math.random() * 5)],
      }))

      setSearchResults(randomChallans)
      setIsSearching(false)
    }, 1500)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Check & Pay Challan</h1>
          <p className="text-lg text-gray-600">
            Check your traffic challan status and pay online in a few simple steps
          </p>
        </div>

        <Card className="border border-gray-200 mb-8">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle>Search Challan</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="vehicle" onValueChange={setSearchType} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="vehicle">Vehicle Number</TabsTrigger>
                <TabsTrigger value="dl">Driving License</TabsTrigger>
                <TabsTrigger value="challan">Challan Number</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSearch}>
                <TabsContent value="vehicle" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-number">Vehicle Registration Number</Label>
                    <Input
                      id="vehicle-number"
                      placeholder="Enter vehicle number (e.g., DL01AB1234)"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="dl" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dl-number">Driving License Number</Label>
                    <Input
                      id="dl-number"
                      placeholder="Enter DL number (e.g., DL-0123456789012)"
                      value={dlNumber}
                      onChange={(e) => setDlNumber(e.target.value)}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="challan" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="challan-number">Challan Number</Label>
                    <Input
                      id="challan-number"
                      placeholder="Enter challan number"
                      value={challanNumber}
                      onChange={(e) => setChallanNumber(e.target.value)}
                      required
                    />
                  </div>
                </TabsContent>

                <div className="mt-6">
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={
                      isSearching ||
                      (searchType === "vehicle" && !vehicleNumber) ||
                      (searchType === "dl" && !dlNumber) ||
                      (searchType === "challan" && !challanNumber)
                    }
                  >
                    {isSearching ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Searching...
                      </div>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" /> Search Challan
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>

        {searchResults.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Search Results</h2>

            {searchResults.map((challan) => (
              <Card
                key={challan.id}
                className={`border ${challan.status === "Unpaid" ? "border-red-200" : "border-green-200"}`}
              >
                <CardHeader
                  className={`border-b ${challan.status === "Unpaid" ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Challan #{challan.id}</CardTitle>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${challan.status === "Unpaid" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                    >
                      {challan.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Date of Violation</p>
                      <p className="font-medium">{challan.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Violation Type</p>
                      <p className="font-medium">{challan.violation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{challan.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium">{formatCurrency(challan.amount)}</p>
                    </div>
                  </div>

                  {challan.status === "Unpaid" && (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Search</h3>
            <p className="text-gray-600">Find your challans using vehicle number, DL, or challan number</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">Pay your challans securely online with multiple payment options</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Receipt</h3>
            <p className="text-gray-600">Get digital receipt instantly after successful payment</p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">How can I check my challan status?</h4>
              <p className="text-sm text-gray-600">
                You can check your challan status by entering your vehicle registration number, driving license number,
                or challan number in the search form above.
              </p>
            </div>
            <div>
              <h4 className="font-medium">What payment methods are accepted?</h4>
              <p className="text-sm text-gray-600">
                We accept all major credit/debit cards, net banking, UPI, and digital wallets for challan payments.
              </p>
            </div>
            <div>
              <h4 className="font-medium">How long does it take to update the challan status after payment?</h4>
              <p className="text-sm text-gray-600">
                The challan status is usually updated within 24-48 hours after successful payment.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Can I get a receipt for my payment?</h4>
              <p className="text-sm text-gray-600">
                Yes, a digital receipt will be generated instantly after successful payment. You can download or print
                it for your records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


