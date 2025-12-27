"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";
import { Checkbox } from "@vehiverze/ui/checkbox";
import { Slider } from "@vehiverze/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@vehiverze/ui/tabs";
import { ChevronDown, ChevronUp, Filter, Heart, Search, X } from "lucide-react";
import { Badge } from "@vehiverze/ui/badge";
import { Card, CardContent } from "@vehiverze/ui/card";

// Sample vehicle data
const vehicles = [
  {
    id: 1,
    name: "2021 Tata Nexon",
    type: "4 Wheeler",
    category: "Cars",
    price: 799000,
    emi: 13606,
    image: "/placeholder.svg?height=200&width=300",
    km: 30000,
    fuel: "Petrol",
    transmission: "Manual",
    variant: "XZ Plus Petrol",
    location: "Spinny Car Hub, Taj Vivanta, Dwarka, Delhi",
    tags: ["Assured", "Rare price & 3 more reasons to buy"],
    color: "White",
    year: 2021,
    owner: "1st",
    bodyType: "SUV",
    rto: "DL5C",
  },
  {
    id: 2,
    name: "2019 Renault Kwid",
    type: "4 Wheeler",
    category: "Cars",
    price: 319000,
    emi: 5432,
    image: "/placeholder.svg?height=200&width=300",
    km: 61000,
    fuel: "Petrol",
    transmission: "Manual",
    variant: "RXT 1.0 SCE Special (O)",
    location: "Spinny Car Hub, Rohini, Delhi",
    tags: ["Budget", "Premium variant & 1 more reason to buy"],
    color: "Black",
    year: 2019,
    owner: "1st",
    bodyType: "Hatchback",
    rto: "DL10",
  },
  {
    id: 3,
    name: "2021 Hyundai Creta",
    type: "4 Wheeler",
    category: "Cars",
    price: 1232000,
    emi: 21188,
    image: "/placeholder.svg?height=200&width=300",
    km: 100500,
    fuel: "Petrol",
    transmission: "Automatic",
    variant: "SX OPT IVT Petrol",
    location: "Spinny Car Hub, Rcube Monad Mall, Rajouri",
    tags: ["Budget", "Premium variant"],
    color: "White",
    year: 2021,
    owner: "1st",
    bodyType: "SUV",
    rto: "DL1C",
  },
  {
    id: 4,
    name: "2021 Jeep Compass",
    type: "4 Wheeler",
    category: "Cars",
    price: 1800000,
    emi: 30957,
    image: "/placeholder.svg?height=200&width=300",
    km: 50000,
    fuel: "Petrol",
    transmission: "Automatic",
    variant: "Model S (O) 1.4 Petrol DCT",
    location: "Spinny Car Hub, Trillium Avenue, Gurgaon",
    tags: ["MAX"],
    color: "Black",
    year: 2021,
    owner: "1st",
    bodyType: "SUV",
    rto: "HR98",
  },
  {
    id: 5,
    name: "2016 Maruti Baleno",
    type: "4 Wheeler",
    category: "Cars",
    price: 488000,
    emi: 8310,
    image: "/placeholder.svg?height=200&width=300",
    km: 65500,
    fuel: "Petrol",
    transmission: "Manual",
    variant: "Alpha 1.2",
    location: "Spinny Car Hub, Rcube Monad Mall, Rajouri",
    tags: ["Assured"],
    color: "Grey",
    year: 2016,
    owner: "1st",
    bodyType: "Hatchback",
    rto: "DL12",
  },
  {
    id: 6,
    name: "2022 Maruti Wagon R",
    type: "4 Wheeler",
    category: "Cars",
    price: 575000,
    emi: 9791,
    image: "/placeholder.svg?height=200&width=300",
    km: 19500,
    fuel: "CNG",
    transmission: "Manual",
    variant: "VXI CNG",
    location: "Spinny Car Hub, Faridabad",
    tags: [],
    color: "Silver",
    year: 2022,
    owner: "1st",
    bodyType: "Hatchback",
    rto: "HR26",
  },
  {
    id: 7,
    name: "Tata Magic Express",
    type: "4 Wheeler",
    category: "Commercial Cars",
    price: 650000,
    emi: 11050,
    image: "/placeholder.svg?height=200&width=300",
    km: 45000,
    fuel: "Diesel",
    transmission: "Manual",
    variant: "BS6",
    location: "Commercial Hub, Delhi",
    tags: ["Commercial"],
    color: "White",
    year: 2021,
    owner: "1st",
    bodyType: "Van",
    rto: "DL1RT",
  },
  {
    id: 8,
    name: "Mahindra Bolero Pickup",
    type: "4 Wheeler",
    category: "Commercial Cars",
    price: 780000,
    emi: 13260,
    image: "/placeholder.svg?height=200&width=300",
    km: 35000,
    fuel: "Diesel",
    transmission: "Manual",
    variant: "FB 1.7T",
    location: "Commercial Hub, Gurgaon",
    tags: ["Commercial"],
    color: "White",
    year: 2022,
    owner: "1st",
    bodyType: "Pickup",
    rto: "HR26",
  },
  {
    id: 9,
    name: "Tata Intra V30",
    type: "4 Wheeler",
    category: "Trucks",
    price: 830000,
    emi: 14110,
    image: "/placeholder.svg?height=200&width=300",
    km: 25000,
    fuel: "Diesel",
    transmission: "Manual",
    variant: "BS6",
    location: "Commercial Hub, Noida",
    tags: ["Commercial"],
    color: "White",
    year: 2022,
    owner: "1st",
    bodyType: "Mini Truck",
    rto: "UP16",
  },
  {
    id: 10,
    name: "Eicher Pro 2049",
    type: "6 Wheeler",
    category: "Trucks",
    price: 2500000,
    emi: 42500,
    image: "/placeholder.svg?height=200&width=300",
    km: 60000,
    fuel: "Diesel",
    transmission: "Manual",
    variant: "HD",
    location: "Commercial Hub, Delhi",
    tags: ["Commercial"],
    color: "Yellow",
    year: 2020,
    owner: "1st",
    bodyType: "Truck",
    rto: "DL1M",
  },
  {
    id: 11,
    name: "Ashok Leyland Ecomet",
    type: "6 Wheeler",
    category: "Trucks",
    price: 2800000,
    emi: 47600,
    image: "/placeholder.svg?height=200&width=300",
    km: 70000,
    fuel: "Diesel",
    transmission: "Manual",
    variant: "1115 HE",
    location: "Commercial Hub, Ghaziabad",
    tags: ["Commercial"],
    color: "Blue",
    year: 2019,
    owner: "1st",
    bodyType: "Truck",
    rto: "UP14",
  },
  {
    id: 12,
    name: "Tata Starbus",
    type: "6 Wheeler",
    category: "Bus",
    price: 3200000,
    emi: 54400,
    image: "/placeholder.svg?height=200&width=300",
    km: 80000,
    fuel: "Diesel",
    transmission: "Manual",
    variant: "Ultra",
    location: "Commercial Hub, Delhi",
    tags: ["Commercial"],
    color: "White",
    year: 2018,
    owner: "1st",
    bodyType: "Bus",
    rto: "DL1S",
  },
  {
    id: 13,
    name: "Tata Prima 3718.K",
    type: "More than 8 Wheeler",
    category: "Trucks",
    price: 4500000,
    emi: 76500,
    image: "/placeholder.svg?height=200&width=300",
    km: 90000,
    fuel: "Diesel",
    transmission: "Manual",
    variant: "LX",
    location: "Commercial Hub, Faridabad",
    tags: ["Commercial"],
    color: "Red",
    year: 2019,
    owner: "1st",
    bodyType: "Heavy Truck",
    rto: "HR88",
  },
  {
    id: 14,
    name: "Volvo 9400",
    type: "More than 8 Wheeler",
    category: "Bus",
    price: 8500000,
    emi: 144500,
    image: "/placeholder.svg?height=200&width=300",
    km: 120000,
    fuel: "Diesel",
    transmission: "Automatic",
    variant: "B11R",
    location: "Commercial Hub, Delhi",
    tags: ["Commercial", "Premium"],
    color: "Blue",
    year: 2018,
    owner: "1st",
    bodyType: "Luxury Bus",
    rto: "DL1R",
  },
];

