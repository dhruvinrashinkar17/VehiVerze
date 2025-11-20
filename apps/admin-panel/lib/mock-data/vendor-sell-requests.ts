import { faker } from "@faker-js/faker"

export type SellRequestStatus = "Pending" | "Accepted" | "Rejected"

export type VendorSellRequest = {
  id: string
  vendorId: string
  vendorName: string
  vendorPhone: string
  vendorEmail: string
  vehicleImage: string
  brand: string
  model: string
  year: string
  variant: string
  vehicleType: "2 Wheeler" | "3 Wheeler" | "4 Wheeler" | "6 Wheeler" | "8 Wheeler"
  fuelType: string
  transmission: string
  kilometersDriven: string
  ownershipHistory: string
  description: string
  price: number
  submissionDate: string
  status: SellRequestStatus
  rejectionReason?: string
  adminNote?: string
  images: string[]
}

export function generateVendorSellRequest(): VendorSellRequest {
  const vehicleTypes = ["2 Wheeler", "3 Wheeler", "4 Wheeler", "6 Wheeler", "8 Wheeler"] as const
  const vehicleType = faker.helpers.arrayElement(vehicleTypes)

  const brands: Record<string, string[]> = {
    "2 Wheeler": ["Honda", "TVS", "Bajaj", "Royal Enfield", "Hero"],
    "3 Wheeler": ["Bajaj", "Piaggio", "Mahindra", "TVS"],
    "4 Wheeler": ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota"],
    "6 Wheeler": ["Tata", "Ashok Leyland", "Eicher"],
    "8 Wheeler": ["Tata", "Ashok Leyland", "BharatBenz"],
  }

  const models: Record<string, string[]> = {
    "2 Wheeler": ["Activa", "Jupiter", "Pulsar", "Classic", "Splendor"],
    "3 Wheeler": ["RE", "Ape", "Alfa", "King"],
    "4 Wheeler": ["Swift", "i20", "Nexon", "City", "Innova"],
    "6 Wheeler": ["407", "Dost", "Pro 2049", "914R"],
    "8 Wheeler": ["Prima", "2820", "2823R", "Pro 6025"],
  }

  const brand = faker.helpers.arrayElement(brands[vehicleType])
  const model = faker.helpers.arrayElement(models[vehicleType])

  const statuses: SellRequestStatus[] = ["Pending", "Accepted", "Rejected"]

  return {
    id: faker.string.uuid(),
    vendorId: faker.string.uuid(),
    vendorName: faker.person.fullName(),
    vendorPhone: faker.phone.number("##########"),
    vendorEmail: faker.internet.email(),
    vehicleImage: `/placeholder.svg?height=200&width=300&query=${brand}+${model}`,
    brand,
    model,
    year: faker.date.between({ from: "2015-01-01", to: "2024-12-31" }).getFullYear().toString(),
    variant: faker.helpers.arrayElement(["Base", "Mid", "Top", "LXi", "VXi", "ZXi"]),
    vehicleType,
    fuelType: faker.helpers.arrayElement(["Petrol", "Diesel", "CNG", "Electric"]),
    transmission: faker.helpers.arrayElement(["Manual", "Automatic"]),
    kilometersDriven: `${faker.number.int({ min: 5000, max: 150000 }).toLocaleString()} km`,
    ownershipHistory: faker.helpers.arrayElement(["1st Owner", "2nd Owner", "3rd Owner"]),
    description: faker.lorem.sentences(3),
    price: faker.number.int({ min: 100000, max: 2000000 }),
    submissionDate: faker.date.recent().toISOString(),
    status: faker.helpers.arrayElement(statuses),
    rejectionReason: undefined,
    adminNote: undefined,
    images: Array.from(
      { length: faker.number.int({ min: 2, max: 5 }) },
      () => `/placeholder.svg?height=400&width=600&query=${brand}+${model}+vehicle`,
    ),
  }
}

export function generateVendorSellRequests(count: number): VendorSellRequest[] {
  return Array.from({ length: count }, generateVendorSellRequest)
}

let vendorSellRequests = generateVendorSellRequests(50)

export const vendorSellRequestsDb = {
  getAll: () => vendorSellRequests,
  getById: (id: string) => vendorSellRequests.find((req) => req.id === id),
  updateStatus: (id: string, status: SellRequestStatus, rejectionReason?: string, adminNote?: string) => {
    vendorSellRequests = vendorSellRequests.map((req) =>
      req.id === id ? { ...req, status, rejectionReason, adminNote } : req,
    )
    return vendorSellRequests.find((req) => req.id === id)
  },
  updateRequest: (id: string, updates: Partial<VendorSellRequest>) => {
    vendorSellRequests = vendorSellRequests.map((req) => (req.id === id ? { ...req, ...updates } : req))
    return vendorSellRequests.find((req) => req.id === id)
  },
}


