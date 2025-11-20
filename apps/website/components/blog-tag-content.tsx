"use client"

import Link from "next/link"
import { Calendar, TagIcon, ArrowRight, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Button } from "@vehiverze/ui/button"

export function BlogTagContent({ tag }: { tag: string }) {
  // Format the tag for display (convert from slug to readable format)
  const formattedTag = tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Sample posts with this tag
  const taggedPosts = [
    {
      id: 1,
      title: "The Future of Electric Vehicles in India",
      excerpt:
        "Exploring the growth and potential of electric vehicles in the Indian market and what it means for consumers.",
      category: "Electric Vehicles",
      date: "May 15, 2023",
      author: "Rahul Sharma",
      image: "/placeholder.svg?height=300&width=500",
      slug: "future-of-electric-vehicles-india",
      tags: ["Electric Vehicles", "Sustainability", "Automotive Industry", "Government Policy", "Future Mobility"],
    },
    {
      id: 2,
      title: "How to Maintain Your Car During Monsoon Season",
      excerpt: "Essential tips to keep your vehicle in top condition during India's heavy monsoon season.",
      category: "Maintenance",
      date: "June 22, 2023",
      author: "Priya Patel",
      image: "/placeholder.svg?height=300&width=500",
      slug: "car-maintenance-monsoon-season",
      tags: ["Car Maintenance", "Monsoon Season", "Vehicle Care", "Safety Tips", "Driving Tips"],
    },
    {
      id: 3,
      title: "Understanding Vehicle Financing Options in 2023",
      excerpt: "A comprehensive guide to the best financing options available for vehicle purchases this year.",
      category: "Finance",
      date: "July 10, 2023",
      author: "Vikram Singh",
      image: "/placeholder.svg?height=300&width=500",
      slug: "vehicle-financing-options-2023",
      tags: ["Vehicle Financing", "Car Loans", "Auto Leasing", "Financial Planning", "EMI"],
    },
    {
      id: 4,
      title: "Top 10 Fuel-Efficient Cars in India",
      excerpt: "Discover the most fuel-efficient cars available in the Indian market today.",
      category: "Fuel Efficiency",
      date: "August 5, 2023",
      author: "Ananya Desai",
      image: "/placeholder.svg?height=300&width=500",
      slug: "top-fuel-efficient-cars-india",
      tags: ["Fuel Efficiency", "Eco-friendly Cars", "Mileage", "Petrol Cars", "Diesel Cars"],
    },
    {
      id: 5,
      title: "The Rise of Compact SUVs in Urban India",
      excerpt: "Why compact SUVs are becoming the preferred choice for urban Indian families.",
      category: "Market Trends",
      date: "August 12, 2023",
      author: "Arjun Kapoor",
      image: "/placeholder.svg?height=300&width=500",
      slug: "rise-of-compact-suvs-urban-india",
      tags: ["SUVs", "Market Trends", "Urban Mobility", "Family Cars", "Automotive Industry"],
    },
  ]

  // Filter posts by tag (in a real app, this would be done server-side)
  const filteredPosts = taggedPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase().replace(/\s+/g, "-") === tag),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to Blog Link */}
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Tag Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Tag: {formattedTag}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Browse all articles tagged with {formattedTag.toLowerCase()}
        </p>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="overflow-hidden h-48">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                  <TagIcon className="h-4 w-4" />
                  <span>{post.category}</span>
                </div>
                <CardTitle className="text-lg">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <CardDescription className="text-gray-600 line-clamp-2">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No articles found</h2>
          <p className="text-gray-600 mb-6">We couldn't find any articles with the tag {formattedTag}.</p>
          <Button asChild>
            <Link href="/blog">Browse All Articles</Link>
          </Button>
        </div>
      )}

      {/* Popular Tags */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Explore Popular Tags</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Electric Vehicles",
            "SUVs",
            "Hatchbacks",
            "Sedans",
            "Maintenance",
            "Fuel Efficiency",
            "Safety",
            "Insurance",
            "Financing",
            "Resale Value",
          ].map((popularTag) => (
            <Link
              key={popularTag}
              href={`/blog/tag/${popularTag.toLowerCase().replace(/\s+/g, "-")}`}
              className={`bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full text-sm transition-colors ${
                popularTag.toLowerCase().replace(/\s+/g, "-") === tag ? "bg-blue-100 text-blue-700" : ""
              }`}
            >
              {popularTag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


