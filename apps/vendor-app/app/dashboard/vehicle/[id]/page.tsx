"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Phone, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoogleMap } from "@/components/google-map"
import Link from "next/link"

// Mock vehicle data - different vehicles based on ID
const getVehicleData = (id: number) => {
  const vehicles = {
    1: {
      id: 1,
      name: "Royal Enfield Classic 350",
      type: "2 Wheeler",
      price: 170000,
      credits: 50,
      datetime: "2025-02-22 : 01:00 PM - 04:00 PM",
      orderNumber: "40001",
      owner: {
        name: "Rahul Sharma",
        phone: "+91 98765 43210",
        address: "123, Green Park, New Delhi, 110016",
        location: { lat: 28.5621, lng: 77.2841 },
      },
    },
    2: {
      id: 2,
      name: "Bajaj Auto Rickshaw",
      type: "3 Wheeler",
      price: 250000,
      credits: 40,
      datetime: "2025-02-22 : 02:00 PM - 05:00 PM",
      orderNumber: "40002",
      owner: {
        name: "Suresh Kumar",
        phone: "+91 98765 43211",
        address: "456, Commercial Street, Mumbai, 400001",
        location: { lat: 19.076, lng: 72.8777 },
      },
    },
    3: {
      id: 3,
      name: "Tata Nexon EV",
      type: "4 Wheeler",
      price: 500000,
      credits: 65,
      datetime: "2025-02-22 : 01:00 PM - 04:00 PM",
      orderNumber: "40003",
      owner: {
        name: "Priya Singh",
        phone: "+91 98765 43212",
        address: "789, Tech Park, Bangalore, 560001",
        location: { lat: 12.9716, lng: 77.5946 },
      },
    },
    4: {
      id: 4,
      name: "Tata LPT 1613",
      type: "6 Wheeler",
      price: 1200000,
      credits: 80,
      datetime: "2025-02-22 : 03:00 PM - 06:00 PM",
      orderNumber: "40004",
      owner: {
        name: "Vikram Patel",
        phone: "+91 98765 43213",
        address: "321, Industrial Area, Pune, 411001",
        location: { lat: 18.5204, lng: 73.8567 },
      },
    },
    5: {
      id: 5,
      name: "Ashok Leyland Truck",
      type: "More Than 8 Wheelers",
      price: 1355000,
      credits: 100,
      datetime: "2025-02-22 : 10:00 AM - 01:00 PM",
      orderNumber: "40005",
      owner: {
        name: "Rajesh Gupta",
        phone: "+91 98765 43214",
        address: "654, Highway Road, Chennai, 600001",
        location: { lat: 13.0827, lng: 80.2707 },
      },
    },
  }

  return vehicles[id as keyof typeof vehicles] || vehicles[3] // Default to 4 wheeler if ID not found
}

// Condition value mappings for price adjustments
const conditionValues = {
  excellent: { value: 1.0, adjustment: 0, color: "text-green-600" },
  "very good": { value: 0.9, adjustment: -2000, color: "text-green-500" },
  good: { value: 0.8, adjustment: -5000, color: "text-blue-500" },
  average: { value: 0.7, adjustment: -10000, color: "text-yellow-500" },
  poor: { value: 0.5, adjustment: -20000, color: "text-red-500" },
}

