"use client"

import Image from "next/image"
import { Button } from "@vehiverze/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

export function AboutContent() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Your One-Stop Solution for Buying, Selling, Servicing & Insuring Vehicles
            </p>
            <p className="text-lg text-gray-600 mb-8">
              At Vehiverze, we believe that dealing with vehicles—whether buying, selling, maintaining, or
              insuring—should be simple, transparent, and hassle-free. Unfortunately, the current market is fragmented,
              filled with inconsistent pricing, unreliable services, and time-consuming processes. That's why we built
              Vehiverze—to revolutionize the way people interact with the vehicle ecosystem.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
              Join Vehiverze Today
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story: The Problem That Started It All</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our Founder & CEO, AK, came up with the idea for Vehiverze when he faced real-world challenges
                while trying to sell his vehicles. He realized:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🚗</span>
                  <span className="text-gray-700">
                    Selling different types of vehicles (bikes, cars, commercial vehicles) required multiple platforms.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <span className="text-gray-700">
                    Getting the right price was a struggle, with no standardized valuation system.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔄</span>
                  <span className="text-gray-700">
                    The process of negotiating with multiple buyers was frustrating and time-consuming.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔧</span>
                  <span className="text-gray-700">
                    Finding trusted garages and mechanics was not easy, and service quality was inconsistent.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🛡️</span>
                  <span className="text-gray-700">
                    Insurance options were confusing, lacked transparency, and often came with hidden charges.
                  </span>
                </li>
              </ul>
              <p className="text-lg text-gray-600 mt-6">
                This is where Vehiverze comes in—one platform to solve all these pain points.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=400&width=600" alt="Our Story" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Do</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We've built Vehiverze as a technology-driven, all-in-one ecosystem where users can:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Sell Vehicles Instantly</h3>
              </div>
              <p className="text-gray-600">
                List and sell your bike, car, or commercial vehicle effortlessly, with a fair and data-backed price
                evaluation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Buy Verified Vehicles</h3>
              </div>
              <p className="text-gray-600">
                Browse a wide range of verified listings, ensuring transparency and trust.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Find Trusted Garage Services</h3>
              </div>
              <p className="text-gray-600">
                Get reliable maintenance, accidental repairs, and servicing at competitive rates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Get Insurance at the Best Rates</h3>
              </div>
              <p className="text-gray-600">
                Compare and secure the best insurance deals, ensuring full coverage and peace of mind.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Hassle-Free Vendor Experience</h3>
              </div>
              <p className="text-gray-600">
                Vendors can manage their listings, track transactions, and grow their business efficiently.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md flex items-center justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Learn More About Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Vehiverze Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Vehiverze?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">One Platform for All Vehicles</h3>
                <p className="text-gray-600">
                  No more switching between different websites. Vehiverze covers bikes, scooters, cars, trucks, and
                  commercial vehicles under one roof.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Price Valuation</h3>
                <p className="text-gray-600">
                  Our smart pricing engine ensures you get the most accurate and fair value for your vehicle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Transparency</h3>
                <p className="text-gray-600">
                  Every buyer, seller, and vendor is verified to create a safe and reliable marketplace.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Transactions</h3>
                <p className="text-gray-600">
                  We ensure quick deals with minimal paperwork, making the process stress-free.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Vendor-Friendly Model</h3>
                <p className="text-gray-600">
                  Unlike auction-based platforms, Vehiverze offers a credit-based system, making it profitable and
                  scalable for vendors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet the Team Driving Vehiverze Forward
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=128&width=128" alt="AK" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">AK</h3>
              <p className="text-blue-600 font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                The visionary behind Vehiverze, committed to solving real-world vehicle industry challenges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=128&width=128" alt="SS" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">SD</h3>
              <p className="text-blue-600 font-medium mb-3">Co-founder</p>
              <p className="text-gray-600 text-sm">
                Bringing strategic expertise to scale Vehiverze and streamline operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=128&width=128" alt="VS" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">VS</h3>
              <p className="text-blue-600 font-medium mb-3">Marketing Manager</p>
              <p className="text-gray-600 text-sm">
                Focused on branding, outreach, and ensuring Vehiverze reaches the right customers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Vision & Future</h2>
            <p className="text-xl mb-8">
              We are not just a company—we are building the future of the vehicle industry. Our goal is to expand
              Vehiverze across India and, eventually, globally, offering a seamless experience for vehicle transactions
              and services.
            </p>
            <p className="text-xl mb-8">
              At Vehiverze, we're here to redefine the vehicle experience—whether you're a buyer, seller, garage owner,
              or insurance seeker.
            </p>
            <div className="text-2xl font-bold mb-6">Join the Revolution!</div>
            <p className="text-xl">Welcome to Vehiverze—where vehicle transactions are simple, smart, and secure! 🚀</p>
          </div>
        </div>
      </section>
    </div>
  )
}


