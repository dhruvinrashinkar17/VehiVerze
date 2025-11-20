"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Step {
  id: number
  title: string
  answer: string
}

const carBrands = [
  { name: "Suzuki", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Hyundai", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Honda", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Tata", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Ford", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Volkswagen", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Mahindra", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Kia", logo: "/placeholder.svg?height=50&width=100" },
]

const cities = [
  { name: "Delhi", icon: "🏛️" },
  { name: "Bangalore", icon: "🌆" },
  { name: "Mumbai", icon: "🌇" },
  { name: "Pune", icon: "🏙️" },
  { name: "Hyderabad", icon: "🗼" },
  { name: "Gurgaon", icon: "🏢" },
  { name: "Noida", icon: "🌆" },
  { name: "Ahmedabad", icon: "🏰" },
]

const years = Array.from({ length: 18 }, (_, i) => 2025 - i)

const popularModels = [
  { name: "Baleno", image: "/placeholder.svg?height=100&width=200" },
  { name: "Swift", image: "/placeholder.svg?height=100&width=200" },
  { name: "Wagon R 1.0", image: "/placeholder.svg?height=100&width=200" },
  { name: "Alto 800", image: "/placeholder.svg?height=100&width=200" },
]

const fuelTypes = [
  { type: "Petrol", icon: "/placeholder.svg?height=50&width=50" },
  { type: "Diesel", icon: "/placeholder.svg?height=50&width=50" },
  { type: "CNG", icon: "/placeholder.svg?height=50&width=50" },
]

const variants = [
  { name: "GLAM", years: "2005 - 2010" },
  { name: "LXI", years: "2007 - 2011" },
  { name: "VXI", years: "2007 - 2011" },
  { name: "VXI ABS", years: "2007 - 2011" },
]

const kilometerRanges = [
  "0 Km - 10,000 Km",
  "10,000 Km - 20,000 Km",
  "20,000 Km - 30,000 Km",
  "30,000 Km - 40,000 Km",
  "40,000 Km - 50,000 Km",
  "50,000 Km - 60,000 Km",
]

const timelineOptions = ["Immediately", "Within a month", "After a month", "Just checking price"]

export function ConsolidatedSellForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<Step[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleAnswer = (answer: string) => {
    const stepTitles = {
      1: "Select your car brand to get started",
      2: "Select RTO location of your car",
      3: "Select the car manufacturing year",
      4: "Select the model of your car",
      5: "Select fuel type",
      6: "Select variant",
      7: "Select the kilometers driven",
      8: "When do you want to sell your car?",
    }

    const newStep = {
      id: currentStep,
      title: stepTitles[currentStep as keyof typeof stepTitles],
      answer,
    }

    setCompletedSteps((prev) => {
      const filtered = prev.filter((step) => step.id !== currentStep)
      return [...filtered, newStep].sort((a, b) => a.id - b.id)
    })

    if (currentStep < 8) {
      setCurrentStep(currentStep + 1)
    } else {
      // All steps completed, proceed to contact form
      router.push("/sell/contact")
    }
  }

  const handleModify = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search car brands"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-lg bg-black/50 text-white border-none focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {carBrands
                .filter((brand) => brand.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => handleAnswer(brand.name)}
                    className="p-4 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={100}
                      height={50}
                      className="mx-auto mb-2"
                    />
                    <span className="text-sm">{brand.name}</span>
                  </button>
                ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-lg bg-black/50 text-white border-none focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {cities
                .filter((city) => city.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleAnswer(city.name)}
                    className="p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-center"
                  >
                    <span className="text-4xl mb-2 block">{city.icon}</span>
                    <span className="text-sm">{city.name}</span>
                  </button>
                ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="grid grid-cols-3 gap-4">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleAnswer(year.toString())}
                className="p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
              >
                <span className="text-xl">{year}</span>
              </button>
            ))}
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search models"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-lg bg-black/50 text-white border-none focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {popularModels.map((model) => (
                <button
                  key={model.name}
                  onClick={() => handleAnswer(model.name)}
                  className="p-4 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
                >
                  <Image
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    width={200}
                    height={100}
                    className="mb-4 rounded"
                  />
                  <span className="text-lg">{model.name}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="grid grid-cols-3 gap-6">
            {fuelTypes.map((fuel) => (
              <button
                key={fuel.type}
                onClick={() => handleAnswer(fuel.type)}
                className="p-8 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-center space-y-4"
              >
                <Image
                  src={fuel.icon || "/placeholder.svg"}
                  alt={fuel.type}
                  width={50}
                  height={50}
                  className="mx-auto"
                />
                <span className="text-xl">{fuel.type}</span>
              </button>
            ))}
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            {variants.map((variant) => (
              <button
                key={variant.name}
                onClick={() => handleAnswer(variant.name)}
                className="w-full p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-left"
              >
                <span className="text-xl font-semibold">{variant.name}</span>
                <span className="text-gray-400 ml-4">[{variant.years}]</span>
              </button>
            ))}
          </div>
        )

      case 7:
        return (
          <div className="space-y-4">
            {kilometerRanges.map((range) => (
              <button
                key={range}
                onClick={() => handleAnswer(range)}
                className="w-full p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-center"
              >
                <span className="text-xl">{range}</span>
              </button>
            ))}
          </div>
        )

      case 8:
        return (
          <div className="space-y-4">
            {timelineOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-center"
              >
                <span className="text-xl">{option}</span>
              </button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-8">
        {/* Completed Steps */}
        {completedSteps.map((step) => (
          <div
            key={step.id}
            className="flex items-center gap-4 bg-black/20 p-4 rounded-lg"
            onClick={() => handleModify(step.id)}
          >
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
              {step.id}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="text-green-500">{step.answer}</p>
            </div>
            <Button variant="ghost" size="sm">
              Modify
            </Button>
          </div>
        ))}

        {/* Current Step */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">{currentStep}</div>
            <h2 className="text-2xl font-bold">
              {
                {
                  1: "Select your car brand to get started",
                  2: "Select RTO location of your car",
                  3: "Select the car manufacturing year",
                  4: "Select the model of your car",
                  5: "Select fuel type",
                  6: "Select variant",
                  7: "Select the kilometers driven",
                  8: "When do you want to sell your car?",
                }[currentStep]
              }
            </h2>
          </div>
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  )
}


