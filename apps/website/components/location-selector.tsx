"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, X } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface LocationSelectorProps {
  className?: string
  onCitySelect?: (city: string) => void
}

export function LocationSelector({ className, onCitySelect }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)

  const popularCities = [
    "Delhi NCR",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Chandigarh",
  ]

  const allCities = [
    "Agra",
    "Ahmedabad",
    "Allahabad",
    "Amritsar",
    "Aurangabad",
    "Bangalore",
    "Bhopal",
    "Bhubaneswar",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Delhi NCR",
    "Goa",
    "Guwahati",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kanpur",
    "Kochi",
    "Kolkata",
    "Lucknow",
    "Ludhiana",
    "Madurai",
    "Mangalore",
    "Mumbai",
    "Mysore",
    "Nagpur",
    "Nashik",
    "Patna",
    "Pune",
    "Raipur",
    "Rajkot",
    "Ranchi",
    "Surat",
    "Trivandrum",
    "Vadodara",
    "Varanasi",
    "Vijayawada",
    "Visakhapatnam",
  ]

  const filteredCities = searchQuery
    ? allCities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()))
    : allCities

  const toggleModal = () => {
    setIsOpen(!isOpen)
    setSearchQuery("")
  }

  const selectCity = (city: string) => {
    onCitySelect?.(city)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className={className}>
      <button onClick={toggleModal} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
        <MapPin className="h-5 w-5 mr-1" />
        <span className="text-sm font-medium">Delhi NCR</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select Your City</h3>
                <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for your city"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 border-b">
              <h4 className="text-sm font-medium text-gray-500 mb-3">POPULAR CITIES</h4>
              <div className="grid grid-cols-2 gap-2">
                {popularCities.map((city) => (
                  <button
                    key={city}
                    className={`text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 text-gray-700`}
                    onClick={() => selectCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto flex-grow">
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">ALL CITIES</h4>
                <div className="grid grid-cols-2 gap-2">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      className={`text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 text-gray-700`}
                      onClick={() => selectCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <Button
                className="w-full flex items-center justify-center"
                onClick={() => {
                  // Get current location logic would go here
                  selectCity("Current Location")
                }}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Use Current Location
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


