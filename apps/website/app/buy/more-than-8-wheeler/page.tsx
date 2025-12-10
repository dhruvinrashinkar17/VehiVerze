import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { VehicleTypeContent } from "@/components/vehicle-type-content";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@vehiverze/ui/button";
import { Card, CardContent } from "@vehiverze/ui/card";
import { Badge } from "@vehiverze/ui/badge";
import { Input } from "@vehiverze/ui/input";
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
  Wrench,
  Filter,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Buy Used 8+ Wheeler Heavy Trucks Online | Certified Heavy Duty Vehicles – Vehiverze",
  description:
    "Explore certified used 8+ wheeler heavy trucks in India. Buy Tata Prima, Volvo, BharatBenz heavy vehicles with national permits. Heavy vehicle financing, RC transfer & doorstep delivery.",
  keywords:
    "buy used 8-wheeler trucks, certified heavy duty vehicles, pre-owned Tata Prima, second hand trailers, heavy truck marketplace, Volvo trucks, BharatBenz heavy vehicles, Ashok Leyland heavy trucks",
  openGraph: {
    title:
      "Buy Used 8+ Wheeler Heavy Trucks Online | Certified Heavy Duty Vehicles – Vehiverze",
    description:
      "Explore certified used 8+ wheeler heavy trucks in India. Buy Tata Prima, Volvo, BharatBenz heavy vehicles with national permits. Heavy vehicle financing, RC transfer & doorstep delivery.",
    type: "website",
  },
};

