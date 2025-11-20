import { faker } from "@faker-js/faker"

export type OrderStatus =
  | "Assigned to Vendor"
  | "Cancelled by Vehiverze"
  | "Cancelled by Customer"
  | "Completed"
  | "Pending"

export type VehicleType =
  | "2 Wheeler"
  | "3 Wheeler"
  | "4 Wheeler"
  | "6 Wheeler"
  | "8 Wheeler"
  | "New Vehicle"
  | "Garage Service"

export type ServiceType = "Buy" | "Sell" | "Garage Service" | "New Vehicle"

export type Order = {
  id: string
  date: string
  model: string
  city: string
  type: VehicleType
  serviceType: ServiceType
  status: OrderStatus
  token: string
  pickup: string
  vendor: string | null
  specs: {
    brand: string
    model: string
    manufacturingYear: string
    variant: string
    ownershipHistory: string
    fuelType: string
    kilometersDriven: string
    city: string
    planningToSell: "Immediately" | "Within a week" | "Within a month" | "After 1-2 months"
    priceEstimate: "Fair" | "Good" | "Very Good" | "Excellent"
  }
  pricing: {
    quoted: number
    requote: number | null
  }
  customer: {
    name: string
    email: string
    phone: string
    address: string
    pincode: string
    city: string
    payment: "Cash" | "Online"
  }
  logs: Array<{
    timestamp: string
    action: string
  }>
}

export function generateOrder(): Order {
  const statuses: OrderStatus[] = [
    "Assigned to Vendor",
    "Cancelled by Vehiverze",
    "Cancelled by Customer",
    "Completed",
    "Pending",
  ]

  const serviceTypes: ServiceType[] = ["Buy", "Sell", "Garage Service", "New Vehicle"]

  const models = {
    "2 Wheeler": ["Honda Activa", "TVS Jupiter", "Bajaj Pulsar", "Royal Enfield Classic", "Hero Splendor"],
    "3 Wheeler": ["Bajaj RE", "Piaggio Ape", "Mahindra Alfa", "TVS King", "Atul Gem"],
    "4 Wheeler": ["Maruti Swift", "Hyundai i20", "Tata Nexon", "Honda City", "Toyota Innova"],
    "6 Wheeler": ["Tata 407", "Ashok Leyland Dost", "Eicher Pro 2049", "BharatBenz 914R", "Mahindra Jayo"],
    "8 Wheeler": ["Tata Prima", "Ashok Leyland 2820", "BharatBenz 2823R", "Eicher Pro 6025", "Mahindra Blazo X"],
    "Garage Service": ["General Service", "Repair Work", "Paint Job", "Tire Change", "Engine Work"],
    "New Vehicle": [
      "New Car Booking",
      "New Bike Booking",
      "New Commercial Vehicle",
      "New Truck Booking",
      "New Auto Booking",
    ],
  }

  const brands = {
    "2 Wheeler": ["Honda", "TVS", "Bajaj", "Royal Enfield", "Hero", "Yamaha", "Suzuki"],
    "3 Wheeler": ["Bajaj", "Piaggio", "Mahindra", "TVS", "Atul"],
    "4 Wheeler": ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia"],
    "6 Wheeler": ["Tata", "Ashok Leyland", "Eicher", "BharatBenz", "Mahindra"],
    "8 Wheeler": ["Tata", "Ashok Leyland", "BharatBenz", "Eicher", "Mahindra"],
    "Garage Service": ["N/A"],
    "New Vehicle": ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota"],
  }

  const type = faker.helpers.arrayElement(Object.keys(models) as VehicleType[])
  const customerCity = faker.location.city()

  return {
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    model: faker.helpers.arrayElement(models[type]),
    city: customerCity,
    type,
    serviceType: faker.helpers.arrayElement(serviceTypes),
    status: faker.helpers.arrayElement(statuses),
    token: faker.string.alphanumeric(10).toUpperCase(),
    pickup: faker.date.future().toISOString(),
    vendor: Math.random() > 0.5 ? faker.person.fullName() : null,
    specs: {
      brand: faker.helpers.arrayElement(brands[type]),
      model: faker.helpers.arrayElement(models[type]),
      manufacturingYear: faker.date.between({ from: "2010-01-01", to: "2024-12-31" }).getFullYear().toString(),
      variant: faker.helpers.arrayElement(["Base", "Mid", "Top", "LXi", "VXi", "ZXi", "Deluxe", "Premium"]),
      ownershipHistory: faker.helpers.arrayElement(["1st Owner", "2nd Owner", "3rd Owner", "4th Owner"]),
      fuelType: faker.helpers.arrayElement(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]),
      kilometersDriven: `${faker.number.int({ min: 5000, max: 150000 }).toLocaleString()} km`,
      city: customerCity,
      planningToSell: faker.helpers.arrayElement([
        "Immediately",
        "Within a week",
        "Within a month",
        "After 1-2 months",
      ]),
      priceEstimate: faker.helpers.arrayElement(["Fair", "Good", "Very Good", "Excellent"]),
    },
    pricing: {
      quoted: faker.number.int({ min: 5000, max: 50000 }),
      requote: Math.random() > 0.5 ? faker.number.int({ min: 4000, max: 45000 }) : null,
    },
    customer: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("##########"),
      address: faker.location.streetAddress(),
      pincode: faker.location.zipCode("######"),
      city: customerCity,
      payment: faker.helpers.arrayElement(["Cash", "Online"]),
    },
    logs: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      timestamp: faker.date.recent().toISOString(),
      action: faker.helpers.arrayElement([
        "Lead Created",
        "Lead Converted to Order",
        "Assigned to Vendor",
        "Pickup Scheduled",
        "Order Completed",
        "Order Cancelled",
      ]),
    })),
  }
}

export function generateOrders(count: number): Order[] {
  return Array.from({ length: count }, generateOrder)
}

// Store orders in memory for demo
let orders = generateOrders(100)

// CRUD operations
export const ordersDb = {
  getAll: () => orders,
  getById: (id: string) => orders.find((order) => order.id === id),
  create: (order: Omit<Order, "id">) => {
    const newOrder = { ...order, id: faker.string.uuid() }
    orders.unshift(newOrder)
    return newOrder
  },
  update: (id: string, updates: Partial<Order>) => {
    orders = orders.map((order) => (order.id === id ? { ...order, ...updates } : order))
    return orders.find((order) => order.id === id)
  },
  delete: (id: string) => {
    orders = orders.filter((order) => order.id !== id)
  },
}


