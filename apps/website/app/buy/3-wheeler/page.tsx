import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@vehiverze/ui/button";
import { Card, CardContent } from "@vehiverze/ui/card";
import { Badge } from "@vehiverze/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";
import {
  CheckCircle,
  Shield,
  Truck,
  CreditCard,
  FileText,
  Star,
  Filter,
} from "lucide-react";
import { VehicleTypeContent } from "@/components/vehicle-type-content";

export const metadata: Metadata = {
  title:
    "Buy Used 3 Wheelers Online | Certified Auto Rickshaw & Cargo Autos – Vehiverze",
  description:
    "Explore certified used 3-wheelers in India. Buy passenger autos, cargo autos & e-rickshaws from Bajaj, Piaggio, Mahindra & more. EMI, RC, and permit transfer included.",
  keywords:
    "buy used auto rickshaw, second hand 3-wheeler in India, cargo auto for sale, passenger auto verified, pre-owned commercial 3-wheeler, Bajaj auto rickshaw, Piaggio Ape",
  openGraph: {
    title:
      "Buy Used 3 Wheelers Online | Certified Auto Rickshaw & Cargo Autos – Vehiverze",
    description:
      "Explore certified used 3-wheelers in India. Buy passenger autos, cargo autos & e-rickshaws from Bajaj, Piaggio, Mahindra & more. EMI, RC, and permit transfer included.",
    type: "website",
  },
};

