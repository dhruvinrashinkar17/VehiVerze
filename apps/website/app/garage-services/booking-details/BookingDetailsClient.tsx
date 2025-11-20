"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Textarea } from "@vehiverze/ui/textarea"
import { Checkbox } from "@vehiverze/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"
import { Calendar } from "@vehiverze/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@vehiverze/ui/popover"
import { Badge } from "@vehiverze/ui/badge"
import { ArrowLeft, ArrowRight, CalendarIcon, Clock, MapPin, Phone, User, Mail, Home, Truck } from "lucide-react"
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

interface BookingDetails {
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
}

const timeSlots = ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"]

export default function BookingDetailsClient() {
  const router = useRouter()
  const { selectedCity } = useCityStore()
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails | null>(null)
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([])
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
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
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  useEffect(() => {
    // Get data from localStorage
    const storedVehicle = localStorage.getItem("vehicleDetails")
    const storedServices = localStorage.getItem("selectedServices")

    if (storedVehicle && storedServices) {
      setVehicleDetails(JSON.parse(storedVehicle))
      setSelectedServices(JSON.parse(storedServices))
    } else {
      // Redirect back if no data
      router.push("/garage-services/vehicle-selection")
    }
  }, [router])

  const updateBookingDetails = (field: keyof BookingDetails, value: any) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateCustomerDetails = (field: keyof BookingDetails["customerDetails"], value: string) => {
    setBookingDetails((prev) => ({
      ...prev,
      customerDetails: {
        ...prev.customerDetails,
        [field]: value,
      },
    }))
  }

  const selectedTotal = selectedServices.reduce((sum, service) => sum + service.price, 0)
  const pickupDropFee = bookingDetails.pickupDrop ? 199 : 0
  const totalAmount = selectedTotal + pickupDropFee

  const canProceed = () => {
    return (
      bookingDetails.scheduleDate &&
      bookingDetails.timeSlot &&
      bookingDetails.customerDetails.name &&
      bookingDetails.customerDetails.phone
    )
  }

  const handleNext = () => {
    if (canProceed()) {
      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))
      router.push("/garage-services/checkout")
    }
  }

  const handleBack = () => {
    router.push("/garage-services/service-selection")
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const selectedDate = new Date(date)
      selectedDate.setHours(0, 0, 0, 0)
      updateBookingDetails("scheduleDate", selectedDate)
      setIsCalendarOpen(false)
      console.log("[v0] Date selected:", selectedDate)
    }
  }

  if (!vehicleDetails || selectedServices.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-700" />
            <h1 className="text-4xl font-bold text-gray-900">Schedule Your Service</h1>
          </div>
          <p className="text-lg text-gray-600">Choose your preferred date and time for service</p>
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
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Service Selection</span>
            </div>
            <div className="w-8 h-px bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#1D4ED8] text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-[#1D4ED8]">Schedule & Details</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule Section */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-blue-800 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Select Service Date & Time
                </CardTitle>
                <CardDescription className="text-blue-100">Choose your preferred date and time slot</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium text-gray-900">Select Date *</Label>
                      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-2 h-12 border-2 transition-all",
                              !bookingDetails.scheduleDate &&
                                "text-gray-500 border-gray-300 hover:border-[#1D4ED8] hover:bg-blue-50",
                              bookingDetails.scheduleDate &&
                                "text-gray-900 border-[#1D4ED8] bg-blue-50 hover:bg-blue-100",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-5 w-5 text-[#1D4ED8]" />
                            {bookingDetails.scheduleDate
                              ? format(bookingDetails.scheduleDate, "EEE, MMM dd, yyyy")
                              : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 border-2 border-blue-200 shadow-xl z-[9999]"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={bookingDetails.scheduleDate}
                            onSelect={handleDateSelect}
                            disabled={(date) => {
                              const today = new Date()
                              today.setHours(0, 0, 0, 0)
                              const maxDate = new Date(today)
                              maxDate.setDate(maxDate.getDate() + 14)
                              return date < today || date > maxDate
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-gray-500 mt-2">Available for next 14 days</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium text-gray-900">Select Time Slot *</Label>
                      <RadioGroup
                        value={bookingDetails.timeSlot}
                        onValueChange={(value) => updateBookingDetails("timeSlot", value)}
                        className="mt-2 space-y-2"
                      >
                        {timeSlots.map((slot) => (
                          <div
                            key={slot}
                            className={cn(
                              "flex items-center space-x-3 p-3 border-2 rounded-lg transition-all cursor-pointer",
                              bookingDetails.timeSlot === slot
                                ? "border-[#1D4ED8] bg-blue-50"
                                : "border-gray-200 hover:border-[#1D4ED8] hover:bg-blue-50",
                            )}
                          >
                            <RadioGroupItem value={slot} id={slot} />
                            <Label htmlFor={slot} className="cursor-pointer flex-1 flex items-center justify-between">
                              <span className="text-gray-900 font-medium">{slot}</span>
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "text-xs border-0",
                                  bookingDetails.timeSlot === slot
                                    ? "bg-[#1D4ED8] text-white"
                                    : "bg-green-100 text-green-700",
                                )}
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                Available
                              </Badge>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Checkbox
                      id="pickupDrop"
                      checked={bookingDetails.pickupDrop}
                      onCheckedChange={(checked) => updateBookingDetails("pickupDrop", checked)}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="pickupDrop"
                        className="cursor-pointer font-medium flex items-center gap-2 text-gray-900"
                      >
                        <Truck className="h-4 w-4 text-[#1D4ED8]" />
                        Pickup & Drop Service (+₹199)
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        We'll pick up your vehicle from your location and deliver it back after service
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="notes" className="text-base font-medium text-gray-900">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements, issues with your vehicle, or special instructions..."
                    value={bookingDetails.notes}
                    onChange={(e) => updateBookingDetails("notes", e.target.value)}
                    rows={4}
                    className="mt-2 border-2 border-gray-200 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customer Details Section */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-blue-700 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Provide your contact details for service updates
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="customerName"
                      className="text-base font-medium text-gray-900 flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="customerName"
                      placeholder="Enter your full name"
                      value={bookingDetails.customerDetails.name}
                      onChange={(e) => updateCustomerDetails("name", e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="customerPhone"
                      className="text-base font-medium text-gray-900 flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={bookingDetails.customerDetails.phone}
                      onChange={(e) => updateCustomerDetails("phone", e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="customerEmail"
                      className="text-base font-medium text-gray-900 flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="Enter your email address"
                      value={bookingDetails.customerDetails.email}
                      onChange={(e) => updateCustomerDetails("email", e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="customerAddress"
                      className="text-base font-medium text-gray-900 flex items-center gap-2"
                    >
                      <Home className="h-4 w-4" />
                      Address
                    </Label>
                    <Textarea
                      id="customerAddress"
                      placeholder="Enter your complete address"
                      value={bookingDetails.customerDetails.address}
                      onChange={(e) => updateCustomerDetails("address", e.target.value)}
                      rows={3}
                      className="border-2 border-gray-200 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-[#1D4ED8] text-sm font-medium mb-2">
                    <MapPin className="h-4 w-4" />
                    Service Location: {selectedCity}
                  </div>
                  <p className="text-xs text-[#1D4ED8]">
                    Service will be provided at our authorized service center in {selectedCity}.
                    {bookingDetails.pickupDrop && " Pickup and drop service is included."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-blue-800 text-white rounded-t-lg">
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800">Vehicle Details</h4>
                      <div className="p-4 rounded-lg space-y-2 bg-blue-50 border border-blue-200">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Vehicle:</span> {vehicleDetails.brand} {vehicleDetails.model}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Type:</span> {vehicleDetails.type}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Registration:</span> {vehicleDetails.registrationNumber}
                        </p>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800">Selected Services</h4>
                      <div className="space-y-3">
                        {selectedServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex justify-between items-center py-2 border-b border-gray-200"
                          >
                            <div>
                              <p className="font-medium text-sm text-gray-900">{service.name}</p>
                              <p className="text-xs text-gray-500">{service.duration}</p>
                            </div>
                            <span className="font-semibold text-gray-900">₹{service.price}</span>
                          </div>
                        ))}

                        {bookingDetails.pickupDrop && (
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div>
                              <p className="font-medium text-sm text-gray-900">Pickup & Drop Service</p>
                              <p className="text-xs text-gray-500">Door-to-door service</p>
                            </div>
                            <span className="font-semibold text-gray-900">₹199</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Schedule Info */}
                    {(bookingDetails.scheduleDate || bookingDetails.timeSlot) && (
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-800">Schedule</h4>
                        <div className="bg-blue-50 p-4 rounded-lg space-y-2 border border-blue-200">
                          {bookingDetails.scheduleDate && (
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">Date:</span>{" "}
                              {format(bookingDetails.scheduleDate, "EEE, MMM dd, yyyy")}
                            </p>
                          )}
                          {bookingDetails.timeSlot && (
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">Time:</span> {bookingDetails.timeSlot}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Services Total:</span>
                        <span className="font-medium text-gray-900">₹{selectedTotal}</span>
                      </div>
                      {bookingDetails.pickupDrop && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Pickup & Drop:</span>
                          <span className="font-medium text-gray-900">₹199</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-lg font-bold text-[#1D4ED8] pt-2 border-t">
                        <span>Total Amount:</span>
                        <span>₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="px-6 py-3 bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-8 py-3 bg-[#1D4ED8] hover:bg-blue-800 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Proceed to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