// Filter options
const brands = [
  "Maruti",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Honda",
  "Toyota",
  "Kia",
  "Jeep",
  "Renault",
  "Ashok Leyland",
  "Eicher",
  "Volvo",
  "Force",
];
const models = [
  "Swift",
  "Baleno",
  "Creta",
  "Nexon",
  "XUV700",
  "City",
  "Innova",
  "Seltos",
  "Compass",
  "Kwid",
  "Wagon R",
  "Prima",
  "Starbus",
  "Ecomet",
];
const kmRanges = [
  "0-10,000",
  "10,000-30,000",
  "30,000-50,000",
  "50,000-70,000",
  "70,000-100,000",
  "Above 100,000",
];
const fuelTypes = [
  "Petrol",
  "Diesel",
  "CNG",
  "Electric",
  "Hybrid",
  "Petrol+CNG",
];
const bodyTypes = [
  "Hatchback",
  "Sedan",
  "SUV",
  "MUV",
  "Pickup",
  "Van",
  "Mini Truck",
  "Truck",
  "Bus",
  "Heavy Truck",
  "Luxury Bus",
];
const transmissions = ["Manual", "Automatic", "AMT", "CVT", "DCT"];
const carCategories = [
  "Budget",
  "Premium",
  "Luxury",
  "Ultra Luxury",
  "Commercial",
];
const colors = [
  "White",
  "Black",
  "Grey",
  "Silver",
  "Red",
  "Blue",
  "Yellow",
  "Green",
  "Orange",
  "Purple",
  "Brown",
  "Beige",
];
const features = [
  "Sunroof",
  "Cruise Control",
  "Leather Seats",
  "Navigation",
  "Parking Sensors",
  "Reverse Camera",
  "Bluetooth",
  "Alloy Wheels",
];
const seats = ["2", "4", "5", "6", "7", "8+"];
const rtos = ["DL", "HR", "UP", "MH", "KA", "TN", "AP", "TS"];
const owners = ["1st", "2nd", "3rd", "4th+"];
const years = Array.from({ length: 2024 - 2010 + 1 }, (_, i) =>
  (2024 - i).toString()
);
const locations = [
  "Delhi",
  "Gurgaon",
  "Noida",
  "Faridabad",
  "Ghaziabad",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
];
const availabilities = [
  "Immediate",
  "Within 1 Week",
  "Within 2 Weeks",
  "Within 1 Month",
];

