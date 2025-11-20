"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import {
  CheckCircle,
  Calendar,
  User,
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  Home,
  Loader2,
  Download,
  ArrowRight,
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { CelebrationEffect } from "@/components/celebration-effect"
import Link from "next/link"

interface BookingData {
  id: string
  bookingId: string
  customerName: string
  mobile: string
  email: string
  brand: string
  model: string
  vehicleType: string
  registrationNumber: string
  bookingDate: string
  timeSlot: string
  pickupDrop: boolean
  selectedServices: Array<{
    id: string
    name: string
    price: number
  }>
  totalAmount: number
  paymentMethod: string
  status: string
  address: string
}

export default function BookingSuccessClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bookingId = searchParams.get("bookingId")

    if (!bookingId) {
      router.push("/")
      return
    }

    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/garage/bookings?bookingId=${bookingId}`)
        const data = await response.json()

        if (data.success && data.data && data.data.length > 0) {
          setBooking(data.data[0])
        } else {
          toast.error("Booking not found")
          router.push("/")
        }
      } catch (error) {
        console.error("Error fetching booking:", error)
        toast.error("Failed to load booking details")
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Booking details not found</p>
        </div>
      </div>
    )
  }

  const pickupDropFee = booking.pickupDrop ? 199 : 0
  const servicesTotal = booking.selectedServices.reduce((sum, s) => sum + (s.price || 0), 0)

  return (
    <div className="min-h-screen bg-white">
      <CelebrationEffect duration={5000} particleCount={100} />

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-blue-100 mb-6">Your vehicle service has been successfully booked with us</p>
            <div className="inline-block bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white border-opacity-20">
              <div className="text-sm text-blue-100 mb-1">Booking ID</div>
              <div className="text-2xl font-bold font-mono">{booking.bookingId}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Booking Details Grid */}
        <div className="space-y-6">
          {/* Customer & Schedule Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-t-lg pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-semibold text-gray-900">{booking.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">{booking.mobile}</p>
                    </div>
                  </div>
                  {booking.email && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-semibold text-gray-900">{booking.email}</p>
                      </div>
                    </div>
                  )}
                  {booking.address && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Home className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-semibold text-gray-900 text-sm">{booking.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Service Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-semibold text-gray-900">
                        {format(new Date(booking.bookingDate), "EEEE, MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time Slot</p>
                      <p className="font-semibold text-gray-900">{booking.timeSlot}</p>
                    </div>
                  </div>
                  {booking.pickupDrop && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Badge className="bg-blue-100 text-blue-800 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        Pickup & Drop Included
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle Details */}
          <Card className="shadow-md border-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Vehicle</p>
                    <p className="font-semibold text-gray-900">
                      {booking.brand} {booking.model}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Type</p>
                    <p className="font-semibold text-gray-900">{booking.vehicleType}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Registration</p>
                    <p className="font-semibold text-gray-900 font-mono">{booking.registrationNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services & Payment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg pb-4">
                <CardTitle className="text-lg">Selected Services</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {booking.selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between items-center py-3 px-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm text-gray-900">{service.name}</p>
                      <span className="font-semibold text-blue-600">₹{service.price}</span>
                    </div>
                  ))}
                  {booking.pickupDrop && (
                    <div className="flex justify-between items-center py-3 px-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm text-gray-900">Pickup & Drop Service</p>
                      <span className="font-semibold text-blue-600">₹199</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg pb-4">
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Services Total:</span>
                    <span className="font-medium text-gray-900">₹{servicesTotal}</span>
                  </div>
                  {booking.pickupDrop && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pickup & Drop:</span>
                      <span className="font-medium text-gray-900">₹{pickupDropFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3 border-t-2 border-gray-200">
                    <span className="text-sm text-gray-600">Payment Method:</span>
                    <span className="font-medium text-gray-900 capitalize">{booking.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-blue-600 pt-2">
                    <span>Total Amount:</span>
                    <span>₹{booking.totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="shadow-md border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-6">What Happens Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Confirmation Call</h4>
                  <p className="text-sm text-blue-700">
                    Our team will call you 1 day before your scheduled service to confirm the appointment.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Service Day</h4>
                  <p className="text-sm text-blue-700">
                    {booking.pickupDrop
                      ? "We'll pick up your vehicle at the scheduled time."
                      : "Bring your vehicle to our service center at the scheduled time."}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Service Complete</h4>
                  <p className="text-sm text-blue-700">
                    You'll receive updates during service and notification when your vehicle is ready.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.print()}
              className="px-8 py-3 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Print Booking Details
            </Button>
            <Link href="/garage-services/flow" className="flex-1 sm:flex-none">
              <Button className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium">
                Book Another Service
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 font-medium"
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


