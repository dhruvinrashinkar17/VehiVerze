import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Input } from "@vehiverze/ui/input"
import { CitySelector } from "@/components/city-selector"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { CheckCircle, Shield, Truck, CreditCard, FileText, Star, Filter, Search } from "lucide-react"
import { VehicleTypeContent } from "@/components/vehicle-type-content"

export const metadata: Metadata = {
  title: "Buy Used 2 Wheelers Online | Certified Pre-Owned Bikes & Scooters – Vehiverze",
  description:
    "Explore certified used 2-wheelers in India. Buy motorcycles, scooters & bikes from Royal Enfield, Honda, Yamaha & more. EMI, RC transfer & doorstep delivery included.",
  keywords:
    "buy used bikes online, pre-owned motorcycles, certified used scooters, second hand bikes near me, Royal Enfield used bikes, Activa used scooters, verified 2 wheeler marketplace",
  openGraph: {
    title: "Buy Used 2 Wheelers Online | Certified Pre-Owned Bikes & Scooters – Vehiverze",
    description:
      "Explore certified used 2-wheelers in India. Buy motorcycles, scooters & bikes from Royal Enfield, Honda, Yamaha & more. EMI, RC transfer & doorstep delivery included.",
    type: "website",
  },
}

export default function TwoWheelerPage() {
  const vehicles = [
    {
      id: 1,
      name: "Royal Enfield Classic 350",
      year: 2020,
      km: "15,000 km",
      price: "₹1,25,000",
      originalPrice: "₹1,45,000",
      location: "Mumbai",
      image: "/royal-enfield-classic-350.png",
      verified: true,
      features: ["Single Owner", "Insurance Valid", "Service Records"],
    },
    {
      id: 2,
      name: "Honda Activa 6G",
      year: 2021,
      km: "8,500 km",
      price: "₹65,000",
      originalPrice: "₹75,000",
      location: "Delhi",
      image: "/honda-activa-6g.png",
      verified: true,
      features: ["Low KM", "Well Maintained", "Original Paint"],
    },
    {
      id: 3,
      name: "Yamaha FZ-S V3",
      year: 2019,
      km: "22,000 km",
      price: "₹85,000",
      originalPrice: "₹95,000",
      location: "Bangalore",
      image: "/yamaha-fz-s-v3.png",
      verified: true,
      features: ["ABS", "LED Headlight", "Digital Console"],
    },
    {
      id: 4,
      name: "Bajaj Pulsar NS200",
      year: 2020,
      km: "18,000 km",
      price: "₹95,000",
      originalPrice: "₹1,10,000",
      location: "Pune",
      image: "/bajaj-pulsar-ns200.png",
      verified: true,
      features: ["Sports Bike", "Good Condition", "All Papers Clear"],
    },
    {
      id: 5,
      name: "TVS Jupiter",
      year: 2021,
      km: "12,000 km",
      price: "₹58,000",
      originalPrice: "₹68,000",
      location: "Chennai",
      image: "/tvs-jupiter.png",
      verified: true,
      features: ["Fuel Efficient", "Comfortable", "Family Scooter"],
    },
    {
      id: 6,
      name: "Hero Splendor Plus",
      year: 2019,
      km: "25,000 km",
      price: "₹45,000",
      originalPrice: "₹55,000",
      location: "Hyderabad",
      image: "/hero-splendor-plus.png",
      verified: true,
      features: ["Commuter Bike", "Reliable", "Low Maintenance"],
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Buy", href: "/buy" },
            { label: "Two Wheeler Vehicles", href: "/buy/2-wheeler" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Buy Certified Pre-Owned 2 Wheelers</h1>
            <p className="text-xl text-gray-600 mb-6">India's Trusted Marketplace for Used Bikes & Scooters</p>
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
            vehicleType="2-wheeler"
            title="Two Wheeler Vehicles"
            description="Browse our collection of motorcycles, scooters, and other two-wheeler vehicles"
          />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Buying Used 2 Wheelers in India</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Looking to buy a second-hand 2 wheeler in India? Vehiverze is your trusted marketplace for certified pre-owned motorcycles and scooters. We offer an extensive collection of verified bikes from top brands like Royal Enfield, Honda, Yamaha, Bajaj, TVS, Hero, and more. Every vehicle undergoes 300+ quality checks to ensure you get the best value for your money.
                </p>
                <p>
                  Whether you're looking for a fuel-efficient commuter bike, a stylish scooter for city rides, or a
                  powerful motorcycle for weekend adventures, Vehiverze has the perfect 2 wheeler for you. With
                  transparent pricing, easy EMI options, and hassle-free RC transfer, buying your dream bike has never
                  been easier.
                </p>
              </div>
            </div>

            {/* Types of 2 Wheelers */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Used 2 Wheelers Available</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Commuter Bikes",
                    description: "Fuel-efficient bikes perfect for daily commuting",
                    examples: "Hero Splendor, Bajaj CT, Honda Shine",
                    priceRange: "₹25,000 - ₹70,000",
                  },
                  {
                    title: "Sports Bikes",
                    description: "High-performance motorcycles for enthusiasts",
                    examples: "Yamaha R15, KTM Duke, Bajaj Pulsar",
                    priceRange: "₹80,000 - ₹2,50,000",
                  },
                  {
                    title: "Scooters",
                    description: "Convenient and comfortable for city rides",
                    examples: "Honda Activa, TVS Jupiter, Suzuki Access",
                    priceRange: "₹35,000 - ₹90,000",
                  },
                  {
                    title: "Premium Motorcycles",
                    description: "Royal Enfield and premium bike segments",
                    examples: "Royal Enfield Classic, Himalayan, Interceptor",
                    priceRange: "₹1,00,000 - ₹3,00,000",
                  },
                ].map((type, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{type.title}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{type.description}</p>
                      <p className="text-xs text-gray-500 mb-2">Popular: {type.examples}</p>
                      <Badge variant="secondary">{type.priceRange}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Popular Brands */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular 2 Wheeler Brands</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    brand: "Royal Enfield",
                    description: "Premium motorcycles with classic styling and powerful engines",
                    popular: "Classic 350, Bullet, Himalayan",
                    priceRange: "₹1,00,000 - ₹3,00,000",
                  },
                  {
                    brand: "Honda",
                    description: "Reliable scooters and motorcycles known for fuel efficiency",
                    popular: "Activa, Shine, CB Hornet",
                    priceRange: "₹35,000 - ₹1,50,000",
                  },
                  {
                    brand: "Yamaha",
                    description: "Performance-oriented bikes with advanced technology",
                    popular: "FZ, R15, MT-15",
                    priceRange: "₹60,000 - ₹2,00,000",
                  },
                  {
                    brand: "Bajaj",
                    description: "Affordable and powerful motorcycles for all segments",
                    popular: "Pulsar, Avenger, Dominar",
                    priceRange: "₹40,000 - ₹2,50,000",
                  },
                  {
                    brand: "TVS",
                    description: "Innovative 2 wheelers with modern features",
                    popular: "Jupiter, Apache, Ntorq",
                    priceRange: "₹35,000 - ₹1,80,000",
                  },
                  {
                    brand: "Hero",
                    description: "India's largest 2 wheeler manufacturer",
                    popular: "Splendor, Passion, Xtreme",
                    priceRange: "₹25,000 - ₹1,20,000",
                  },
                ].map((brand, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{brand.brand}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{brand.description}</p>
                      <p className="text-xs text-gray-500 mb-2">Popular Models: {brand.popular}</p>
                      <Badge variant="outline">{brand.priceRange}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Buy in Top Cities */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Buy Used 2 Wheelers in Top Cities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    city: "Mumbai",
                    description:
                      "Buy used 2 wheelers in Mumbai starting at ₹25,000. Choose from motorcycles, scooters, and premium bikes verified by Vehiverze. Easy EMI and same-day RC transfer available in Mumbai, Thane, and Navi Mumbai.",
                    popular: "Honda Activa, Royal Enfield Classic, Bajaj Pulsar",
                    count: "500+ vehicles",
                  },
                  {
                    city: "Delhi NCR",
                    description:
                      "Explore certified used bikes in Delhi NCR starting from ₹30,000. Wide selection of commuter bikes, sports bikes, and scooters available in Delhi, Gurgaon, Noida, and Faridabad with doorstep delivery.",
                    popular: "Hero Splendor, Yamaha FZ, TVS Jupiter",
                    count: "600+ vehicles",
                  },
                  {
                    city: "Bangalore",
                    description:
                      "Buy pre-owned 2 wheelers in Bangalore from ₹28,000. Perfect for IT professionals and students. All bikes come with verified documents and comprehensive insurance support.",
                    popular: "Honda Shine, KTM Duke, Suzuki Access",
                    count: "400+ vehicles",
                  },
                  {
                    city: "Pune",
                    description:
                      "Find the best deals on used motorcycles and scooters in Pune starting at ₹26,000. Ideal for college students and working professionals with flexible EMI options.",
                    popular: "Bajaj Avenger, TVS Apache, Honda CB Hornet",
                    count: "350+ vehicles",
                  },
                  {
                    city: "Chennai",
                    description:
                      "Buy certified used 2 wheelers in Chennai from ₹27,000. Wide range of fuel-efficient bikes and scooters perfect for city commuting with complete documentation support.",
                    popular: "TVS Star City, Honda Activa, Royal Enfield",
                    count: "300+ vehicles",
                  },
                  {
                    city: "Hyderabad",
                    description:
                      "Discover quality pre-owned bikes in Hyderabad starting from ₹25,000. Choose from commuter bikes, premium motorcycles, and family scooters with instant loan approval.",
                    popular: "Hero Passion, Yamaha Fascino, Bajaj Dominar",
                    count: "280+ vehicles",
                  },
                ].map((city, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{city.city}</h3>
                        <Badge variant="secondary">{city.count}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3 text-sm">{city.description}</p>
                      <p className="text-xs text-gray-500">Popular: {city.popular}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Why Choose Vehiverze */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Vehiverze for Used 2 Wheelers?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
                    title: "50+ Quality Inspections",
                    description:
                      "Every bike undergoes comprehensive quality checks including engine, brakes, electrical, and body inspection by certified mechanics.",
                  },
                  {
                    icon: <Shield className="h-8 w-8 text-blue-600" />,
                    title: "Verified Documents",
                    description:
                      "All bikes come with verified RC, insurance, and pollution certificates. Complete transparency in vehicle history and ownership.",
                  },
                  {
                    icon: <Truck className="h-8 w-8 text-purple-600" />,
                    title: "Free Doorstep Delivery",
                    description:
                      "Get your bike delivered to your doorstep for free in Mumbai, Delhi, Bangalore, Pune, Chennai, and Hyderabad.",
                  },
                  {
                    icon: <CreditCard className="h-8 w-8 text-orange-600" />,
                    title: "Easy EMI Options",
                    description:
                      "Flexible financing options with instant loan approval. EMI starting from ₹2,000 per month with competitive interest rates.",
                  },
                  {
                    icon: <FileText className="h-8 w-8 text-red-600" />,
                    title: "Hassle-free RC Transfer",
                    description:
                      "Complete RC transfer support within 7 days. Our team handles all paperwork and RTO procedures for you.",
                  },
                  {
                    icon: <Star className="h-8 w-8 text-yellow-600" />,
                    title: "7-Day Return Policy",
                    description:
                      "Not satisfied with your purchase? Return the bike within 7 days for a full refund. No questions asked guarantee.",
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
            

            {/* FAQs */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "What is the price of a second-hand 2 wheeler in India?",
                    answer:
                      "Used 2 wheeler prices in India start from ₹25,000 for commuter bikes and can go up to ₹3,00,000 for premium motorcycles. The price depends on the brand, model, year, condition, and kilometers driven.",
                  },
                  {
                    question: "Which is the best 2 wheeler brand in India?",
                    answer:
                      "Popular 2 wheeler brands in India include Royal Enfield for premium motorcycles, Honda for reliable scooters, Yamaha for performance bikes, Bajaj for value-for-money options, and Hero for fuel-efficient commuter bikes.",
                  },
                  {
                    question: "Can I get a loan for a used 2 wheeler?",
                    answer:
                      "Yes, Vehiverze offers easy EMI options for used 2 wheelers with instant loan approval. You can get financing up to 85% of the vehicle value with competitive interest rates starting from 9.99% per annum.",
                  },
                  {
                    question: "Is RC transfer included in the purchase?",
                    answer:
                      "Yes, RC transfer is completely free and handled by our team. We ensure all paperwork is completed within 7 days of purchase, including RC transfer, insurance transfer, and NOC if required.",
                  },
                  {
                    question: "Do you provide warranty on used 2 wheelers?",
                    answer:
                      "All bikes come with a 7-day return policy and optional extended warranty plans. We also provide detailed inspection reports and service history for complete transparency.",
                  },
                  {
                    question: "How do I sell my 2 wheeler on Vehiverze?",
                    answer:
                      "You can sell your 2 wheeler easily on Vehiverze. Simply visit our 'Sell Your Bike' page, get an instant quote, schedule a free inspection, and get paid within 24 hours of vehicle pickup.",
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
                  <a href="/sell/2-wheeler">Sell Your 2 Wheeler</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/4-wheeler">Buy Used Cars</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/3-wheeler">Buy Used Auto Rickshaw</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/garage-services">2 Wheeler Services</a>
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


