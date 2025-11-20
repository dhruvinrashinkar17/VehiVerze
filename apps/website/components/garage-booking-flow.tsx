"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  Car,
  Bike,
  Truck,
  Check,
  Clock,
  Calendar,
  User,
  CreditCard,
  Smartphone,
  Wallet,
  Shield,
  Wrench,
  Battery,
  AirVent,
  SprayCan,
  Gauge,
  Sparkles,
  Settings,
  Zap,
  Eye,
  Wind,
} from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"
import { Label } from "@vehiverze/ui/label"
import { Input } from "@vehiverze/ui/input"
import { Textarea } from "@vehiverze/ui/textarea"
import { Checkbox } from "@vehiverze/ui/checkbox"
import { Badge } from "@vehiverze/ui/badge"
import { Separator } from "@vehiverze/ui/separator"

// Vehicle types with their icons
const vehicleTypes = [
  { id: "2w", name: "2 Wheeler", icon: <Bike className="h-8 w-8" />, description: "Motorcycles, Scooters" },
  { id: "3w", name: "3 Wheeler", icon: <Bike className="h-8 w-8" />, description: "Auto Rickshaws" },
  { id: "4w", name: "4 Wheeler", icon: <Car className="h-8 w-8" />, description: "Cars, SUVs" },
  { id: "6w", name: "6 Wheeler", icon: <Truck className="h-8 w-8" />, description: "Medium Trucks" },
  { id: "8w", name: "8+ Wheeler", icon: <Truck className="h-8 w-8" />, description: "Heavy Trucks" },
]

// Vehicle brands by type
const vehicleBrands = {
  "2w": ["Honda", "Hero", "Bajaj", "TVS", "Yamaha", "Royal Enfield", "KTM", "Suzuki"],
  "3w": ["Bajaj", "Mahindra", "Piaggio", "TVS", "Force Motors", "Atul Auto"],
  "4w": ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota", "Ford", "Volkswagen", "BMW", "Mercedes"],
  "6w": ["Tata", "Ashok Leyland", "Mahindra", "Force Motors", "Eicher", "BharatBenz"],
  "8w": ["Tata", "Ashok Leyland", "Volvo", "Scania", "BharatBenz", "Mahindra"],
}

// Vehicle models by brand (simplified for demo)
const vehicleModels = {
  Honda: ["Activa", "CB Shine", "Unicorn", "City", "Amaze", "WR-V"],
  Hero: ["Splendor", "HF Deluxe", "Passion", "Xtreme"],
  "Maruti Suzuki": ["Swift", "Baleno", "Alto", "Wagon R", "Dzire", "Vitara Brezza"],
  Hyundai: ["i20", "Creta", "Verna", "Grand i10", "Venue"],
  Tata: ["Nexon", "Harrier", "Altroz", "Tigor", "Safari", "Ace", "407", "Prima"],
  // Add more as needed
}

