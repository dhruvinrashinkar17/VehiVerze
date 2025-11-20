"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@vehiverze/ui/card"
import { Search, Check, Info, Shield } from "lucide-react"

export function VehicleDetailsContent() {
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [vehicleDetails, setVehicleDetails] = useState<any>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      // Generate random vehicle data
      const randomVehicleData = {
        registrationNumber: vehicleNumber.toUpperCase(),
        registrationDate: new Date(
          Date.now() - Math.floor(Math.random() * 2000) * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
        ownerName: "John Doe",
        vehicleClass: ["Motor Car", "Motor Cycle", "Heavy Goods Vehicle", "Light Motor Vehicle"][
          Math.floor(Math.random() * 4)
        ],
        fuelType: ["Petrol", "Diesel", "CNG", "Electric"][Math.floor(Math.random() * 4)],
        engineNumber: `E${Math.floor(Math.random() * 10000000)}`,
        chassisNumber: `C${Math.floor(Math.random() * 10000000)}`,
        model: ["Swift", "i20", "XUV300", "City", "Nexon"][Math.floor(Math.random() * 5)],
        manufacturer: ["Maruti Suzuki", "Hyundai", "Mahindra", "Honda", "Tata"][Math.floor(Math.random() * 5)],
        insuranceValidity: new Date(
          Date.now() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
        pucValidity: new Date(Date.now() + Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        fitnessValidity: new Date(
          Date.now() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
        taxValidity: new Date(Date.now() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        rtoName: ["Delhi RTO", "Mumbai RTO", "Bangalore RTO", "Chennai RTO", "Hyderabad RTO"][
          Math.floor(Math.random() * 5)
        ],
      }

      setVehicleDetails(randomVehicleData)
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Check Vehicle Details</h1>
          <p className="text-lg text-gray-600">Get comprehensive information about any registered vehicle in India</p>
        </div>

        <Card className="border border-gray-200 mb-8">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle>Vehicle Information Lookup</CardTitle>
            <CardDescription>Enter the vehicle registration number to get detailed information</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
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

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSearching || !vehicleNumber}
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" /> Search Vehicle
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {vehicleDetails && (
          <div className="space-y-6">
            <Card className="border border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Registration Number: {vehicleDetails.registrationNumber}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Registration Date</p>
                      <p className="font-medium">{vehicleDetails.registrationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Owner Name</p>
                      <p className="font-medium">{vehicleDetails.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Class</p>
                      <p className="font-medium">{vehicleDetails.vehicleClass}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-medium">{vehicleDetails.fuelType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Engine Number</p>
                      <p className="font-medium">{vehicleDetails.engineNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Chassis Number</p>
                      <p className="font-medium">{vehicleDetails.chassisNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Model</p>
                      <p className="font-medium">{vehicleDetails.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Manufacturer</p>
                      <p className="font-medium">{vehicleDetails.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">RTO Name</p>
                      <p className="font-medium">{vehicleDetails.rtoName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Insurance Valid Till</p>
                      <p className="font-medium">{vehicleDetails.insuranceValidity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">PUC Valid Till</p>
                      <p className="font-medium">{vehicleDetails.pucValidity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tax Valid Till</p>
                      <p className="font-medium">{vehicleDetails.taxValidity}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button variant="outline" className="w-full">
                Download Report
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Check Vehicle History</Button>
            </div>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Details</h3>
            <p className="text-gray-600">
              Get complete information about the vehicle's registration and specifications
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verify Authenticity</h3>
            <p className="text-gray-600">
              Verify the authenticity of the vehicle and check for any potential fraud or discrepancies
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Compliance Status</h3>
            <p className="text-gray-600">Check the status of insurance, PUC, fitness certificate, and tax validity</p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Why Check Vehicle Details?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Before Buying a Used Vehicle</h4>
                <p className="text-sm text-gray-600">
                  Verify the vehicle's details, ownership history, and legal status before making a purchase decision.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Check Compliance Status</h4>
                <p className="text-sm text-gray-600">
                  Ensure that the vehicle is compliant with all legal requirements including insurance, PUC, and tax.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Avoid Fraud</h4>
                <p className="text-sm text-gray-600">
                  Protect yourself from potential fraud by verifying the authenticity of the vehicle and its documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


