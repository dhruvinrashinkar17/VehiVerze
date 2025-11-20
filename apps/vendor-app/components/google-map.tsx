"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, AlertCircle } from "lucide-react"

interface GoogleMapProps {
  lat: number
  lng: number
  zoom?: number
  markerTitle?: string
}

export function GoogleMap({ lat, lng, zoom = 15, markerTitle = "Location" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Replace with your actual Google Maps API key
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

  useEffect(() => {
    // Check if API key is provided
    if (!GOOGLE_MAPS_API_KEY) {
      setMapError("Google Maps API key not configured")
      setIsLoading(false)
      return
    }

    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      // Check if script is already loaded
      if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
        initializeMap()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initGoogleMap`
      script.async = true
      script.defer = true

      script.onerror = () => {
        setMapError("Failed to load Google Maps")
        setIsLoading(false)
      }

      document.head.appendChild(script)

      // Define the callback function
      window.initGoogleMap = () => {
        initializeMap()
      }
    }

    const initializeMap = () => {
      try {
        if (mapRef.current && !mapInstanceRef.current && window.google) {
          const mapOptions = {
            center: { lat, lng },
            zoom,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }

          const map = new window.google.maps.Map(mapRef.current, mapOptions)
          mapInstanceRef.current = map

          // Add marker
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: markerTitle,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#3B82F6",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            },
          })

          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error initializing map:", error)
        setMapError("Error initializing map")
        setIsLoading(false)
      }
    }

    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initializeMap()
    } else {
      loadGoogleMapsScript()
    }

    return () => {
      // Clean up
      if (window.initGoogleMap) {
        delete window.initGoogleMap
      }
    }
  }, [lat, lng, zoom, markerTitle, GOOGLE_MAPS_API_KEY])

  // Fallback UI when map cannot be loaded
  if (mapError || !GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full rounded-lg bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Map Unavailable</h3>
        <p className="text-sm text-gray-500 mb-4">{mapError || "Google Maps API key not configured"}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border">
          <MapPin className="h-4 w-4" />
          <span>
            Lat: {lat.toFixed(6)}, Lng: {lng.toFixed(6)}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-4 max-w-sm">
          To enable maps, add your Google Maps API key to NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-500">Loading map...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />
}

// Add type definition for the global window object
declare global {
  interface Window {
    initGoogleMap: () => void
    google?: any
  }
}