interface SelectedFilters {
  brands: string[];
  models: string[];
  kmRanges: string[];
  fuelTypes: string[];
  bodyTypes: string[];
  transmissions: string[];
  carCategories: string[];
  colors: string[];
  features: string[];
  seats: string[];
  rtos: string[];
  owners: string[];
  years: string[];
  locations: string[];
  availabilities: string[];
}

export function BuyPage() {
  const router = useRouter();
  const [activeVehicleType, setActiveVehicleType] = useState("4 Wheeler");
  const [activeCategory, setActiveCategory] = useState("Cars");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    brands: [],
    models: [],
    kmRanges: [],
    fuelTypes: [],
    bodyTypes: [],
    transmissions: [],
    carCategories: [],
    colors: [],
    features: [],
    seats: [],
    rtos: [],
    owners: [],
    years: [],
    locations: [],
    availabilities: [],
  });

  // Get categories based on vehicle type
  const getCategoriesForType = (type: string) => {
    switch (type) {
      case "4 Wheeler":
        return ["Cars", "Commercial Cars", "Trucks"];
      case "6 Wheeler":
      case "More than 8 Wheeler":
        return ["Trucks", "Bus"];
      default:
        return ["All"];
    }
  };

  // Filter vehicles based on selected filters
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Filter by vehicle type and category
    if (vehicle.type !== activeVehicleType) return false;
    if (activeCategory !== "All" && vehicle.category !== activeCategory)
      return false;

    // Filter by price range
    if (vehicle.price < priceRange[0]! || vehicle.price > priceRange[1]!)
      return false;

    // Apply other filters if they are selected
    if (
      selectedFilters.brands.length > 0 &&
      !selectedFilters.brands.some((brand) => vehicle.name.includes(brand))
    )
      return false;
    if (
      selectedFilters.models.length > 0 &&
      !selectedFilters.models.some((model) => vehicle.name.includes(model))
    )
      return false;
    if (
      selectedFilters.fuelTypes.length > 0 &&
      !selectedFilters.fuelTypes.includes(vehicle.fuel)
    )
      return false;
    if (
      selectedFilters.transmissions.length > 0 &&
      !selectedFilters.transmissions.includes(vehicle.transmission)
    )
      return false;
    if (
      selectedFilters.colors.length > 0 &&
      !selectedFilters.colors.includes(vehicle.color)
    )
      return false;
    if (
      selectedFilters.bodyTypes.length > 0 &&
      !selectedFilters.bodyTypes.includes(vehicle.bodyType)
    )
      return false;
    if (
      selectedFilters.years.length > 0 &&
      !selectedFilters.years.includes(vehicle.year.toString())
    )
      return false;
    if (
      selectedFilters.owners.length > 0 &&
      !selectedFilters.owners.includes(vehicle.owner)
    )
      return false;
    if (
      selectedFilters.rtos.length > 0 &&
      !selectedFilters.rtos.some((rto) => vehicle.rto.startsWith(rto))
    )
      return false;
    if (
      selectedFilters.locations.length > 0 &&
      !selectedFilters.locations.some((location) =>
        vehicle.location.includes(location)
      )
    )
      return false;

    // KM ranges need special handling
    if (selectedFilters.kmRanges.length > 0) {
      const kmMatch = selectedFilters.kmRanges.some((range) => {
        if (range === "0-10,000") return vehicle.km <= 10000;
        if (range === "10,000-30,000")
          return vehicle.km > 10000 && vehicle.km <= 30000;
        if (range === "30,000-50,000")
          return vehicle.km > 30000 && vehicle.km <= 50000;
        if (range === "50,000-70,000")
          return vehicle.km > 50000 && vehicle.km <= 70000;
        if (range === "70,000-100,000")
          return vehicle.km > 70000 && vehicle.km <= 100000;
        if (range === "Above 100,000") return vehicle.km > 100000;
        return false;
      });
      if (!kmMatch) return false;
    }

    return true;
  });

  // Toggle filter selection
  const toggleFilter = (filterType: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = [...prev[filterType as keyof typeof prev]];
      const index = currentFilters.indexOf(value);

      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }

      return {
        ...prev,
        [filterType]: currentFilters,
      };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      brands: [],
      models: [],
      kmRanges: [],
      fuelTypes: [],
      bodyTypes: [],
      transmissions: [],
      carCategories: [],
      colors: [],
      features: [],
      seats: [],
      rtos: [],
      owners: [],
      years: [],
      locations: [],
      availabilities: [],
    });
    setPriceRange([0, 10000000]);
  };

  // Handle buy button click
  const handleBuy = (vehicleId: number) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      const wheelCount = vehicle.type.includes("More than")
        ? "more-than-8"
        : vehicle.type.split(" ")[0];
      router.push(`/checkout/${wheelCount}-wheeler?vehicleId=${vehicleId}`);
    }
  };

  // Format price to Indian format
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    })
      .format(price)
      .replace(/\.00/g, "");
  };

  // Format price to lakh format
  const formatPriceToLakh = (price: number) => {
    const lakh = price / 100000;
    return `₹${lakh.toFixed(2)} Lakh`;
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce(
      (count, filters) => count + filters.length,
      0
    );
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Buy a Vehicle</h1>

        {/* Vehicle Type Tabs */}
        <div className="mb-6">
          <Tabs
            defaultValue="4 Wheeler"
            className="w-full"
            onValueChange={(value) => {
              setActiveVehicleType(value);
              setActiveCategory(getCategoriesForType(value)[0]!);
            }}
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="2 Wheeler">2 Wheeler</TabsTrigger>
              <TabsTrigger value="3 Wheeler">3 Wheeler</TabsTrigger>
              <TabsTrigger value="4 Wheeler">4 Wheeler</TabsTrigger>
              <TabsTrigger value="6 Wheeler">6+ Wheeler</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Category Tabs based on vehicle type */}
        <div className="mb-6">
          <Tabs
            defaultValue={getCategoriesForType(activeVehicleType)[0]}
            className="w-full"
            onValueChange={setActiveCategory}
          >
            <TabsList
              className="grid w-full"
              style={{
                gridTemplateColumns: `repeat(${getCategoriesForType(activeVehicleType).length}, 1fr)`,
              }}
            >
              {getCategoriesForType(activeVehicleType).map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-auto flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by brand, model, or keyword"
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>Filters</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getActiveFiltersCount()}
                </Badge>
              )}
              {showFilters ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </Button>

            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="km-low">KM: Low to High</SelectItem>
                <SelectItem value="year-new">Year: Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(selectedFilters).map(([filterType, values]) =>
              values.map((value: string) => (
                <Badge
                  key={`${filterType}-${value}`}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {value}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(filterType, value)}
                  />
                </Badge>
              ))
            )}
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Panel */}
          {showFilters && (
            <div className="lg:col-span-1 space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>

              {/* Price Range Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 10000000]}
                    max={10000000}
                    step={100000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{formatPrice(priceRange[0]!)}</span>
                    <span>{formatPrice(priceRange[1]!)}</span>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Brand</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedFilters.brands.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("brands", brand);
                          else toggleFilter("brands", brand);
                        }}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="text-sm cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Model</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {models.map((model) => (
                    <div key={model} className="flex items-center space-x-2">
                      <Checkbox
                        id={`model-${model}`}
                        checked={selectedFilters.models.includes(model)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("models", model);
                          else toggleFilter("models", model);
                        }}
                      />
                      <label
                        htmlFor={`model-${model}`}
                        className="text-sm cursor-pointer"
                      >
                        {model}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* KMs Driven Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">KMs Driven</h3>
                <div className="space-y-2">
                  {kmRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox
                        id={`km-${range}`}
                        checked={selectedFilters.kmRanges.includes(range)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("kmRanges", range);
                          else toggleFilter("kmRanges", range);
                        }}
                      />
                      <label
                        htmlFor={`km-${range}`}
                        className="text-sm cursor-pointer"
                      >
                        {range}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fuel Type Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Fuel Type</h3>
                <div className="space-y-2">
                  {fuelTypes.map((fuel) => (
                    <div key={fuel} className="flex items-center space-x-2">
                      <Checkbox
                        id={`fuel-${fuel}`}
                        checked={selectedFilters.fuelTypes.includes(fuel)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("fuelTypes", fuel);
                          else toggleFilter("fuelTypes", fuel);
                        }}
                      />
                      <label
                        htmlFor={`fuel-${fuel}`}
                        className="text-sm cursor-pointer"
                      >
                        {fuel}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body Type Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Body Type</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {bodyTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`body-${type}`}
                        checked={selectedFilters.bodyTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("bodyTypes", type);
                          else toggleFilter("bodyTypes", type);
                        }}
                      />
                      <label
                        htmlFor={`body-${type}`}
                        className="text-sm cursor-pointer"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transmission Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Transmission</h3>
                <div className="space-y-2">
                  {transmissions.map((transmission) => (
                    <div
                      key={transmission}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`transmission-${transmission}`}
                        checked={selectedFilters.transmissions.includes(
                          transmission
                        )}
                        onCheckedChange={(checked) => {
                          if (checked)
                            toggleFilter("transmissions", transmission);
                          else toggleFilter("transmissions", transmission);
                        }}
                      />
                      <label
                        htmlFor={`transmission-${transmission}`}
                        className="text-sm cursor-pointer"
                      >
                        {transmission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Car Category Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Car Category</h3>
                <div className="space-y-2">
                  {carCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedFilters.carCategories.includes(
                          category
                        )}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("carCategories", category);
                          else toggleFilter("carCategories", category);
                        }}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {colors.map((color) => {
                    const colorClass = getColorClass(color);
                    return (
                      <div
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer ${colorClass} ${selectedFilters.colors.includes(color) ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
                        onClick={() => toggleFilter("colors", color)}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Year Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Year</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {years.map((year) => (
                    <div key={year} className="flex items-center space-x-2">
                      <Checkbox
                        id={`year-${year}`}
                        checked={selectedFilters.years.includes(year)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("years", year);
                          else toggleFilter("years", year);
                        }}
                      />
                      <label
                        htmlFor={`year-${year}`}
                        className="text-sm cursor-pointer"
                      >
                        {year}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Owner</h3>
                <div className="space-y-2">
                  {owners.map((owner) => (
                    <div key={owner} className="flex items-center space-x-2">
                      <Checkbox
                        id={`owner-${owner}`}
                        checked={selectedFilters.owners.includes(owner)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("owners", owner);
                          else toggleFilter("owners", owner);
                        }}
                      />
                      <label
                        htmlFor={`owner-${owner}`}
                        className="text-sm cursor-pointer"
                      >
                        {owner}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* RTO Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">RTO</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {rtos.map((rto) => (
                    <div key={rto} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rto-${rto}`}
                        checked={selectedFilters.rtos.includes(rto)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("rtos", rto);
                          else toggleFilter("rtos", rto);
                        }}
                      />
                      <label
                        htmlFor={`rto-${rto}`}
                        className="text-sm cursor-pointer"
                      >
                        {rto}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Location</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={selectedFilters.locations.includes(location)}
                        onCheckedChange={(checked) => {
                          if (checked) toggleFilter("locations", location);
                          else toggleFilter("locations", location);
                        }}
                      />
                      <label
                        htmlFor={`location-${location}`}
                        className="text-sm cursor-pointer"
                      >
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Listings */}
          <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium text-gray-600">
                  No vehicles found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <Card
                    key={vehicle.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <Image
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white">
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                      </button>
                      {vehicle.tags.includes("Assured") && (
                        <Badge className="absolute bottom-2 left-2 bg-purple-600">
                          Assured
                        </Badge>
                      )}
                      {vehicle.tags.includes("Budget") && (
                        <Badge className="absolute bottom-2 left-2 bg-blue-600">
                          Budget
                        </Badge>
                      )}
                      {vehicle.tags.includes("MAX") && (
                        <Badge className="absolute bottom-2 left-2 bg-red-600">
                          MAX
                        </Badge>
                      )}
                      {vehicle.tags.includes("Commercial") && (
                        <Badge className="absolute bottom-2 left-2 bg-green-600">
                          Commercial
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          {vehicle.name}
                        </h3>
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            {formatPriceToLakh(vehicle.price)}
                          </p>
                          <p className="text-sm text-gray-500">
                            EMI ₹{vehicle.emi}/m*
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
                        <span>{vehicle.km.toLocaleString()} km</span>
                        <span>{vehicle.fuel}</span>
                        <span>{vehicle.transmission}</span>
                        <span>{vehicle.rto}</span>
                      </div>

                      <p className="text-sm text-gray-500 mb-3 truncate">
                        {vehicle.location}
                      </p>

                      {vehicle.tags.some(
                        (tag) =>
                          tag.includes("reasons") || tag.includes("reason")
                      ) && (
                        <p className="text-xs text-green-600 mb-3">
                          {vehicle.tags.find(
                            (tag) =>
                              tag.includes("reasons") || tag.includes("reason")
                          )}
                        </p>
                      )}

                      <Button
                        onClick={() => handleBuy(vehicle.id)}
                        className="w-full"
                      >
                        Buy Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to get Tailwind color class based on color name
function getColorClass(color: string) {
  const colorMap: Record<string, string> = {
    White: "bg-white border border-gray-200",
    Black: "bg-black",
    Grey: "bg-gray-500",
    Silver: "bg-gray-300",
    Red: "bg-red-500",
    Blue: "bg-blue-500",
    Yellow: "bg-yellow-400",
    Green: "bg-green-500",
    Orange: "bg-orange-500",
    Purple: "bg-purple-500",
    Brown: "bg-amber-800",
    Beige: "bg-amber-100 border border-gray-200",
  };

  return colorMap[color] || "bg-gray-200";
}
