"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Checkbox } from "@vehiverze/ui/checkbox"
import { Textarea } from "@vehiverze/ui/textarea"
import { Badge } from "@vehiverze/ui/badge"
import { Progress } from "@vehiverze/ui/progress"
import { Calendar } from "@vehiverze/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@vehiverze/ui/popover"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"
import {
  ArrowLeft,
  ArrowRight,
  Car,
  CalendarIcon,
  Clock,
  CreditCard,
  CheckCircle,
  Wrench,
  Smartphone,
  Wallet,
  Shield,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@vehiverze/shared-utils/cn"
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
}

interface BookingData {
  vehicleDetails: VehicleDetails
  selectedServices: ServiceItem[]
  scheduleDate: Date | undefined
  timeSlot: string
  pickupDrop: boolean
  notes: string
  customerDetails: {
    name: string
    phone: string
    email: string
    address: string
  }
  paymentMethod: string
}

const vehicleTypes = ["2-Wheeler", "3-Wheeler", "4-Wheeler", "6-Wheeler", "8+ Wheeler"]

const vehicleData = {
  "2-Wheeler": {
    brands: ["Honda", "Hero", "Bajaj", "TVS", "Yamaha", "Royal Enfield"],
    models: {
      Honda: ["Activa", "CB Shine", "Dio", "CBR"],
      Hero: ["Splendor", "Passion", "Xtreme", "Maestro"],
      Bajaj: ["Pulsar", "Avenger", "CT", "Platina"],
      TVS: ["Apache", "Jupiter", "Ntorq", "Radeon"],
      Yamaha: ["FZ", "R15", "MT", "Ray"],
      "Royal Enfield": ["Classic", "Bullet", "Himalayan", "Interceptor"],
    },
  },
  "3-Wheeler": {
    brands: ["Bajaj", "TVS", "Mahindra", "Piaggio"],
    models: {
      Bajaj: ["RE Compact", "RE Maxima", "Qute"],
      TVS: ["King", "King Deluxe"],
      Mahindra: ["Alfa", "Treo"],
      Piaggio: ["Ape", "Ape City"],
    },
  },
  "4-Wheeler": {
    brands: ["Maruti", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra"],
    models: {
      Maruti: ["Swift", "Baleno", "Alto", "Wagon R", "Dzire"],
      Hyundai: ["i20", "Creta", "Verna", "Grand i10"],
      Tata: ["Nexon", "Harrier", "Altroz", "Tiago"],
      Honda: ["City", "Amaze", "Jazz", "WR-V"],
      Toyota: ["Innova", "Fortuner", "Glanza", "Urban Cruiser"],
      Mahindra: ["XUV700", "Scorpio", "Thar", "Bolero"],
    },
  },
  "6-Wheeler": {
    brands: ["Tata", "Ashok Leyland", "Mahindra", "Force"],
    models: {
      Tata: ["407", "709", "912"],
      "Ashok Leyland": ["Dost", "Partner", "Boss"],
      Mahindra: ["Bolero Pickup", "Supro"],
      Force: ["Traveller", "Trax"],
    },
  },
  "8+ Wheeler": {
    brands: ["Tata", "Ashok Leyland", "Mahindra", "BharatBenz"],
    models: {
      Tata: ["1613", "2518", "3118"],
      "Ashok Leyland": ["2518", "3118", "4923"],
      Mahindra: ["Blazo", "Furio"],
      BharatBenz: ["1617", "2523", "3528"],
    },
  },
}

const servicesByVehicleType = {
  "2-Wheeler": [
    {
      id: "2w-oil",
      name: "Oil Change",
      price: 299,
      duration: "30 mins",
      description: "Engine oil and filter replacement",
    },
    {
      id: "2w-brake",
      name: "Brake Adjustment",
      price: 199,
      duration: "45 mins",
      description: "Brake cable adjustment and cleaning",
    },
    {
      id: "2w-chain",
      name: "Chain Lubrication",
      price: 149,
      duration: "20 mins",
      description: "Chain cleaning and lubrication",
    },
    { id: "2w-tire", name: "Tire Change", price: 99, duration: "30 mins", description: "Tire replacement service" },
    {
      id: "2w-general",
      name: "General Service",
      price: 599,
      duration: "2 hours",
      description: "Complete vehicle checkup",
    },
  ],
  "3-Wheeler": [
    {
      id: "3w-battery",
      name: "Battery Check",
      price: 199,
      duration: "30 mins",
      description: "Battery health check and terminal cleaning",
    },
    {
      id: "3w-suspension",
      name: "Suspension",
      price: 799,
      duration: "2 hours",
      description: "Suspension system inspection and repair",
    },
    {
      id: "3w-brake",
      name: "Brake Service",
      price: 499,
      duration: "1 hour",
      description: "Brake system service and adjustment",
    },
    {
      id: "3w-electrical",
      name: "Electricals",
      price: 399,
      duration: "1 hour",
      description: "Electrical system diagnosis and repair",
    },
    {
      id: "3w-general",
      name: "General Service",
      price: 999,
      duration: "3 hours",
      description: "Complete vehicle maintenance",
    },
  ],
  "4-Wheeler": [
    {
      id: "4w-oil",
      name: "Oil Change",
      price: 799,
      duration: "1 hour",
      description: "Engine oil and filter replacement",
    },
    {
      id: "4w-ac",
      name: "AC Service",
      price: 899,
      duration: "2 hours",
      description: "AC system cleaning and gas refill",
    },
    {
      id: "4w-brake",
      name: "Brake Service",
      price: 1299,
      duration: "2 hours",
      description: "Brake pad replacement and system check",
    },
    {
      id: "4w-tire",
      name: "Tire Rotation",
      price: 299,
      duration: "45 mins",
      description: "Tire rotation and balancing",
    },
    {
      id: "4w-battery",
      name: "Battery Replacement",
      price: 199,
      duration: "30 mins",
      description: "Battery replacement service",
    },
    {
      id: "4w-clutch",
      name: "Clutch/Engine Overhaul",
      price: 4999,
      duration: "1 day",
      description: "Major engine and clutch repair",
    },
    {
      id: "4w-periodic",
      name: "Periodic Service",
      price: 1599,
      duration: "3 hours",
      description: "Complete periodic maintenance",
    },
  ],
  "6-Wheeler": [
    {
      id: "6w-engine",
      name: "Engine Diagnostics",
      price: 1299,
      duration: "2 hours",
      description: "Complete engine diagnosis",
    },
    {
      id: "6w-alignment",
      name: "Tire Alignment",
      price: 899,
      duration: "1.5 hours",
      description: "Wheel alignment and balancing",
    },
    {
      id: "6w-brake",
      name: "Brake System",
      price: 1999,
      duration: "3 hours",
      description: "Complete brake system service",
    },
    {
      id: "6w-load",
      name: "Load Bearing Check",
      price: 799,
      duration: "1 hour",
      description: "Load capacity and safety check",
    },
    {
      id: "6w-general",
      name: "General Maintenance",
      price: 2499,
      duration: "4 hours",
      description: "Complete vehicle maintenance",
    },
  ],
  "8+ Wheeler": [
    {
      id: "8w-overhaul",
      name: "Engine Overhaul",
      price: 9999,
      duration: "2 days",
      description: "Complete engine overhaul",
    },
    {
      id: "8w-suspension",
      name: "Suspension",
      price: 4999,
      duration: "1 day",
      description: "Heavy duty suspension service",
    },
    {
      id: "8w-differential",
      name: "Differential Service",
      price: 2999,
      duration: "4 hours",
      description: "Differential maintenance and repair",
    },
    {
      id: "8w-brake",
      name: "Brake System",
      price: 3999,
      duration: "6 hours",
      description: "Heavy vehicle brake system service",
    },
    {
      id: "8w-transmission",
      name: "Transmission",
      price: 7999,
      duration: "1.5 days",
      description: "Transmission service and repair",
    },
    {
      id: "8w-fleet",
      name: "Fleet Maintenance",
      price: 12999,
      duration: "1 day",
      description: "Complete fleet maintenance package",
    },
  ],
}

const timeSlots = ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"]

export function GarageServiceBooking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    vehicleDetails: {
      type: "",
      brand: "",
      model: "",
      year: "",
      variant: "",
      transmission: "",
      registrationNumber: "",
    },
    selectedServices: [],
    scheduleDate: undefined,
    timeSlot: "",
    pickupDrop: false,
    notes: "",
    customerDetails: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    paymentMethod: "",
  })

  const { selectedCity } = useCityStore()
  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateVehicleDetails = (field: keyof VehicleDetails, value: string) => {
    setBookingData((prev) => ({
      ...prev,
      vehicleDetails: {
        ...prev.vehicleDetails,
        [field]: value,
        // Reset dependent fields
        ...(field === "type" && { brand: "", model: "", year: "", variant: "", transmission: "" }),
        ...(field === "brand" && { model: "", year: "", variant: "", transmission: "" }),
        ...(field === "model" && { year: "", variant: "", transmission: "" }),
      },
    }))
  }

  const toggleService = (service: ServiceItem) => {
    setBookingData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.find((s) => s.id === service.id)
        ? prev.selectedServices.filter((s) => s.id !== service.id)
        : [...prev.selectedServices, service],
    }))
  }

  const calculateTotal = () => {
    const servicesTotal = bookingData.selectedServices.reduce((sum, service) => sum + service.price, 0)
    const pickupDropFee = bookingData.pickupDrop ? 199 : 0
    return servicesTotal + pickupDropFee
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <VehicleDetailsStep bookingData={bookingData} updateVehicleDetails={updateVehicleDetails} />
      case 2:
        return <ServiceSelectionStep bookingData={bookingData} toggleService={toggleService} />
      case 3:
        return <ScheduleStep bookingData={bookingData} setBookingData={setBookingData} />
      case 4:
        return <ReviewPaymentStep bookingData={bookingData} setBookingData={setBookingData} total={calculateTotal()} />
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          bookingData.vehicleDetails.type &&
          bookingData.vehicleDetails.brand &&
          bookingData.vehicleDetails.model &&
          bookingData.vehicleDetails.registrationNumber
        )
      case 2:
        return bookingData.selectedServices.length > 0
      case 3:
        return bookingData.scheduleDate && bookingData.timeSlot
      case 4:
        return bookingData.customerDetails.name && bookingData.customerDetails.phone && bookingData.paymentMethod
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Book Garage Service</h1>
          <p className="text-gray-600">Professional vehicle service in {selectedCity}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 [&>div]:bg-[#2b4ba9]" />

          {/* Step Labels */}
          <div className="flex justify-between mt-4 text-xs">
            <span className={currentStep >= 1 ? "text-[#2b4ba9] font-medium" : "text-gray-400"}>Vehicle Details</span>
            <span className={currentStep >= 2 ? "text-[#2b4ba9] font-medium" : "text-gray-400"}>Service Selection</span>
            <span className={currentStep >= 3 ? "text-[#2b4ba9] font-medium" : "text-gray-400"}>Schedule</span>
            <span className={currentStep >= 4 ? "text-[#2b4ba9] font-medium" : "text-gray-400"}>Review & Payment</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">{renderStepContent()}</Card>

        {/* Navigation */}
        <div className="flex justify-between text-black">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={!canProceed()} className="bg-[#2b4ba9] hover:bg-[#1e3a8a]">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Handle booking submission
                console.log("Booking submitted:", bookingData)
                window.location.href = "/garage-services/booking-success"
              }}
              disabled={!canProceed()}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirm Booking
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Step Components
function VehicleDetailsStep({
  bookingData,
  updateVehicleDetails,
}: {
  bookingData: BookingData
  updateVehicleDetails: (field: keyof VehicleDetails, value: string) => void
}) {
  const availableBrands = bookingData.vehicleDetails.type
    ? vehicleData[bookingData.vehicleDetails.type as keyof typeof vehicleData]?.brands || []
    : []
  const availableModels = bookingData.vehicleDetails.brand
    ? vehicleData[bookingData.vehicleDetails.type as keyof typeof vehicleData]?.models[
        bookingData.vehicleDetails.brand
      ] || []
    : []

  return (
    <CardContent className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Vehicle Details
        </CardTitle>
        <CardDescription>Tell us about your vehicle to provide accurate service recommendations</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Vehicle Type *</Label>
          <Select
            value={bookingData.vehicleDetails.type}
            onValueChange={(value) => updateVehicleDetails("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              {vehicleTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Select
            value={bookingData.vehicleDetails.brand}
            onValueChange={(value) => updateVehicleDetails("brand", value)}
            disabled={!bookingData.vehicleDetails.type}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {availableBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model *</Label>
          <Select
            value={bookingData.vehicleDetails.model}
            onValueChange={(value) => updateVehicleDetails("model", value)}
            disabled={!bookingData.vehicleDetails.brand}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            value={bookingData.vehicleDetails.year}
            onValueChange={(value) => updateVehicleDetails("year", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="variant">Variant</Label>
          <Input
            placeholder="e.g., VXi, ZXi, LXi"
            value={bookingData.vehicleDetails.variant}
            onChange={(e) => updateVehicleDetails("variant", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission</Label>
          <Select
            value={bookingData.vehicleDetails.transmission}
            onValueChange={(value) => updateVehicleDetails("transmission", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="cvt">CVT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="registrationNumber">Vehicle Registration Number *</Label>
          <Input
            placeholder="e.g., DL01AB1234"
            value={bookingData.vehicleDetails.registrationNumber}
            onChange={(e) => updateVehicleDetails("registrationNumber", e.target.value.toUpperCase())}
            className="uppercase"
          />
        </div>
      </div>
    </CardContent>
  )
}

function ServiceSelectionStep({
  bookingData,
  toggleService,
}: {
  bookingData: BookingData
  toggleService: (service: ServiceItem) => void
}) {
  const availableServices = bookingData.vehicleDetails.type
    ? servicesByVehicleType[bookingData.vehicleDetails.type as keyof typeof servicesByVehicleType] || []
    : []

  const selectedTotal = bookingData.selectedServices.reduce((sum, service) => sum + service.price, 0)

  return (
    <CardContent className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Service Selection
        </CardTitle>
        <CardDescription>Choose the services you need for your {bookingData.vehicleDetails.type}</CardDescription>
      </CardHeader>

      <div className="space-y-4">
        {availableServices.map((service) => (
          <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <Checkbox
                id={service.id}
                checked={bookingData.selectedServices.some((s) => s.id === service.id)}
                onCheckedChange={() => toggleService(service)}
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="text-card">
                    <Label htmlFor={service.id} className="text-base font-medium cursor-pointer">
                      {service.name}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#2b4ba9]">₹{service.price}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {bookingData.selectedServices.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="font-medium">Selected Services Total:</span>
              <span className="text-xl font-bold text-[#2b4ba9]">₹{selectedTotal}</span>
            </div>
          </div>
        )}
      </div>
    </CardContent>
  )
}

function ScheduleStep({
  bookingData,
  setBookingData,
}: {
  bookingData: BookingData
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  return (
    <CardContent className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Schedule Service
        </CardTitle>
        <CardDescription>Choose your preferred date and time for the service</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2",
                    !bookingData.scheduleDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {bookingData.scheduleDate ? format(bookingData.scheduleDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={bookingData.scheduleDate}
                  onSelect={(date) => {
                    setBookingData((prev) => ({ ...prev, scheduleDate: date }))
                  }}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const maxDate = new Date(today)
                    maxDate.setDate(maxDate.getDate() + 7)
                    return date < today || date > maxDate
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="text-base font-medium">Select Time Slot</Label>
            <RadioGroup
              value={bookingData.timeSlot}
              onValueChange={(value) => setBookingData((prev) => ({ ...prev, timeSlot: value }))}
              className="mt-2"
            >
              {timeSlots.map((slot) => (
                <div key={slot} className="flex items-center space-x-2">
                  <RadioGroupItem value={slot} id={slot} />
                  <Label htmlFor={slot} className="cursor-pointer">
                    {slot}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pickupDrop"
              checked={bookingData.pickupDrop}
              onCheckedChange={(checked) => setBookingData((prev) => ({ ...prev, pickupDrop: checked as boolean }))}
            />
            <Label htmlFor="pickupDrop" className="cursor-pointer">
              Pickup & Drop Service (+₹199)
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific requirements or issues with your vehicle..."
              value={bookingData.notes}
              onChange={(e) => setBookingData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={4}
            />
          </div>
        </div>
      </div>
    </CardContent>
  )
}

function ReviewPaymentStep({
  bookingData,
  setBookingData,
  total,
}: {
  bookingData: BookingData
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>
  total: number
}) {
  return (
    <CardContent className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Review & Payment
        </CardTitle>
        <CardDescription>Review your booking details and complete payment</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Summary */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Vehicle Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <span className="font-medium">Type:</span> {bookingData.vehicleDetails.type}
              </p>
              <p>
                <span className="font-medium">Vehicle:</span> {bookingData.vehicleDetails.brand}{" "}
                {bookingData.vehicleDetails.model}
              </p>
              <p>
                <span className="font-medium">Registration:</span> {bookingData.vehicleDetails.registrationNumber}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Selected Services</h3>
            <div className="space-y-2">
              {bookingData.selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.duration}</p>
                  </div>
                  <span className="font-medium">₹{service.price}</span>
                </div>
              ))}
              {bookingData.pickupDrop && (
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">Pickup & Drop Service</p>
                    <p className="text-sm text-gray-600">Door-to-door service</p>
                  </div>
                  <span className="font-medium">₹199</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-[#2b4ba9]">₹{total}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Schedule</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {bookingData.scheduleDate ? format(bookingData.scheduleDate, "PPP") : "Not selected"}
              </p>
              <p>
                <span className="font-medium">Time:</span> {bookingData.timeSlot}
              </p>
              {bookingData.notes && (
                <p>
                  <span className="font-medium">Notes:</span> {bookingData.notes}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Customer Details & Payment */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Customer Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={bookingData.customerDetails.name}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      customerDetails: { ...prev.customerDetails, name: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number *</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={bookingData.customerDetails.phone}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      customerDetails: { ...prev.customerDetails, phone: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={bookingData.customerDetails.email}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      customerDetails: { ...prev.customerDetails, email: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerAddress">Address</Label>
                <Textarea
                  id="customerAddress"
                  value={bookingData.customerDetails.address}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      customerDetails: { ...prev.customerDetails, address: e.target.value },
                    }))
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <RadioGroup
              value={bookingData.paymentMethod}
              onValueChange={(value) => setBookingData((prev) => ({ ...prev, paymentMethod: value }))}
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
              onClick={() => {
                console.log("Booking submitted:", bookingData)
                window.location.href = "/garage-services/booking-success"
              }}
              disabled={!bookingData.paymentMethod}
              size="lg"
            >
              Complete Booking - ₹{total}
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  )
}


