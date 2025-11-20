"use client"

import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@vehiverze/ui/accordion"
import { Star, Clock, CheckCircle, ArrowRight, Shield, Award, Users, Wrench } from "lucide-react"
import Link from "next/link"
import { useCityStore } from "@/lib/city-store"

interface ServicePackage {
  name: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
}

interface ServiceData {
  name: string
  description: string
  heroImage: string
  startingPrice: number
  duration: string
  rating: number
  reviews: number
  packages: ServicePackage[]
  benefits: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
}

interface GarageServiceDetailProps {
  serviceData: ServiceData
}

export function GarageServiceDetail({ serviceData }: GarageServiceDetailProps) {
  const { selectedCity } = useCityStore()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-4">{serviceData.name}</h1>
                  <p className="text-xl mb-6 text-blue-100">{serviceData.description}</p>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{serviceData.rating}</span>
                      <span className="text-blue-200 ml-1">({serviceData.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-1" />
                      <span>{serviceData.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/garage-services/flow">
                      <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                        Book Now - Starting ₹{serviceData.startingPrice}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <img
                    src={serviceData.heroImage || "/placeholder.svg"}
                    alt={serviceData.name}
                    className="rounded-lg shadow-xl w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the package that best fits your vehicle's needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviceData.packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mt-2">₹{pkg.price}</div>
                  <CardDescription className="flex items-center justify-center mt-2">
                    <Clock className="h-4 w-4 mr-1" />
                    {pkg.duration}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/garage-services/flow">
                    <Button className={`w-full ${pkg.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                      Select Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our {serviceData.name}?</h2>
              <p className="text-gray-600">Professional service with guaranteed quality and customer satisfaction</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceData.benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">{benefit}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">30-Day</h3>
              <p className="text-gray-600">Service Warranty</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Certified</h3>
              <p className="text-gray-600">Mechanics</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">50,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-gray-600">Partner Garages</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Get answers to common questions about our {serviceData.name.toLowerCase()}
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {serviceData.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Service?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get professional {serviceData.name.toLowerCase()} in {selectedCity}
          </p>
          <Link href="/garage-services/flow">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3">
              Book {serviceData.name} Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}


