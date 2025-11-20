"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, User, Tag, Facebook, Twitter, Linkedin, Copy, ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@vehiverze/ui/avatar"

interface BlogPost {
  id: number
  title: string
  content: string
  category: string
  date: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  image: string
  tags: string[]
}

const blogPosts: Record<string, BlogPost> = {
  "future-of-electric-vehicles-india": {
    id: 1,
    title: "The Future of Electric Vehicles in India",
    content: `
      <p class="mb-4">The electric vehicle (EV) market in India is at a pivotal juncture. With increasing environmental concerns, rising fuel prices, and supportive government policies, the adoption of electric vehicles is gaining momentum across the country.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Current State of EVs in India</h2>
      
      <p class="mb-4">India's EV market is still in its nascent stage compared to global leaders like China, the US, and European countries. However, the sector has witnessed significant growth in recent years. According to industry reports, EV sales in India grew by over 160% in 2022-23 compared to the previous fiscal year.</p>
      
      <p class="mb-4">The two-wheeler segment dominates the EV market in India, accounting for nearly 80% of total EV sales. This is primarily due to the lower cost of ownership, ease of charging, and the urban commuting patterns in Indian cities.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Government Initiatives</h2>
      
      <p class="mb-4">The Indian government has introduced several initiatives to promote EV adoption:</p>
      
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Faster Adoption and Manufacturing of Electric Vehicles (FAME) scheme with an outlay of ₹10,000 crores</li>
        <li>Production Linked Incentive (PLI) scheme for Advanced Chemistry Cell (ACC) Battery Storage</li>
        <li>Reduced GST on electric vehicles from 12% to 5%</li>
        <li>Income tax deductions on interest paid on loans for EV purchases</li>
        <li>State-level incentives including road tax exemptions and subsidies</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Challenges in EV Adoption</h2>
      
      <p class="mb-4">Despite the positive growth, several challenges hinder the widespread adoption of EVs in India:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Charging Infrastructure</h3>
      
      <p class="mb-4">The lack of adequate charging infrastructure remains a significant barrier. As of 2023, India has approximately 2,500 public charging stations, which is insufficient for a country of its size. Range anxiety continues to be a major concern for potential EV buyers.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. High Initial Cost</h3>
      
      <p class="mb-4">EVs typically cost 20-30% more than their internal combustion engine (ICE) counterparts. Although the total cost of ownership over the vehicle's lifetime may be lower for EVs, the higher upfront cost deters many buyers, especially in a price-sensitive market like India.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Limited Model Options</h3>
      
      <p class="mb-4">The variety of EV models available in India is limited compared to conventional vehicles. This restricts consumer choice and slows adoption rates, particularly in the four-wheeler segment.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">The Road Ahead</h2>
      
      <p class="mb-4">Despite these challenges, the future of EVs in India looks promising. Industry experts predict that by 2030, EVs could account for 30% of all vehicle sales in India. Several factors will drive this growth:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Battery Technology Advancements</h3>
      
      <p class="mb-4">Improvements in battery technology are expected to reduce costs and increase range, addressing two major concerns simultaneously. The establishment of domestic battery manufacturing through the PLI scheme will further reduce costs.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Expanding Charging Network</h3>
      
      <p class="mb-4">Both public and private players are investing heavily in charging infrastructure. Companies like Tata Power, EESL, and Fortum are expanding their charging networks across major cities and highways.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. New Market Entrants</h3>
      
      <p class="mb-4">Traditional automakers and new startups are introducing new EV models across segments. This increased competition will lead to more options for consumers and potentially lower prices.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">The transition to electric mobility in India is inevitable, driven by environmental concerns, economic factors, and policy support. While challenges exist, the trajectory is positive. For consumers, this means more choices, better technology, and eventually, more affordable electric vehicles.</p>
      
      <p class="mb-4">As the ecosystem matures, we can expect to see innovative business models, such as battery swapping and subscription services, making EVs more accessible to the average Indian consumer. The future of electric vehicles in India is not just about transportation—it's about creating a sustainable and clean mobility ecosystem for generations to come.</p>
    `,
    category: "Electric Vehicles",
    date: "May 15, 2023",
    author: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Rahul is an automotive journalist with over 10 years of experience covering the Indian automobile industry. He specializes in electric vehicles and sustainable mobility solutions.",
    },
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Electric Vehicles", "Sustainability", "Automotive Industry", "Government Policy", "Future Mobility"],
  },
  "car-maintenance-monsoon-season": {
    id: 2,
    title: "How to Maintain Your Car During Monsoon Season",
    content: `
      <p class="mb-4">The monsoon season in India brings relief from the scorching summer heat, but it also presents unique challenges for vehicle owners. Heavy rainfall, waterlogged roads, and increased humidity can take a toll on your car if proper maintenance is neglected.</p>
      
      <p class="mb-4">In this comprehensive guide, we'll explore essential maintenance tips to keep your vehicle in optimal condition during the rainy season.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Pre-Monsoon Preparations</h2>
      
      <p class="mb-4">Before the monsoon arrives, it's crucial to prepare your vehicle for the wet conditions ahead:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Check and Replace Wiper Blades</h3>
      
      <p class="mb-4">Visibility is paramount during heavy rainfall. Inspect your wiper blades for signs of wear and tear. If they're leaving streaks or not clearing water effectively, it's time for a replacement. Consider upgrading to premium quality wiper blades that provide better visibility during downpours.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Inspect Lights and Electrical Components</h3>
      
      <p class="mb-4">Ensure all exterior lights—headlights, taillights, brake lights, and turn signals—are functioning correctly. Clean the light covers to maximize brightness. Additionally, check the battery terminals for corrosion, as increased humidity can accelerate corrosion.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Tire Inspection</h3>
      
      <p class="mb-4">Proper tire condition is essential for safe driving on wet roads. Check the tire tread depth—it should be at least 3-4mm for adequate grip on wet surfaces. Inspect for uneven wear patterns, cuts, or bulges. Also, maintain the recommended tire pressure, as both over-inflation and under-inflation can reduce traction on wet roads.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">4. Brake System Check</h3>
      
      <p class="mb-4">Have your brake system professionally inspected before the monsoon. Wet conditions demand optimal braking performance. Check brake pads, discs, and fluid levels. If you notice any squeaking sounds or reduced braking efficiency, address these issues immediately.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">During Monsoon Maintenance</h2>
      
      <p class="mb-4">Once the rainy season begins, regular maintenance becomes even more critical:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Exterior Care</h3>
      
      <p class="mb-4">Rainwater contains impurities that can damage your car's paint over time. Wash your car regularly, preferably with pH-neutral car shampoo. Apply a good quality wax or paint sealant before the monsoon starts to provide an additional protective layer against rainwater and contaminants.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Undercarriage Protection</h3>
      
      <p class="mb-4">The underside of your vehicle is particularly vulnerable during monsoons. Mud, water, and debris can accumulate and cause corrosion. Periodically wash the undercarriage or have it professionally cleaned. Consider applying anti-rust coating for additional protection.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Interior Moisture Control</h3>
      
      <p class="mb-4">Increased humidity can lead to mold and mildew growth inside your car. Use silica gel packets or dehumidifiers to absorb excess moisture. Regularly check and clean floor mats, as they can retain water. If possible, park your car in covered areas to minimize interior moisture.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">4. Engine Protection</h3>
      
      <p class="mb-4">Water entering the engine can cause severe damage. Avoid driving through deeply waterlogged areas. If you must drive through standing water, maintain a steady, slow speed in a lower gear. After driving through water, lightly tap the brake pedal a few times to dry the brakes.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Common Monsoon-Related Issues and Solutions</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Foggy Windows</h3>
      
      <p class="mb-4">The temperature difference between the inside and outside of your car can cause windows to fog up, reducing visibility. Use your car's defogger system effectively. For immediate clearing, turn on the AC in fresh air mode rather than recirculation.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Electrical Malfunctions</h3>
      
      <p class="mb-4">Water exposure can cause short circuits and electrical failures. Keep all electronic components dry. If you notice any unusual behavior in the electrical system, have it checked by a professional immediately.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Hydroplaning</h3>
      
      <p class="mb-4">Hydroplaning occurs when your tires lose contact with the road due to a layer of water. To prevent this, maintain appropriate speed, avoid sudden maneuvers, and ensure proper tire condition. If hydroplaning occurs, don't brake suddenly—ease off the accelerator and steer gently in the direction you want to go.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Post-Monsoon Care</h2>
      
      <p class="mb-4">After the monsoon season ends, it's advisable to:</p>
      
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Have a thorough inspection of your car's undercarriage for signs of rust or damage</li>
        <li>Check all fluid levels and quality, including engine oil, brake fluid, and coolant</li>
        <li>Clean and dry the interiors thoroughly to prevent any lingering moisture issues</li>
        <li>Consider a professional service to address any monsoon-related wear and tear</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">Proper maintenance during the monsoon season not only ensures your safety but also extends the life of your vehicle. By following these guidelines, you can navigate the rainy season with confidence and keep your car in excellent condition despite the challenging weather conditions.</p>
      
      <p class="mb-4">Remember, prevention is always better than cure. A little extra care during the monsoon can save you from costly repairs and ensure a smooth driving experience regardless of the weather.</p>
    `,
    category: "Maintenance",
    date: "June 22, 2023",
    author: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Priya is an automotive engineer and certified car maintenance expert with a passion for educating vehicle owners on proper maintenance practices.",
    },
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Car Maintenance", "Monsoon Season", "Vehicle Care", "Safety Tips", "Driving Tips"],
  },
  "vehicle-financing-options-2023": {
    id: 3,
    title: "Understanding Vehicle Financing Options in 2023",
    content: `
      <p class="mb-4">Purchasing a vehicle is a significant financial decision, and understanding the various financing options available can help you make an informed choice. In 2023, the vehicle financing landscape in India has evolved with new products, digital platforms, and changing interest rate scenarios.</p>
      
      <p class="mb-4">This guide explores the different financing options available to Indian consumers and provides insights to help you choose the most suitable option for your needs.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Traditional Bank Loans</h2>
      
      <p class="mb-4">Bank loans remain one of the most popular financing options for vehicle purchases. Here's what you need to know about bank auto loans in 2023:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Interest Rates</h3>
      
      <p class="mb-4">As of 2023, interest rates for car loans from major banks range between 7.25% to 12.5% per annum. The exact rate depends on various factors including your credit score, loan amount, tenure, and the type of vehicle (new or used).</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Loan Tenure</h3>
      
      <p class="mb-4">Most banks offer loan tenures ranging from 1 to 7 years. While longer tenures reduce your monthly EMI, they increase the total interest paid over the loan period. It's advisable to choose the shortest tenure that fits comfortably within your budget.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Down Payment</h3>
      
      <p class="mb-4">Banks typically finance up to 80-90% of the vehicle's on-road price, requiring you to make a down payment of 10-20%. Making a larger down payment reduces your loan amount and consequently your EMI and total interest outgo.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Processing Fees and Charges</h3>
      
      <p class="mb-4">Most banks charge a processing fee ranging from 0.5% to 2% of the loan amount, subject to a minimum amount. Additionally, there might be documentation charges, stamp duty, and foreclosure charges if you decide to repay the loan before the tenure ends.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Manufacturer-Backed Financing</h2>
      
      <p class="mb-4">Many automobile manufacturers have their own financing arms or partnerships with financial institutions to offer attractive financing schemes:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Low or Zero Interest Schemes</h3>
      
      <p class="mb-4">Manufacturers occasionally offer promotional schemes with low or zero interest rates. While these seem attractive, they often come with conditions such as a higher down payment or a shorter loan tenure. Always read the fine print and calculate the effective cost.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Balloon Payment Schemes</h3>
      
      <p class="mb-4">Some manufacturers offer balloon payment schemes where you pay lower EMIs throughout the loan tenure but make a large final payment (balloon payment) at the end. This reduces your monthly outflow but requires financial planning for the final payment.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Bundled Offers</h3>
      
      <p class="mb-4">Manufacturer financing often comes bundled with benefits like free insurance for the first year, extended warranty, or maintenance packages. These can provide good value if you were planning to purchase these services anyway.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Non-Banking Financial Companies (NBFCs)</h2>
      
      <p class="mb-4">NBFCs have become significant players in the vehicle financing market, often offering more flexible terms than traditional banks:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Faster Processing</h3>
      
      <p class="mb-4">NBFCs typically have faster loan approval and disbursement processes compared to banks. This can be advantageous if you need quick financing.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Flexible Eligibility Criteria</h3>
      
      <p class="mb-4">NBFCs often have more relaxed eligibility criteria and may be willing to finance customers with lower credit scores or limited credit history. However, this flexibility usually comes at the cost of higher interest rates.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Specialized Used Car Financing</h3>
      
      <p class="mb-4">Several NBFCs specialize in used car financing, offering tailored products for pre-owned vehicles that might be more suitable than generic bank loans.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Digital Lending Platforms</h2>
      
      <p class="mb-4">The rise of fintech has introduced digital lending platforms that offer end-to-end online vehicle financing solutions:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Convenience and Speed</h3>
      
      <p class="mb-4">Digital platforms offer the convenience of applying for loans from home, with minimal documentation and quick approvals. Some platforms provide in-principle approval within minutes.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Comparison Tools</h3>
      
      <p class="mb-4">Many digital platforms allow you to compare loan offers from multiple lenders, helping you find the most competitive rates and terms.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Innovative Features</h3>
      
      <p class="mb-4">Some digital lenders offer innovative features like flexible repayment options, no foreclosure charges, or the ability to adjust your EMI based on your cash flow.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Lease vs. Buy</h2>
      
      <p class="mb-4">Vehicle leasing has gained popularity in India as an alternative to traditional ownership:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Lower Monthly Payments</h3>
      
      <p class="mb-4">Leasing typically involves lower monthly payments compared to loan EMIs for the same vehicle, as you're only paying for the depreciation during the lease period rather than the entire vehicle cost.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Maintenance Benefits</h3>
      
      <p class="mb-4">Many leasing arrangements include maintenance packages, reducing your worry about service costs. This can be particularly beneficial for luxury vehicles with high maintenance costs.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Flexibility to Upgrade</h3>
      
      <p class="mb-4">Leasing allows you to drive a new vehicle every few years without the hassle of selling your old vehicle. This is ideal if you enjoy having the latest models or technology.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Factors to Consider When Choosing a Financing Option</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Total Cost of Ownership</h3>
      
      <p class="mb-4">Look beyond the EMI and consider the total cost including interest, processing fees, insurance, and maintenance. A slightly higher EMI might sometimes result in a lower total cost over the loan period.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Prepayment Options</h3>
      
      <p class="mb-4">Check if the lender allows prepayment or foreclosure of the loan without penalties. This flexibility can be valuable if your financial situation improves and you want to reduce your debt burden.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Insurance Requirements</h3>
      
      <p class="mb-4">Some lenders have specific requirements regarding insurance coverage. Understanding these requirements can help you budget appropriately.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">4. Your Credit Profile</h3>
      
      <p class="mb-4">Your credit score significantly impacts the interest rate you're offered. If your score is less than ideal, consider working on improving it before applying for a loan, or explore lenders who specialize in serving customers with your credit profile.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">The vehicle financing landscape in 2023 offers numerous options to suit different needs and financial situations. By understanding the various products available and carefully considering factors like interest rates, tenure, and total cost, you can make an informed decision that aligns with your financial goals.</p>
      
      <p class="mb-4">Remember that the cheapest financing option isn't always the best—convenience, flexibility, and additional benefits can sometimes outweigh a slightly higher interest rate. Take your time to research, compare offers, and choose a financing solution that provides the best overall value for your specific circumstances.</p>
    `,
    category: "Finance",
    date: "July 10, 2023",
    author: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Vikram is a financial analyst specializing in automotive financing. He has worked with leading financial institutions and has helped thousands of customers make informed vehicle financing decisions.",
    },
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Vehicle Financing", "Car Loans", "Auto Leasing", "Financial Planning", "EMI"],
  },
}

export function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch the post data from an API
    // For this example, we're using the static data defined above
    setPost(blogPosts[slug] || null)
  }, [slug])

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back to Blog Link */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Category */}
        <div className="mb-4">
          <Link
            href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            <Tag className="h-3 w-3" />
            {post.category}
          </Link>
        </div>

        {/* Post Title */}
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {/* Post Meta */}
        <div className="flex items-center gap-6 mb-8 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-3">Share This Article</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={copyToClipboard}>
              {copied ? <span className="text-green-600 text-xs">Copied!</span> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Author Bio */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex gap-4 items-start">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold mb-2">About {post.author.name}</h3>
                <p className="text-gray-600 mb-4">{post.author.bio}</p>
                <Button variant="outline" size="sm">
                  View All Posts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(blogPosts)
              .filter((relatedPost) => relatedPost.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="overflow-hidden h-40">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-xs text-blue-600 mb-2">
                      <Tag className="h-3 w-3" />
                      <span>{relatedPost.category}</span>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{relatedPost.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}