// Garage services by vehicle type
const garageServices = {
  "2w": [
    {
      id: "periodic-2w",
      name: "Periodic Service",
      icon: <Settings className="h-6 w-6" />,
      description: "Complete maintenance service",
    },
    {
      id: "battery-2w",
      name: "Battery Service",
      icon: <Battery className="h-6 w-6" />,
      description: "Battery check & replacement",
    },
    {
      id: "brake-2w",
      name: "Brake Service",
      icon: <Gauge className="h-6 w-6" />,
      description: "Brake pad & system service",
    },
    {
      id: "chain-2w",
      name: "Chain & Sprocket",
      icon: <Wrench className="h-6 w-6" />,
      description: "Chain cleaning & replacement",
    },
    {
      id: "oil-2w",
      name: "Oil Change",
      icon: <Zap className="h-6 w-6" />,
      description: "Engine oil & filter change",
    },
    {
      id: "wash-2w",
      name: "Bike Wash & Spa",
      icon: <Sparkles className="h-6 w-6" />,
      description: "Complete cleaning service",
    },
  ],
  "3w": [
    {
      id: "periodic-3w",
      name: "Periodic Service",
      icon: <Settings className="h-6 w-6" />,
      description: "Complete maintenance service",
    },
    {
      id: "battery-3w",
      name: "Battery Service",
      icon: <Battery className="h-6 w-6" />,
      description: "Battery check & replacement",
    },
    {
      id: "brake-3w",
      name: "Brake Service",
      icon: <Gauge className="h-6 w-6" />,
      description: "Brake system service",
    },
    {
      id: "engine-3w",
      name: "Engine Repair",
      icon: <Wrench className="h-6 w-6" />,
      description: "Engine diagnostics & repair",
    },
    {
      id: "transmission-3w",
      name: "Transmission Service",
      icon: <Settings className="h-6 w-6" />,
      description: "Gearbox maintenance",
    },
  ],
  "4w": [
    {
      id: "periodic-4w",
      name: "Periodic Service",
      icon: <Settings className="h-6 w-6" />,
      description: "Complete maintenance service",
    },
    {
      id: "ac-4w",
      name: "AC Service",
      icon: <AirVent className="h-6 w-6" />,
      description: "Air conditioning service",
    },
    {
      id: "battery-4w",
      name: "Battery Service",
      icon: <Battery className="h-6 w-6" />,
      description: "Battery check & replacement",
    },
    {
      id: "brake-4w",
      name: "Brake Service",
      icon: <Gauge className="h-6 w-6" />,
      description: "Brake system service",
    },
    {
      id: "denting-4w",
      name: "Denting & Painting",
      icon: <SprayCan className="h-6 w-6" />,
      description: "Body repair & painting",
    },
    {
      id: "detailing-4w",
      name: "Car Detailing",
      icon: <Sparkles className="h-6 w-6" />,
      description: "Interior & exterior detailing",
    },
    {
      id: "inspection-4w",
      name: "Vehicle Inspection",
      icon: <Eye className="h-6 w-6" />,
      description: "Complete vehicle checkup",
    },
    {
      id: "windshield-4w",
      name: "Windshield Service",
      icon: <Wind className="h-6 w-6" />,
      description: "Windshield repair & replacement",
    },
  ],
  "6w": [
    {
      id: "periodic-6w",
      name: "Periodic Service",
      icon: <Settings className="h-6 w-6" />,
      description: "Complete maintenance service",
    },
    {
      id: "ac-6w",
      name: "AC Service",
      icon: <AirVent className="h-6 w-6" />,
      description: "Air conditioning service",
    },
    {
      id: "battery-6w",
      name: "Battery Service",
      icon: <Battery className="h-6 w-6" />,
      description: "Battery check & replacement",
    },
    {
      id: "brake-6w",
      name: "Brake Service",
      icon: <Gauge className="h-6 w-6" />,
      description: "Heavy-duty brake service",
    },
    {
      id: "engine-6w",
      name: "Engine Repair",
      icon: <Wrench className="h-6 w-6" />,
      description: "Engine diagnostics & repair",
    },
    {
      id: "transmission-6w",
      name: "Transmission Service",
      icon: <Settings className="h-6 w-6" />,
      description: "Gearbox maintenance",
    },
  ],
  "8w": [
    {
      id: "periodic-8w",
      name: "Periodic Service",
      icon: <Settings className="h-6 w-6" />,
      description: "Complete maintenance service",
    },
    {
      id: "ac-8w",
      name: "AC Service",
      icon: <AirVent className="h-6 w-6" />,
      description: "Air conditioning service",
    },
    {
      id: "battery-8w",
      name: "Battery Service",
      icon: <Battery className="h-6 w-6" />,
      description: "Heavy-duty battery service",
    },
    {
      id: "brake-8w",
      name: "Brake Service",
      icon: <Gauge className="h-6 w-6" />,
      description: "Heavy-duty brake service",
    },
    {
      id: "engine-8w",
      name: "Engine Repair",
      icon: <Wrench className="h-6 w-6" />,
      description: "Heavy-duty engine service",
    },
    {
      id: "transmission-8w",
      name: "Transmission Service",
      icon: <Settings className="h-6 w-6" />,
      description: "Heavy-duty transmission service",
    },
  ],
}

// Service packages
const servicePackages = {
  basic: {
    name: "Basic Service",
    description: "Essential maintenance",
    duration: "2-3 hours",
    warranty: "1 month",
    features: ["Basic inspection", "Oil top-up", "Basic cleaning"],
  },
  standard: {
    name: "Standard Service",
    description: "Comprehensive service",
    duration: "3-4 hours",
    warranty: "3 months",
    features: ["Complete inspection", "Oil change", "Filter replacement", "Basic repairs"],
    recommended: true,
  },
  premium: {
    name: "Premium Service",
    description: "Complete overhaul",
    duration: "4-6 hours",
    warranty: "6 months",
    features: ["Detailed inspection", "All fluids change", "Complete service", "Priority support"],
  },
}

