"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Search } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate search results
    setLoading(true)
    setTimeout(() => {
      // Mock results based on query
      const mockResults = [
        {
          id: 1,
          title: "Honda City 2020",
          type: "4 Wheeler",
          price: "₹8,50,000",
          category: "buy",
          link: "/buy/4-wheeler/details/1",
        },
        {
          id: 2,
          title: "Sell your old car",
          type: "Service",
          description: "Get the best price for your used vehicle",
          category: "sell",
          link: "/sell/4-wheeler",
        },
        {
          id: 3,
          title: "Vehicle Insurance",
          type: "Service",
          description: "Comprehensive insurance for all vehicle types",
          category: "insurance",
          link: "/insurance-services",
        },
        {
          id: 4,
          title: "Scrap Vehicle Service",
          type: "Service",
          description: "Eco-friendly disposal with maximum value",
          category: "scrap",
          link: "/scrap",
        },
      ]

      setResults(mockResults)
      setLoading(false)
    }, 1000)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-black">Search Results</h1>

        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {query && (
          <p className="mb-6 text-gray-600">
            Showing results for: <span className="font-semibold">{query}</span>
          </p>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result) => (
                  <a
                    key={result.id}
                    href={result.link}
                    className="block bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-black mb-2">{result.title}</h2>
                        <p className="text-sm text-gray-500 mb-2">{result.type}</p>
                        {result.price && <p className="font-medium text-green-600">{result.price}</p>}
                        {result.description && <p className="text-gray-600 mt-2">{result.description}</p>}
                      </div>
                      <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-800 capitalize">
                        {result.category}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No results found for "{query}"</p>
                <p className="mt-2 text-gray-500">Try different keywords or browse our categories below</p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a href="/buy" className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200">
                    Browse Vehicles
                  </a>
                  <a href="/sell" className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200">
                    Sell Your Vehicle
                  </a>
                  <a href="/scrap" className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200">
                    Scrap Vehicle
                  </a>
                  <a
                    href="/garage-services"
                    className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200"
                  >
                    Garage Services
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}


