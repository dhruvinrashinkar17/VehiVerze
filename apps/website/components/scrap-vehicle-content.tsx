"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Textarea } from "@vehiverze/ui/textarea"
import { useRouter } from "next/navigation"
import { Check, Recycle, DollarSign, Truck, Phone, Mail, MapPin } from "lucide-react"
import { CelebrationAnimation } from "@/components/celebration-animation"

export function ScrapVehicleContent() {
  const [vehicleType, setVehicleType] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    setShowCelebration(true)
  }

  return (
    <>
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6 text-black">Scrap Your Vehicle for Maximum Value</h1>
              <p className="text-lg text-gray-700 mb-8">
                Get the best price for your end-of-life vehicle with our eco-friendly scrapping service. We handle all
                the paperwork and ensure proper disposal.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Best Market Rates</h3>
                    <p className="text-gray-600">Get up to 30% more than local scrap dealers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Free Pickup</h3>
                    <p className="text-gray-600">We'll collect your vehicle from your location</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Hassle-free Documentation</h3>
                    <p className="text-gray-600">We handle all the paperwork including RC cancellation</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-black mb-4">Contact Us Directly</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Call us at</p>
                      <p className="text-black font-medium">+91 9876543210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Email us at</p>
                      <p className="text-black font-medium">scrap@vehiverze.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Visit us at</p>
                      <p className="text-black font-medium">123 Vehiverze Plaza, Mumbai - 400001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-black">Get an Instant Quote</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="vehicle-type">Vehicle Type</Label>
                    <Select onValueChange={setVehicleType} required>
                      <SelectTrigger id="vehicle-type">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-wheeler">2 Wheeler</SelectItem>
                        <SelectItem value="3-wheeler">3 Wheeler</SelectItem>
                        <SelectItem value="4-wheeler">4 Wheeler</SelectItem>
                        <SelectItem value="6-wheeler">6 Wheeler</SelectItem>
                        <SelectItem value="8-wheeler">8 Wheeler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" placeholder="Enter vehicle brand" required />
                  </div>

                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="Enter vehicle model" required />
                  </div>

                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" placeholder="Enter vehicle year" required />
                  </div>

                  <div>
                    <Label htmlFor="condition">Vehicle Condition</Label>
                    <Textarea id="condition" placeholder="Describe the current condition of your vehicle" required />
                  </div>

                  <div>
                    <Label htmlFor="location">Pickup Location</Label>
                    <Input id="location" placeholder="Enter vehicle pickup location" required />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" required />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" className="rounded text-blue-600" required />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Get Scrap Quote
                  </Button>

                  <p className="text-sm text-center text-gray-500 mt-4">
                    Our team will contact you with a quote based on your vehicle's condition and current market rates
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">1. Request Quote</h3>
              <p className="text-gray-600">Fill the form with your vehicle details to get an instant quote</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">2. Accept Offer</h3>
              <p className="text-gray-600">Review and accept our competitive offer for your vehicle</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">3. Free Pickup</h3>
              <p className="text-gray-600">We'll collect your vehicle from your location at your convenience</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">4. Get Paid</h3>
              <p className="text-gray-600">Receive instant payment through your preferred payment method</p>
            </div>
          </div>
        </div>
      </section>

      {/* GIF Banner Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/images/design-mode/image.png"
              alt="Scrap your vehicle"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
              <div className="max-w-lg ml-12">
                <h2 className="text-3xl font-bold text-white mb-4">Eco-Friendly Vehicle Disposal</h2>
                <p className="text-white text-lg mb-6">
                  We recycle over 90% of vehicle components, reducing environmental impact while maximizing your
                  returns.
                </p>
                <Button className="bg-green-500 hover:bg-green-600 text-white">Learn More About Our Process</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black">What documents do I need to scrap my vehicle?</h3>
              <p className="text-gray-600">
                You'll need your vehicle's Registration Certificate (RC), insurance documents, and a valid ID proof.
                We'll guide you through the entire process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black">How is the scrap value determined?</h3>
              <p className="text-gray-600">
                The scrap value depends on factors like the vehicle's weight, age, condition, and current market rates
                for recyclable materials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black">Do you provide RC cancellation certificate?</h3>
              <p className="text-gray-600">
                Yes, we provide an RC cancellation certificate which is important proof that your vehicle has been
                properly scrapped.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black">Is the scrapping process eco-friendly?</h3>
              <p className="text-gray-600">
                Absolutely. We follow all environmental guidelines to ensure proper recycling and disposal of all
                vehicle components.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black">How long does the entire process take?</h3>
              <p className="text-gray-600">
                The entire process typically takes 2-3 business days from quote acceptance to payment completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Celebration Animation */}
      <CelebrationAnimation
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        title="Quote Request Submitted!"
        message="We've received your scrap vehicle details. Our team will contact you shortly with the best offer."
        actionText="Track Your Request"
        actionLink="/dashboard"
      />
    </>
  )
}


