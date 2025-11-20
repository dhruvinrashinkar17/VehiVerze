"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Calendar, User, Tag, ArrowRight } from "lucide-react"
import { Input } from "@vehiverze/ui/input"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@vehiverze/ui/card"

export function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Electric Vehicles in India",
      excerpt:
        "Exploring the growth and potential of electric vehicles in the Indian market and what it means for consumers.",
      category: "Electric Vehicles",
      date: "May 15, 2023",
      author: "Rahul Sharma",
      image: "/placeholder.svg?height=400&width=600",
      slug: "future-of-electric-vehicles-india",
    },
    {
      id: 2,
      title: "How to Maintain Your Car During Monsoon Season",
      excerpt: "Essential tips to keep your vehicle in top condition during India's heavy monsoon season.",
      category: "Maintenance",
      date: "June 22, 2023",
      author: "Priya Patel",
      image: "/placeholder.svg?height=400&width=600",
      slug: "car-maintenance-monsoon-season",
    },
    {
      id: 3,
      title: "Understanding Vehicle Financing Options in 2023",
      excerpt: "A comprehensive guide to the best financing options available for vehicle purchases this year.",
      category: "Finance",
      date: "July 10, 2023",
      author: "Vikram Singh",
      image: "/placeholder.svg?height=400&width=600",
      slug: "vehicle-financing-options-2023",
    },
  ]

  const recentPosts = [
    {
      id: 4,
      title: "Top 10 Fuel-Efficient Cars in India",
      excerpt: "Discover the most fuel-efficient cars available in the Indian market today.",
      category: "Fuel Efficiency",
      date: "August 5, 2023",
      author: "Ananya Desai",
      image: "/placeholder.svg?height=300&width=500",
      slug: "top-fuel-efficient-cars-india",
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
    },
    {
      id: 6,
      title: "Essential Safety Features to Look for When Buying a New Car",
      excerpt: "A guide to the most important safety features that should be on your checklist.",
      category: "Safety",
      date: "August 18, 2023",
      author: "Neha Gupta",
      image: "/placeholder.svg?height=300&width=500",
      slug: "essential-safety-features-new-car",
    },
    {
      id: 7,
      title: "How to Get the Best Resale Value for Your Vehicle",
      excerpt: "Tips and strategies to maximize the resale value of your car when it's time to sell.",
      category: "Selling",
      date: "August 25, 2023",
      image: "/placeholder.svg?height=300&width=500",
      slug: "best-resale-value-vehicle",
    },
  ]

  const categories = [
    { name: "Electric Vehicles", count: 15 },
    { name: "Maintenance", count: 23 },
    { name: "Market Trends", count: 18 },
    { name: "Safety", count: 12 },
    { name: "Fuel Efficiency", count: 9 },
    { name: "Finance", count: 14 },
    { name: "Selling", count: 11 },
    { name: "Buying Guide", count: 20 },
  ]

  const popularTags = [
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
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Vehiverze Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest automotive news, tips, and insights from our experts
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search articles..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog Posts */}
        <div className="lg:col-span-2">
          {/* Featured Posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Featured Articles</h2>
            <div className="grid grid-cols-1 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                          <Tag className="h-4 w-4" />
                          <span>{post.category}</span>
                        </div>
                        <CardTitle className="mb-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-gray-600 mb-4">{post.excerpt}</CardDescription>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
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
                      <Tag className="h-4 w-4" />
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
            <div className="mt-8 text-center">
              <Button variant="outline" className="px-6">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name} className="flex justify-between items-center">
                    <Link
                      href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card>
            <CardHeader>
              <CardTitle>Subscribe to Our Newsletter</CardTitle>
              <CardDescription>Get the latest automotive news and updates delivered to your inbox</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input type="email" placeholder="Your email address" />
                <Button className="w-full">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


