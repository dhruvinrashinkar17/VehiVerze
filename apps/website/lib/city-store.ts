import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CityState {
  selectedCity: string
  isDetecting: boolean
  detectionError: string | null
  setCity: (city: string) => void
  setDetecting: (detecting: boolean) => void
  setDetectionError: (error: string | null) => void
  detectCurrentCity: () => Promise<void>
}

export const useCityStore = create<CityState>()(
  persist(
    (set, get) => ({
      selectedCity: "Delhi NCR",
      isDetecting: false,
      detectionError: null,

      setCity: (city: string) => {
        set({ selectedCity: city, detectionError: null })
      },

      setDetecting: (detecting: boolean) => {
        set({ isDetecting: detecting })
      },

      setDetectionError: (error: string | null) => {
        set({ detectionError: error, isDetecting: false })
      },

      detectCurrentCity: async () => {
        const { setCity, setDetecting, setDetectionError } = get()

        setDetecting(true)
        setDetectionError(null)

        try {
          if ("geolocation" in navigator) {
            try {
              const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                  reject(new Error("Geolocation timeout"))
                }, 5000) // Reduced from 10000 to 5000ms

                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    clearTimeout(timeoutId)
                    resolve(pos)
                  },
                  (err) => {
                    clearTimeout(timeoutId)
                    reject(err)
                  },
                  {
                    timeout: 5000, // Reduced timeout
                    enableHighAccuracy: false, // Changed to false for faster response
                    maximumAge: 300000, // Cache position for 5 minutes
                  },
                )
              })

              const { latitude, longitude } = position.coords

              const controller = new AbortController()
              const timeoutId = setTimeout(() => controller.abort(), 8000)

              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
                  {
                    headers: {
                      "User-Agent": "Vehiverze-App/1.0",
                    },
                    signal: controller.signal,
                  },
                )

                clearTimeout(timeoutId)

                if (!response.ok) throw new Error("Geocoding failed")

                const data = await response.json()
                const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state

                if (city) {
                  const detectedCity = mapToKnownCity(city)
                  setCity(detectedCity)
                  setDetecting(false)
                  return
                }
              } catch (fetchError) {
                clearTimeout(timeoutId)
                console.warn("Geocoding API failed:", fetchError)
                // Continue to IP fallback
              }
            } catch (geoError) {
              console.warn("Geolocation failed:", geoError)
              // Continue to IP fallback
            }
          }

          try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 5000)

            const ipResponse = await fetch("https://ipapi.co/json/", {
              signal: controller.signal,
            })

            clearTimeout(timeoutId)

            if (ipResponse.ok) {
              const ipData = await ipResponse.json()
              const city = ipData.city
              if (city) {
                const detectedCity = mapToKnownCity(city)
                setCity(detectedCity)
                setDetecting(false)
                return
              }
            }
          } catch (ipError) {
            console.warn("IP-based detection failed:", ipError)
          }

          console.info("City detection failed, using default city")
          setCity("Delhi NCR")
          setDetecting(false)
        } catch (error) {
          console.error("City detection failed:", error)
          setDetectionError("Unable to detect your location")
          setCity("Delhi NCR") // Fallback
        }
      },
    }),
    {
      name: "city-storage",
      partialize: (state) => ({ selectedCity: state.selectedCity }),
    },
  ),
)

// Helper function to map detected city to our known cities
function mapToKnownCity(detectedCity: string): string {
  const cityMappings: Record<string, string> = {
    "New Delhi": "Delhi NCR",
    Delhi: "Delhi NCR",
    Gurgaon: "Delhi NCR",
    Gurugram: "Delhi NCR",
    Noida: "Delhi NCR",
    Faridabad: "Delhi NCR",
    Ghaziabad: "Delhi NCR",
    Mumbai: "Mumbai",
    Bombay: "Mumbai",
    Bangalore: "Bangalore",
    Bengaluru: "Bangalore",
    Hyderabad: "Hyderabad",
    Chennai: "Chennai",
    Madras: "Chennai",
    Kolkata: "Kolkata",
    Calcutta: "Kolkata",
    Pune: "Pune",
    Ahmedabad: "Ahmedabad",
    Jaipur: "Jaipur",
    Chandigarh: "Chandigarh",
  }

  // Check exact match first
  if (cityMappings[detectedCity]) {
    return cityMappings[detectedCity]
  }

  // Check partial match
  for (const [key, value] of Object.entries(cityMappings)) {
    if (
      detectedCity.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(detectedCity.toLowerCase())
    ) {
      return value
    }
  }

  // Check if it's in our all cities list
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

  const foundCity = allCities.find(
    (city) =>
      city.toLowerCase() === detectedCity.toLowerCase() || detectedCity.toLowerCase().includes(city.toLowerCase()),
  )

  return foundCity || "Delhi NCR"
}


