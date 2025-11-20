import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VehicleTypeContent, getVehicleTypeContent } from "@/components/vehicle-type-content"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Input } from "@vehiverze/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { CheckCircle, Shield, Truck, CreditCard, FileText, Wrench, Filter, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Buy Used 6 Wheeler Trucks Online | Certified Commercial 6 Wheeler Vehicles – Vehiverze",
  description:
    "Explore certified used 6-wheeler trucks in India. Buy Tata, Eicher, Ashok Leyland commercial trucks with permits. Commercial vehicle financing, RC transfer & doorstep delivery available.",
  keywords:
    "buy used 6-wheeler trucks, pre-owned Tata trucks, certified goods carrier, affordable commercial trucks, second hand 6-wheeler marketplace, Eicher trucks, Ashok Leyland commercial vehicles",
  openGraph: {
    title: "Buy Used 6 Wheeler Trucks Online | Certified Commercial 6 Wheeler Vehicles – Vehiverze",
    description:
      "Explore certified used 6-wheeler trucks in India. Buy Tata, Eicher, Ashok Leyland commercial trucks with permits. Commercial vehicle financing, RC transfer & doorstep delivery available.",
    type: "website",
  },
}

export default function SixWheelerPage() {
  const content = getVehicleTypeContent("6-wheeler")

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Buy", href: "/buy" },
            { label: "Six Wheeler Vehicles", href: "/buy/6-wheeler" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Buy Certified Pre-Owned 6 Wheelers</h1>
            <p className="text-xl text-gray-600 mb-6">India's Trusted Marketplace for Commercial 6 Wheeler Vehicles</p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge variant="outline" className="px-4 py-2">
                🏆 Best Services
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                ✅ 300 Quality Checks
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                🚚 Free Delivery
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                💳 Easy EMI
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          
        </div>
      </section>

      {/* Vehicle Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <VehicleTypeContent
            vehicleType="6-wheeler"
            title="Six Wheeler Vehicles"
            description="Browse our collection of commercial trucks, tippers, and other six-wheeler vehicles"
          />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Buying Used 6 Wheeler Trucks in India</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Looking to buy a second-hand 6 wheeler truck in India? Vehiverze is your trusted marketplace for
                  certified pre-owned commercial trucks from leading brands like Tata Motors, Eicher, Ashok Leyland,
                  Mahindra, and BharatBenz. We offer an extensive collection of verified commercial vehicles that
                  undergo 100+ point specialized inspection to ensure business readiness and operational efficiency.
                </p>
                <p>
                  Whether you need a goods carrier for transportation business, a tipper for construction work, or a
                  container truck for logistics operations, Vehiverze has the perfect 6 wheeler truck for your
                  commercial needs. With transparent pricing, specialized commercial vehicle financing, and complete
                  permit transfer support, expanding your fleet has never been easier.
                </p>
              </div>
            </div>

            {/* Types of 6 Wheeler Trucks */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Used 6 Wheeler Trucks Available</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Light Commercial Trucks",
                    description: "6-wheeler trucks for medium cargo transport and city logistics",
                    examples: "Tata 1109, Eicher Pro 1049, Mahindra Furio 14",
                    priceRange: "₹8,00,000 - ₹25,00,000",
                    features: ["Medium Payload", "City Permits", "Fuel Efficient"],
                  },
                  {
                    title: "Goods Carrier Trucks",
                    description: "Commercial goods transportation for inter-city logistics",
                    examples: "Ashok Leyland Ecomet, Tata LPT, BharatBenz 1617",
                    priceRange: "₹10,00,000 - ₹30,00,000",
                    features: ["High Payload", "Long Distance", "Robust Build"],
                  },
                  {
                    title: "Tipper Trucks",
                    description: "Construction and mining tipper vehicles for material transport",
                    examples: "Tata Signa, Eicher Pro 6025, Mahindra Blazo",
                    priceRange: "₹12,00,000 - ₹35,00,000",
                    features: ["Hydraulic Tipper", "Heavy Duty", "Mining Ready"],
                  },
                  {
                    title: "Container Trucks",
                    description: "Container transportation for port and warehouse operations",
                    examples: "BharatBenz 1617, Volvo FL, Tata Prima",
                    priceRange: "₹15,00,000 - ₹40,00,000",
                    features: ["Container Body", "Port Operations", "Long Haul"],
                  },
                ].map((type, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{type.title}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{type.description}</p>
                      <p className="text-xs text-gray-500 mb-2">Popular: {type.examples}</p>
                      <Badge variant="secondary" className="mb-3">
                        {type.priceRange}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {type.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Popular Brands */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular 6 Wheeler Truck Brands</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    brand: "Tata Motors",
                    description: "India's largest commercial vehicle manufacturer with reliable and durable trucks",
                    popular: "Tata 1109, Tata LPT 1109, Tata Signa 1918",
                    priceRange: "₹8,00,000 - ₹35,00,000",
                    specialty: "Market leader with extensive service network",
                  },
                  {
                    brand: "Eicher Motors",
                    description: "Premium commercial vehicles known for fuel efficiency and driver comfort",
                    popular: "Eicher Pro 1049, Eicher Pro 6025, Eicher Pro 8025",
                    priceRange: "₹10,00,000 - ₹32,00,000",
                    specialty: "Best-in-class fuel efficiency",
                  },
                  {
                    brand: "Ashok Leyland",
                    description: "Leading commercial vehicle brand with robust and powerful trucks",
                    popular: "Ecomet 1115, Ecomet 1214, Boss 1618",
                    priceRange: "₹9,00,000 - ₹30,00,000",
                    specialty: "Powerful engines and high payload capacity",
                  },
                  {
                    brand: "Mahindra Trucks",
                    description: "Innovative commercial vehicles with modern technology and features",
                    popular: "Blazo X 25, Furio 14, Blazo X 35",
                    priceRange: "₹11,00,000 - ₹28,00,000",
                    specialty: "Advanced technology and driver comfort",
                  },
                  {
                    brand: "BharatBenz",
                    description: "Mercedes-Benz technology with Indian engineering for premium trucks",
                    popular: "BharatBenz 1617, BharatBenz 2523",
                    priceRange: "₹15,00,000 - ₹40,00,000",
                    specialty: "German engineering and premium quality",
                  },
                  {
                    brand: "Force Motors",
                    description: "Reliable commercial vehicles with strong build quality and performance",
                    popular: "Force Traveller, Force Citiline, Force Trax",
                    priceRange: "₹8,50,000 - ₹25,00,000",
                    specialty: "Robust build and reliable performance",
                  },
                ].map((brand, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{brand.brand}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{brand.description}</p>
                      <p className="text-xs text-gray-500 mb-2">Popular Models: {brand.popular}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{brand.priceRange}</Badge>
                        <span className="text-xs text-blue-600">{brand.specialty}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Buy in Top Cities */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Buy Used 6 Wheeler Trucks in Top Cities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    city: "Mumbai",
                    description:
                      "Buy used 6 wheeler trucks in Mumbai starting at ₹8,00,000. Choose from goods carriers, tippers, and container trucks verified by Vehiverze. Easy commercial vehicle financing and same-day permit transfer available in Mumbai, Thane, and Navi Mumbai.",
                    popular: "Tata 1109, Eicher Pro 1049, Ashok Leyland Ecomet",
                    count: "200+ trucks",
                    permits: "All commercial permits verified",
                  },
                  {
                    city: "Delhi NCR",
                    description:
                      "Explore certified used 6 wheeler trucks in Delhi NCR starting from ₹9,00,000. Wide selection of commercial trucks available in Delhi, Gurgaon, Noida, and Faridabad with complete documentation support and BS6 compliant vehicles.",
                    popular: "BharatBenz 1617, Tata Signa, Mahindra Blazo",
                    count: "250+ trucks",
                    permits: "NCR permits and fitness certificates",
                  },
                  {
                    city: "Bangalore",
                    description:
                      "Buy pre-owned 6 wheeler trucks in Bangalore from ₹8,50,000. Perfect for logistics and transportation business. All trucks come with verified permits, fitness certificates, and comprehensive insurance support.",
                    popular: "Eicher Pro 6025, Tata LPT, Ashok Leyland Boss",
                    count: "150+ trucks",
                    permits: "Karnataka state permits verified",
                  },
                  {
                    city: "Pune",
                    description:
                      "Find the best deals on used 6 wheeler trucks in Pune starting at ₹8,20,000. Ideal for starting transportation or logistics business with flexible commercial vehicle financing options and quick loan approval.",
                    popular: "Tata 1109, Mahindra Furio, Eicher Pro 1049",
                    count: "120+ trucks",
                    permits: "Maharashtra permits and NOC available",
                  },
                  {
                    city: "Chennai",
                    description:
                      "Buy certified used 6 wheeler trucks in Chennai from ₹8,80,000. Wide range of commercial trucks perfect for goods transportation with complete documentation support and Tamil-speaking customer service.",
                    popular: "Ashok Leyland Ecomet, Tata Signa, BharatBenz",
                    count: "100+ trucks",
                    permits: "Tamil Nadu permits and fitness verified",
                  },
                  {
                    city: "Hyderabad",
                    description:
                      "Discover quality pre-owned 6 wheeler trucks in Hyderabad starting from ₹8,00,000. Choose from various commercial truck types with instant commercial vehicle loan approval and free inspection services.",
                    popular: "Mahindra Blazo, Eicher Pro, Tata LPT",
                    count: "90+ trucks",
                    permits: "Telangana permits and route permits",
                  },
                ].map((city, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{city.city}</h3>
                        <Badge variant="secondary">{city.count}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3 text-sm">{city.description}</p>
                      <p className="text-xs text-gray-500 mb-2">Popular: {city.popular}</p>
                      <Badge variant="outline" className="text-xs">
                        {city.permits}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Why Choose Vehiverze */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Vehiverze for Used 6 Wheeler Trucks?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
                    title: "100+ Point Commercial Inspection",
                    description:
                      "Every truck undergoes specialized commercial vehicle inspection including engine, transmission, brakes, hydraulics, and body condition by certified mechanics.",
                  },
                  {
                    icon: <Shield className="h-8 w-8 text-blue-600" />,
                    title: "Permit & Fitness Verified",
                    description:
                      "All commercial permits, fitness certificates, and route permits verified. Complete transparency in vehicle legality and business readiness.",
                  },
                  {
                    icon: <Truck className="h-8 w-8 text-purple-600" />,
                    title: "Business Ready Vehicles",
                    description:
                      "All 6 wheeler trucks are business-ready with valid permits, insurance, and fitness certificates. Start operations from day one of purchase.",
                  },
                  {
                    icon: <CreditCard className="h-8 w-8 text-orange-600" />,
                    title: "Commercial Vehicle Loans",
                    description:
                      "Specialized financing for commercial buyers with instant loan approval. Financing up to 90% of truck value with competitive interest rates.",
                  },
                  {
                    icon: <FileText className="h-8 w-8 text-red-600" />,
                    title: "Complete Documentation",
                    description:
                      "RC, Insurance, Fitness, and Permit transfer handled by our team. All commercial paperwork completed within 7 days of purchase.",
                  },
                  {
                    icon: <Wrench className="h-8 w-8 text-teal-600" />,
                    title: "Service History Verified",
                    description:
                      "Complete maintenance and service records available. Detailed inspection reports and service history for informed decision making.",
                  },
                ].map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">{feature.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trusted by Commercial Vehicle Buyers</h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🏆 Startup India Registered
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  ✅ Trusted by 8,000+ Business Owners
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🔒 ISO Certified Platform
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  ⭐ 4.7/5 Customer Rating
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🛡️ Verified Commercial Dealers
                </Badge>
              </div>
            </div>

            {/* FAQs */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "What is the price of a second-hand 6 wheeler truck in India?",
                    answer:
                      "Used 6 wheeler truck prices in India start from ₹8,00,000 for light commercial trucks and can go up to ₹40,00,000 for premium container trucks. The price depends on the brand, model, year, condition, kilometers driven, and type of body.",
                  },
                  {
                    question: "Which is the best 6 wheeler truck brand in India?",
                    answer:
                      "Popular 6 wheeler truck brands include Tata Motors for reliability and service network, Eicher for fuel efficiency, Ashok Leyland for powerful engines, Mahindra for modern technology, and BharatBenz for premium quality.",
                  },
                  {
                    question: "Can I get a loan for a used 6 wheeler truck?",
                    answer:
                      "Yes, Vehiverze offers commercial vehicle loans for used 6 wheeler trucks with instant approval. You can get financing up to 90% of the truck value with competitive interest rates starting from 11.99% per annum.",
                  },
                  {
                    question: "Is RC and permit transfer included in purchase?",
                    answer:
                      "Yes, RC transfer and permit transfer are completely handled by our team. We ensure all commercial permits, fitness certificates, and route permits are transferred within 7 days of purchase.",
                  },
                  {
                    question: "Do you provide warranty on used 6 wheeler trucks?",
                    answer:
                      "All trucks come with detailed 100+ point inspection reports and optional extended warranty plans. We also provide complete service history and permit verification for transparency.",
                  },
                  {
                    question: "How do I sell my 6 wheeler truck on Vehiverze?",
                    answer:
                      "You can sell your 6 wheeler truck easily on Vehiverze. Visit our 'Sell Your Truck' page, get an instant quote, schedule a free inspection, and get paid within 24 hours of truck pickup.",
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Internal Links */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <a href="/sell/6-wheeler">Sell Your 6 Wheeler Truck</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/more-than-8-wheeler">Buy Heavy Trucks</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/4-wheeler">Buy Used Cars</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/garage-services">Truck Services</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


