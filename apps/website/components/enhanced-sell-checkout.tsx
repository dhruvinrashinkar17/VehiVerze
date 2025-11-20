"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { CreditCard, FileText } from "lucide-react"
import { Progress } from "@vehiverze/ui/progress"
import { cn } from "@vehiverze/shared-utils/cn"

interface EnhancedSellCheckoutProps {
  vehicleType?: string
  vehicleDetails?: {
    brand?: string
    model?: string
    year?: string
    variant?: string
    fuelType?: string
    kilometers?: string
  }
}

export function EnhancedSellCheckout({ 
  vehicleType = "4-wheeler", 
  vehicleDetails = {
    brand: "Maruti Suzuki",
    model: "Swift",
    year: "2020",
    variant: "VXi",
    fuelType: "Petrol",
    kilometers: "25000"
  } 
}: EnhancedSellCheckoutProps) {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const router = useRouter()

  // Update progress based on current step
  useEffect(() => {
    const stepProgress = {
      1: 25,
      2: 50,
      3: 75,
      4: 100,
    }
    setProgress(stepProgress[step as keyof typeof stepProgress])
  }, [step])

  // Sample dates for inspection booking
  const dates = [
    { date: "2023-11-20", day: "Mon", dayNum: "20" },
    { date: "2023-11-21", day: "Tue", dayNum: "21" },
    { date: "2023-11-22", day: "Wed", dayNum: "22" },
    { date: "2023-11-23", day: "Thu", dayNum: "23" },
    { date: "2023-11-24", day: "Fri", dayNum: "24" },
    { date: "2023-11-25", day: "Sat", dayNum: "25" },
    { date: "2023-11-26", day: "Sun", dayNum: "26" },
  ]

  // Sample time slots
  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
  ]

  // Sample locations
  const locations = [
    "Home Address",
    "Work Address",
    "Nearest Service Center",
    "Custom Location",
  ]

  // Sample payment methods
  const paymentMethods = [
    { id: "bank", name: "Bank Transfer", icon: <CreditCard className="h-5 w-5 text-blue-500" /> },
    { id: "cash", name: "Cash Payment", icon: <CreditCard className="h-5 w-5 text-green-500" /> },
    { id: "check", name: "Check Payment", icon: <FileText className="h-5 w-5 text-purple-500" /> },
  ]

  // Handle next step
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Final step - redirect to success page
      router.push("/sell/confirmation")
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  // Get vehicle icon
  const getVehicleIcon = () => {
    switch (vehicleType) {
      case "2-wheeler":
        return "🏍️"
      case "3-wheeler":
        return "🛺"
      case "4-wheeler":
        return "🚗"
      case "6-wheeler":
        return "🚚"
      case "8-wheeler":
        return "🚛"
      default:
        return "🚗"
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8 px-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Booking your inspection</span>
          <span className="text-sm font-medium">{progress}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={{ type: "tween", duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Step 1: Select Date */}
              {step === 1 && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Select Inspection Date</h2>
                  <p className="text-gray-500 mb-8">
                    Choose a convenient date for our expert to inspect your vehicle
                  </p>

                  <div className="grid grid-cols-7 gap-3">
                    {dates.map((date, index) => (
                      <motion.button
                        key={date.date}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        onClick={() => setSelectedDate(date.date)}
                        className={cn(
                          "flex flex-col items-center p-4 rounded-xl transition-all duration-300",
                          selectedDate === date.date
                            ? "bg-blue-50 border-2 border-blue-500 shadow-md"
                            : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                        )}
                      >
                        <span className="text-sm text-gray-500">{date.day}</span>\
\


