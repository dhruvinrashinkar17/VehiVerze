"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Checkbox } from "@vehiverze/ui/checkbox"
import { Badge } from "@vehiverze/ui/badge"
import { ArrowLeft, ArrowRight, Wrench, Clock, Star, Shield, Zap, Award } from "lucide-react"
import { useCityStore } from "@/lib/city-store"

interface VehicleDetails {
  type: string
  brand: string
  model: string
  year: string
  variant: string
  transmission: string
  registrationNumber: string
}

interface ServiceItem {
  id: string
  name: string
  price: number
  duration: string
  description: string
  popular?: boolean
  recommended?: boolean
}

const servicesByVehicleType = {
  "2-Wheeler": [
    {
      id: "2w-oil",
      name: "Oil Change",
      price: 299,
      duration: "30 mins",
      description: "Engine oil and filter replacement with premium quality oil",
      popular: true,
    },
    {
      id: "2w-brake",
      name: "Brake Adjustment",
      price: 199,
      duration: "45 mins",
      description: "Brake cable adjustment, cleaning, and safety inspection",
    },
    {
      id: "2w-chain",
      name: "Chain Lubrication",
      price: 149,
      duration: "20 mins",
      description: "Chain cleaning, lubrication, and tension adjustment",
    },
    {
      id: "2w-tire",
      name: "Tire Service",
      price: 99,
      duration: "30 mins",
      description: "Tire pressure check, rotation, and replacement if needed",
    },
    {
      id: "2w-general",
      name: "General Service",
      price: 599,
      duration: "2 hours",
      description: "Complete vehicle checkup with 15-point inspection",
      recommended: true,
    },
  ],
  "3-Wheeler": [
    {
      id: "3w-battery",
      name: "Battery Check",
      price: 199,
      duration: "30 mins",
      description: "Battery health check, terminal cleaning, and voltage testing",
    },
    {
      id: "3w-suspension",
      name: "Suspension Service",
      price: 799,
      duration: "2 hours",
      description: "Suspension system inspection, repair, and alignment",
      recommended: true,
    },
    {
      id: "3w-brake",
      name: "Brake Service",
      price: 499,
      duration: "1 hour",
      description: "Complete brake system service and safety check",
      popular: true,
    },
    {
      id: "3w-electrical",
      name: "Electrical System",
      price: 399,
      duration: "1 hour",
      description: "Electrical system diagnosis and repair",
    },
    {
      id: "3w-general",
      name: "General Maintenance",
      price: 999,
      duration: "3 hours",
      description: "Comprehensive vehicle maintenance and inspection",
    },
  ],
  "4-Wheeler": [
    {
      id: "4w-oil",
      name: "Oil Change",
      price: 799,
      duration: "1 hour",
      description: "Premium engine oil and filter replacement",
      popular: true,
    },
    {
      id: "4w-ac",
      name: "AC Service",
      price: 899,
      duration: "2 hours",
      description: "AC system cleaning, gas refill, and performance check",
    },
    {
      id: "4w-brake",
      name: "Brake Service",
      price: 1299,
      duration: "2 hours",
      description: "Brake pad replacement, disc cleaning, and system check",
      recommended: true,
    },
    {
      id: "4w-tire",
      name: "Tire & Wheel Service",
      price: 299,
      duration: "45 mins",
      description: "Tire rotation, balancing, and alignment check",
    },
    {
      id: "4w-battery",
      name: "Battery Service",
      price: 199,
      duration: "30 mins",
      description: "Battery testing, cleaning, and replacement if needed",
    },
    {
      id: "4w-clutch",
      name: "Engine Overhaul",
      price: 4999,
      duration: "1 day",
      description: "Major engine and clutch repair with warranty",
    },
    {
      id: "4w-periodic",
      name: "Periodic Service",
      price: 1599,
      duration: "3 hours",
      description: "Complete periodic maintenance as per manufacturer schedule",
      recommended: true,
    },
  ],
  "6-Wheeler": [
    {
      id: "6w-engine",
      name: "Engine Diagnostics",
      price: 1299,
      duration: "2 hours",
      description: "Advanced engine diagnosis with computerized testing",
      recommended: true,
    },
    {
      id: "6w-alignment",
      name: "Wheel Alignment",
      price: 899,
      duration: "1.5 hours",
      description: "Precision wheel alignment and balancing service",
    },
    {
      id: "6w-brake",
      name: "Brake System",
      price: 1999,
      duration: "3 hours",
      description: "Heavy-duty brake system service and safety inspection",
      popular: true,
    },
    {
      id: "6w-load",
      name: "Load Capacity Check",
      price: 799,
      duration: "1 hour",
      description: "Load bearing capacity and safety compliance check",
    },
    {
      id: "6w-general",
      name: "Fleet Maintenance",
      price: 2499,
      duration: "4 hours",
      description: "Comprehensive commercial vehicle maintenance",
    },
  ],
  "8+ Wheeler": [
    {
      id: "8w-overhaul",
      name: "Engine Overhaul",
      price: 9999,
      duration: "2 days",
      description: "Complete engine overhaul with genuine parts",
      recommended: true,
    },
    {
      id: "8w-suspension",
      name: "Suspension Service",
      price: 4999,
      duration: "1 day",
      description: "Heavy duty suspension system service and repair",
    },
    {
      id: "8w-differential",
      name: "Differential Service",
      price: 2999,
      duration: "4 hours",
      description: "Differential maintenance and gear oil replacement",
    },
    {
      id: "8w-brake",
      name: "Brake System",
      price: 3999,
      duration: "6 hours",
      description: "Heavy vehicle brake system overhaul",
      popular: true,
    },
    {
      id: "8w-transmission",
      name: "Transmission Service",
      price: 7999,
      duration: "1.5 days",
      description: "Transmission service and repair with warranty",
    },
    {
      id: "8w-fleet",
      name: "Fleet Maintenance",
      price: 12999,
      duration: "1 day",
      description: "Complete fleet maintenance package for commercial vehicles",
    },
  ],
}

