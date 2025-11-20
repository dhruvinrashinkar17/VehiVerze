"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("buy")
  const router = useRouter()

  const categories = [
    {
      id: "2-wheelers",
      title: "2-Wheelers",
      image: "/placeholder.svg?height=80&width=80&text=2-Wheelers",
    },
    {
      id: "3-wheelers",
      title: "3-Wheelers",
      image: "/placeholder.svg?height=80&width=80&text=3-Wheelers",
    },
    {
      id: "4-wheelers",
      title: "4-Wheelers",
      image: "/placeholder.svg?height=80&width=80&text=4-Wheelers",
    },
    {
      id: "6-wheelers",
      title: "6-Wheelers",
      image: "/placeholder.svg?height=80&width=80&text=6-Wheelers",
    },
    {
      id: "8-wheelers",
      title: "8-Wheelers",
      image: "/placeholder.svg?height=80&width=80&text=8-Wheelers",
    },
    {
      id: "garage-services",
      title: "Garage Services",
      image: "/placeholder.svg?height=80&width=80&text=Garage",
    },
  ]

  const handleCategoryClick = (category) => {
    const path = category.id === "garage-services" ? "/garage-services" : `/${activeTab}/${category.id}`
    router.push(path)
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {/* Buy/Sell Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md overflow-hidden">
          <button
            className={`px-12 py-3 text-lg font-medium ${
              activeTab === "buy" ? "bg-blue-600 text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => setActiveTab("buy")}
          >
            Buy
          </button>
          <button
            className={`px-12 py-3 text-lg font-medium ${
              activeTab === "sell" ? "bg-blue-600 text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => setActiveTab("sell")}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCategoryClick(category)}
            >
              <img src={category.image || "/placeholder.svg"} alt={category.title} className="w-20 h-20 mb-6" />
              <h3 className="text-xl font-medium text-gray-800">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