// Pricing by service and package
const servicePricing = {
  "periodic-2w": { basic: 799, standard: 1299, premium: 1899 },
  "battery-2w": { basic: 299, standard: 1499, premium: 2299 },
  "brake-2w": { basic: 499, standard: 999, premium: 1599 },
  "chain-2w": { basic: 199, standard: 799, premium: 1299 },
  "oil-2w": { basic: 299, standard: 599, premium: 899 },
  "wash-2w": { basic: 199, standard: 399, premium: 699 },
  "periodic-3w": { basic: 999, standard: 1599, premium: 2299 },
  "battery-3w": { basic: 399, standard: 1799, premium: 2699 },
  "brake-3w": { basic: 699, standard: 1299, premium: 1999 },
  "engine-3w": { basic: 1299, standard: 2499, premium: 3999 },
  "transmission-3w": { basic: 899, standard: 1699, premium: 2599 },
  "periodic-4w": { basic: 1299, standard: 2199, premium: 3299 },
  "ac-4w": { basic: 899, standard: 1599, premium: 2499 },
  "battery-4w": { basic: 499, standard: 2199, premium: 3299 },
  "brake-4w": { basic: 899, standard: 1699, premium: 2599 },
  "denting-4w": { basic: 1999, standard: 4999, premium: 8999 },
  "detailing-4w": { basic: 699, standard: 1299, premium: 2199 },
  "inspection-4w": { basic: 399, standard: 799, premium: 1299 },
  "windshield-4w": { basic: 1299, standard: 2999, premium: 4999 },
  "periodic-6w": { basic: 1999, standard: 3499, premium: 5299 },
  "ac-6w": { basic: 1299, standard: 2299, premium: 3699 },
  "battery-6w": { basic: 799, standard: 2999, premium: 4499 },
  "brake-6w": { basic: 1299, standard: 2499, premium: 3999 },
  "engine-6w": { basic: 2499, standard: 4999, premium: 7999 },
  "transmission-6w": { basic: 1799, standard: 3299, premium: 5199 },
  "periodic-8w": { basic: 2999, standard: 5499, premium: 8299 },
  "ac-8w": { basic: 1799, standard: 3299, premium: 5199 },
  "battery-8w": { basic: 1299, standard: 3999, premium: 5999 },
  "brake-8w": { basic: 1999, standard: 3799, premium: 5999 },
  "engine-8w": { basic: 3999, standard: 7999, premium: 12999 },
  "transmission-8w": { basic: 2799, standard: 4999, premium: 7799 },
}

// Add-on services
const addOnServices = [
  { id: "pickup", name: "Pick & Drop", price: 199, description: "Free pickup and drop at your location" },
  { id: "express", name: "Express Service", price: 299, description: "Priority service - 50% faster" },
  { id: "warranty", name: "Extended Warranty", price: 499, description: "Additional 6 months warranty" },
  { id: "insurance", name: "Insurance Support", price: 99, description: "Help with insurance claims" },
]

