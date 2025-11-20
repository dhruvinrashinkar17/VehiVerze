"use client"

import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import {
  CheckCircle,
  Download,
  MapPin,
  Phone,
  Clock,
  Calendar,
  Car,
  ArrowRight,
  Star,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { useCityStore } from "@/lib/city-store"

export function GarageBookingSuccess() {
  const { selectedCity } = useCityStore()

  // Mock booking data - in real app, this would come from URL params or API
  const bookingData = {
    bookingId: "GS" + Math.random().toString(36).substr(2, 8).toUpperCase(),
    vehicleDetails: {
      type: "4-Wheeler",
      brand: "Maruti",
      model: "Swift",
      registrationNumber: "DL01AB1234",
    },
    services: [
      { name: "Periodic Service", price: 1599 },
      { name: "AC Service", price: 899 },
    ],
    scheduleDate: "Tomorrow, Dec 28, 2024",
    timeSlot: "9:00 AM - 11:00 AM",
    pickupDrop: true,
    total: 2697,
    garagePartner: {
      name: "AutoCare Service Center",
      address: "123 Service Road, Sector 15, " + selectedCity,
      phone: "+91 98765 43210",
      rating: 4.8,
      experience: "15+ years",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your garage service has been successfully booked</p>
          <div className="mt-4">
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">Booking ID: {bookingData.bookingId}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Vehicle Details</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
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
                  <h4 className="font-medium mb-2">Services Booked</h4>
                  <div className="space-y-2">
                    {bookingData.services.map((service, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b">
                        <span>{service.name}</span>
                        <span className="font-medium">₹{service.price}</span>
                      </div>
                    ))}
                    {bookingData.pickupDrop && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Pickup & Drop Service</span>
                        <span className="font-medium">₹199</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 font-bold text-lg">
                      <span>Total Amount:</span>
                      <span className="text-green-600">₹{bookingData.total}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Schedule</h4>
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{bookingData.scheduleDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{bookingData.timeSlot}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Confirmation Call</h4>
                      <p className="text-sm text-gray-600">
                        Our partner garage will call you within 30 minutes to confirm the appointment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Vehicle Pickup</h4>
                      <p className="text-sm text-gray-600">Free pickup from your location at the scheduled time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Service Completion</h4>
                      <p className="text-sm text-gray-600">
                        Professional service with real-time updates and quality checks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-green-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Vehicle Delivery</h4>
                      <p className="text-sm text-gray-600">Your serviced vehicle delivered back to your location</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Garage Partner Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Assigned Garage Partner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{bookingData.garagePartner.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium ml-1">{bookingData.garagePartner.rating}</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{bookingData.garagePartner.experience}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{bookingData.garagePartner.address}</p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Garage
                  </Button>
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-sm text-gray-600 mb-1">Phone: {bookingData.garagePartner.phone}</p>
                  <p className="text-sm text-gray-600">Available: 9:00 AM - 7:00 PM</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Your Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Car className="h-4 w-4 mr-2" />
                  Track Service Status
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Reschedule Booking
                </Button>
                <Button className="w-full" variant="destructive">
                  Cancel Booking
                </Button>
                <div className="text-xs text-gray-500 text-center mt-2">
                  * Free cancellation up to 2 hours before scheduled time
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle>Need More Services?</CardTitle>
                <CardDescription>Book additional services for your other vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/garage-services/flow">
                    <Button className="w-full bg-transparent" variant="outline">
                      Book Another Service
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/garage-services">
                    <Button className="w-full bg-transparent" variant="outline">
                      Explore All Services
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Section */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">Our customer support team is available 24/7 to assist you</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call Support: 1800-123-4567
              </Button>
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


