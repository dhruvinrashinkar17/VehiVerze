"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Button } from "@vehiverze/ui/button"
import { Search, User, Menu, X, MapPin, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { LocationSelector } from "./location-selector"

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState("")
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)

    // Toggle body scroll
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setActiveDropdown(null)
  }

  const vehicleCategories = [
    { name: "2-Wheelers", path: "/buy/2-wheeler" },
    { name: "3-Wheelers", path: "/buy/3-wheeler" },
    { name: "4-Wheelers", path: "/buy/4-wheeler" },
    { name: "6-Wheelers", path: "/buy/6-wheeler" },
    { name: "More than 8-Wheelers", path: "/buy/more-than-8-wheeler" },
  ]

  const sellCategories = [
    { name: "2-Wheelers", path: "/sell/2-wheeler" },
    { name: "3-Wheelers", path: "/sell/3-wheeler" },
    { name: "4-Wheelers", path: "/sell/4-wheeler" },
    { name: "6-Wheelers", path: "/sell/6-wheeler" },
    { name: "More than 8-Wheelers", path: "/sell/8-wheeler" },
  ]

  const garageServices = [
    { name: "Periodic Services", path: "/garage-services/periodic" },
    { name: "AC Service & Repair", path: "/garage-services/ac-service" },
    { name: "Batteries", path: "/garage-services/batteries" },
    { name: "Tyres & Wheel Care", path: "/garage-services/tyres" },
    { name: "Denting & Painting", path: "/garage-services/denting" },
    { name: "Detailing Services", path: "/garage-services/detailing" },
    { name: "Car Spa & Cleaning", path: "/garage-services/car-spa" },
    { name: "Car Inspections", path: "/garage-services/inspections" },
    { name: "Windshields & Lights", path: "/garage-services/windshields" },
  ]

  const newCarCategories = [
    { name: "Sedan", path: "/buy/new-cars/sedan" },
    { name: "Hatchback", path: "/buy/new-cars/hatchback" },
    { name: "SUV", path: "/buy/new-cars/suv" },
    { name: "Luxury", path: "/buy/new-cars/luxury" },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-blue-600">
            Vehiverze
          </Link>

          {/* City Selector */}
          <div className="hidden md:block">
            <button
              onClick={() => setActiveDropdown("location")}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <MapPin className="h-4 w-4 mr-1" />
              <span>{selectedCity || "Select your city"}</span>
            </button>
            {activeDropdown === "location" && <LocationSelector className="" onCitySelect={handleCitySelect} />}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              
              
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
            {/* New Cars Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-gray-700 font-medium hover:text-blue-600"
                onMouseEnter={() => setActiveDropdown("new-cars")}
              >
                New Cars
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {activeDropdown === "new-cars" && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-500 px-3 py-2 border-b">CAR TYPES</h3>
                    <div className="mt-2">
                      {newCarCategories.map((category, index) => (
                        <Link
                          key={index}
                          href={category.path}
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                        >
                          {category.name}
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buy Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-gray-700 font-medium hover:text-blue-600"
                onMouseEnter={() => setActiveDropdown("buy")}
              >
                Buy
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {activeDropdown === "buy" && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-500 px-3 py-2 border-b">VEHICLE CATEGORIES</h3>
                    <div className="mt-2">
                      {vehicleCategories.map((category, index) => (
                        <Link
                          key={index}
                          href={category.path}
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                        >
                          {category.name}
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sell Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-gray-700 font-medium hover:text-blue-600"
                onMouseEnter={() => setActiveDropdown("sell")}
              >
                Sell
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {activeDropdown === "sell" && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-500 px-3 py-2 border-b">VEHICLE CATEGORIES</h3>
                    <div className="mt-2">
                      {sellCategories.map((category, index) => (
                        <Link
                          key={index}
                          href={category.path}
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                        >
                          {category.name}
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Garage Services Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-gray-700 font-medium hover:text-blue-600"
                onMouseEnter={() => setActiveDropdown("garage")}
              >
                Garage Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {activeDropdown === "garage" && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-500 px-3 py-2 border-b">SERVICE CATEGORIES</h3>
                    <div className="mt-2">
                      {garageServices.map((service, index) => (
                        <Link
                          key={index}
                          href={service.path}
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                        >
                          {service.name}
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/scrap" className="text-gray-700 font-medium hover:text-blue-600">
              Scrap Vehicle
            </Link>
            <Link href="/track-orders" className="text-gray-700 font-medium hover:text-blue-600">
              Track Order
            </Link>
            <Link href="/blog" className="text-gray-700 font-medium hover:text-blue-600">
              Blog
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 ml-2">
              <Link href="/login">Login</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setActiveDropdown("location")} className="mr-4">
              <MapPin className="h-5 w-5 text-gray-600" />
            </button>
            <Search className="h-5 w-5 mr-4 text-gray-600" />
            <User className="h-5 w-5 mr-4 text-gray-600" onClick={() => router.push("/login")} />
            <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vehicles, services..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="py-2">
            {/* Mobile New Cars Dropdown */}
            <div className="px-4 py-2">
              <button
                className="flex items-center justify-between w-full text-left text-gray-700 font-medium"
                onClick={() => toggleDropdown("new-cars-mobile")}
              >
                <span>New Cars</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${activeDropdown === "new-cars-mobile" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "new-cars-mobile" && (
                <div className="mt-2 ml-4 border-l-2 border-blue-500 pl-4">
                  {newCarCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.path}
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Buy Dropdown */}
            <div className="px-4 py-2">
              <button
                className="flex items-center justify-between w-full text-left text-gray-700 font-medium"
                onClick={() => toggleDropdown("buy-mobile")}
              >
                <span>Buy</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${activeDropdown === "buy-mobile" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "buy-mobile" && (
                <div className="mt-2 ml-4 border-l-2 border-blue-500 pl-4">
                  {vehicleCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.path}
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Sell Dropdown */}
            <div className="px-4 py-2">
              <button
                className="flex items-center justify-between w-full text-left text-gray-700 font-medium"
                onClick={() => toggleDropdown("sell-mobile")}
              >
                <span>Sell</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${activeDropdown === "sell-mobile" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "sell-mobile" && (
                <div className="mt-2 ml-4 border-l-2 border-blue-500 pl-4">
                  {sellCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.path}
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Garage Services Dropdown */}
            <div className="px-4 py-2">
              <button
                className="flex items-center justify-between w-full text-left text-gray-700 font-medium"
                onClick={() => toggleDropdown("garage-mobile")}
              >
                <span>Garage Services</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${activeDropdown === "garage-mobile" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "garage-mobile" && (
                <div className="mt-2 ml-4 border-l-2 border-blue-500 pl-4">
                  {garageServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.path}
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="px-4 py-2">
              <Link href="/scrap" className="block text-gray-700 font-medium" onClick={toggleMenu}>
                Scrap Vehicle
              </Link>
            </div>

            <div className="px-4 py-2">
              <Link href="/track-orders" className="block text-gray-700 font-medium" onClick={toggleMenu}>
                Track Order
              </Link>
            </div>

            <div className="px-4 py-2">
              <Link href="/blog" className="block text-gray-700 font-medium" onClick={toggleMenu}>
                Blog
              </Link>
            </div>

            <div className="px-4 py-2">
              <Link href="/login" className="block text-gray-700 font-medium" onClick={toggleMenu}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}
    </header>
  )
}


