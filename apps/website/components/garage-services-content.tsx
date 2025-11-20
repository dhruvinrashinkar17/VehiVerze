"use client"

import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Car, Bike, Truck, ArrowRight, Shield, Clock, Star, CheckCircle, MapPin, Phone, Award } from "lucide-react"
import Link from "next/link"
import { useCityStore } from "@/lib/city-store"

const vehicleCategories = [
  {
    type: "2-Wheeler",
    icon: Bike,
    description: "Bikes & Scooters",
    services: ["Oil Change", "Brake Service", "Chain Lubrication", "Tire Change"],
    startingPrice: "₹299",
    image: "/motorcycle-service.png",
  },
  {
    type: "3-Wheeler",
    icon: Car,
    description: "Auto Rickshaws",
    services: ["Battery Check", "Suspension", "Brake Service", "Electricals"],
    startingPrice: "₹499",
    image: "/auto-rickshaw-service.png",
  },
  {
    type: "4-Wheeler",
    icon: Car,
    description: "Cars & SUVs",
    services: ["Oil Change", "AC Service", "Brake Service", "Periodic Service"],
    startingPrice: "₹799",
    image: "/car-service-garage.png",
  },
  {
    type: "6-Wheeler",
    icon: Truck,
    description: "Small Trucks",
    services: ["Engine Diagnostics", "Tire Alignment", "Brake System", "Load Check"],
    startingPrice: "₹1,299",
    image: "/small-truck-service.png",
  },
  {
    type: "8+ Wheeler",
    icon: Truck,
    description: "Heavy Vehicles",
    services: ["Engine Overhaul", "Suspension", "Differential Service", "Fleet Maintenance"],
    startingPrice: "₹2,499",
    image: "/heavy-truck-service.png",
  },
]

const featuredServices = [
  {
    name: "Periodic Service",
    description: "Complete vehicle health checkup with oil change, filter replacement, and multi-point inspection",
    price: "Starting ₹1,299",
    duration: "2-3 hours",
    rating: 4.8,
    reviews: 2847,
    features: ["Engine Oil Change", "Filter Replacement", "Battery Check", "Brake Inspection"],
    link: "/garage-services/periodic",
  },
  {
    name: "AC Service & Repair",
    description: "Complete AC system cleaning, gas refill, and performance optimization",
    price: "Starting ₹899",
    duration: "1-2 hours",
    rating: 4.7,
    reviews: 1923,
    features: ["AC Gas Refill", "Filter Cleaning", "Cooling Check", "Leak Detection"],
    link: "/garage-services/ac-service",
  },
  {
    name: "Battery Service",
    description: "Battery health check, terminal cleaning, and replacement if needed",
    price: "Starting ₹299",
    duration: "30 mins",
    rating: 4.9,
    reviews: 3421,
    features: ["Health Check", "Terminal Cleaning", "Load Test", "Free Installation"],
    link: "/garage-services/batteries",
  },
  {
    name: "Truck Maintenance",
    description: "Comprehensive maintenance for commercial vehicles and heavy trucks",
    price: "Starting ₹2,499",
    duration: "4-6 hours",
    rating: 4.6,
    reviews: 892,
    features: ["Engine Service", "Brake System", "Suspension Check", "Fleet Support"],
    link: "/garage-services/truck-maintenance",
  },
]

const whyChooseUs = [
  {
    icon: Shield,
    title: "Certified Mechanics",
    description: "All our partner garages have certified and experienced mechanics",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Most services completed within promised timeframe with real-time updates",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "30-day service warranty on all repairs and replacements",
  },
  {
    icon: MapPin,
    title: "Doorstep Service",
    description: "Free pickup and drop facility available for your convenience",
  },
]

export function GarageServicesContent() {
  const { selectedCity } = useCityStore()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2b4ba9] via-[#3d5bb8] to-[#4d6bc7] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Garage Services in {selectedCity}</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Expert vehicle maintenance and repair services for all vehicle types
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/garage-services/flow">
                <Button size="lg" className="bg-white text-[#2b4ba9] hover:bg-gray-100 px-8 py-3">
                  Book Service Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#2b4ba9] px-8 py-3 bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: 1800-123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Services by Vehicle Type</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional maintenance and repair services tailored for every vehicle category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicleCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.type}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#2b4ba9] text-white">{category.startingPrice}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-[#2b4ba9]" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.type}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Popular Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.services.map((service, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Link href="/garage-services/flow">
                        <Button className="w-full mt-4 bg-[#2b4ba9] hover:bg-[#1e3a8a]">
                          Book Service
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most popular services with transparent pricing and guaranteed quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{service.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
                      </div>
                      <CardDescription className="text-sm">{service.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#2b4ba9]">{service.price}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">What's Included:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link href={service.link} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          Learn More
                        </Button>
                      </Link>
                      <Link href="/garage-services/flow" className="flex-1">
                        <Button className="w-full bg-[#2b4ba9] hover:bg-[#1e3a8a]">Book Now</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Garage Services?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We partner with the best garages to ensure quality service and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-[#2b4ba9]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2b4ba9] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Service Your Vehicle?</h2>
          <p className="text-xl mb-8 text-blue-100">Book your service appointment in just a few clicks</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/garage-services/flow">
              <Button size="lg" className="bg-white text-[#2b4ba9] hover:bg-gray-100 px-8 py-3">
                Start Booking Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#2b4ba9] px-8 py-3 bg-transparent"
            >
              <Phone className="mr-2 h-5 w-5" />
              Get Quote: 1800-123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