// Vehicle-type-specific inspection categories (300 points each)
const getInspectionCategoriesByVehicleType = (vehicleType: string) => {
  const baseCategories = {
    "2 Wheeler": [
      {
        id: "engine-2w",
        name: "Engine & Performance",
        icon: "🔧",
        points: 60,
        items: Array.from({ length: 60 }, (_, i) => ({
          id: i + 1,
          name: `2W Engine Check ${i + 1}: ${
            [
              "Engine oil level & quality",
              "Spark plug condition",
              "Air filter cleanliness",
              "Fuel system check",
              "Carburetor/FI system",
              "Exhaust system",
              "Engine mounting",
              "Cooling system",
              "Ignition timing",
              "Compression test",
              "Valve clearance",
              "Cam chain tension",
              "Oil pump function",
              "Fuel pump operation",
              "Throttle response",
              "Idle stability",
              "Engine noise check",
              "Vibration analysis",
              "Fuel consumption",
              "Emission levels",
              "Engine temperature",
              "Oil pressure",
              "Fuel line condition",
              "Intake manifold",
              "Exhaust manifold",
              "Cylinder head",
              "Piston condition",
              "Connecting rod",
              "Crankshaft",
              "Camshaft",
              "Timing chain",
              "Oil filter",
              "Fuel filter",
              "Air intake",
              "Exhaust pipe",
              "Muffler condition",
              "Engine bay cleanliness",
              "Wiring harness",
              "Sensors check",
              "ECU diagnostics",
              "Fuel injector",
              "Throttle body",
              "Engine mount rubber",
              "Oil seal condition",
              "Gasket integrity",
              "Bearing condition",
              "Valve guide wear",
              "Cylinder bore",
              "Ring condition",
              "Oil consumption",
              "Coolant level",
              "Radiator condition",
              "Fan operation",
              "Thermostat",
              "Water pump",
              "Coolant hoses",
              "Temperature sensor",
              "Oil cooler",
              "Breather system",
              "PCV valve",
              "Vacuum lines",
              "Fuel rail",
              "Pressure regulator",
              "Lambda sensor",
              "Catalytic converter",
            ][i % 58]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "transmission-2w",
        name: "Transmission & Drive",
        icon: "⚙️",
        points: 40,
        items: Array.from({ length: 40 }, (_, i) => ({
          id: i + 61,
          name: `2W Transmission ${i + 1}: ${
            [
              "Clutch operation",
              "Gear shifting",
              "Chain condition",
              "Sprocket wear",
              "Chain tension",
              "Clutch cable",
              "Gear lever",
              "Shift drum",
              "Gear forks",
              "Transmission oil",
              "Final drive",
              "Chain lubrication",
              "Clutch plates",
              "Pressure plate",
              "Clutch springs",
              "Release bearing",
              "Gear teeth",
              "Synchronizers",
              "Shift mechanism",
              "Kickstart",
              "Electric start",
              "Starter motor",
              "Starter relay",
              "Neutral switch",
              "Clutch switch",
              "Side stand switch",
              "Drive chain slack",
              "Chain guard",
              "Rear sprocket",
              "Front sprocket",
              "Chain master link",
              "Swing arm bearings",
              "Swing arm bushes",
              "Drive shaft (if applicable)",
              "Universal joints",
              "CV joints",
              "Differential",
              "Axle condition",
              "Wheel bearings",
              "Hub condition",
              "Spoke tension",
              "Rim condition",
            ][i % 40]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "suspension-2w",
        name: "Suspension & Steering",
        icon: "🛞",
        points: 50,
        items: Array.from({ length: 50 }, (_, i) => ({
          id: i + 101,
          name: `2W Suspension ${i + 1}: ${
            [
              "Front fork condition",
              "Rear shock absorber",
              "Fork oil level",
              "Shock oil condition",
              "Spring condition",
              "Fork seals",
              "Shock seals",
              "Steering head bearings",
              "Handle bar alignment",
              "Fork alignment",
              "Suspension travel",
              "Damping function",
              "Rebound adjustment",
              "Compression adjustment",
              "Preload setting",
              "Fork tubes",
              "Shock body",
              "Mounting points",
              "Bushings",
              "Ball joints",
              "Steering lock",
              "Handle bar grips",
              "Control cables",
              "Brake lever",
              "Clutch lever",
              "Throttle grip",
              "Kill switch",
              "Horn button",
              "Indicator switch",
              "Headlight switch",
              "High beam switch",
              "Turn signal",
              "Hazard switch",
              "Mirror adjustment",
              "Mirror condition",
              "Windscreen",
              "Fairing condition",
              "Body panels",
              "Seat condition",
              "Grab rail",
              "Foot pegs",
              "Foot rest",
              "Side stand",
              "Center stand",
              "Stand springs",
              "Stand bolts",
              "Frame condition",
              "Swing arm",
              "Rear suspension linkage",
              "Monoshock",
              "Twin shock",
              "Air suspension",
            ][i % 48]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "brakes-2w",
        name: "Braking System",
        icon: "🛑",
        points: 40,
        items: Array.from({ length: 40 }, (_, i) => ({
          id: i + 151,
          name: `2W Brakes ${i + 1}: ${
            [
              "Front brake pads",
              "Rear brake pads",
              "Brake disc condition",
              "Brake fluid level",
              "Brake lines",
              "Master cylinder",
              "Brake caliper",
              "Brake lever feel",
              "Brake pedal feel",
              "ABS function",
              "Brake hose condition",
              "Brake fluid quality",
              "Brake bleeding",
              "Disc thickness",
              "Disc runout",
              "Caliper piston",
              "Brake seals",
              "Brake reservoir",
              "Brake warning light",
              "ABS sensor",
              "ABS ring",
              "Brake pump",
              "ABS module",
              "Brake assist",
              "EBD function",
              "Brake balance",
              "Front brake lever",
              "Rear brake pedal",
              "Brake cable",
              "Drum brake shoes",
              "Brake drum",
              "Wheel cylinder",
              "Brake adjuster",
              "Brake springs",
              "Brake cam",
              "Brake panel",
              "Brake anchor",
              "Brake lining",
              "Brake dust",
              "Brake noise",
              "Brake vibration",
            ][i % 40]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "electrical-2w",
        name: "Electrical System",
        icon: "⚡",
        points: 60,
        items: Array.from({ length: 60 }, (_, i) => ({
          id: i + 191,
          name: `2W Electrical ${i + 1}: ${
            [
              "Battery condition",
              "Charging system",
              "Alternator output",
              "Headlight function",
              "Tail light",
              "Brake light",
              "Turn signals",
              "Horn operation",
              "Ignition system",
              "Spark plug wires",
              "Ignition coil",
              "CDI unit",
              "Voltage regulator",
              "Fuse box",
              "Main fuse",
              "Wiring harness",
              "Ground connections",
              "Switch functions",
              "Instrument cluster",
              "Speedometer",
              "Odometer",
              "Fuel gauge",
              "Temperature gauge",
              "Warning lights",
              "Indicator lights",
              "Neutral light",
              "High beam indicator",
              "Turn signal indicator",
              "Oil pressure light",
              "Battery light",
              "Engine light",
              "ABS light",
              "Immobilizer",
              "Alarm system",
              "Central locking",
              "Remote key",
              "Key fob battery",
              "Ignition switch",
              "Kill switch",
              "Side stand switch",
              "Clutch switch",
              "Brake switch",
              "Neutral switch",
              "Gear position sensor",
              "Speed sensor",
              "Throttle position sensor",
              "MAP sensor",
              "IAT sensor",
              "ECT sensor",
              "O2 sensor",
              "Knock sensor",
              "Cam position sensor",
              "Crank position sensor",
              "Fuel level sensor",
              "Oil pressure sensor",
              "Side stand sensor",
              "Tip over sensor",
              "USB charging port",
              "12V socket",
              "LED lights",
              "Xenon lights",
              "Daytime running lights",
              "Hazard lights",
            ][i % 58]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "body-2w",
        name: "Body & Accessories",
        icon: "🏍️",
        points: 50,
        items: Array.from({ length: 50 }, (_, i) => ({
          id: i + 251,
          name: `2W Body ${i + 1}: ${
            [
              "Fuel tank condition",
              "Fuel cap",
              "Seat condition",
              "Seat lock",
              "Under seat storage",
              "Tool kit",
              "Spare parts",
              "Owner manual",
              "Service book",
              "Registration papers",
              "Insurance papers",
              "Pollution certificate",
              "Body panels",
              "Fairing condition",
              "Paint condition",
              "Scratches",
              "Dents",
              "Rust spots",
              "Chrome condition",
              "Plastic parts",
              "Rubber parts",
              "Gaskets",
              "Seals",
              "Weather stripping",
              "Mirrors",
              "Mirror adjustment",
              "Windscreen",
              "Wind deflector",
              "Hand guards",
              "Leg guards",
              "Engine guard",
              "Crash bars",
              "Frame sliders",
              "Tank pad",
              "Seat cover",
              "Grab rail",
              "Luggage rack",
              "Top box",
              "Side boxes",
              "Tank bag",
              "Tail bag",
              "Mobile holder",
              "GPS mount",
              "Action camera mount",
              "Helmet lock",
              "Disc lock",
              "Chain lock",
              "Cover",
              "Stand",
              "Paddock stand",
              "Wheel chock",
              "Ramp",
              "Cleaning kit",
            ][i % 48]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
    ],
    "3 Wheeler": [
      {
        id: "engine-3w",
        name: "Engine & Performance",
        icon: "🔧",
        points: 70,
        items: Array.from({ length: 70 }, (_, i) => ({
          id: i + 1,
          name: `3W Engine Check ${i + 1}: ${
            [
              "Engine oil level",
              "Coolant system",
              "Air filter",
              "Fuel system",
              "Injection system",
              "Exhaust system",
              "Engine mounting",
              "Cooling fan",
              "Radiator condition",
              "Thermostat",
              "Water pump",
              "Coolant hoses",
              "Timing belt",
              "Timing chain",
              "Valve clearance",
              "Compression test",
              "Oil pressure",
              "Fuel pressure",
              "Throttle response",
              "Idle quality",
              "Engine noise",
              "Vibration check",
              "Emission test",
              "Turbo system",
              "Intercooler",
              "Boost pressure",
              "Wastegate",
              "Blow-off valve",
              "Intake manifold",
              "Exhaust manifold",
              "EGR valve",
              "PCV system",
              "Crankcase ventilation",
              "Oil separator",
              "Fuel rail",
              "Fuel injectors",
              "Throttle body",
              "MAP sensor",
              "MAF sensor",
              "IAT sensor",
              "ECT sensor",
              "TPS sensor",
              "O2 sensor",
              "Knock sensor",
              "Cam sensor",
              "Crank sensor",
              "ECU diagnostics",
              "Wiring harness",
              "Ground points",
              "Ignition coils",
              "Spark plugs",
              "Ignition timing",
              "Fuel pump",
              "Fuel filter",
              "Air intake",
              "Exhaust pipe",
              "Catalytic converter",
              "Muffler",
              "DPF system",
              "AdBlue system",
              "SCR system",
              "Engine bay",
              "Oil leaks",
              "Coolant leaks",
              "Fuel leaks",
              "Vacuum leaks",
              "Boost leaks",
              "Belt condition",
              "Pulley alignment",
              "Tensioner",
              "Idler pulley",
              "Alternator",
              "AC compressor",
            ][i % 68]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "transmission-3w",
        name: "Transmission & Drive",
        icon: "⚙️",
        points: 50,
        items: Array.from({ length: 50 }, (_, i) => ({
          id: i + 71,
          name: `3W Transmission ${i + 1}: ${
            [
              "Clutch operation",
              "Gear shifting",
              "Transmission oil",
              "Differential oil",
              "Drive shaft",
              "CV joints",
              "Universal joints",
              "Clutch pedal",
              "Gear lever",
              "Shift cables",
              "Clutch cable",
              "Flywheel condition",
              "Pressure plate",
              "Clutch disc",
              "Release bearing",
              "Pilot bearing",
              "Transmission case",
              "Gear teeth",
              "Synchronizers",
              "Shift forks",
              "Shift rails",
              "Detent balls",
              "Springs",
              "Seals",
              "Gaskets",
              "Input shaft",
              "Output shaft",
              "Layshaft",
              "Reverse gear",
              "Final drive",
              "Ring gear",
              "Pinion gear",
              "Differential case",
              "Side gears",
              "Spider gears",
              "Axle shafts",
              "Wheel bearings",
              "Hub assembly",
              "Brake drums",
              "Brake shoes",
              "Wheel cylinders",
              "Brake lines",
              "Master cylinder",
              "Brake fluid",
              "Handbrake",
              "Parking brake",
              "Brake cables",
              "Brake adjustment",
              "Wheel alignment",
              "Toe setting",
              "Camber angle",
              "Caster angle",
              "King pin inclination",
              "Steering geometry",
            ][i % 48]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "suspension-3w",
        name: "Suspension & Steering",
        icon: "🛞",
        points: 60,
        items: Array.from({ length: 60 }, (_, i) => ({
          id: i + 121,
          name: `3W Suspension ${i + 1}: ${
            [
              "Front suspension",
              "Rear suspension",
              "Shock absorbers",
              "Springs",
              "Struts",
              "McPherson struts",
              "Coil springs",
              "Leaf springs",
              "Torsion bars",
              "Anti-roll bars",
              "Stabilizer links",
              "Ball joints",
              "Control arms",
              "Bushings",
              "Rubber mounts",
              "Steering box",
              "Steering rack",
              "Tie rods",
              "Track rods",
              "Steering wheel",
              "Steering column",
              "Universal joint",
              "Steering damper",
              "Power steering",
              "PS pump",
              "PS fluid",
              "PS belt",
              "PS hoses",
              "Steering lock",
              "Ignition lock",
              "Steering play",
              "Wheel alignment",
              "Front wheels",
              "Rear wheels",
              "Tire condition",
              "Tire pressure",
              "Wheel balance",
              "Rim condition",
              "Valve stems",
              "Tire tread",
              "Sidewall condition",
              "Tire age",
              "Spare tire",
              "Jack",
              "Tools",
              "Lug nuts",
              "Wheel bolts",
              "Hub caps",
              "Center caps",
              "Wheel covers",
              "Mud flaps",
              "Splash guards",
              "Fender liners",
              "Wheel wells",
              "Suspension travel",
              "Ride height",
              "Ground clearance",
              "Approach angle",
              "Departure angle",
              "Breakover angle",
              "Articulation",
              "Flex",
              "Compression",
              "Rebound",
            ][i % 58]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "brakes-3w",
        name: "Braking System",
        icon: "🛑",
        points: 40,
        items: Array.from({ length: 40 }, (_, i) => ({
          id: i + 181,
          name: `3W Brakes ${i + 1}: ${
            [
              "Front brakes",
              "Rear brakes",
              "Brake pads",
              "Brake shoes",
              "Brake discs",
              "Brake drums",
              "Brake calipers",
              "Wheel cylinders",
              "Master cylinder",
              "Brake booster",
              "Vacuum booster",
              "Brake fluid",
              "Brake lines",
              "Brake hoses",
              "Brake pedal",
              "Handbrake",
              "Parking brake",
              "Brake cables",
              "Brake adjustment",
              "ABS system",
              "ABS sensors",
              "ABS rings",
              "ABS module",
              "ABS pump",
              "Brake assist",
              "EBD system",
              "Brake balance",
              "Brake bias",
              "Proportioning valve",
              "Load sensing valve",
              "Brake warning light",
              "Brake fluid level",
              "Brake fluid quality",
              "Brake bleeding",
              "Brake noise",
              "Brake vibration",
              "Brake fade",
              "Brake efficiency",
              "Stopping distance",
              "Brake feel",
              "Pedal travel",
            ][i % 40]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "electrical-3w",
        name: "Electrical System",
        icon: "⚡",
        points: 50,
        items: Array.from({ length: 50 }, (_, i) => ({
          id: i + 221,
          name: `3W Electrical ${i + 1}: ${
            [
              "Battery",
              "Alternator",
              "Starter motor",
              "Ignition system",
              "Lighting system",
              "Headlights",
              "Tail lights",
              "Brake lights",
              "Turn signals",
              "Hazard lights",
              "Interior lights",
              "Dashboard lights",
              "Warning lights",
              "Horn",
              "Wiper motor",
              "Washer pump",
              "Fuel pump",
              "Cooling fan",
              "AC compressor",
              "Heater blower",
              "Instrument cluster",
              "Speedometer",
              "Odometer",
              "Fuel gauge",
              "Temperature gauge",
              "Oil pressure gauge",
              "Voltmeter",
              "Tachometer",
              "Clock",
              "Trip meter",
              "Warning buzzers",
              "Chimes",
              "Relays",
              "Fuses",
              "Circuit breakers",
              "Wiring harness",
              "Connectors",
              "Terminals",
              "Ground straps",
              "Switches",
              "Sensors",
              "ECU",
              "PCM",
              "BCM",
              "ABS module",
              "Airbag module",
              "Immobilizer",
              "Central locking",
              "Power windows",
              "Power mirrors",
              "Radio",
              "Speakers",
              "Antenna",
            ][i % 48]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "body-3w",
        name: "Body & Interior",
        icon: "🚗",
        points: 30,
        items: Array.from({ length: 30 }, (_, i) => ({
          id: i + 271,
          name: `3W Body ${i + 1}: ${
            [
              "Body panels",
              "Paint condition",
              "Rust spots",
              "Dents",
              "Scratches",
              "Doors",
              "Door handles",
              "Door locks",
              "Windows",
              "Windshield",
              "Mirrors",
              "Bumpers",
              "Grille",
              "Hood",
              "Trunk",
              "Tailgate",
              "Roof",
              "Pillars",
              "Seats",
              "Seat belts",
              "Dashboard",
              "Steering wheel",
              "Gear knob",
              "Handbrake lever",
              "Pedals",
              "Floor mats",
              "Headliner",
              "Sun visors",
              "Glove box",
              "Storage compartments",
            ][i % 30]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
    ],
    "4 Wheeler": [
      {
        id: "engine-4w",
        name: "Engine & Performance",
        icon: "🔧",
        points: 80,
        items: Array.from({ length: 80 }, (_, i) => ({
          id: i + 1,
          name: `4W Engine Check ${i + 1}: ${
            [
              "Engine oil level & quality",
              "Coolant level & condition",
              "Air filter condition",
              "Fuel system check",
              "Fuel injection system",
              "Exhaust system inspection",
              "Engine mounting check",
              "Cooling system operation",
              "Radiator condition",
              "Cooling fan operation",
              "Thermostat function",
              "Water pump operation",
              "Coolant hoses",
              "Timing belt/chain condition",
              "Valve clearance adjustment",
              "Engine compression test",
              "Oil pressure check",
              "Fuel pressure test",
              "Throttle response",
              "Idle quality check",
              "Engine noise analysis",
              "Vibration check",
              "Emission test",
              "Turbocharger inspection",
              "Intercooler condition",
              "Boost pressure test",
              "Wastegate operation",
              "Blow-off valve function",
              "Intake manifold",
              "Exhaust manifold",
              "EGR valve operation",
              "PCV system check",
              "Crankcase ventilation",
              "Oil separator condition",
              "Fuel rail inspection",
              "Fuel injector test",
              "Throttle body cleaning",
              "MAP sensor test",
              "MAF sensor calibration",
              "IAT sensor check",
              "ECT sensor test",
              "TPS calibration",
              "O2 sensor function",
              "Knock sensor test",
              "Cam position sensor",
              "Crank position sensor",
              "ECU diagnostics",
              "Wiring harness inspection",
              "Ground point check",
              "Ignition coil test",
              "Spark plug condition",
              "Ignition timing",
              "Fuel pump operation",
              "Fuel filter condition",
              "Air intake inspection",
              "Exhaust pipe condition",
              "Catalytic converter test",
              "Muffler inspection",
              "DPF system check",
              "AdBlue system test",
              "SCR system operation",
              "Engine bay cleanliness",
              "Oil leak detection",
              "Coolant leak check",
              "Fuel leak inspection",
              "Vacuum leak test",
              "Boost leak check",
              "Drive belt condition",
              "Pulley alignment",
              "Belt tensioner",
              "Idler pulley",
              "Alternator test",
              "AC compressor check",
              "Power steering pump",
              "Brake booster vacuum",
              "EVAP system test",
              "Carbon canister",
              "Purge valve",
              "Vent valve",
              "Fuel tank pressure",
              "Vapor lines",
              "Fuel cap seal",
              "Engine mount inspection",
              "Transmission mount",
              "Differential mount",
            ][i % 78]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "transmission-4w",
        name: "Transmission & Drivetrain",
        icon: "⚙️",
        points: 60,
        items: Array.from({ length: 60 }, (_, i) => ({
          id: i + 81,
          name: `4W Transmission ${i + 1}: ${
            [
              "Clutch operation test",
              "Gear shifting smoothness",
              "Transmission fluid level",
              "Transmission fluid quality",
              "Differential oil check",
              "Transfer case oil",
              "Drive shaft inspection",
              "CV joint condition",
              "Universal joint test",
              "Clutch pedal adjustment",
              "Gear lever operation",
              "Shift cable condition",
              "Clutch cable adjustment",
              "Flywheel inspection",
              "Pressure plate condition",
              "Clutch disc wear",
              "Release bearing test",
              "Pilot bearing check",
              "Transmission case inspection",
              "Gear teeth condition",
              "Synchronizer operation",
              "Shift fork condition",
              "Shift rail inspection",
              "Detent mechanism",
              "Spring condition",
              "Seal integrity",
              "Gasket condition",
              "Input shaft bearing",
              "Output shaft bearing",
              "Layshaft bearing",
              "Reverse gear operation",
              "Final drive inspection",
              "Ring gear condition",
              "Pinion gear wear",
              "Differential case",
              "Side gear condition",
              "Spider gear wear",
              "Axle shaft inspection",
              "Wheel bearing test",
              "Hub assembly check",
              "Constant velocity joint",
              "Tripod joint",
              "Boot condition",
              "Grease condition",
              "Driveshaft balance",
              "Propeller shaft",
              "Center bearing",
              "Flex disc",
              "Guibo condition",
              "Transmission mount",
              "Engine mount",
              "Differential mount",
              "Torque converter test",
              "Valve body operation",
              "Solenoid function",
              "Pressure test",
              "Shift quality",
              "Lock-up operation",
              "Fluid cooler",
              "Filter condition",
              "Pan gasket",
              "Drain plug",
              "Fill plug",
              "Vent",
              "Breather",
              "Linkage adjustment",
            ][i % 58]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "suspension-4w",
        name: "Suspension & Steering",
        icon: "🛞",
        points: 70,
        items: Array.from({ length: 70 }, (_, i) => ({
          id: i + 141,
          name: `4W Suspension ${i + 1}: ${
            [
              "Front suspension inspection",
              "Rear suspension check",
              "Shock absorber test",
              "Spring condition",
              "Strut assembly",
              "McPherson strut test",
              "Coil spring inspection",
              "Leaf spring condition",
              "Torsion bar adjustment",
              "Anti-roll bar check",
              "Stabilizer link test",
              "Ball joint inspection",
              "Control arm condition",
              "Bushing wear check",
              "Rubber mount inspection",
              "Steering box test",
              "Steering rack inspection",
              "Tie rod end check",
              "Track rod condition",
              "Steering wheel play",
              "Steering column test",
              "Universal joint check",
              "Steering damper test",
              "Power steering operation",
              "PS pump test",
              "PS fluid level",
              "PS belt condition",
              "PS hose inspection",
              "Steering lock test",
              "Ignition lock check",
              "Wheel alignment",
              "Front toe setting",
              "Rear toe adjustment",
              "Camber angle check",
              "Caster angle test",
              "King pin inclination",
              "Thrust angle",
              "Steering geometry",
              "Turning radius test",
              "Front wheel inspection",
              "Rear wheel check",
              "Tire condition assessment",
              "Tire pressure check",
              "Wheel balance test",
              "Rim condition",
              "Valve stem inspection",
              "Tire tread measurement",
              "Sidewall condition",
              "Tire age verification",
              "Spare tire check",
              "Jack inspection",
              "Tool kit check",
              "Lug nut torque",
              "Wheel bolt inspection",
              "Hub cap condition",
              "Center cap check",
              "Wheel cover inspection",
              "Mud flap condition",
              "Splash guard check",
              "Fender liner inspection",
              "Wheel well condition",
              "Suspension travel test",
              "Ride height measurement",
              "Ground clearance check",
              "Approach angle",
              "Departure angle",
              "Breakover angle",
              "Articulation test",
              "Flex measurement",
              "Compression damping",
              "Rebound damping",
              "Spring rate",
              "Load capacity",
              "Weight distribution",
              "Corner weight",
            ][i % 68]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "brakes-4w",
        name: "Braking System",
        icon: "🛑",
        points: 50,
        items: Array.from({ length: 50 }, (_, i) => ({
          id: i + 211,
          name: `4W Brakes ${i + 1}: ${
            [
              "Front brake inspection",
              "Rear brake check",
              "Brake pad thickness",
              "Brake shoe condition",
              "Brake disc inspection",
              "Brake drum condition",
              "Brake caliper test",
              "Wheel cylinder check",
              "Master cylinder inspection",
              "Brake booster test",
              "Vacuum booster check",
              "Brake fluid level",
              "Brake fluid quality",
              "Brake line inspection",
              "Brake hose condition",
              "Brake pedal test",
              "Handbrake operation",
              "Parking brake test",
              "Brake cable condition",
              "Brake adjustment check",
              "ABS system test",
              "ABS sensor check",
              "ABS ring inspection",
              "ABS module test",
              "ABS pump operation",
              "Brake assist test",
              "EBD system check",
              "ESP operation",
              "Brake balance test",
              "Brake bias check",
              "Proportioning valve",
              "Load sensing valve",
              "Brake warning light",
              "Brake fluid sensor",
              "Brake pad sensor",
              "Brake wear indicator",
              "Brake noise check",
              "Brake vibration test",
              "Brake fade test",
              "Brake efficiency",
              "Stopping distance",
              "Brake feel test",
              "Pedal travel check",
              "Brake force distribution",
              "Emergency brake test",
              "Hill hold assist",
              "Auto hold function",
              "Electronic parking brake",
              "Brake by wire",
              "Regenerative braking",
              "Brake cooling",
              "Brake temperature",
              "Brake dust",
              "Brake cleaning",
            ][i % 48]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "electrical-4w",
        name: "Electrical & Electronics",
        icon: "⚡",
        points: 40,
        items: Array.from({ length: 40 }, (_, i) => ({
          id: i + 261,
          name: `4W Electrical ${i + 1}: ${
            [
              "Battery condition test",
              "Alternator output",
              "Starter motor test",
              "Ignition system check",
              "Lighting system test",
              "Headlight operation",
              "Tail light function",
              "Brake light test",
              "Turn signal check",
              "Hazard light test",
              "Interior light check",
              "Dashboard illumination",
              "Warning light test",
              "Horn operation",
              "Wiper motor test",
              "Washer pump check",
              "Fuel pump test",
              "Cooling fan operation",
              "AC compressor test",
              "Heater blower check",
              "Instrument cluster test",
              "Speedometer accuracy",
              "Odometer function",
              "Fuel gauge test",
              "Temperature gauge check",
              "Oil pressure gauge",
              "Voltmeter test",
              "Tachometer check",
              "Clock function",
              "Trip meter test",
              "Warning buzzer check",
              "Chime operation",
              "Relay function",
              "Fuse condition",
              "Circuit breaker test",
              "Wiring harness inspection",
              "Connector check",
              "Terminal condition",
              "Ground strap test",
              "Switch operation",
              "Sensor calibration",
            ][i % 40]
          }`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
    ],
    "6 Wheeler": [
      {
        id: "engine-6w",
        name: "Heavy Duty Engine",
        icon: "🔧",
        points: 90,
        items: Array.from({ length: 90 }, (_, i) => ({
          id: i + 1,
          name: `6W Engine ${i + 1}: Heavy duty engine component ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "transmission-6w",
        name: "Commercial Transmission",
        icon: "⚙️",
        points: 70,
        items: Array.from({ length: 70 }, (_, i) => ({
          id: i + 91,
          name: `6W Transmission ${i + 1}: Commercial transmission system ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "suspension-6w",
        name: "Heavy Duty Suspension",
        icon: "🛞",
        points: 60,
        items: Array.from({ length: 60 }, (_, i) => ({
          id: i + 161,
          name: `6W Suspension ${i + 1}: Heavy duty suspension component ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "brakes-6w",
        name: "Air Brake System",
        icon: "🛑",
        points: 50,
        items: Array.from({ length: 50 }, (_, i) => ({
          id: i + 221,
          name: `6W Brakes ${i + 1}: Air brake system component ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "electrical-6w",
        name: "Commercial Electrical",
        icon: "⚡",
        points: 30,
        items: Array.from({ length: 30 }, (_, i) => ({
          id: i + 271,
          name: `6W Electrical ${i + 1}: Commercial electrical system ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
    ],
    "8 Wheeler": [
      {
        id: "engine-8w",
        name: "Heavy Duty Engine",
        icon: "🔧",
        points: 100,
        items: Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          name: `8W Engine ${i + 1}: Heavy duty engine system ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "transmission-8w",
        name: "Heavy Duty Transmission",
        icon: "⚙️",
        points: 80,
        items: Array.from({ length: 80 }, (_, i) => ({
          id: i + 101,
          name: `8W Transmission ${i + 1}: Heavy duty transmission ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "suspension-8w",
        name: "Heavy Duty Suspension",
        icon: "🛞",
        points: 60,
        items: Array.from({ length: 60 }, (_, i) => ({
          id: i + 181,
          name: `8W Suspension ${i + 1}: Heavy duty suspension ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "brakes-8w",
        name: "Air Brake System",
        icon: "🛑",
        points: 40,
        items: Array.from({ length: 40 }, (_, i) => ({
          id: i + 241,
          name: `8W Brakes ${i + 1}: Air brake system ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "electrical-8w",
        name: "Commercial Electrical",
        icon: "⚡",
        points: 20,
        items: Array.from({ length: 20 }, (_, i) => ({
          id: i + 281,
          name: `8W Electrical ${i + 1}: Commercial electrical ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
    ],
    "More Than 8 Wheelers": [
      {
        id: "engine-8w-plus",
        name: "Heavy Duty Engine",
        icon: "🔧",
        points: 120,
        items: Array.from({ length: 120 }, (_, i) => ({
          id: i + 1,
          name: `Heavy Truck Engine ${i + 1}: Ultra heavy duty engine system ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "transmission-8w-plus",
        name: "Heavy Duty Transmission",
        icon: "⚙️",
        points: 80,
        items: Array.from({ length: 80 }, (_, i) => ({
          id: i + 121,
          name: `Heavy Truck Transmission ${i + 1}: Ultra heavy duty transmission ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "suspension-8w-plus",
        name: "Heavy Duty Suspension",
        icon: "🛞",
        points: 60,
        items: Array.from({ length: 60 }, (_, i) => ({
          id: i + 201,
          name: `Heavy Truck Suspension ${i + 1}: Ultra heavy duty suspension ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
      {
        id: "brakes-8w-plus",
        name: "Air Brake System",
        icon: "🛑",
        points: 20,
        items: Array.from({ length: 20 }, (_, i) => ({
          id: i + 261,
          name: `Heavy Truck Brakes ${i + 1}: Ultra heavy duty air brake system ${i + 1}`,
          condition: ["excellent", "very good", "good", "average", "poor"][Math.floor(Math.random() * 5)],
        })),
      },
    ],
  }

  return baseCategories[vehicleType as keyof typeof baseCategories] || baseCategories["4 Wheeler"]
}

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vehicleId = Number(params.id)
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [itemConditions, setItemConditions] = useState<Record<number, string>>({})
  const [showCompleteFlow, setShowCompleteFlow] = useState(false)
  const [showFailConfirm, setShowFailConfirm] = useState(false)
  const [orderStatus, setOrderStatus] = useState<"pending" | "completed" | "failed">("pending")

  const inspectionCategories = useMemo(() => {
    return vehicle ? getInspectionCategoriesByVehicleType(vehicle.type) : []
  }, [vehicle])

  useEffect(() => {
    // Get vehicle data based on ID
    const vehicleInfo = getVehicleData(vehicleId)
    setVehicle(vehicleInfo)

    // Get inspection categories based on vehicle type
    const categories = getInspectionCategoriesByVehicleType(vehicleInfo?.type || "4 Wheeler")

    // Initialize item conditions from the categories
    const initialConditions: Record<number, string> = {}
    categories.forEach((category) => {
      category.items.forEach((item) => {
        initialConditions[item.id] = item.condition
      })
    })
    setItemConditions(initialConditions)

    setLoading(false)
  }, [vehicleId])

  // Calculate price adjustments based on conditions
  const priceAdjustments = useMemo(() => {
    if (!vehicle) return { totalAdjustment: 0, adjustedPrice: 0, items: {} }

    let totalAdjustment = 0
    const items: Record<number, number> = {}

    inspectionCategories.forEach((category) => {
      category.items.forEach((item) => {
        const condition = itemConditions[item.id] || item.condition
        const adjustment = conditionValues[condition as keyof typeof conditionValues].adjustment
        items[item.id] = adjustment
        totalAdjustment += adjustment
      })
    })

    const adjustedPrice = Math.max(vehicle.price + totalAdjustment, vehicle.price * 0.7) // Ensure price doesn't go below 70% of original

    return {
      totalAdjustment,
      adjustedPrice,
      items,
    }
  }, [vehicle, itemConditions, inspectionCategories])

  const handleConditionChange = (itemId: number, condition: string) => {
    setItemConditions((prev) => ({
      ...prev,
      [itemId]: condition,
    }))
  }

  const handleCompleteOrder = () => {
    setShowCompleteFlow(true)
  }

  const handleFailOrder = () => {
    setShowFailConfirm(true)
  }

  const confirmFailOrder = () => {
    setOrderStatus("failed")
    setShowFailConfirm(false)
    // In a real app, you would make an API call here to update the order status
    // and then redirect to the failed section
    setTimeout(() => {
      router.push("/dashboard/failed")
    }, 1000)
  }

  const confirmCompleteOrder = () => {
    setOrderStatus("completed")
    setShowCompleteFlow(false)
    // In a real app, you would make an API call here to update the order status
    setTimeout(() => {
      router.push("/dashboard/complete")
    }, 1000)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!vehicle) {
    return <div className="flex justify-center items-center h-screen">Vehicle not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/available">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">{vehicle.name}</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium">{vehicle.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Base Price:</span>
                  <span className="font-medium">₹{vehicle.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price Adjustment:</span>
                  <span
                    className={`font-medium ${priceAdjustments.totalAdjustment >= 0 ? "text-green-600" : "text-red-500"}`}
                  >
                    {priceAdjustments.totalAdjustment >= 0 ? "+" : ""}₹
                    {priceAdjustments.totalAdjustment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-gray-800">Final Price:</span>
                  <span className="text-green-600">₹{priceAdjustments.adjustedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Number:</span>
                  <span className="font-medium">{vehicle.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Appointment:</span>
                  <span className="font-medium">{vehicle.datetime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Credits:</span>
                  <span className="font-medium">{vehicle.credits}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span>{vehicle.owner.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{vehicle.owner.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <span>{vehicle.owner.address}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="h-64 rounded-lg overflow-hidden">
        {vehicle.owner.location && (
          <GoogleMap
            lat={vehicle.owner.location.lat}
            lng={vehicle.owner.location.lng}
            markerTitle={vehicle.owner.name}
          />
        )}
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="details">Vehicle Details</TabsTrigger>
          <TabsTrigger value="inspection">300-Point Inspection</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Additional Vehicle Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vehicle Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Vehicle Specifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Make:</span>
                      <span className="font-medium">{vehicle.name.split(" ")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model:</span>
                      <span className="font-medium">{vehicle.name.split(" ").slice(1).join(" ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year:</span>
                      <span className="font-medium">2019</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel Type:</span>
                      <span className="font-medium">
                        {vehicle.type === "2 Wheeler"
                          ? "Petrol"
                          : vehicle.type === "3 Wheeler"
                            ? "CNG/Petrol"
                            : vehicle.name.includes("EV")
                              ? "Electric"
                              : "Diesel"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transmission:</span>
                      <span className="font-medium">{vehicle.type === "2 Wheeler" ? "Manual" : "Manual"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mileage:</span>
                      <span className="font-medium">45,000 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Engine Capacity:</span>
                      <span className="font-medium">
                        {vehicle.type === "2 Wheeler"
                          ? "350cc"
                          : vehicle.type === "3 Wheeler"
                            ? "200cc"
                            : vehicle.type === "4 Wheeler"
                              ? "1.2L"
                              : "5.9L"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Condition */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Vehicle Condition</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Condition:</span>
                      <span className="font-medium text-green-600">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exterior:</span>
                      <span className="font-medium text-blue-600">Very Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interior:</span>
                      <span className="font-medium text-green-600">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Engine:</span>
                      <span className="font-medium text-green-600">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tires:</span>
                      <span className="font-medium text-yellow-600">Average</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Service:</span>
                      <span className="font-medium">2 months ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accidents:</span>
                      <span className="font-medium text-green-600">None</span>
                    </div>
                  </div>
                </div>

                {/* Documentation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Documentation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration:</span>
                      <span className="font-medium text-green-600">✓ Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-medium text-green-600">✓ Valid till Dec 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PUC Certificate:</span>
                      <span className="font-medium text-green-600">✓ Valid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Records:</span>
                      <span className="font-medium text-green-600">✓ Complete</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Owner Manual:</span>
                      <span className="font-medium text-green-600">✓ Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duplicate Key:</span>
                      <span className="font-medium text-green-600">✓ Available</span>
                    </div>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Financial Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Status:</span>
                      <span className="font-medium text-green-600">Clear</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Value:</span>
                      <span className="font-medium">₹{(vehicle.price * 1.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Depreciation:</span>
                      <span className="font-medium text-red-500">15% per year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance Value:</span>
                      <span className="font-medium">₹{(vehicle.price * 0.9).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Road Tax:</span>
                      <span className="font-medium text-green-600">Paid till 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Additional Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {vehicle.type === "2 Wheeler" && (
                    <>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Electric Start</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">LED Headlight</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        Digital Console
                      </span>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Disc Brake</span>
                    </>
                  )}
                  {vehicle.type === "3 Wheeler" && (
                    <>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">CNG Kit</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Commercial Use</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">GPS Tracker</span>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Music System</span>
                    </>
                  )}
                  {vehicle.type === "4 Wheeler" && (
                    <>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Air Conditioning</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Power Steering</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">ABS</span>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Airbags</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Central Locking</span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Music System</span>
                    </>
                  )}
                  {(vehicle.type === "6 Wheeler" ||
                    vehicle.type === "8 Wheeler" ||
                    vehicle.type === "More Than 8 Wheelers") && (
                    <>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Air Brakes</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Power Steering</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">GPS Tracking</span>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        Load Capacity: 10T
                      </span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Commercial License</span>
                    </>
                  )}
                </div>
              </div>

              {/* Seller Notes */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Seller Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    This vehicle has been well-maintained with regular servicing. All major components are in excellent
                    working condition. The vehicle has never been involved in any major accidents and has a clean
                    history. Recent maintenance includes oil change, brake pad replacement, and tire rotation. Perfect
                    for daily use with excellent fuel efficiency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inspection">
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                {vehicle?.type} Specific Inspection - 300 Points
              </h3>
              <p className="text-blue-600 text-sm">
                This inspection checklist is specifically designed for {vehicle?.type} vehicles with 300 comprehensive
                checkpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inspectionCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                  <div className="text-white p-4 bg-blue-600">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <span>{category.icon}</span>
                    </div>
                    <p className="text-sm text-green-100">{category.points} points</p>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b">
                          <div className="flex-1">
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs ${conditionValues[itemConditions[item.id] || (item.condition as keyof typeof conditionValues)].color}`}
                            >
                              {priceAdjustments.items[item.id] >= 0 ? "+" : ""}₹
                              {priceAdjustments.items[item.id]?.toLocaleString() || 0}
                            </span>
                            <select
                              className="text-sm rounded border border-gray-300 p-1"
                              value={itemConditions[item.id] || item.condition}
                              onChange={(e) => handleConditionChange(item.id, e.target.value)}
                            >
                              <option value="excellent">Excellent</option>
                              <option value="very good">Very Good</option>
                              <option value="good">Good</option>
                              <option value="average">Average</option>
                              <option value="poor">Poor</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Price Summary</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-600">Base Price: ₹{vehicle.price.toLocaleString()}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span className="text-green-600 font-bold">
                        Final Price: ₹{priceAdjustments.adjustedPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Total Adjustment:
                      <span className={priceAdjustments.totalAdjustment >= 0 ? "text-green-600" : "text-red-500"}>
                        {" "}
                        {priceAdjustments.totalAdjustment >= 0 ? "+" : ""}₹
                        {priceAdjustments.totalAdjustment.toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {orderStatus === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={handleCompleteOrder}
                          className="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
                        >
                          Complete Order
                        </Button>
                        <Button variant="destructive" onClick={handleFailOrder}>
                          Fail Order
                        </Button>
                      </>
                    )}
                    {orderStatus === "completed" && (
                      <div className="text-green-600 font-semibold">Order Completed Successfully!</div>
                    )}
                    {orderStatus === "failed" && <div className="text-red-600 font-semibold">Order Failed</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Complete Order Flow */}
      {showCompleteFlow && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Complete Order</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Customer Signature</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <canvas
                      ref={(canvas) => {
                        if (canvas) {
                          const ctx = canvas.getContext("2d")
                          let isDrawing = false
                          let lastX = 0
                          let lastY = 0

                          const startDrawing = (e: MouseEvent | TouchEvent) => {
                            isDrawing = true
                            const rect = canvas.getBoundingClientRect()
                            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
                            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
                            lastX = clientX - rect.left
                            lastY = clientY - rect.top
                          }

                          const draw = (e: MouseEvent | TouchEvent) => {
                            if (!isDrawing) return
                            if (!ctx) return

                            const rect = canvas.getBoundingClientRect()
                            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
                            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
                            const currentX = clientX - rect.left
                            const currentY = clientY - rect.top

                            ctx.beginPath()
                            ctx.moveTo(lastX, lastY)
                            ctx.lineTo(currentX, currentY)
                            ctx.strokeStyle = "#000"
                            ctx.lineWidth = 2
                            ctx.lineCap = "round"
                            ctx.stroke()

                            lastX = currentX
                            lastY = currentY
                          }

                          const stopDrawing = () => {
                            isDrawing = false
                          }

                          // Mouse events
                          canvas.addEventListener("mousedown", startDrawing)
                          canvas.addEventListener("mousemove", draw)
                          canvas.addEventListener("mouseup", stopDrawing)
                          canvas.addEventListener("mouseout", stopDrawing)

                          // Touch events for mobile
                          canvas.addEventListener("touchstart", (e) => {
                            e.preventDefault()
                            startDrawing(e)
                          })
                          canvas.addEventListener("touchmove", (e) => {
                            e.preventDefault()
                            draw(e)
                          })
                          canvas.addEventListener("touchend", (e) => {
                            e.preventDefault()
                            stopDrawing()
                          })

                          // Set canvas size
                          canvas.width = 400
                          canvas.height = 150

                          // Set white background
                          if (ctx) {
                            ctx.fillStyle = "white"
                            ctx.fillRect(0, 0, canvas.width, canvas.height)
                          }
                        }
                      }}
                      className="w-full h-32 border border-gray-200 rounded cursor-crosshair bg-white"
                      style={{ touchAction: "none" }}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-600">Sign above</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          const canvas = e.currentTarget.parentElement?.querySelector("canvas")
                          if (canvas) {
                            const ctx = canvas.getContext("2d")
                            if (ctx) {
                              ctx.fillStyle = "white"
                              ctx.fillRect(0, 0, canvas.width, canvas.height)
                            }
                          }
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 h-20"
                    placeholder="Any additional notes about the completion..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Final Amount Paid</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    defaultValue={priceAdjustments.adjustedPrice}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => setShowCompleteFlow(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={confirmCompleteOrder} className="flex-1 bg-green-600 hover:bg-green-700">
                    Confirm Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Fail Order Confirmation */}
      {showFailConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-600">⚠️ Think Twice Before Failing</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Are you sure you want to fail this order? This action will move the order to the failed section and
                  cannot be easily undone.
                </p>
                <div>
                  <label className="block text-sm font-medium mb-2">Reason for Failure</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2">
                    <option value="">Select a reason...</option>
                    <option value="customer_unresponsive">Customer Unresponsive</option>
                    <option value="price_mismatch">Price Mismatch</option>
                    <option value="vehicle_condition">Vehicle Condition Issues</option>
                    <option value="documentation">Documentation Problems</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Details</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 h-20"
                    placeholder="Provide more details about why this order is being failed..."
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => setShowFailConfirm(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={confirmFailOrder} variant="destructive" className="flex-1">
                    Confirm Fail Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
