"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, X, Loader2, Navigation } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { useCityStore } from "@/lib/city-store"
import { cn } from "@vehiverze/shared-utils/cn"

interface CitySelectorProps {
  variant?: "full" | "compact"
  className?: string
  onCitySelect?: (city: string) => void
}

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

export function CitySelector({ variant = "full", className, onCitySelect }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hasAutoDetected, setHasAutoDetected] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { selectedCity, isDetecting, detectionError, setCity, detectCurrentCity } = useCityStore()

  // Auto-detect city on first load
  useEffect(() => {
    if (!hasAutoDetected && selectedCity === "Delhi NCR") {
      detectCurrentCity()
      setHasAutoDetected(true)
    }
  }, [detectCurrentCity, hasAutoDetected, selectedCity])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Focus search input when opened
      setTimeout(() => inputRef.current?.focus(), 100)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const filteredCities = searchQuery
    ? allCities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()))
    : allCities

  const handleCitySelect = (city: string) => {
    setCity(city)
    onCitySelect?.(city)
    setIsOpen(false)
    setSearchQuery("")
  }

  const handleDetectLocation = async () => {
    await detectCurrentCity()
  }

  if (variant === "compact") {
    return (
      <div className={cn("relative", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          aria-label={`Current city: ${selectedCity}`}
        >
          <MapPin className="h-4 w-4 mr-1" />
          <span className="max-w-24 truncate">{selectedCity}</span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
              <CityDropdownContent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredCities={filteredCities}
                selectedCity={selectedCity}
                onCitySelect={handleCitySelect}
                onClose={() => setIsOpen(false)}
                onDetectLocation={handleDetectLocation}
                isDetecting={isDetecting}
                detectionError={detectionError}
                inputRef={inputRef}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full pl-10 pr-4 py-3 text-left border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:bg-gray-50 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="block text-sm font-medium text-gray-900">
            {isDetecting ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Detecting location...
              </span>
            ) : (
              selectedCity
            )}
          </span>
          <span className="block text-xs text-gray-500 mt-1">
            {detectionError ? detectionError : "Click to change city"}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <CityDropdownContent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredCities={filteredCities}
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
              onClose={() => setIsOpen(false)}
              onDetectLocation={handleDetectLocation}
              isDetecting={isDetecting}
              detectionError={detectionError}
              inputRef={inputRef}
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface CityDropdownContentProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredCities: string[]
  selectedCity: string
  onCitySelect: (city: string) => void
  onClose: () => void
  onDetectLocation: () => void
  isDetecting: boolean
  detectionError: string | null
  inputRef: React.RefObject<HTMLInputElement>
}

function CityDropdownContent({
  searchQuery,
  setSearchQuery,
  filteredCities,
  selectedCity,
  onCitySelect,
  onClose,
  onDetectLocation,
  isDetecting,
  detectionError,
  inputRef,
}: CityDropdownContentProps) {
  return (
    <>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select Your City</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100"
            aria-label="Close city selector"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for your city"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search cities"
          />
        </div>
      </div>

      {/* Auto-detect Location */}
      <div className="p-4 border-b">
        <Button
          onClick={onDetectLocation}
          disabled={isDetecting}
          className="w-full flex items-center justify-center bg-transparent"
          variant="outline"
        >
          {isDetecting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              Use Current Location
            </>
          )}
        </Button>
        {detectionError && <p className="text-sm text-red-600 mt-2 text-center">{detectionError}</p>}
      </div>

      {/* Popular Cities */}
      {!searchQuery && (
        <div className="p-4 border-b">
          <h4 className="text-sm font-medium text-gray-500 mb-3">POPULAR CITIES</h4>
          <div className="grid grid-cols-2 gap-2">
            {popularCities.map((city) => (
              <button
                key={city}
                className={cn(
                  "text-left px-3 py-2 rounded-md text-sm transition-colors",
                  selectedCity === city ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100",
                )}
                onClick={() => onCitySelect(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All Cities */}
      <div className="overflow-y-auto flex-grow">
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-3">
            {searchQuery ? `SEARCH RESULTS (${filteredCities.length})` : "ALL CITIES"}
          </h4>
          {filteredCities.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  className={cn(
                    "text-left px-3 py-2 rounded-md text-sm transition-colors",
                    selectedCity === city ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => onCitySelect(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No cities found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}


