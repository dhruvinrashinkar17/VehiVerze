"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Textarea } from "@vehiverze/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"
import { Separator } from "@vehiverze/ui/separator"
import { Checkbox } from "@vehiverze/ui/checkbox"
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Check,
  Shield,
  Info,
  Loader2,
} from "lucide-react"
import { CelebrationAnimation } from "@/components/celebration-animation"
import { GarageServicesBreadcrumb } from "@/components/garage-services-breadcrumb"
import { format } from "date-fns"
import { toast } from "sonner"

export function GarageServicesCheckout() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [showCelebration, setShowCelebration] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [bookingData, setBookingData] = useState<any>(null)
  const [vehicleData, setVehicleData] = useState<any>(null)
  const [servicesData, setServicesData] = useState<any[]>([])

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleNumber: "",
  })

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    saveAddress: false,
  })

  useEffect(() => {
    const storedBooking = localStorage.getItem("bookingDetails")
    const storedVehicle = localStorage.getItem("vehicleDetails")
    const storedServices = localStorage.getItem("selectedServices")

    if (storedBooking) {
      const parsed = JSON.parse(storedBooking)
      setBookingData(parsed)
      setPersonalInfo({
        firstName: parsed.customerDetails.name.split(" ")[0] || "",
        lastName: parsed.customerDetails.name.split(" ").slice(1).join(" ") || "",
        email: parsed.customerDetails.email || "",
        phone: parsed.customerDetails.phone || "",
        vehicleNumber: "",
      })
      setDeliveryInfo({
        address: parsed.customerDetails.address || "",
        city: "",
        pincode: "",
        landmark: "",
        saveAddress: false,
      })
    }

    if (storedVehicle) setVehicleData(JSON.parse(storedVehicle))
    if (storedServices) setServicesData(JSON.parse(storedServices))
  }, [])

  const handleNextStep = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      await handleSubmitBooking()
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/garage-services/flow")
    }
  }

  const handleSubmitBooking = async () => {
    if (!bookingData || !vehicleData || !personalInfo.phone) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/garage/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleType: vehicleData.type,
          brand: vehicleData.brand,
          model: vehicleData.model,
          year: vehicleData.year,
          variant: vehicleData.variant,
          transmission: vehicleData.transmission,
          registrationNumber: vehicleData.registrationNumber,
          selectedServices: servicesData.map((s) => ({ id: s.id, name: s.name, price: s.price })),
          bookingDate: bookingData.scheduleDate,
          timeSlot: bookingData.timeSlot,
          pickupDrop: bookingData.pickupDrop,
          additionalNotes: bookingData.notes,
          customerName: `${personalInfo.firstName} ${personalInfo.lastName}`.trim(),
          mobile: personalInfo.phone,
          email: personalInfo.email,
          address: deliveryInfo.address,
          paymentMethod,
          totalAmount: calculateTotal(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Booking confirmed successfully!")
        setShowCelebration(true)

        localStorage.removeItem("bookingDetails")
        localStorage.removeItem("vehicleDetails")
        localStorage.removeItem("selectedServices")

        setTimeout(() => {
          router.push(`/garage-services/booking-success?bookingId=${result.data.bookingId}`)
        }, 3000)
      } else {
        toast.error(result.error || "Failed to create booking")
      }
    } catch (error) {
      console.error("Booking error:", error)
      toast.error("Error creating booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateTotal = () => {
    const servicesTotal = servicesData.reduce((sum, service) => sum + service.price, 0)
    const pickupDropFee = bookingData?.pickupDrop ? 199 : 0
    return servicesTotal + pickupDropFee
  }

  const isPersonalInfoValid = () => {
    return personalInfo.firstName && personalInfo.lastName && personalInfo.phone
  }

  const isDeliveryInfoValid = () => {
    return deliveryInfo.address && deliveryInfo.city && deliveryInfo.pincode
  }

  if (!bookingData || !vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Loading checkout details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showCelebration && <CelebrationAnimation />}

      {/* Header with Steps */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevStep}
              className="text-white hover:bg-blue-700 rounded-full mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Checkout</h1>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-white text-blue-600" : "bg-blue-700 text-blue-300"
                }`}
              >
                <Check className={`h-5 w-5 ${step > 1 ? "opacity-100" : "opacity-0"}`} />
                {step <= 1 && <span>1</span>}
              </div>
              <span className="mt-2 text-sm">Personal Info</span>
            </div>

            <div className="w-full max-w-[80px] flex items-center justify-center">
              <div className={`h-1 w-full ${step >= 2 ? "bg-white" : "bg-blue-700"}`}></div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-white text-blue-600" : "bg-blue-700 text-blue-300"
                }`}
              >
                <Check className={`h-5 w-5 ${step > 2 ? "opacity-100" : "opacity-0"}`} />
                {step <= 2 && <span>2</span>}
              </div>
              <span className="mt-2 text-sm">Delivery</span>
            </div>

            <div className="w-full max-w-[80px] flex items-center justify-center">
              <div className={`h-1 w-full ${step >= 3 ? "bg-white" : "bg-blue-700"}`}></div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-white text-blue-600" : "bg-blue-700 text-blue-300"
                }`}
              >
                <span>3</span>
              </div>
              <span className="mt-2 text-sm">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <GarageServicesBreadcrumb
            items={[
              { name: "Garage Services", url: "/garage-services" },
              { name: "Book Service", url: "/garage-services/flow" },
              { name: "Checkout", url: "/garage-services/checkout" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Personal Information</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name *</Label>
                      <Input
                        id="first-name"
                        placeholder="Enter your first name"
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name *</Label>
                      <Input
                        id="last-name"
                        placeholder="Enter your last name"
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="vehicle-number">Vehicle Registration Number</Label>
                    <Input
                      id="vehicle-number"
                      placeholder="Enter your vehicle number"
                      value={vehicleData.registrationNumber}
                      disabled
                    />
                  </div>
                </div>

                <Button
                  className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleNextStep}
                  disabled={!isPersonalInfoValid()}
                >
                  Continue to Delivery
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Delivery Information */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Delivery Information</h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full address"
                      className="resize-none"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        placeholder="Enter pincode"
                        value={deliveryInfo.pincode}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, pincode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="landmark">Landmark (Optional)</Label>
                    <Input
                      id="landmark"
                      placeholder="Enter a nearby landmark"
                      value={deliveryInfo.landmark}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, landmark: e.target.value })}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="save-address"
                      checked={deliveryInfo.saveAddress}
                      onCheckedChange={(checked) =>
                        setDeliveryInfo({ ...deliveryInfo, saveAddress: checked as boolean })
                      }
                    />
                    <label htmlFor="save-address" className="text-sm font-medium cursor-pointer">
                      Save this address for future bookings
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    onClick={handleNextStep}
                    disabled={!isDeliveryInfoValid()}
                  >
                    Continue to Payment
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer ${
                      paymentMethod === "credit-card" ? "border-blue-600 bg-blue-50" : "border-gray-200"
                    } hover:border-blue-300`}
                  >
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                      Credit / Debit Card
                    </Label>
                  </div>

                  <div
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer ${
                      paymentMethod === "upi" ? "border-blue-600 bg-blue-50" : "border-gray-200"
                    } hover:border-blue-300`}
                  >
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center cursor-pointer flex-1">
                      <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                      UPI Payment
                    </Label>
                  </div>

                  <div
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer ${
                      paymentMethod === "cash" ? "border-blue-600 bg-blue-50" : "border-gray-200"
                    } hover:border-blue-300`}
                  >
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center cursor-pointer flex-1">
                      <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                      Pay at Service
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
                  <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    By proceeding with the payment, you agree to our terms and conditions. Your service will be
                    scheduled as per your selected date and time slot.
                  </p>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" onClick={handlePrevStep} disabled={isLoading}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    onClick={handleNextStep}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <Check className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Booking Summary</h2>

              <div className="flex items-start mb-4">
                <Car className="h-10 w-10 text-gray-700 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">
                    {vehicleData.brand} {vehicleData.model}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {vehicleData.type} • {vehicleData.transmission}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                {servicesData.map((service) => (
                  <div key={service.id} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{service.name}</h4>
                      <p className="text-sm text-gray-500">₹{service.price}</p>
                    </div>
                  </div>
                ))}

                {bookingData.scheduleDate && (
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Calendar className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">
                        {format(new Date(bookingData.scheduleDate), "EEE, MMM dd, yyyy")}
                      </h4>
                      <p className="text-sm text-gray-500">Service date</p>
                    </div>
                  </div>
                )}

                {bookingData.timeSlot && (
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Clock className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{bookingData.timeSlot}</h4>
                      <p className="text-sm text-gray-500">Service time slot</p>
                    </div>
                  </div>
                )}

                {bookingData.pickupDrop && (
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <MapPin className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Doorstep Pickup & Drop</h4>
                      <p className="text-sm text-gray-500">Service type</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Services Total</span>
                  <span className="font-medium">₹{servicesData.reduce((sum, s) => sum + s.price, 0)}</span>
                </div>
                {bookingData.pickupDrop && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Pickup & Drop</span>
                    <span className="text-green-600 font-medium">₹199</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{calculateTotal()}</span>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                <Shield className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Service Warranty</p>
                  <p className="text-xs text-green-700 mt-1">
                    1000 Kms or 1 Month warranty on all services and repairs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