export default function ThreeWheelerPage() {
  const vehicles = [
    {
      id: 1,
      name: "Bajaj RE Passenger Auto",
      year: 2020,
      km: "45,000 km",
      price: "₹1,85,000",
      originalPrice: "₹2,10,000",
      location: "Mumbai",
      image: "/bajaj-re-auto-rickshaw.png",
      verified: true,
      features: ["CNG", "Commercial Permit", "Good Condition"],
    },
    {
      id: 2,
      name: "Piaggio Ape City Cargo",
      year: 2021,
      km: "25,000 km",
      price: "₹1,45,000",
      originalPrice: "₹1,65,000",
      location: "Delhi",
      image: "/piaggio-ape-city-cargo.png",
      verified: true,
      features: ["Diesel", "Goods Carrier", "Single Owner"],
    },
    {
      id: 3,
      name: "Mahindra Alfa Load",
      year: 2019,
      km: "60,000 km",
      price: "₹1,25,000",
      originalPrice: "₹1,45,000",
      location: "Bangalore",
      image: "/mahindra-alfa-load.png",
      verified: true,
      features: ["Diesel", "High Payload", "Well Maintained"],
    },
    {
      id: 4,
      name: "TVS King Passenger",
      year: 2020,
      km: "38,000 km",
      price: "₹1,65,000",
      originalPrice: "₹1,85,000",
      location: "Pune",
      image: "/tvs-king-passenger-auto.png",
      verified: true,
      features: ["CNG", "Comfortable Seating", "All Papers Clear"],
    },
    {
      id: 5,
      name: "Bajaj Maxima Cargo",
      year: 2021,
      km: "20,000 km",
      price: "₹1,55,000",
      originalPrice: "₹1,75,000",
      location: "Chennai",
      image: "/bajaj-maxima-cargo.png",
      verified: true,
      features: ["Diesel", "Large Loading Space", "Business Ready"],
    },
    {
      id: 6,
      name: "Piaggio Ape Xtra LDX",
      year: 2019,
      km: "55,000 km",
      price: "₹1,35,000",
      originalPrice: "₹1,55,000",
      location: "Hyderabad",
      image: "/piaggio-ape-xtra-ldx.png",
      verified: true,
      features: ["Diesel", "Heavy Duty", "Commercial Use"],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Buy", href: "/buy" },
            { label: "Three Wheeler Vehicles", href: "/buy/3-wheeler" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Buy Certified Pre-Owned 3 Wheelers
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              India's Trusted Marketplace for Auto Rickshaw & Commercial 3
              Wheelers
            </p>
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
        <div className="container mx-auto px-4"></div>
      </section>

      {/* Vehicle Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <VehicleTypeContent
            vehicleType="3-wheeler"
            title="Three Wheeler Vehicles"
            description="Browse our collection of auto rickshaws, cargo autos, and other three-wheeler vehicles"
          />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Buying Used 3 Wheelers in India
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Looking to buy a second-hand 3 wheeler in India? Vehiverze is
                  your trusted marketplace for certified pre-owned auto
                  rickshaws, cargo autos, and commercial 3 wheelers. We offer an
                  extensive collection of verified vehicles from top brands like
                  Bajaj, Piaggio, Mahindra, TVS, and Force Motors. Every vehicle
                  undergoes specialized commercial vehicle inspection to ensure
                  business readiness.
                </p>
                <p>
                  Whether you're starting a passenger transport business, need a
                  cargo auto for goods delivery, or looking for an e-rickshaw
                  for eco-friendly transport, Vehiverze has the perfect 3
                  wheeler for your commercial needs. With transparent pricing,
                  commercial vehicle financing, and complete permit transfer
                  support, starting your business has never been easier.
                </p>
              </div>
            </div>

            {/* Types of 3 Wheelers */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Types of Used 3 Wheelers Available
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Passenger Auto Rickshaw",
                    description:
                      "CNG/Petrol autos for passenger transport business",
                    examples: "Bajaj RE, TVS King, Piaggio Ape City",
                    priceRange: "₹1,50,000 - ₹3,00,000",
                    features: [
                      "Commercial Permit",
                      "Passenger Seating",
                      "CNG/Petrol",
                    ],
                  },
                  {
                    title: "Cargo Auto (Goods Carrier)",
                    description:
                      "Commercial 3-wheelers for goods transportation",
                    examples:
                      "Mahindra Alfa Load, Bajaj Maxima, Piaggio Ape Xtra",
                    priceRange: "₹1,20,000 - ₹2,50,000",
                    features: [
                      "High Payload",
                      "Goods Carrier Permit",
                      "Diesel Engine",
                    ],
                  },
                  {
                    title: "E-Rickshaw",
                    description:
                      "Electric 3-wheelers for eco-friendly transport",
                    examples: "Mahindra e-Alfa Mini, TVS King Electric",
                    priceRange: "₹80,000 - ₹1,50,000",
                    features: [
                      "Electric Motor",
                      "Eco-Friendly",
                      "Low Operating Cost",
                    ],
                  },
                ].map((type, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">
                        {type.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        Popular: {type.examples}
                      </p>
                      <Badge variant="secondary" className="mb-3">
                        {type.priceRange}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {type.features.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Popular 3 Wheeler Brands
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    brand: "Bajaj",
                    description:
                      "India's leading 3 wheeler manufacturer with reliable auto rickshaws",
                    popular: "Bajaj RE, Maxima Cargo, Compact RE",
                    priceRange: "₹1,20,000 - ₹2,80,000",
                    specialty: "CNG & Diesel variants available",
                  },
                  {
                    brand: "Piaggio",
                    description:
                      "Italian brand known for robust cargo and passenger 3 wheelers",
                    popular: "Ape City, Ape Xtra LDX, Ape Auto",
                    priceRange: "₹1,30,000 - ₹2,50,000",
                    specialty: "High payload capacity",
                  },
                  {
                    brand: "Mahindra",
                    description:
                      "Trusted Indian brand with strong commercial vehicle portfolio",
                    popular: "Alfa Load, e-Alfa Mini, Jeeto",
                    priceRange: "₹80,000 - ₹2,20,000",
                    specialty: "Electric & diesel options",
                  },
                  {
                    brand: "TVS",
                    description:
                      "Reliable 3 wheelers with modern features and technology",
                    popular: "TVS King, King Deluxe, King CNG",
                    priceRange: "₹1,40,000 - ₹2,60,000",
                    specialty: "Comfortable passenger seating",
                  },
                ].map((brand, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {brand.brand}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">
                        {brand.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        Popular Models: {brand.popular}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{brand.priceRange}</Badge>
                        <span className="text-xs text-blue-600">
                          {brand.specialty}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Buy in Top Cities */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Buy Used 3 Wheelers in Top Cities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    city: "Mumbai",
                    description:
                      "Buy used 3 wheelers in Mumbai starting at ₹80,000. Choose from passenger autos, cargo vehicles, and e-rickshaws verified by Vehiverze. Easy EMI and same-day RC transfer available in Mumbai, Thane, and Navi Mumbai.",
                    popular: "Bajaj RE, Piaggio Ape City, TVS King",
                    count: "150+ vehicles",
                    permits: "Commercial permits verified",
                  },
                  {
                    city: "Delhi NCR",
                    description:
                      "Explore certified used auto rickshaws in Delhi NCR starting from ₹85,000. Wide selection of CNG autos and cargo vehicles available in Delhi, Gurgaon, Noida, and Faridabad with complete documentation support.",
                    popular: "Bajaj RE CNG, TVS King CNG, Mahindra Alfa",
                    count: "200+ vehicles",
                    permits: "CNG permits available",
                  },
                  {
                    city: "Bangalore",
                    description:
                      "Buy pre-owned 3 wheelers in Bangalore from ₹90,000. Perfect for goods delivery and passenger transport business. All vehicles come with verified permits and comprehensive insurance support.",
                    popular: "Piaggio Ape Xtra, Bajaj Maxima, TVS King",
                    count: "120+ vehicles",
                    permits: "Goods carrier permits",
                  },
                  {
                    city: "Pune",
                    description:
                      "Find the best deals on used auto rickshaws in Pune starting at ₹82,000. Ideal for starting passenger transport or goods delivery business with flexible commercial vehicle financing options.",
                    popular: "Bajaj RE, Mahindra Alfa Load, Piaggio Ape",
                    count: "100+ vehicles",
                    permits: "All permits verified",
                  },
                ].map((city, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {city.city}
                        </h3>
                        <Badge variant="secondary">{city.count}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3 text-sm">
                        {city.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        Popular: {city.popular}
                      </p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Vehiverze for Used 3 Wheelers?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
                    title: "Commercial Vehicle Expertise",
                    description:
                      "Specialized inspection for 3 wheelers including engine, transmission, brakes, and commercial fitness verification by certified mechanics.",
                  },
                  {
                    icon: <Shield className="h-8 w-8 text-blue-600" />,
                    title: "Permit Verification",
                    description:
                      "All commercial permits, fitness certificates, and route permits verified. Complete transparency in vehicle legality and business readiness.",
                  },
                  {
                    icon: <Truck className="h-8 w-8 text-purple-600" />,
                    title: "Business Ready Vehicles",
                    description:
                      "All 3 wheelers are business-ready with valid permits, insurance, and fitness certificates. Start earning from day one of purchase.",
                  },
                  {
                    icon: <CreditCard className="h-8 w-8 text-orange-600" />,
                    title: "Commercial Vehicle Loans",
                    description:
                      "Special EMI plans for commercial buyers with instant loan approval. Financing up to 90% of vehicle value with competitive rates.",
                  },
                  {
                    icon: <FileText className="h-8 w-8 text-red-600" />,
                    title: "Complete Documentation",
                    description:
                      "RC, Insurance, Permit, and Fitness certificate transfer handled by our team. All paperwork completed within 7 days of purchase.",
                  },
                  {
                    icon: <Star className="h-8 w-8 text-yellow-600" />,
                    title: "Pan-India Network",
                    description:
                      "Available in 100+ cities across India with local support teams. Doorstep delivery and pickup services in major cities.",
                  },
                ].map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Trusted by Commercial Vehicle Buyers
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🏆 Startup India Registered
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  ✅ Trusted by 5,000+ Business Owners
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🔒 ISO Certified Platform
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  ⭐ 4.7/5 Customer Rating
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🛡️ Verified Commercial Sellers
                </Badge>
              </div>
            </div>

            {/* FAQs */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question:
                      "What is the price of a second-hand 3 wheeler in India?",
                    answer:
                      "Used 3 wheeler prices in India start from ₹80,000 for e-rickshaws and can go up to ₹3,00,000 for premium passenger autos. The price depends on the brand, model, year, condition, and type of permit.",
                  },
                  {
                    question: "Which is the best 3 wheeler brand in India?",
                    answer:
                      "Popular 3 wheeler brands include Bajaj for reliable auto rickshaws, Piaggio for high payload cargo vehicles, Mahindra for electric options, and TVS for comfortable passenger transport.",
                  },
                  {
                    question: "Can I get a loan for a used 3 wheeler?",
                    answer:
                      "Yes, Vehiverze offers commercial vehicle loans for used 3 wheelers with instant approval. You can get financing up to 90% of the vehicle value with competitive interest rates starting from 11.99% per annum.",
                  },
                  {
                    question: "Is RC and permit transfer included in purchase?",
                    answer:
                      "Yes, RC transfer and permit transfer are completely handled by our team. We ensure all commercial permits, fitness certificates, and route permits are transferred within 7 days of purchase.",
                  },
                  {
                    question: "Do you provide warranty on used 3 wheelers?",
                    answer:
                      "All 3 wheelers come with detailed inspection reports and optional extended warranty plans. We also provide complete service history and permit verification for transparency.",
                  },
                  {
                    question: "How do I sell my 3 wheeler on Vehiverze?",
                    answer:
                      "You can sell your 3 wheeler easily on Vehiverze. Visit our 'Sell Your 3 Wheeler' page, get an instant quote, schedule a free inspection, and get paid within 24 hours of vehicle pickup.",
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Internal Links */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Explore More
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <a href="/sell/3-wheeler">Sell Your 3 Wheeler</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/6-wheeler">Buy Used Trucks</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/2-wheeler">Buy Used 2 Wheelers</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/garage-services">3 Wheeler Services</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
