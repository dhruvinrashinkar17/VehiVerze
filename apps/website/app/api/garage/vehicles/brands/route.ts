import { NextResponse } from "next/server"

// Vehicle brands data by type
const vehicleBrands = {
  "2w": {
    Honda: ["Activa", "CB Shine", "Unicorn", "CBR", "Dio", "Grazia"],
    Hero: ["Splendor", "HF Deluxe", "Passion", "Xtreme", "Maestro", "Pleasure"],
    Bajaj: ["Pulsar", "Avenger", "Platina", "CT", "Chetak", "Dominar"],
    TVS: ["Apache", "Jupiter", "Star City", "Radeon", "Ntorq", "iQube"],
    Yamaha: ["FZ", "R15", "MT", "Fascino", "Ray ZR", "Aerox"],
    "Royal Enfield": ["Classic", "Bullet", "Himalayan", "Interceptor", "Continental GT", "Meteor"],
    Suzuki: ["Access", "Burgman", "Gixxer", "Intruder", "Hayabusa"],
    KTM: ["Duke", "RC", "Adventure", "Supermoto"],
  },
  "3w": {
    Bajaj: ["RE Compact", "RE Maxima", "Qute", "RE 4S"],
    Mahindra: ["Alfa", "Treo", "e-Alfa Mini", "Supro"],
    Piaggio: ["Ape Auto", "Ape City", "Ape Xtra", "Porter"],
    TVS: ["King", "King Deluxe", "King Duramax"],
    Force: ["Traveller", "Tempo", "Trax"],
  },
  "4w": {
    "Maruti Suzuki": [
      "Swift",
      "Baleno",
      "Alto",
      "Wagon R",
      "Dzire",
      "Vitara Brezza",
      "Ertiga",
      "XL6",
      "S-Cross",
      "Ciaz",
    ],
    Hyundai: ["i20", "Creta", "Verna", "Grand i10", "Venue", "Tucson", "Alcazar", "Santro", "Aura"],
    Tata: ["Nexon", "Harrier", "Altroz", "Tigor", "Safari", "Punch", "Tiago", "Hexa"],
    Mahindra: ["XUV700", "Scorpio", "Thar", "Bolero", "XUV300", "Marazzo", "KUV100"],
    Honda: ["City", "Amaze", "WR-V", "Jazz", "CR-V", "Civic", "Accord"],
    Toyota: ["Innova", "Fortuner", "Glanza", "Urban Cruiser", "Camry", "Vellfire", "Land Cruiser"],
    Kia: ["Seltos", "Sonet", "Carnival", "Carens"],
    MG: ["Hector", "ZS EV", "Astor", "Gloster"],
    Skoda: ["Octavia", "Superb", "Kushaq", "Slavia"],
    Volkswagen: ["Polo", "Vento", "Tiguan", "Taigun"],
  },
  "6w": {
    Tata: ["407", "709", "912", "1109", "LPT 1613", "LPT 1618"],
    "Ashok Leyland": ["Dost", "Partner", "MiTR", "Boss", "Bada Dost"],
    Mahindra: ["Bolero Pickup", "Supro", "Jeeto", "Furio"],
    Eicher: ["Pro 1049", "Pro 1059", "Pro 1080", "Pro 2049"],
    Force: ["Traveller", "Tempo", "Trax", "Citiline"],
    Isuzu: ["D-Max", "MU-X", "NPR"],
  },
  "8w": {
    Tata: ["Prima", "Signa", "Ultra", "LPT", "Novus", "T1 Prima"],
    "Ashok Leyland": ["Captain", "Boss", "Guru", "U-Truck", "Stallion", "Neptune"],
    Volvo: ["FM", "FH", "FMX", "VNL", "FE"],
    Scania: ["P-Series", "G-Series", "R-Series", "S-Series"],
    BharatBenz: ["1617", "2523", "3528", "4928", "1215", "2528"],
    "Mahindra Truck": ["Blazo", "Furio", "Jayo"],
    "VE Commercial": ["Ecomet", "Captain"],
  },
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const vehicleType = searchParams.get("type")

    if (vehicleType && vehicleBrands[vehicleType as keyof typeof vehicleBrands]) {
      return NextResponse.json({
        success: true,
        data: vehicleBrands[vehicleType as keyof typeof vehicleBrands],
      })
    }

    return NextResponse.json({
      success: true,
      data: vehicleBrands,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch vehicle brands" }, { status: 500 })
  }
}