export function GarageBookingFlow() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    vehicleType: "",
    brand: "",
    model: "",
    service: "",
    package: "",
    customerName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    date: "",
    timeSlot: "",
    addOns: [] as string[],
    paymentMethod: "",
    specialInstructions: "",
  })

  const totalSteps = 6 // Reduced from 7 since we skip vehicle type selection

  // Initialize vehicle type from session storage
  useEffect(() => {
    const selectedVehicleType = sessionStorage.getItem("selectedVehicleType")
    if (selectedVehicleType) {
      setFormData((prev) => ({ ...prev, vehicleType: selectedVehicleType }))
    } else {
      // If no vehicle type selected, redirect back to garage services page
      router.push("/garage-services")
    }
  }, [router])

  // Get filtered brands based on vehicle type
  const getFilteredBrands = () => {
    return vehicleBrands[formData.vehicleType as keyof typeof vehicleBrands] || []
  }

  // Get filtered models based on brand
  const getFilteredModels = () => {
    return vehicleModels[formData.brand as keyof typeof vehicleModels] || []
  }

  // Get filtered services based on vehicle type
  const getFilteredServices = () => {
    return garageServices[formData.vehicleType as keyof typeof garageServices] || []
  }

  // Get service price
  const getServicePrice = (packageType: string) => {
    const serviceKey = formData.service as keyof typeof servicePricing
    const packageKey = packageType as keyof (typeof servicePricing)[typeof serviceKey]
    return servicePricing[serviceKey]?.[packageKey] || 0
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    const basePrice = getServicePrice(formData.package)
    const addOnPrice = formData.addOns.reduce((total, addOnId) => {
      const addOn = addOnServices.find((ao) => ao.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)
    return basePrice + addOnPrice
  }

  // Handle form data update
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle add-on toggle
  const toggleAddOn = (addOnId: string) => {
    setFormData((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId) ? prev.addOns.filter((id) => id !== addOnId) : [...prev.addOns, addOnId],
    }))
  }

  // Handle next step
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle booking completion
  const handleCompleteBooking = () => {
    // Here you would typically make an API call to create the booking
    router.push("/garage-services/booking-success")
  }

  // Generate time slots
  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
  ]

  // Generate next 7 days
  const getNextSevenDays = () => {
    const days = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  // Get current vehicle type name
  const getCurrentVehicleTypeName = () => {
    return vehicleTypes.find((v) => v.id === formData.vehicleType)?.name || ""
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={currentStep > 1 ? handlePrevious : () => router.push("/garage-services")}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Book Garage Service</h1>
                {formData.vehicleType && <p className="text-sm text-gray-600">{getCurrentVehicleTypeName()}</p>}
              </div>
            </div>

            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step ? "bg-[#2b4ba9] text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < totalSteps && (
                    <div className={`w-8 h-1 ${currentStep > step ? "bg-[#2b4ba9]" : "bg-gray-200"}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Step 1: Brand Selection */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Select Vehicle Brand</h2>
              <p className="text-gray-600">Choose your {getCurrentVehicleTypeName()} brand</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {getFilteredBrands().map((brand) => (
                <Card
                  key={brand}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    formData.brand === brand ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => {
                    updateFormData("brand", brand)
                    updateFormData("model", "")
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold">{brand}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button onClick={handleNext} disabled={!formData.brand} className="px-8">
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Model Selection */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Select Vehicle Model</h2>
              <p className="text-gray-600">Choose your {formData.brand} model</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {getFilteredModels().map((model) => (
                <Card
                  key={model}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    formData.model === model ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => updateFormData("model", model)}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold">{model}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button onClick={handleNext} disabled={!formData.model} className="px-8">
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Service Selection */}
        {currentStep === 3 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Select Service</h2>
              <p className="text-gray-600">
                Choose the service you need for your {formData.brand} {formData.model}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredServices().map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    formData.service === service.id ? "ring-2 ring-[#2b4ba9] bg-blue-50" : ""
                  }`}
                  onClick={() => updateFormData("service", service.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-[#2b4ba9]">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">Starting from ₹{getServicePrice("basic")}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleNext}
                disabled={!formData.service}
                className="px-8 bg-[#2b4ba9] hover:bg-[#1e3a8a]"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Package Selection */}
        {currentStep === 4 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Choose Service Package</h2>
              <p className="text-gray-600">Select the package that best fits your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(servicePackages).map(([packageId, packageInfo]) => (
                <Card
                  key={packageId}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 relative ${
                    formData.package === packageId ? "ring-2 ring-[#2b4ba9]" : ""
                  } ${packageInfo.recommended ? "ring-2 ring-orange-400" : ""}`}
                  onClick={() => updateFormData("package", packageId)}
                >
                  {packageInfo.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 text-white">Recommended</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{packageInfo.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-[#2b4ba9]">₹{getServicePrice(packageId)}</div>
                      <div className="flex items-center justify-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {packageInfo.duration}
                      </div>
                      <div className="flex items-center justify-center text-sm text-gray-500">
                        <Shield className="h-4 w-4 mr-1" />
                        {packageInfo.warranty} warranty
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">{packageInfo.description}</p>
                    <div className="space-y-2">
                      {packageInfo.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleNext}
                disabled={!formData.package}
                className="px-8 bg-[#2b4ba9] hover:bg-[#1e3a8a]"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Customer Details */}
        {currentStep === 5 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Customer Details</h2>
              <p className="text-gray-600">Please provide your details and preferred service time</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.customerName}
                      onChange={(e) => updateFormData("customerName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => updateFormData("mobile", e.target.value)}
                      placeholder="Enter your mobile number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Pickup Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => updateFormData("pincode", e.target.value)}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Schedule & Add-ons */}
              <div className="space-y-6">
                {/* Date & Time Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Select Date *</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {getNextSevenDays().map((date, index) => (
                          <div
                            key={index}
                            onClick={() => updateFormData("date", date.toISOString().split("T")[0])}
                            className={`flex flex-col items-center p-2 rounded-lg cursor-pointer border transition-all ${
                              formData.date === date.toISOString().split("T")[0]
                                ? "bg-blue-100 border-blue-600"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <span className="text-xs text-gray-500">
                              {date.toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                            <span className="text-sm font-medium">{date.getDate()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Select Time Slot *</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {timeSlots.map((slot) => (
                          <div
                            key={slot}
                            onClick={() => updateFormData("timeSlot", slot)}
                            className={`p-3 rounded-lg cursor-pointer border transition-all ${
                              formData.timeSlot === slot
                                ? "bg-blue-100 border-blue-600"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <span className="text-sm">{slot}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Add-on Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add-on Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {addOnServices.map((addOn) => (
                      <div key={addOn.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={formData.addOns.includes(addOn.id)}
                            onCheckedChange={() => toggleAddOn(addOn.id)}
                          />
                          <div>
                            <h4 className="font-medium">{addOn.name}</h4>
                            <p className="text-sm text-gray-600">{addOn.description}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-blue-600">₹{addOn.price}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Special Instructions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Special Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={formData.specialInstructions}
                      onChange={(e) => updateFormData("specialInstructions", e.target.value)}
                      placeholder="Any special instructions for the service..."
                      rows={3}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleNext}
                disabled={
                  !formData.customerName ||
                  !formData.mobile ||
                  !formData.address ||
                  !formData.date ||
                  !formData.timeSlot
                }
                className="px-8"
              >
                Continue to Checkout
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Checkout */}
        {currentStep === 6 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Checkout</h2>
              <p className="text-gray-600">Review your booking and complete payment</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle</span>
                    <span className="font-medium">
                      {formData.brand} {formData.model} ({getCurrentVehicleTypeName()})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span className="font-medium">
                      {getFilteredServices().find((s) => s.id === formData.service)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package</span>
                    <span className="font-medium">
                      {servicePackages[formData.package as keyof typeof servicePackages]?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-medium">
                      {new Date(formData.date).toLocaleDateString()} • {formData.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer</span>
                    <span className="font-medium">{formData.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mobile</span>
                    <span className="font-medium">{formData.mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address</span>
                    <span className="font-medium text-right">{formData.address}</span>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Service Package</span>
                      <span>₹{getServicePrice(formData.package)}</span>
                    </div>
                    {formData.addOns.map((addOnId) => {
                      const addOn = addOnServices.find((ao) => ao.id === addOnId)
                      return (
                        <div key={addOnId} className="flex justify-between text-sm">
                          <span>{addOn?.name}</span>
                          <span>₹{addOn?.price}</span>
                        </div>
                      )
                    })}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-[#2b4ba9]">₹{calculateTotalPrice()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => updateFormData("paymentMethod", value)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="h-6 w-6 text-[#2b4ba9]" />
                        <div className="flex-1">
                          <Label htmlFor="upi" className="font-medium cursor-pointer">
                            UPI Payment
                          </Label>
                          <p className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-6 w-6 text-[#2b4ba9]" />
                        <div className="flex-1">
                          <Label htmlFor="card" className="font-medium cursor-pointer">
                            Credit/Debit Card
                          </Label>
                          <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Wallet className="h-6 w-6 text-[#2b4ba9]" />
                        <div className="flex-1">
                          <Label htmlFor="wallet" className="font-medium cursor-pointer">
                            Digital Wallet
                          </Label>
                          <p className="text-sm text-gray-600">Paytm, Amazon Pay, Mobikwik</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-[#2b4ba9] mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Secure Payment</p>
                        <p>Your payment is 100% secure. You can cancel or reschedule up to 2 hours before service.</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-[#2b4ba9] hover:bg-[#1e3a8a]"
                    onClick={handleCompleteBooking}
                    disabled={!formData.paymentMethod}
                    size="lg"
                  >
                    Complete Booking - ₹{calculateTotalPrice()}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


