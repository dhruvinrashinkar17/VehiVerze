"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

const banners = [
  {
    id: 1,
    title: "Sell Your Vehicle",
    subtitle: "Get the best price for your vehicle",
    description: "Quick evaluation and instant payment",
    buttonText: "Sell Now",
    buttonLink: "/sell",
    background: "bg-gradient-to-r from-blue-600 to-blue-800",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Buy Quality Vehicles",
    subtitle: "Find your perfect vehicle",
    description: "Verified vehicles with warranty",
    buttonText: "Browse Now",
    buttonLink: "/buy",
    background: "bg-gradient-to-r from-green-600 to-green-800",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Scrap Your Old Vehicle",
    subtitle: "Eco-friendly disposal with best market rates",
    description: "Get maximum value for your old vehicle",
    buttonText: "Scrap Now",
    buttonLink: "/scrap",
    background: "bg-gradient-to-r from-orange-600 to-orange-800",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Garage Services",
    subtitle: "Professional vehicle maintenance",
    description: "Expert technicians at your service",
    buttonText: "Book Service",
    buttonLink: "/garage-services",
    background: "bg-gradient-to-r from-purple-600 to-purple-800",
    image: "/placeholder.svg?height=400&width=600",
  },
]

const topSearches = ["Honda City", "Maruti Swift", "Hyundai Creta", "Toyota Innova", "Mahindra Scorpio", "Tata Nexon"]

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleTopSearchClick = (search: string) => {
    setSearchQuery(search)
    window.location.href = `/search?q=${encodeURIComponent(search)}`
  }

  return (
    <div className="relative">
      {/* Banner Carousel */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="relative h-full rounded-2xl overflow-hidden">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0"
                    : index < currentSlide
                      ? "-translate-x-full"
                      : "translate-x-full"
                }`}
              >
                <div className={`${banner.background} h-full flex items-center relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
                  </div>

                  <div className="container mx-auto px-8 flex items-center justify-between h-full relative z-10">
                    {/* Content */}
                    <div className="flex-1 text-white max-w-xl">
                      <h1 className="text-5xl font-bold mb-4 leading-tight">{banner.title}</h1>
                      <p className="text-xl mb-2 opacity-90">{banner.subtitle}</p>
                      <p className="text-lg mb-8 opacity-80">{banner.description}</p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                      >
                        <a href={banner.buttonLink}>{banner.buttonText}</a>
                      </Button>
                    </div>

                    {/* Full Banner Background Image */}
                    <div className="absolute inset-0 z-[-1]">
                      <img
                        src={banner.image || "/placeholder.svg"}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-colors z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-colors z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Search Bar - Positioned below banner */}
      <div className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-4 mx-auto max-w-2xl border">
            {/* Search Input */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="What are you looking for today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button onClick={handleSearch} className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Top Searches */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-medium flex-shrink-0">Top Searches:</span>
              <div
                className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style jsx>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {topSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopSearchClick(search)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


