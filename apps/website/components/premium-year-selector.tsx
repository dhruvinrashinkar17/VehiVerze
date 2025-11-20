"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface PremiumYearSelectorProps {
  onSelect: (year: string) => void
  onBack: () => void
}

export function PremiumYearSelector({ onSelect, onBack }: PremiumYearSelectorProps) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)

  // Generate years from current year down to 18 years ago
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 18 }, (_, i) => (currentYear - i).toString())

  // Handle year selection with animation
  const handleYearSelect = (year: string) => {
    setSelectedYear(year)
    setIsSelecting(true)

    // Delay to show animation
    setTimeout(() => {
      onSelect(year)
      setIsSelecting(false)
    }, 600)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    initial: {
      scale: 1,
      backgroundColor: "rgba(243, 244, 246, 1)", // gray-100
    },
    selected: {
      scale: 1.05,
      backgroundColor: "rgba(59, 130, 246, 0.1)", // blue-500 with opacity
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="rounded-full w-10 h-10 p-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Select the manufacturing year</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        {years.map((year, index) => (
          <motion.button
            key={year}
            variants={itemVariants}
            custom={index}
            whileHover={{ y: -5 }}
            animate={selectedYear === year ? "selected" : "initial"}
            variants={selectedVariants}
            onClick={() => handleYearSelect(year)}
            className="p-6 rounded-xl bg-gray-100 hover:bg-blue-50 transition-all duration-300 text-center"
          >
            <span className="text-2xl font-medium text-gray-800">{year}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}