export default function ServiceSelectionClient() {
  const router = useRouter()
  const { selectedCity } = useCityStore()
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails | null>(null)
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    // Get vehicle details from localStorage
    const stored = localStorage.getItem("vehicleDetails")
    if (stored) {
      setVehicleDetails(JSON.parse(stored))
    } else {
      // Redirect back if no vehicle details
      router.push("/garage-services/vehicle-selection")
    }
  }, [router])

  const availableServices = vehicleDetails?.type
    ? servicesByVehicleType[vehicleDetails.type as keyof typeof servicesByVehicleType] || []
    : []

  const toggleService = (service: ServiceItem) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id) ? prev.filter((s) => s.id !== service.id) : [...prev, service],
    )
  }

  const selectedTotal = selectedServices.reduce((sum, service) => sum + service.price, 0)

  const canProceed = () => {
    return selectedServices.length > 0
  }

  const handleNext = () => {
    if (canProceed()) {
      // Store selected services in localStorage
      localStorage.setItem("selectedServices", JSON.stringify(selectedServices))
      router.push("/garage-services/booking-details")
    }
  }

  const handleBack = () => {
    router.push("/garage-services/vehicle-selection")
  }

  if (!vehicleDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 text-card-foreground bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wrench className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Select Services</h1>
          </div>
          <p className="text-lg text-gray-600">
            Choose the services you need for your {vehicleDetails.brand} {vehicleDetails.model}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Registration: <span className="font-mono font-medium">{vehicleDetails.registrationNumber}</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Vehicle Details</span>
            </div>
            <div className="w-8 h-px bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-medium bg-[#1D4ED8]">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-[#1D4ED8]">Service Selection</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-gray-500">Booking Details</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm text-gray-500">Checkout</span>
            </div>
          </div>
        </div>

        {/* Vehicle Summary */}
        <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-[#1D4ED8] to-blue-800 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-card">
                  {vehicleDetails.brand} {vehicleDetails.model}
                </h3>
                <div className="flex items-center gap-4 text-blue-100">
                  <span className="text-card">{vehicleDetails.type}</span>
                  {vehicleDetails.year && <span className="text-card">• {vehicleDetails.year}</span>}
                  {vehicleDetails.transmission && <span className="text-card">• {vehicleDetails.transmission}</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-card">{vehicleDetails.registrationNumber}</div>
                <div className="text-sm text-card">Registration Number</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-blue-700 text-white rounded-t-lg">
                <CardTitle className="text-xl">Available Services</CardTitle>
                <CardDescription className="text-blue-100">
                  Select the services you need for your {vehicleDetails.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {availableServices.map((service) => (
                    <div
                      key={service.id}
                      className={`border-2 rounded-lg p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
                        selectedServices.some((s) => s.id === service.id)
                          ? "border-[#1D4ED8] bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleService(service)}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.some((s) => s.id === service.id)}
                          onCheckedChange={() => toggleService(service)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2 text-primary">
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-semibold text-card">{service.name}</h4>
                              {service.popular && (
                                <Badge className="bg-orange-100 text-orange-800 text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                              {service.recommended && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-[#1D4ED8]">₹{service.price}</div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center gap-4 text-card">
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="h-3 w-3 mr-1 text-card" />
                              {service.duration}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="h-3 w-3 mr-1 text-card" />
                              Warranty Included
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Zap className="h-3 w-3 mr-1 text-card" />
                              Professional Service
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {selectedServices.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Wrench className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No services selected yet</p>
                      <p className="text-sm">Choose services to see your total</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {selectedServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex justify-between items-center py-2 border-b border-gray-100"
                          >
                            <div>
                              <p className="font-medium text-sm text-gray-900">{service.name}</p>
                              <p className="text-xs text-gray-500">{service.duration}</p>
                            </div>
                            <span className="font-semibold text-gray-900">₹{service.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Subtotal:</span>
                          <span className="font-medium text-gray-900">₹{selectedTotal}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Service Charge:</span>
                          <span className="font-medium">₹0</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold pt-2 border-t text-[#1D4ED8]">
                          <span>Total:</span>
                          <span>₹{selectedTotal}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-blue-100">
                        <div className="flex items-center gap-2 text-sm text-[#1D4ED8] font-medium">
                          <Shield className="h-4 w-4" />
                          <span>Service Guarantee</span>
                        </div>
                        <p className="text-xs mt-1 text-[#1D4ED8]">
                          All services come with warranty and satisfaction guarantee
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={handleBack} className="px-6 py-3 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vehicle Details
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-8 py-3 bg-gradient-to-r from-[#1D4ED8] to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-medium"
          >
            Continue to Booking
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


