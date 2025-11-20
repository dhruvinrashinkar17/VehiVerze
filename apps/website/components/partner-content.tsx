"use client"

import type React from "react"

import { useState } from "react"
import { Building, Users, TrendingUp, Globe, Shield, CheckCircle, Wrench, MapPin } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Textarea } from "@vehiverze/ui/textarea"
import { Label } from "@vehiverze/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@vehiverze/ui/accordion"

export function PartnerContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    businessAddress: "",
    businessType: "",
    yearsInBusiness: "",
    partnershipType: "",
    partnershipGoals: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData)
    alert("Thank you for your interest in partnering with Vehiverze! We'll contact you shortly.")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Grow Your Business with Vehiverze</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join India's fastest-growing automotive marketplace and unlock new opportunities for your business
        </p>
      </div>

      {/* Why Partner With Us */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Partner With Vehiverze?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Reach Millions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with our vast user base of over 10 million monthly active users looking for automotive
                solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Grow Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our partners report an average of 35% increase in business volume within the first year of partnership.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Trusted Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Join a platform trusted by over 5,000 businesses across India with a 4.8/5 partner satisfaction rating.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Partnership Programs */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Partnership Programs</h2>

        <Tabs defaultValue="dealer" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dealer">Dealer</TabsTrigger>
            <TabsTrigger value="service">Service Center</TabsTrigger>
            <TabsTrigger value="franchise">Franchise</TabsTrigger>
            <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
          </TabsList>

          <TabsContent value="dealer">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Dealer Partnership</h3>
                <p className="text-gray-600 mb-6">
                  Join our network of authorized dealers and expand your reach to millions of potential customers.
                </p>

                <h4 className="font-semibold mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Dedicated listing page on our platform</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Lead generation and management tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Inventory management system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Marketing and promotional support</span>
                  </li>
                </ul>

                <Button className="bg-blue-600 hover:bg-blue-700">Apply as Dealer</Button>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Requirements:</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Building className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Physical Showroom</span>
                      <p className="text-sm text-gray-600">Must have a physical dealership location</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Sales Team</span>
                      <p className="text-sm text-gray-600">Dedicated sales and customer service staff</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Business Registration</span>
                      <p className="text-sm text-gray-600">Valid business license and GST registration</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Sales History</span>
                      <p className="text-sm text-gray-600">Minimum 1 year in vehicle sales business</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="service">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Service Center Partnership</h3>
                <p className="text-gray-600 mb-6">
                  Become an authorized Vehiverze service partner and grow your service business.
                </p>

                <h4 className="font-semibold mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Direct service booking through our platform</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Service management software</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Technical training and support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Spare parts procurement assistance</span>
                  </li>
                </ul>

                <Button className="bg-blue-600 hover:bg-blue-700">Apply as Service Center</Button>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Requirements:</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Building className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Workshop Facility</span>
                      <p className="text-sm text-gray-600">Well-equipped service center with minimum 2 bays</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Wrench className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Qualified Technicians</span>
                      <p className="text-sm text-gray-600">Certified mechanics with relevant experience</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Business Registration</span>
                      <p className="text-sm text-gray-600">Valid business license and GST registration</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Service History</span>
                      <p className="text-sm text-gray-600">Minimum 2 years in vehicle service business</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="franchise">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Franchise Partnership</h3>
                <p className="text-gray-600 mb-6">
                  Open a Vehiverze franchise in your city and be part of our growing network.
                </p>

                <h4 className="font-semibold mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Exclusive territory rights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Complete business setup support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Staff training and operational guidance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Marketing and branding support</span>
                  </li>
                </ul>

                <Button className="bg-blue-600 hover:bg-blue-700">Apply for Franchise</Button>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Requirements:</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Building className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Commercial Space</span>
                      <p className="text-sm text-gray-600">Minimum 2000 sq ft commercial property</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Investment Capacity</span>
                      <p className="text-sm text-gray-600">Minimum investment of ₹50 lakhs</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Business Experience</span>
                      <p className="text-sm text-gray-600">Prior business management experience</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Globe className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Local Market Knowledge</span>
                      <p className="text-sm text-gray-600">Strong understanding of local automotive market</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="affiliate">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Affiliate Partnership</h3>
                <p className="text-gray-600 mb-6">Earn commissions by referring customers to Vehiverze services.</p>

                <h4 className="font-semibold mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Attractive commission structure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Marketing materials and support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Real-time tracking of referrals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Monthly payments and transparent reporting</span>
                  </li>
                </ul>

                <Button className="bg-blue-600 hover:bg-blue-700">Join Affiliate Program</Button>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Who Can Apply:</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Automotive Influencers</span>
                      <p className="text-sm text-gray-600">Social media influencers in the automotive niche</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Globe className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Bloggers & Content Creators</span>
                      <p className="text-sm text-gray-600">Automotive bloggers and YouTube channel owners</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Building className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Related Businesses</span>
                      <p className="text-sm text-gray-600">Auto accessories shops, driving schools, etc.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Individual Referrers</span>
                      <p className="text-sm text-gray-600">Anyone with a network in the automotive sector</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Success Stories */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Partner Success Stories</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <img src="/placeholder.svg?height=80&width=80" alt="Partner Logo" className="rounded-full mx-auto" />
              </div>
              <blockquote className="text-center italic text-gray-600 mb-4">
                "Partnering with Vehiverze has transformed our dealership business. We've seen a 40% increase in leads
                and 25% growth in sales within just 6 months."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold">Rajesh Motors</p>
                <p className="text-sm text-gray-500">Premium Car Dealership, Mumbai</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <img src="/placeholder.svg?height=80&width=80" alt="Partner Logo" className="rounded-full mx-auto" />
              </div>
              <blockquote className="text-center italic text-gray-600 mb-4">
                "As a service center partner, we've been able to streamline our operations and reach new customers. The
                booking system has reduced our administrative work by 60%."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold">QuickFix Auto Services</p>
                <p className="text-sm text-gray-500">Multi-brand Service Center, Bangalore</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <img src="/placeholder.svg?height=80&width=80" alt="Partner Logo" className="rounded-full mx-auto" />
              </div>
              <blockquote className="text-center italic text-gray-600 mb-4">
                "The franchise model is well-structured and provides excellent support. Within a year, we've established
                ourselves as the go-to vehicle marketplace in our city."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold">Vehiverze Pune</p>
                <p className="text-sm text-gray-500">Franchise Partner, Pune</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Partner Map */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partner Network</h2>

        <div className="bg-blue-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Pan-India Presence</h3>
              <p className="text-gray-600 mb-6">
                Join our growing network of over 5,000 partners across 200+ cities in India. We're expanding rapidly and
                looking for quality partners in all regions.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-3xl font-bold text-blue-600">200+</p>
                  <p className="text-gray-600">Cities</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">5,000+</p>
                  <p className="text-gray-600">Partners</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">28</p>
                  <p className="text-gray-600">States</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">10M+</p>
                  <p className="text-gray-600">Monthly Users</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Delhi NCR", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"].map(
                  (city) => (
                    <div key={city} className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm">
                      <MapPin className="h-3 w-3 text-blue-600" />
                      <span>{city}</span>
                    </div>
                  ),
                )}
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm">
                  <span>+190 more</span>
                </div>
              </div>
            </div>

            <div className="h-80 bg-white rounded-lg flex items-center justify-center">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="India Map with Partner Locations"
                className="max-h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are the benefits of partnering with Vehiverze?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  Partnering with Vehiverze offers numerous benefits including access to our large customer base,
                  advanced technology platforms, marketing support, business growth opportunities, and a trusted brand
                  association. Our partners typically see significant increases in business volume and operational
                  efficiency.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How long does the application process take?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  The application process typically takes 2-4 weeks, depending on the partnership type and your business
                  readiness. After submitting your application, our team will review it and schedule a meeting to
                  discuss the next steps. For dealer and service center partnerships, we'll also conduct a site visit.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Are there any fees to become a partner?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  Fee structures vary by partnership type. Dealer and service center partnerships typically involve a
                  nominal onboarding fee and a monthly subscription. Franchise partnerships require a more substantial
                  investment. Affiliate partnerships are generally free to join. Detailed fee structures will be
                  provided during the application process.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What kind of training and support do you provide?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  We provide comprehensive training and ongoing support to all our partners. This includes platform
                  training, operational guidance, marketing support, and regular business reviews. Franchise partners
                  receive additional support in setting up their business, staff training, and day-to-day operations.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I partner with Vehiverze if I'm in a small city?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  We're actively expanding our presence in Tier 2 and Tier 3 cities across India. We believe these
                  markets have tremendous potential and are looking for quality partners in all locations. Our
                  partnership models are flexible and can be adapted to suit the specific needs and scale of different
                  markets.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Application Form */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Apply to Become a Partner</h2>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Partner Application Form</CardTitle>
            <CardDescription>Fill out the form below to start your partnership journey with Vehiverze</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Business Information</h3>

                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your business name"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Textarea
                    id="businessAddress"
                    placeholder="Your business address"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Input
                      id="businessType"
                      placeholder="e.g., Dealership, Service Center"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsInBusiness">Years in Business</Label>
                    <Input
                      id="yearsInBusiness"
                      type="number"
                      placeholder="Number of years"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Partnership Details</h3>

                <div>
                  <Label htmlFor="partnershipType">Partnership Type</Label>
                  <select
                    id="partnershipType"
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={formData.partnershipType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select partnership type</option>
                    <option value="dealer">Dealer</option>
                    <option value="service">Service Center</option>
                    <option value="franchise">Franchise</option>
                    <option value="affiliate">Affiliate</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="partnershipGoals">Your Goals for Partnership</Label>
                  <Textarea
                    id="partnershipGoals"
                    placeholder="What do you hope to achieve through this partnership?"
                    value={formData.partnershipGoals}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Have Questions About Our Partnership Programs?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Our partnership team is ready to assist you with any questions you may have.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            Contact Us
          </Button>
          <Button className="bg-white text-blue-700 hover:bg-gray-100">Download Partnership Brochure</Button>
        </div>
      </div>
    </div>
  )
}


