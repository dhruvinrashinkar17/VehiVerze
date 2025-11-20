"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"

interface Brand {
  name: string
  logo: string
  popular?: boolean
}

interface PremiumBrandSelectorProps {
  brands: Brand[]
  onSelect: (brand: string) => void
  onBack?: () => void
  vehicleType: string
}

export function PremiumBrandSelector({ brands, onSelect, onBack, vehicleType }: PremiumBrandSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brands)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)

  // Filter brands based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredBrands(brands.filter((brand) => brand.name.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      setFilteredBrands(brands)
    }
  }, [searchTerm, brands])

  // Get popular brands
  const popularBrands = brands.filter((brand) => brand.popular)

  // Handle brand selection with animation
  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand)
    setIsSelecting(true)

    // Delay to show animation
    setTimeout(() => {
      onSelect(brand)
      setIsSelecting(false)
    }, 600)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const selectedVariants = {
    initial: { scale: 1 },
    selected: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="space-y-8">
      {onBack && (
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="rounded-full w-10 h-10 p-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold">Select your {vehicleType} brand</h2>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder={`Search ${vehicleType} brands`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg h-auto"
        />
      </div>

      {popularBrands.length > 0 && !searchTerm && (
        <div>
          <h3 className="text-xl font-semibold mb-6">Popular Brands</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {popularBrands.map((brand) => (
              <motion.div
                key={brand.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                animate={selectedBrand === brand.name ? "selected" : "initial"}
                variants={selectedVariants}
                onClick={() => handleBrandSelect(brand.name)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="w-20 h-20 relative mb-4">
                    <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
                  </div>
                  <span className="font-medium text-gray-800">{brand.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-6">{searchTerm ? "Search Results" : "All Brands"}</h3>
        {filteredBrands.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {filteredBrands.map((brand) => (
              <motion.div
                key={brand.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                animate={selectedBrand === brand.name ? "selected" : "initial"}
                variants={selectedVariants}
                onClick={() => handleBrandSelect(brand.name)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="w-16 h-16 relative mb-4">
                    <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
                  </div>
                  <span className="font-medium text-gray-800">{brand.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No brands found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}


