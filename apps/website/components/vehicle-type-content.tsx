"use client";

import { useState } from "react";
import {
  Search,
  Star,
  Filter,
  Heart,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Truck,
  Shield,
  CheckCircle,
  CreditCard,
  FileText,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { Slider } from "@vehiverze/ui/slider";
import { Checkbox } from "@vehiverze/ui/checkbox";
import { Label } from "@vehiverze/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@vehiverze/ui/accordion";
import { Card, CardContent } from "@vehiverze/ui/card";
import { Badge } from "@vehiverze/ui/badge";
import { useRouter } from "next/navigation";

interface VehicleTypeContentProps {
  vehicleType: string;
  title: string;
  description: string;
}

export function VehicleTypeContent({
  vehicleType,
  title,
  description,
}: VehicleTypeContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    fuelType: [],
    transmission: [],
    bodyType: [],
    year: [],
    location: [],
  });

  const router = useRouter();

  // Get vehicle data based on type
  const getVehicles = () => {
    switch (vehicleType) {
      case "2-wheeler":
        return [
          {
            id: 1,
            name: "Honda Activa 6G",
            brand: "Honda",
            price: 75000,
            originalPrice: 85000,
            year: 2023,
            km: 0,
            location: "Mumbai",
            image: "/honda-activa-6g.png",
            rating: 4.5,
            type: "Scooter",
            fuelType: "Petrol",
            features: ["Electric Start", "LED Headlight", "Combi Brake"],
            verified: true,
            discount: "12% off",
          },
          {
            id: 2,
            name: "Royal Enfield Classic 350",
            brand: "Royal Enfield",
            price: 190000,
            originalPrice: 210000,
            year: 2022,
            km: 3000,
            location: "Delhi",
            image: "/royal-enfield-classic-350.png",
            rating: 4.8,
            type: "Cruiser",
            fuelType: "Petrol",
            features: ["Single Channel ABS", "Dual Tone", "Chrome Finish"],
            verified: true,
            discount: "9% off",
          },
          {
            id: 3,
            name: "Yamaha FZ S V3",
            brand: "Yamaha",
            price: 120000,
            originalPrice: 135000,
            year: 2022,
            km: 4500,
            location: "Bangalore",
            image: "/yamaha-fz-s-v3.png",
            rating: 4.6,
            type: "Street",
            fuelType: "Petrol",
            features: [
              "LED Headlight",
              "Digital Console",
              "Single Channel ABS",
            ],
            verified: true,
            discount: "11% off",
          },
          {
            id: 4,
            name: "Bajaj Pulsar NS200",
            brand: "Bajaj",
            price: 140000,
            originalPrice: 155000,
            year: 2021,
            km: 8000,
            location: "Chennai",
            image: "/bajaj-pulsar-ns200.png",
            rating: 4.4,
            type: "Sport",
            fuelType: "Petrol",
            features: ["Liquid Cooled", "Perimeter Frame", "Nitrox Suspension"],
            verified: true,
            discount: "10% off",
          },
          {
            id: 5,
            name: "TVS Jupiter",
            brand: "TVS",
            price: 72000,
            originalPrice: 80000,
            year: 2023,
            km: 1000,
            location: "Hyderabad",
            image: "/tvs-jupiter.png",
            rating: 4.3,
            type: "Scooter",
            fuelType: "Petrol",
            features: ["Eco Mode", "USB Charger", "LED DRL"],
            verified: true,
            discount: "10% off",
          },
          {
            id: 6,
            name: "Hero Splendor Plus",
            brand: "Hero",
            price: 65000,
            originalPrice: 72000,
            year: 2022,
            km: 6000,
            location: "Pune",
            image: "/hero-splendor-plus.png",
            rating: 4.2,
            type: "Commuter",
            fuelType: "Petrol",
            features: ["i3S Technology", "LED Tail Light", "Tubeless Tyres"],
            verified: true,
            discount: "10% off",
          },
        ];
      case "3-wheeler":
        return [
          {
            id: 1,
            name: "Bajaj RE Passenger Auto",
            brand: "Bajaj",
            price: 185000,
            originalPrice: 210000,
            year: 2020,
            km: 45000,
            location: "Mumbai",
            image: "/bajaj-re-auto-rickshaw.png",
            rating: 4.2,
            type: "Passenger Auto",
            fuelType: "CNG",
            features: ["Commercial Permit", "Good Condition", "CNG Kit"],
            verified: true,
            discount: "12% off",
          },
          {
            id: 2,
            name: "Piaggio Ape City Cargo",
            brand: "Piaggio",
            price: 145000,
            originalPrice: 165000,
            year: 2021,
            km: 25000,
            location: "Delhi",
            image: "/piaggio-ape-city-cargo.png",
            rating: 4.0,
            type: "Cargo Auto",
            fuelType: "Diesel",
            features: ["Goods Carrier", "Single Owner", "High Payload"],
            verified: true,
            discount: "12% off",
          },
          {
            id: 3,
            name: "Mahindra Alfa Load",
            brand: "Mahindra",
            price: 125000,
            originalPrice: 145000,
            year: 2019,
            km: 60000,
            location: "Bangalore",
            image: "/mahindra-alfa-load.png",
            rating: 4.1,
            type: "Cargo Auto",
            fuelType: "Diesel",
            features: ["High Payload", "Well Maintained", "Commercial Ready"],
            verified: true,
            discount: "14% off",
          },
          {
            id: 4,
            name: "TVS King Passenger",
            brand: "TVS",
            price: 165000,
            originalPrice: 185000,
            year: 2020,
            km: 38000,
            location: "Pune",
            image: "/tvs-king-passenger-auto.png",
            rating: 3.9,
            type: "Passenger Auto",
            fuelType: "CNG",
            features: ["Comfortable Seating", "All Papers Clear", "CNG Fitted"],
            verified: true,
            discount: "11% off",
          },
        ];
      case "4-wheeler":
        return [
          {
            id: 1,
            name: "Maruti Suzuki Swift",
            brand: "Maruti Suzuki",
            price: 685000,
            originalPrice: 750000,
            year: 2020,
            km: 25000,
            location: "Mumbai",
            image: "/maruti-suzuki-swift.png",
            rating: 4.5,
            type: "Hatchback",
            fuelType: "Petrol",
            features: ["Manual", "Single Owner", "Well Maintained"],
            verified: true,
            discount: "9% off",
          },
          {
            id: 2,
            name: "Hyundai Creta",
            brand: "Hyundai",
            price: 1450000,
            originalPrice: 1600000,
            year: 2021,
            km: 18000,
            location: "Delhi",
            image: "/hyundai-creta.png",
            rating: 4.6,
            type: "SUV",
            fuelType: "Diesel",
            features: ["Automatic", "Well Maintained", "Sunroof"],
            verified: true,
            discount: "9% off",
          },
          {
            id: 3,
            name: "Tata Nexon",
            brand: "Tata",
            price: 895000,
            originalPrice: 1020000,
            year: 2019,
            km: 35000,
            location: "Bangalore",
            image: "/tata-nexon.png",
            rating: 4.7,
            type: "SUV",
            fuelType: "Petrol",
            features: ["AMT", "5-Star Safety", "Touchscreen"],
            verified: true,
            discount: "12% off",
          },
          {
            id: 4,
            name: "Honda City",
            brand: "Honda",
            price: 1175000,
            originalPrice: 1300000,
            year: 2020,
            km: 22000,
            location: "Pune",
            image: "/honda-city.png",
            rating: 4.4,
            type: "Sedan",
            fuelType: "Petrol",
            features: ["CVT", "Premium Interior", "Sunroof"],
            verified: true,
            discount: "10% off",
          },
          {
            id: 5,
            name: "Mahindra XUV700",
            brand: "Mahindra",
            price: 1895000,
            originalPrice: 2100000,
            year: 2022,
            km: 12000,
            location: "Chennai",
            image: "/mahindra-xuv700.png",
            rating: 4.8,
            type: "SUV",
            fuelType: "Diesel",
            features: ["Automatic", "7-Seater", "ADAS"],
            verified: true,
            discount: "10% off",
          },
          {
            id: 6,
            name: "Toyota Innova Crysta",
            brand: "Toyota",
            price: 1650000,
            originalPrice: 1850000,
            year: 2019,
            km: 45000,
            location: "Hyderabad",
            image: "/toyota-innova-crysta.png",
            rating: 4.7,
            type: "MUV",
            fuelType: "Diesel",
            features: ["Manual", "8-Seater", "Captain Seats"],
            verified: true,
            discount: "11% off",
          },
        ];
      case "6-wheeler":
        return [
          {
            id: 1,
            name: "Tata 1109 Truck",
            brand: "Tata",
            price: 1250000,
            originalPrice: 1400000,
            year: 2020,
            km: 85000,
            location: "Mumbai",
            image: "/tata-1109-truck.jpg",
            rating: 4.3,
            type: "Goods Carrier",
            fuelType: "Diesel",
            features: ["Commercial Permit", "Good Condition", "BS6"],
            verified: true,
            discount: "11% off",
          },
          {
            id: 2,
            name: "Eicher Pro 1049",
            brand: "Eicher",
            price: 1575000,
            originalPrice: 1750000,
            year: 2021,
            km: 45000,
            location: "Delhi",
            image: "/eicher-pro-1049-truck.jpg",
            rating: 4.2,
            type: "Goods Carrier",
            fuelType: "Diesel",
            features: ["Single Owner", "Well Maintained", "BS6"],
            verified: true,
            discount: "10% off",
          },
          {
            id: 3,
            name: "Ashok Leyland Ecomet 1115",
            brand: "Ashok Leyland",
            price: 1125000,
            originalPrice: 1300000,
            year: 2019,
            km: 120000,
            location: "Bangalore",
            image: "/ashok-leyland-ecomet-truck.jpg",
            rating: 4.1,
            type: "Goods Carrier",
            fuelType: "Diesel",
            features: ["High Payload", "Commercial Use", "Robust"],
            verified: true,
            discount: "13% off",
          },
          {
            id: 4,
            name: "Volvo 9400 Bus",
            brand: "Volvo",
            price: 2850000,
            originalPrice: 3200000,
            year: 2020,
            km: 95000,
            location: "Pune",
            image: "/volvo-9400-luxury-bus.jpg",
            rating: 4.6,
            type: "Luxury Bus",
            fuelType: "Diesel",
            features: ["AC", "Reclining Seats", "Entertainment System"],
            verified: true,
            discount: "11% off",
          },
        ];
      case "more-than-8-wheeler":
        return [
          {
            id: 1,
            name: "Tata Prima 4923.S",
            brand: "Tata",
            price: 3550000,
            originalPrice: 4000000,
            year: 2020,
            km: 250000,
            location: "Mumbai",
            image: "/tata-prima-heavy-truck.jpg",
            rating: 4.4,
            type: "Heavy Truck",
            fuelType: "Diesel",
            features: ["National Permit", "Trailer Ready", "Heavy Duty"],
            verified: true,
            discount: "11% off",
          },
          {
            id: 2,
            name: "Volvo FH 460",
            brand: "Volvo",
            price: 5575000,
            originalPrice: 6200000,
            year: 2021,
            km: 180000,
            location: "Delhi",
            image: "/volvo-fh-460-truck.jpg",
            rating: 4.7,
            type: "Heavy Truck",
            fuelType: "Diesel",
            features: ["Premium", "Low KM", "Excellent Condition"],
            verified: true,
            discount: "10% off",
          },
          {
            id: 3,
            name: "BharatBenz 4928",
            brand: "BharatBenz",
            price: 2895000,
            originalPrice: 3300000,
            year: 2019,
            km: 320000,
            location: "Bangalore",
            image: "/bharatbenz-4928-truck.jpg",
            rating: 4.2,
            type: "Container Truck",
            fuelType: "Diesel",
            features: ["Container Body", "Long Haul", "Well Maintained"],
            verified: true,
            discount: "12% off",
          },
          {
            id: 4,
            name: "Scania Metrolink Bus",
            brand: "Scania",
            price: 4850000,
            originalPrice: 5500000,
            year: 2021,
            km: 150000,
            location: "Chennai",
            image: "/scania-metrolink-luxury-bus.jpg",
            rating: 4.8,
            type: "Luxury Bus",
            fuelType: "Diesel",
            features: ["Premium Interior", "AC", "Low Floor"],
            verified: true,
            discount: "12% off",
          },
        ];
      default:
        return [];
    }
  };

  const vehicles = getVehicles();

  // Filter vehicles based on search query and category
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      searchQuery === "" ||
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      vehicleType !== "4-wheeler" ||
      selectedCategory === "all" ||
      vehicle.type.toLowerCase().includes(selectedCategory.toLowerCase());

    // Basic price range filter
    const maxPrice =
      vehicles.length > 0 ? Math.max(...vehicles.map((v) => v.price)) : 5000000;
    const minPrice =
      vehicles.length > 0 ? Math.min(...vehicles.map((v) => v.price)) : 0;
    const priceFactor = (maxPrice - minPrice) / 100;
    const matchesPrice =
      vehicle.price >= priceRange[0] * priceFactor + minPrice &&
      vehicle.price <= priceRange[1] * priceFactor + minPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(2)} K`;
    } else {
      return `₹${price}`;
    }
  };

  const handleViewDetails = (vehicleId: number) => {
    router.push(`/buy/vehicle-details/${vehicleId}`);
  };

  const handleContactSeller = (vehicleId: number) => {
    // Handle contact seller logic
    console.log("Contact seller for vehicle:", vehicleId);
  };

  const getVehicleTypeCategories = () => {
    switch (vehicleType) {
      case "2-wheeler":
        return ["all", "scooter", "bike", "electric"];
      case "3-wheeler":
        return ["all", "passenger auto", "cargo auto", "e-rickshaw"];
      case "4-wheeler":
        return ["all", "hatchback", "sedan", "suv", "muv"];
      case "6-wheeler":
        return ["all", "goods carrier", "tipper", "bus"];
      case "more-than-8-wheeler":
        return ["all", "heavy truck", "container truck", "luxury bus"];
      default:
        return ["all"];
    }
  };

  const categories = getVehicleTypeCategories();

  const faqs = [
    {
      question: `How do I purchase a ${vehicleType.replace("-", " ")} on Vehiverze?`,
      answer: `Purchasing a ${vehicleType.replace("-", " ")} on Vehiverze is simple. Browse our listings, find a vehicle you're interested in, and click on the vehicle to view details. You can then contact the seller, negotiate the price, arrange for inspection, and complete the purchase. Vehiverze also offers assistance with paperwork and financing options.`,
    },
    {
      question: "Are the vehicles inspected before listing?",
      answer:
        "Yes, all vehicles listed on Vehiverze undergo a comprehensive inspection by our certified technicians. The inspection covers mechanical condition, body condition, documentation verification, and more. Inspection reports are available for each vehicle listing.",
    },
    {
      question: "Can I get financing for my vehicle purchase?",
      answer:
        "Vehiverze partners with leading banks and financial institutions to offer competitive financing options. You can check your eligibility and apply for a loan directly through our platform. We offer flexible repayment terms and quick loan approval.",
    },
    {
      question: "What documents do I need to purchase a vehicle?",
      answer:
        "To purchase a vehicle, you'll need identification proof (Aadhar Card, PAN Card, Voter ID), address proof, income proof (for financing), and a valid driving license. For the vehicle transfer, you'll need the transfer form, insurance documents, and NOC if the vehicle is registered in a different state.",
    },
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="relative z-10 px-6 py-12 md:py-16 md:px-12 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
                  {description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      number: `${vehicles.length}+`,
                      label: "Vehicles Available",
                    },
                    { number: "200+", label: "Quality Checks" },
                    { number: "100+", label: "Cities Covered" },
                    { number: "4.8/5", label: "Customer Rating" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="search"
                      placeholder={`Search ${title.toLowerCase()} by brand, model, or features...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 bg-white/90 backdrop-blur-sm text-gray-800 border-0 rounded-full shadow-lg"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px] h-12 bg-white/90 backdrop-blur-sm text-gray-800 border-0 rounded-full shadow-lg">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="year-new">
                        Year: Newest First
                      </SelectItem>
                      <SelectItem value="km-low">
                        Kilometers: Low to High
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          {categories.length > 1 && (
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 capitalize ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Main Content with Sidebar Layout */}
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4 space-y-5">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-4 transition-all duration-300 hover:shadow-xl bg-gradient-to-b from-white to-gray-50/50">
                <h2 className="text-xl font-semibold border-b border-gray-100 pb-4 mb-5 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-blue-600" />
                  Filters
                </h2>

                {/* Price Range Filter */}
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h3 className="font-medium mb-4 text-gray-800">
                    Price Range
                  </h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setPriceRange(value)}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatPrice(0)}</span>
                      <span>
                        {formatPrice(
                          vehicles.length > 0
                            ? Math.max(...vehicles.map((v) => v.price))
                            : 5000000
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h3 className="font-medium mb-4 text-gray-800">Brand</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {Array.from(new Set(vehicles.map((v) => v.brand))).map(
                      (brand) => (
                        <div key={brand} className="flex items-center">
                          <Checkbox
                            id={`brand-${brand}`}
                            className="text-blue-600 rounded-sm"
                          />
                          <Label
                            htmlFor={`brand-${brand}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {brand}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Type Filter */}
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h3 className="font-medium mb-4 text-gray-800">Type</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {Array.from(new Set(vehicles.map((v) => v.type))).map(
                      (type) => (
                        <div key={type} className="flex items-center">
                          <Checkbox
                            id={`type-${type}`}
                            className="text-blue-600 rounded-sm"
                          />
                          <Label
                            htmlFor={`type-${type}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {type}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Year Filter */}
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h3 className="font-medium mb-4 text-gray-800">Year</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {Array.from(new Set(vehicles.map((v) => v.year)))
                      .sort((a, b) => b - a)
                      .map((year) => (
                        <div key={year} className="flex items-center">
                          <Checkbox
                            id={`year-${year}`}
                            className="text-blue-600 rounded-sm"
                          />
                          <Label
                            htmlFor={`year-${year}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {year}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h3 className="font-medium mb-4 text-gray-800">Location</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(vehicles.map((v) => v.location))).map(
                      (location) => (
                        <div key={location} className="flex items-center">
                          <Checkbox
                            id={`location-${location}`}
                            className="text-blue-600 rounded-sm"
                          />
                          <Label
                            htmlFor={`location-${location}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {location}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-200 text-gray-700 bg-transparent"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Featured Listings */}
              {filteredVehicles.length > 0 && (
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Featured Listings
                      </h2>
                      <p className="text-sm text-gray-500">
                        Handpicked vehicles from verified sellers
                      </p>
                    </div>
                    <Button
                      variant="link"
                      className="text-blue-600 font-medium"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredVehicles.slice(0, 3).map((vehicle) => (
                      <Card
                        key={`featured-${vehicle.id}`}
                        className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                        onClick={() => handleViewDetails(vehicle.id)}
                      >
                        <div className="relative">
                          <img
                            src={vehicle.image || "/placeholder.svg"}
                            alt={vehicle.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Badge className="bg-green-600 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle wishlist
                              }}
                            >
                              <Heart className="h-4 w-4 text-gray-600" />
                            </Button>
                          </div>
                          <div className="absolute top-3 left-3">
                            <Badge variant="destructive" className="bg-red-500">
                              {vehicle.discount}
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="flex items-center justify-between text-white">
                              <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                                <Star
                                  className="h-3 w-3 text-yellow-400"
                                  fill="currentColor"
                                />
                                <span className="text-xs font-medium">
                                  {vehicle.rating}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                                <MapPin className="h-3 w-3" />
                                <span className="text-xs">
                                  {vehicle.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                              {vehicle.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {vehicle.type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{vehicle.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Gauge className="h-4 w-4" />
                              <span>{vehicle.km.toLocaleString()} km</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Fuel className="h-4 w-4" />
                              <span>{vehicle.fuelType}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl font-bold text-green-600">
                              {formatPrice(vehicle.price)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(vehicle.originalPrice)}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {vehicle.features
                              .slice(0, 3)
                              .map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(vehicle.id);
                              }}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleContactSeller(vehicle.id);
                              }}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Vehicle Listings */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    All Available {title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{filteredVehicles.length} vehicles found</span>
                  </div>
                </div>

                {filteredVehicles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredVehicles.map((vehicle) => (
                      <Card
                        key={vehicle.id}
                        className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                        onClick={() => handleViewDetails(vehicle.id)}
                      >
                        <div className="relative">
                          <img
                            src={vehicle.image || "/placeholder.svg"}
                            alt={vehicle.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            {vehicle.verified && (
                              <Badge className="bg-green-600 text-white">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle wishlist
                              }}
                            >
                              <Heart className="h-4 w-4 text-gray-600" />
                            </Button>
                          </div>
                          <div className="absolute top-3 left-3">
                            <Badge variant="destructive" className="bg-red-500">
                              {vehicle.discount}
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="flex items-center justify-between text-white">
                              <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                                <Star
                                  className="h-3 w-3 text-yellow-400"
                                  fill="currentColor"
                                />
                                <span className="text-xs font-medium">
                                  {vehicle.rating}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                                <MapPin className="h-3 w-3" />
                                <span className="text-xs">
                                  {vehicle.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                              {vehicle.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {vehicle.type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{vehicle.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Gauge className="h-4 w-4" />
                              <span>{vehicle.km.toLocaleString()} km</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Fuel className="h-4 w-4" />
                              <span>{vehicle.fuelType}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl font-bold text-green-600">
                              {formatPrice(vehicle.price)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(vehicle.originalPrice)}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {vehicle.features
                              .slice(0, 3)
                              .map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(vehicle.id);
                              }}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleContactSeller(vehicle.id);
                              }}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <Search className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No vehicles found
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Try adjusting your search or filter criteria to find
                        more vehicles
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={() => setSearchQuery("")}
                          variant="outline"
                        >
                          Clear Search
                        </Button>
                        <Button
                          onClick={() => setSelectedCategory("all")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Load More */}
              {filteredVehicles.length > 0 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 bg-transparent"
                  >
                    Load More Vehicles
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Why Choose Vehiverze?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Shield className="h-8 w-8 text-blue-600" />,
                    title: "Verified Vehicles",
                    description:
                      "All vehicles undergo thorough inspection and verification",
                  },
                  {
                    icon: <CreditCard className="h-8 w-8 text-green-600" />,
                    title: "Easy Financing",
                    description:
                      "Get instant loan approval with competitive rates",
                  },
                  {
                    icon: <FileText className="h-8 w-8 text-purple-600" />,
                    title: "Paperwork Support",
                    description:
                      "Complete RC transfer and documentation assistance",
                  },
                  {
                    icon: <Truck className="h-8 w-8 text-orange-600" />,
                    title: "Home Delivery",
                    description: "Free doorstep delivery in major cities",
                  },
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={`faq-${index}`}
                  value={`item-${index + 1}`}
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="text-gray-800 hover:text-blue-600 hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to find your perfect vehicle?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
              Browse our growing collection of quality vehicles and find the one
              that fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="h-4 w-4 mr-2" />
                Contact Our Team
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-blue-700 bg-transparent"
              >
                <Mail className="h-4 w-4 mr-2" />
                Schedule a Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper function to get vehicle type specific content
export function getVehicleTypeContent(vehicleType: string) {
  const typeMap: Record<
    string,
    { title: string; description: string; categories: string[] }
  > = {
    "2-wheeler": {
      title: "Two Wheeler Vehicles",
      description:
        "Browse our collection of bikes, scooters, and other two-wheeler vehicles",
      categories: ["Bikes", "Scooters", "Electric"],
    },
    "3-wheeler": {
      title: "Three Wheeler Vehicles",
      description:
        "Browse our collection of auto rickshaws and other three-wheeler vehicles",
      categories: ["Auto Rickshaws", "Electric Rickshaws", "Delivery Vehicles"],
    },
    "4-wheeler": {
      title: "Four Wheeler Vehicles",
      description:
        "Browse our collection of cars, SUVs, and other four-wheeler vehicles",
      categories: ["Cars", "Commercial Cars", "Trucks"],
    },
    "6-wheeler": {
      title: "Six Wheeler Vehicles",
      description:
        "Browse our collection of medium trucks, buses, and other six-wheeler vehicles",
      categories: ["Trucks", "Bus"],
    },
    "more-than-8-wheeler": {
      title: "Heavy Commercial Vehicles",
      description:
        "Browse our collection of heavy trucks, trailers, and other commercial vehicles with more than 8 wheels",
      categories: ["Trucks", "Bus"],
    },
  };

  return (
    typeMap[vehicleType] || {
      title: "Vehicles",
      description: "Browse our collection of vehicles",
      categories: ["All"],
    }
  );
}
