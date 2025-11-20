"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Textarea } from "@vehiverze/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { NavBar } from "@/components/navbar" // Import the NavBar component

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Message sent successfully! We'll get back to you within 24 hours.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar /> {/* Add the NavBar component here */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions? We're here to help you with all your vehicle needs
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  We're here to assist you with buying, selling, or servicing your vehicle. Reach out to us through any
                  of the channels below.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="border-l-4 border-l-blue-600">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Phone Support</p>
                        <p className="text-gray-600">+91 9876543210</p>
                        <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 7 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-600">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Email Support</p>
                        <p className="text-gray-600">support@vehiverze.com</p>
                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-600">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Live Chat</p>
                        <p className="text-gray-600">Available on website</p>
                        <p className="text-sm text-gray-500">Instant responses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-600">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Office Address</p>
                        <p className="text-gray-600">123 Business District</p>
                        <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Business Hours */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-gray-700 font-medium">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy a Vehicle</SelectItem>
                          <SelectItem value="sell">Sell a Vehicle</SelectItem>
                          <SelectItem value="garage">Garage Services</SelectItem>
                          <SelectItem value="insurance">Insurance Services</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-700 font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief subject of your message"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your inquiry in detail..."
                      required
                      rows={6}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly do you respond to inquiries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We typically respond to email inquiries within 24 hours during business days. For urgent matters,
                  please call our support line for immediate assistance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What services do you offer?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer vehicle buying, selling, garage services, insurance, and comprehensive vehicle-related
                  solutions. Visit our services page for detailed information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide vehicle inspection services?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we provide professional vehicle inspection services for both buyers and sellers. Our certified
                  inspectors ensure thorough evaluation of vehicle condition.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I track my service request?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You can track your service requests through our customer portal or by contacting our support team with
                  your service reference number.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


