"use client"

import { Button } from "@vehiverze/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Services() {
  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Buy Service Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Buy Vehicles</h3>
            <p className="text-gray-600 mb-4">
              Browse our extensive collection of quality vehicles. Find the perfect match for your needs and budget.
            </p>
            <Link href="/buy">
              <Button variant="outline" className="w-full">
                Explore Vehicles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Sell Service Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Sell Your Vehicle</h3>
            <p className="text-gray-600 mb-4">
              Get the best value for your vehicle. Quick evaluation, instant quotes, and hassle-free selling process.
            </p>
            <Link href="/sell">
              <Button variant="outline" className="w-full">
                Sell Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Scrap Service Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Scrap Vehicle</h3>
            <p className="text-gray-600 mb-4">
              Environmentally responsible disposal of end-of-life vehicles. Get paid for your scrap vehicle.
            </p>
            <Link href="/scrap">
              <Button variant="outline" className="w-full">
                Scrap Vehicle <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