export default function MoreThanEightWheelerPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Buy", href: "/buy" },
            { label: "Heavy Trucks", href: "/buy/more-than-8-wheeler" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Buy Certified Pre-Owned 8+ Wheeler Heavy Trucks
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              India's Trusted Marketplace for Heavy Duty Vehicles & Trailers
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
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Filter Your Search
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tata">Tata Motors</SelectItem>
                    <SelectItem value="volvo">Volvo</SelectItem>
                    <SelectItem value="bharatbenz">BharatBenz</SelectItem>
                    <SelectItem value="ashok-leyland">Ashok Leyland</SelectItem>
                    <SelectItem value="scania">Scania</SelectItem>
                    <SelectItem value="man">MAN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trailer">Trailer Truck</SelectItem>
                    <SelectItem value="tipper">Heavy Tipper</SelectItem>
                    <SelectItem value="container">Container Truck</SelectItem>
                    <SelectItem value="bus">Luxury Bus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-30l">Under ₹30 Lakh</SelectItem>
                    <SelectItem value="30l-50l">₹30-50 Lakh</SelectItem>
                    <SelectItem value="50l-80l">₹50-80 Lakh</SelectItem>
                    <SelectItem value="80l+">Above ₹80 Lakh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi NCR</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search by model..." className="pl-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <VehicleTypeContent
            vehicleType="more-than-8-wheeler"
            title="Heavy Truck Vehicles"
            description="Browse our collection of heavy trucks, trailers, and other 8+ wheeler vehicles"
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
                About Buying Used 8+ Wheeler Heavy Trucks in India
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Looking to buy a second-hand 8+ wheeler heavy truck in India?
                  Vehiverze is your trusted marketplace for certified pre-owned
                  heavy commercial vehicles from premium brands like Tata Prima,
                  Volvo, BharatBenz, Ashok Leyland, Scania, and MAN. We offer an
                  extensive collection of verified heavy trucks that undergo
                  150+ point specialized inspection to ensure long-haul
                  operational readiness and maximum uptime.
                </p>
                <p>
                  Whether you need a trailer truck for long-distance logistics,
                  a heavy tipper for mining operations, a container truck for
                  port operations, or a luxury bus for passenger transport,
                  Vehiverze has the perfect heavy vehicle for your industrial
                  needs. With transparent pricing, specialized heavy vehicle
                  financing, and complete national permit transfer support,
                  scaling your operations has never been easier.
                </p>
              </div>
            </div>

            {/* Types of Heavy Trucks */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Types of Used 8+ Wheeler Heavy Vehicles Available
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Heavy Duty Trucks",
                    description:
                      "Multi-axle trucks for heavy cargo transport and long-haul operations",
                    examples: "Tata Prima, Volvo FH, BharatBenz 4928",
                    priceRange: "₹25,00,000 - ₹80,00,000",
                    features: ["High Payload", "Long Distance", "Multi-Axle"],
                  },
                  {
                    title: "Container Trailers",
                    description:
                      "Long-haul container transportation for logistics and port operations",
                    examples: "BharatBenz 4928, Scania R450, Volvo FM",
                    priceRange: "₹30,00,000 - ₹1,00,00,000",
                    features: [
                      "Container Body",
                      "Port Operations",
                      "International Standards",
                    ],
                  },
                  {
                    title: "Heavy Tipper Trucks",
                    description:
                      "Mining and construction tippers for heavy material transport",
                    examples:
                      "Tata Signa 4923, Volvo FM, Ashok Leyland Captain",
                    priceRange: "₹35,00,000 - ₹1,20,00,000",
                    features: [
                      "Mining Ready",
                      "Heavy Duty Tipper",
                      "High Capacity",
                    ],
                  },
                  {
                    title: "Luxury Buses",
                    description:
                      "Multi-axle passenger buses for long-distance travel",
                    examples: "Volvo 9400, Scania Metrolink, MAN Lion's Coach",
                    priceRange: "₹40,00,000 - ₹2,00,00,000",
                    features: [
                      "Passenger Comfort",
                      "Long Distance",
                      "Premium Features",
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
                Popular Heavy Truck Brands
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    brand: "Tata Motors",
                    description:
                      "India's leading heavy truck manufacturer with Prima and Signa series",
                    popular:
                      "Tata Prima 4923, Tata Signa 4923, Tata Prima 5525",
                    priceRange: "₹25,00,000 - ₹75,00,000",
                    specialty:
                      "Proven reliability and extensive service network",
                  },
                  {
                    brand: "Volvo Trucks",
                    description:
                      "Swedish premium heavy trucks known for safety and fuel efficiency",
                    popular: "Volvo FH, Volvo FM, Volvo 9400 Bus",
                    priceRange: "₹45,00,000 - ₹1,20,00,000",
                    specialty: "World-class safety and driver comfort",
                  },
                  {
                    brand: "BharatBenz",
                    description:
                      "Mercedes-Benz technology adapted for Indian conditions",
                    popular:
                      "BharatBenz 4928, BharatBenz 5528, BharatBenz 3528",
                    priceRange: "₹28,00,000 - ₹85,00,000",
                    specialty: "German engineering with Indian adaptability",
                  },
                  {
                    brand: "Ashok Leyland",
                    description:
                      "Leading Indian heavy truck manufacturer with Captain and Boss series",
                    popular: "Captain 4923, Boss 4923, Viking 5525",
                    priceRange: "₹26,00,000 - ₹70,00,000",
                    specialty: "Powerful engines and robust build quality",
                  },
                  {
                    brand: "Scania",
                    description:
                      "Swedish premium trucks with advanced technology and efficiency",
                    popular: "Scania R450, Scania G410, Scania Metrolink Bus",
                    priceRange: "₹55,00,000 - ₹1,50,00,000",
                    specialty: "Premium quality and advanced technology",
                  },
                  {
                    brand: "MAN Trucks",
                    description:
                      "German heavy trucks with innovative technology and reliability",
                    popular: "MAN TGX, MAN TGS, MAN Lion's Coach",
                    priceRange: "₹50,00,000 - ₹1,40,00,000",
                    specialty: "German precision and innovative solutions",
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
                Buy Used Heavy Trucks in Top Cities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    city: "Mumbai",
                    description:
                      "Buy used heavy trucks in Mumbai starting at ₹25,00,000. Choose from trailer trucks, container vehicles, and heavy tippers verified by Vehiverze. Easy heavy vehicle financing and same-day national permit transfer available in Mumbai and surrounding areas.",
                    popular: "Tata Prima, Volvo FH, BharatBenz 4928",
                    count: "80+ heavy trucks",
                    permits: "National permits and port clearances",
                  },
                  {
                    city: "Delhi NCR",
                    description:
                      "Explore certified used heavy trucks in Delhi NCR starting from ₹28,00,000. Wide selection of premium heavy vehicles available in Delhi, Gurgaon, and Faridabad with complete documentation support and BS6 compliant vehicles.",
                    popular: "Scania R450, Ashok Leyland Captain, Volvo FM",
                    count: "100+ heavy trucks",
                    permits: "All India permits and fitness certificates",
                  },
                  {
                    city: "Bangalore",
                    description:
                      "Buy pre-owned heavy trucks in Bangalore from ₹26,00,000. Perfect for logistics and long-haul operations. All trucks come with verified national permits, fitness certificates, and comprehensive insurance support.",
                    popular: "BharatBenz 4928, Tata Signa, MAN TGX",
                    count: "60+ heavy trucks",
                    permits: "Karnataka and national permits verified",
                  },
                  {
                    city: "Pune",
                    description:
                      "Find the best deals on used heavy trucks in Pune starting at ₹25,50,000. Ideal for expanding logistics operations with flexible heavy vehicle financing options and quick loan approval for commercial buyers.",
                    popular: "Tata Prima, Volvo FH, Ashok Leyland Boss",
                    count: "50+ heavy trucks",
                    permits: "Maharashtra and national permits available",
                  },
                  {
                    city: "Chennai",
                    description:
                      "Buy certified used heavy trucks in Chennai from ₹27,00,000. Wide range of heavy commercial vehicles perfect for port operations and long-haul transport with complete documentation support.",
                    popular: "BharatBenz 5528, Scania G410, Tata Prima",
                    count: "45+ heavy trucks",
                    permits: "Tamil Nadu and national permits verified",
                  },
                  {
                    city: "Hyderabad",
                    description:
                      "Discover quality pre-owned heavy trucks in Hyderabad starting from ₹25,00,000. Choose from various heavy truck types with instant heavy vehicle loan approval and free comprehensive inspection services.",
                    popular: "Ashok Leyland Captain, Volvo FM, Tata Signa",
                    count: "40+ heavy trucks",
                    permits: "Telangana and all India permits",
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
                Why Choose Vehiverze for Used Heavy Trucks?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
                    title: "150+ Point Heavy Vehicle Inspection",
                    description:
                      "Every heavy truck undergoes comprehensive inspection including engine, transmission, brakes, hydraulics, electrical systems, and structural integrity by certified heavy vehicle mechanics.",
                  },
                  {
                    icon: <Shield className="h-8 w-8 text-blue-600" />,
                    title: "All Permits Verified",
                    description:
                      "National permit, fitness certificates, insurance, and pollution certificates verified. Complete transparency in vehicle legality and operational readiness.",
                  },
                  {
                    icon: <Truck className="h-8 w-8 text-purple-600" />,
                    title: "Heavy Duty Operations Ready",
                    description:
                      "All heavy trucks are ready for immediate long-haul operations with valid permits, insurance, and fitness certificates. Start operations from day one.",
                  },
                  {
                    icon: <CreditCard className="h-8 w-8 text-orange-600" />,
                    title: "Heavy Vehicle Financing",
                    description:
                      "Specialized loans for heavy commercial vehicles with instant approval. Financing up to 85% of truck value with competitive interest rates for business expansion.",
                  },
                  {
                    icon: <FileText className="h-8 w-8 text-red-600" />,
                    title: "Complete Documentation",
                    description:
                      "RC, Insurance, National Permit, Fitness certificate, and pollution certificate transfer handled by our specialized team within 7 days of purchase.",
                  },
                  {
                    icon: <Wrench className="h-8 w-8 text-teal-600" />,
                    title: "Service History Verified",
                    description:
                      "Complete maintenance, overhaul, and service records available. Detailed inspection reports and service history for informed heavy vehicle purchase decisions.",
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
                Trusted by Heavy Vehicle Operators
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🏆 Startup India Registered
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  ✅ Trusted by 2,000+ Fleet Owners
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🔒 ISO Certified Platform
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  ⭐ 4.6/5 Customer Rating
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-sm">
                  🛡️ Verified Heavy Vehicle Dealers
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
                      "What is the price of a second-hand 8+ wheeler heavy truck in India?",
                    answer:
                      "Used heavy truck prices in India start from ₹25,00,000 for basic heavy trucks and can go up to ₹2,00,00,000 for premium luxury buses. The price depends on the brand, model, year, condition, kilometers driven, and type of application.",
                  },
                  {
                    question: "Which is the best heavy truck brand in India?",
                    answer:
                      "Popular heavy truck brands include Tata Motors for reliability and service network, Volvo for safety and comfort, BharatBenz for German engineering, Ashok Leyland for powerful engines, and Scania for premium quality.",
                  },
                  {
                    question: "Can I get a loan for a used heavy truck?",
                    answer:
                      "Yes, Vehiverze offers heavy vehicle loans for used trucks with instant approval. You can get financing up to 85% of the truck value with competitive interest rates starting from 12.99% per annum for heavy commercial vehicles.",
                  },
                  {
                    question:
                      "Is national permit transfer included in purchase?",
                    answer:
                      "Yes, national permit transfer and all documentation are handled by our specialized team. We ensure all permits, fitness certificates, and insurance are transferred within 7 days of purchase.",
                  },
                  {
                    question: "Do you provide warranty on used heavy trucks?",
                    answer:
                      "All heavy trucks come with detailed 150+ point inspection reports and optional extended warranty plans. We also provide complete service history, overhaul records, and permit verification for transparency.",
                  },
                  {
                    question: "How do I sell my heavy truck on Vehiverze?",
                    answer:
                      "You can sell your heavy truck easily on Vehiverze. Visit our 'Sell Your Heavy Truck' page, get an instant quote, schedule a free inspection, and get paid within 24 hours of truck pickup.",
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
                  <a href="/sell/more-than-8-wheeler">Sell Your Heavy Truck</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/6-wheeler">Buy 6 Wheeler Trucks</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/buy/4-wheeler">Buy Used Cars</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/garage-services">Heavy Vehicle Services</a>
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
