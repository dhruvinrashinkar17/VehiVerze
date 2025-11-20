"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"
import { Label } from "@vehiverze/ui/label"
import { Badge } from "@vehiverze/ui/badge"
import { ArrowLeft, CreditCard, Wallet, Building, CheckCircle, Calendar, User } from "lucide-react"
import { format } from "date-fns"

interface VehicleDetails {
  type: string
  brand: string
  model: string
  registrationNumber: string
}

interface ServiceItem {
  id: string
  name: string
  price: number
  duration: string
}

interface BookingDetails {
  scheduleDate: Date
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

export default function CheckoutClient() {
  const router = useRouter()
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails | null>(null)
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([])
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Get all data from localStorage
    const storedVehicle = localStorage.getItem("vehicleDetails")
    const storedServices = localStorage.getItem("selectedServices")
    const storedBooking = localStorage.getItem("bookingDetails")

    if (storedVehicle && storedServices && storedBooking) {
      setVehicleDetails(JSON.parse(storedVehicle))
      setSelectedServices(JSON.parse(storedServices))
      const booking = JSON.parse(storedBooking)
      setBookingDetails({
        ...booking,
        scheduleDate: new Date(booking.scheduleDate),
      })
    } else {
      // Redirect back if missing data
      router.push("/garage-services/vehicle-selection")
    }
  }, [router])

  const selectedTotal = selectedServices.reduce((sum, service) => sum + service.price, 0)
  const pickupDropFee = bookingDetails?.pickupDrop ? 199 : 0
  const totalAmount = selectedTotal + pickupDropFee

  const handlePayment = async () => {
    if (!paymentMethod) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Store final booking data
      const finalBooking = {
        vehicleDetails,
        selectedServices,
        bookingDetails,
        paymentMethod,
        totalAmount,
        bookingId: `GS${Date.now()}`,
        status: "confirmed",
      }

      localStorage.setItem("finalBooking", JSON.stringify(finalBooking))

      // Clear temporary data
      localStorage.removeItem("vehicleDetails")
      localStorage.removeItem("selectedServices")
      localStorage.removeItem("bookingDetails")

      router.push("/garage-services/booking-success")
    }, 2000)
  }

  const handleBack = () => {
    router.push("/garage-services/booking-details")
  }

  if (!vehicleDetails || !selectedServices.length || !bookingDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          </div>
          <p className="text-lg text-gray-600">Review your booking and complete payment</p>
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
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Booking Details</span>
            </div>
            <div className="w-8 h-px bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Checkout</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Booking Summary</CardTitle>
                <CardDescription className="text-green-100">Review your service booking details</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Vehicle & Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Customer Details
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Name:</span> {bookingDetails.customerDetails.name}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Phone:</span> {bookingDetails.customerDetails.phone}
                        </p>
                        {bookingDetails.customerDetails.email && (
                          <p className="text-sm">
                            <span className="font-medium">Email:</span> {bookingDetails.customerDetails.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule
                      </h4>
                      <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Date:</span> {format(bookingDetails.scheduleDate, "PPP")}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Time:</span> {bookingDetails.timeSlot}
                        </p>
                        {bookingDetails.pickupDrop && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">Pickup & Drop Included</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">Vehicle Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Vehicle:</span> {vehicleDetails.brand} {vehicleDetails.model} (
                        {vehicleDetails.type})
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Registration:</span> {vehicleDetails.registrationNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-blue-800 text-white rounded-t-lg">
                <CardTitle className="text-xl">Payment Method</CardTitle>
                <CardDescription className="text-blue-100">Choose your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-gray-500">Pay securely with your card</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">UPI Payment</p>
                          <p className="text-sm text-gray-500">Pay using UPI apps like GPay, PhonePe</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Net Banking</p>
                          <p className="text-sm text-gray-500">Pay directly from your bank account</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium">Pay at Service Center</p>
                          <p className="text-sm text-gray-500">Pay cash or card at the service center</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Services */}
                    <div className="space-y-3">
                      {selectedServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                          <div>
                            <p className="font-medium text-sm">{service.name}</p>
                            <p className="text-xs text-gray-500">{service.duration}</p>
                          </div>
                          <span className="font-semibold">₹{service.price}</span>
                        </div>
                      ))}

                      {bookingDetails.pickupDrop && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-sm">Pickup & Drop Service</p>
                            <p className="text-xs text-gray-500">Door-to-door service</p>
                          </div>
                          <span className="font-semibold">₹199</span>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Services Total:</span>
                        <span className="font-medium">₹{selectedTotal}</span>
                      </div>
                      {bookingDetails.pickupDrop && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Pickup & Drop:</span>
                          <span className="font-medium">₹199</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Taxes & Fees:</span>
                        <span className="font-medium">₹0</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold text-green-600 pt-2 border-t">
                        <span>Total Amount:</span>
                        <span>₹{totalAmount}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">Secure Payment</span>
                      </div>
                      <p className="text-xs text-green-700 mt-1">Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={handleBack} className="px-6 py-3 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Booking Details
          </Button>

          <Button
            onClick={handlePayment}
            disabled={!paymentMethod || isProcessing}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium"
          >
            {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
            {!isProcessing && <CheckCircle className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}


