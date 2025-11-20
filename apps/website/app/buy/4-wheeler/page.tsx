import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { CheckCircle, Shield, Truck, CreditCard, FileText, Star } from "lucide-react"
import { VehicleTypeContent } from "@/components/vehicle-type-content"

export const metadata: Metadata = {
  title: "Buy Used 4 Wheelers Online | Certified Pre-Owned Cars, SUVs & Commercial Vehicles – Vehiverze",
  description:
    "Explore certified used 4-wheelers in India. Buy cars, SUVs, hatchbacks & commercial vehicles from Maruti, Hyundai, Tata & more. EMI, RC transfer & doorstep delivery included.",
  keywords:
    "buy used cars online, certified second hand cars, affordable SUVs, used hatchbacks, pre-owned commercial vans, used 4 wheeler marketplace India, verified cars for sale",
  openGraph: {
    title: "Buy Used 4 Wheelers Online | Certified Pre-Owned Cars, SUVs & Commercial Vehicles – Vehiverze",
    description:
      "Explore certified used 4-wheelers in India. Buy cars, SUVs, hatchbacks & commercial vehicles from Maruti, Hyundai, Tata & more. EMI, RC transfer & doorstep delivery included.",
    type: "website",
  },
}

export default function FourWheelerPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Buy", href: "/buy" },
            { label: "Four Wheeler Vehicles", href: "/buy/4-wheeler" },
          ]}
        />
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <VehicleTypeContent
            vehicleType="4-wheeler"
            title="Four Wheeler Vehicles"
            description="Browse our collection of cars, SUVs, hatchbacks, and other four-wheeler vehicles"
          />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Buying Used 4 Wheelers in India</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Looking to buy a second-hand car in India? Vehiverze is your trusted marketplace for certified
                  pre-owned 4 wheelers including cars, SUVs, hatchbacks, sedans, and commercial vehicles. We offer an
                  extensive collection of verified vehicles from top brands like Maruti Suzuki, Hyundai, Tata, Mahindra,
                  Honda, Toyota, and more. Every vehicle undergoes 200+ quality checks to ensure you get the best value
                  for your money.
                </p>
                <p>
                  Whether you're looking for a fuel-efficient hatchback for city driving, a spacious SUV for family
                  trips, or a reliable sedan for daily commuting, Vehiverze has the perfect 4 wheeler for you. With
                  transparent pricing, easy car loans, and hassle-free RC transfer, buying your dream car has never been
                  easier.
                </p>
              </div>
            </div>

            {/* Types of 4 Wheelers */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Used 4 Wheelers Available</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Hatchback Cars",
                    description: "Compact cars perfect for city driving and parking",
                    examples: "Swift, i20, Baleno, Jazz, Polo",
                    priceRange: "₹2,00,000 - ₹8,00,000",
                    features: ["Fuel Efficient", "Easy Parking", "Low Maintenance"],
                  },
                  {
                    title: "Sedan Cars",
                    description: "Spacious family cars with comfort and style",
                    examples: "City, Verna, Dzire, Ciaz, Amaze",
                    priceRange: "₹3,00,000 - ₹15,00,000",
                    features: ["Spacious", "Comfortable", "Premium Feel"],
                  },
                  {
                    title: "SUV & MUV",
                    description: "Premium SUVs and multi-utility vehicles",
                    examples: "Creta, XUV700, Scorpio, Innova, Ertiga",
                    priceRange: "₹5,00,000 - ₹50,00,000",
                    features: ["High Ground Clearance", "7-Seater Options", "Powerful Engine"],
                  },
                  {
                    title: "Commercial Vehicles",
                    description: "Vans, pickups and commercial 4 wheelers",
                    examples: "Bolero Pickup, Ace, Super Ace, Tiago CNG",
                    priceRange: "₹3,00,000 - ₹12,00,000",
                    features: ["High Payload", "Business Ready", "CNG Options"],
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular 4 Wheeler Brands</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    brand: "Maruti Suzuki",
                    description: "India's largest car manufacturer with reliable and fuel-efficient vehicles",
                    popular: "Swift, Baleno, Dzire, Vitara Brezza",
                    priceRange: "₹2,50,000 - ₹12,00,000",
                    specialty: "Best resale value",
                  },
                  {
                    brand: "Hyundai",
                    description: "Premium features and modern design with excellent after-sales service",
                    popular: "i20, Creta, Verna, Venue",
                    priceRange: "₹3,00,000 - ₹20,00,000",
                    specialty: "Feature-rich vehicles",
                  },
                  {
                    brand: "Tata Motors",
                    description: "Safety-focused Indian brand with 5-star rated vehicles",
                    popular: "Nexon, Harrier, Safari, Altroz",
                    priceRange: "₹3,50,000 - ₹25,00,000",
                    specialty: "5-star safety rating",
                  },
                  {
                    brand: "Mahindra",
                    description: "SUV specialist with rugged and powerful vehicles",
                    popular: "XUV700, Scorpio, Thar, Bolero",
                    priceRange: "₹4,00,000 - ₹30,00,000",
                    specialty: "SUV expertise",
                  },
                  {
                    brand: "Honda",
                    description: "Japanese reliability with refined engines and premium interiors",
                    popular: "City, Amaze, WR-V, Jazz",
                    priceRange: "₹4,50,000 - ₹18,00,000",
                    specialty: "Refined engines",
                  },
                  {
                    brand: "Toyota",
                    description: "World-renowned reliability and durability with excellent build quality",
                    popular: "Innova Crysta, Fortuner, Glanza, Urban Cruiser",
                    priceRange: "₹6,00,000 - ₹45,00,000",
                    specialty: "Legendary reliability",
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Buy Used Cars in Top Cities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    city: "Mumbai",
                    description:
                      "Buy used cars in Mumbai starting at ₹2,00,000. Choose from hatchbacks, sedans, SUVs, and luxury cars verified by Vehiverze. Easy EMI and same-day RC transfer available in Mumbai, Thane, and Navi Mumbai.",
                    popular: "Swift, City, Creta, Innova",
                    count: "2,500+ vehicles",
                    speciality: "Largest inventory",
                  },
                  {
                    city: "Delhi NCR",
                    description:
                      "Explore certified used cars in Delhi NCR starting from ₹2,50,000. Wide selection of all car types available in Delhi, Gurgaon, Noida, and Faridabad with doorstep delivery and instant loan approval.",
                    popular: "i20, Verna, XUV700, Fortuner",
                    count: "3,000+ vehicles",
                    speciality: "Premium car hub",
                  },
                  {
                    city: "Bangalore",
                    description:
                      "Buy pre-owned cars in Bangalore from ₹2,20,000. Perfect for IT professionals with automatic and CNG variants. All cars come with verified documents and comprehensive insurance support.",
                    popular: "Baleno, Nexon, Harrier, Innova",
                    count: "2,000+ vehicles",
                    speciality: "Tech-savvy buyers",
                  },
                  {
                    city: "Pune",
                    description:
                      "Find the best deals on used cars in Pune starting at ₹2,10,000. Ideal for students and professionals with flexible EMI options and special weekend delivery services.",
                    popular: "Dzire, Amaze, Scorpio, Safari",
                    count: "1,800+ vehicles",
                    speciality: "Student-friendly deals",
                  },
                  {
                    city: "Chennai",
                    description:
                      "Buy certified used cars in Chennai from ₹2,30,000. Wide range of fuel-efficient and automatic cars perfect for city traffic with complete documentation support and Tamil-speaking staff.",
                    popular: "Swift, City, Creta, Innova",
                    count: "1,500+ vehicles",
                    speciality: "Fuel-efficient options",
                  },
                  {
                    city: "Hyderabad",
                    description:
                      "Discover quality pre-owned cars in Hyderabad starting from ₹2,00,000. Choose from budget to luxury cars with instant loan approval and free home test drive facility.",
                    popular: "i20, Verna, XUV500, Fortuner",
                    count: "1,200+ vehicles",
                    speciality: "Luxury car selection",
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
                        {city.speciality}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Why Choose Vehiverze */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Vehiverze for Used Cars?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
                    title: "200-Point Quality Inspection",
                    description:
                      "Every car undergoes comprehensive inspection including engine, transmission, brakes, electrical, AC, and body condition by certified automotive engineers.",
                  },
                  {
                    icon: <Shield className="h-8 w-8 text-blue-600" />,
                    title: "Certified & Verified",
                    description:
                      "All cars come with verified RC, insurance, and pollution certificates. Complete vehicle history and accident reports available for transparency.",
                  },
                  {
                    icon: <Truck className="h-8 w-8 text-purple-600" />,
                    title: "Free Home Delivery",
                    description:
                      "Get your car delivered to your doorstep for free in 100+ cities across India. Professional delivery team ensures safe transportation.",
                  },
                  {
                    icon: <CreditCard className="h-8 w-8 text-orange-600" />,
                    title: "Easy Car Loans",
                    description:
                      "Pre-approved car loans with instant approval. Financing up to 85% of car value with competitive interest rates starting from 8.99% per annum.",
                  },
                  {
                    icon: <FileText className="h-8 w-8 text-red-600" />,
                    title: "Hassle-free RC Transfer",
                    description:
                      "Complete RC transfer and documentation handled by our team. All paperwork completed within 7 days including insurance transfer and NOC.",
                  },
                  {
                    icon: <Star className="h-8 w-8 text-yellow-600" />,
                    title: "7-Day Return Policy",
                    description:
                      "Not satisfied with your purchase? Return the car within 7 days for a full refund. No questions asked guarantee with complete money-back.",
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

            {/* Internal Links */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <a href="/sell/4-wheeler">Sell Your Car</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/2-wheeler">Buy Used 2 Wheelers</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/6-wheeler">Buy Used Trucks</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/garage-services">Car Services</a>
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


