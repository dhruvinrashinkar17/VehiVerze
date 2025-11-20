"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@vehiverze/ui/button"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Input } from "@vehiverze/ui/input"

// Preserve the original vehicle data
const vehicles = [
  { id: 1, name: "2023 Model XYZ", type: "2 Wheeler", price: 25000, image: "/placeholder.svg" },
  { id: 2, name: "2022 Scooter ABC", type: "2 Wheeler", price: 20000, image: "/placeholder.svg" },
  { id: 3, name: "2021 Auto Rickshaw DEF", type: "3 Wheeler", price: 50000, image: "/placeholder.svg" },
  { id: 4, name: "2020 Sedan GHI", type: "4 Wheeler", price: 500000, image: "/placeholder.svg" },
  { id: 5, name: "2022 Truck JKL", type: "6 Wheeler", price: 800000, image: "/placeholder.svg" },
  { id: 6, name: "2023 Heavy Truck MNO", type: "8 Wheeler", price: 1500000, image: "/placeholder.svg" },
]

export function VehicleListings() {
  // Preserve React state for interactive filtering
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
  })
  const router = useRouter()

  // Preserve the filtering logic
  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      (filters.type === "" || vehicle.type === filters.type) &&
      (filters.minPrice === "" || vehicle.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === "" || vehicle.price <= Number(filters.maxPrice))
    )
  })

  // Preserve the navigation logic
  const handleBuy = (vehicleId: number) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId)
    if (vehicle) {
      const wheelCount = Number.parseInt(vehicle.type.split(" ")[0])
      router.push(`/checkout/${wheelCount}-wheeler`)
    }
  }

  return (
    <>
      {/* 
        INTEGRATION: Using standard HTML elements with CSS for the vehicle listings
        - Preserves all React state and interactive functionality
        - Maintains the same filtering and navigation behavior
        - Uses semantic HTML elements
        - Styling with CSS instead of utility classes where possible
      */}
      <div className="listings-container">
        {/* Filter section - preserving React state and handlers */}
        <div className="filters-section">
          <div className="filter-group">
            <Label htmlFor="vehicle-type">Vehicle Type</Label>
            <Select onValueChange={(value) => setFilters({ ...filters, type: value })}>
              <SelectTrigger id="vehicle-type">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="2 Wheeler">2 Wheeler</SelectItem>
                <SelectItem value="3 Wheeler">3 Wheeler</SelectItem>
                <SelectItem value="4 Wheeler">4 Wheeler</SelectItem>
                <SelectItem value="6 Wheeler">6 Wheeler</SelectItem>
                <SelectItem value="8 Wheeler">8 Wheeler</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="filter-group">
            <Label htmlFor="min-price">Min Price</Label>
            <Input
              id="min-price"
              type="number"
              placeholder="Enter min price"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <Label htmlFor="max-price">Max Price</Label>
            <Input
              id="max-price"
              type="number"
              placeholder="Enter max price"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div>

        {/* Vehicle cards - using standard HTML with CSS */}
        <div className="vehicle-grid">
          {filteredVehicles.map((vehicle) => (
            <article key={vehicle.id} className="vehicle-card">
              <div className="vehicle-image-container">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  width={300}
                  height={200}
                  className="vehicle-image"
                />
              </div>
              <div className="vehicle-details">
                <h3 className="vehicle-title">{vehicle.name}</h3>
                <p className="vehicle-type">Type: {vehicle.type}</p>
                <p className="vehicle-price">Price: ₹{vehicle.price.toLocaleString()}</p>
                <Button onClick={() => handleBuy(vehicle.id)} className="buy-button">
                  Buy Now
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CSS styles for the vehicle listings */}
      <style jsx>{`
        .listings-container {
          width: 100%;
        }
        
        .filters-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        @media (min-width: 768px) {
          .filters-section {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .vehicle-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 640px) {
          .vehicle-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .vehicle-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .vehicle-card {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 0.5rem;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .vehicle-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .vehicle-image-container {
          width: 100%;
          height: 12rem;
          position: relative;
        }
        
        .vehicle-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .vehicle-details {
          padding: 1.5rem;
        }
        
        .vehicle-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .vehicle-type,
        .vehicle-price {
          margin-bottom: 0.5rem;
        }
        
        /* Button styling is handled by the Button component */
      `}</style>
    </>
  )
}


