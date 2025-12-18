import { faker } from "@faker-js/faker";

faker.seed(42);

export type OrderStatus =
  | "Assigned to Vendor"
  | "Cancelled by Vehiverze"
  | "Cancelled by Customer"
  | "Completed"
  | "Pending";

export type VehicleType =
  | "2 Wheeler"
  | "3 Wheeler"
  | "4 Wheeler - Cars"
  | "4 Wheeler - Commercial Cars"
  | "4 Wheeler - Trucks"
  | "6 Wheeler"
  | "More Than 8 Wheelers"
  | "New Vehicle"
  | "Garage Service";

export type ServiceType = "Buy" | "Sell" | "Garage Service" | "New Vehicle";

export type Order = {
  id: string;
  date: string;
  model: string;
  city: string;
  type: VehicleType;
  serviceType: ServiceType;
  status: OrderStatus;
  token: string;
  pickup: string;
  vendor: string | null;
  specs: {
    brand: string;
    model: string;
    manufacturingYear: string;
    variant: string;
    ownershipHistory: string;
    fuelType: string;
    kilometersDriven: string;
    city: string;
    planningToSell:
      | "Immediately"
      | "Within a week"
      | "Within a month"
      | "After 1-2 months";
    priceEstimate: "Fair" | "Good" | "Very Good" | "Excellent";
  };
  pricing: {
    quoted: number;
    requote: number | null;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    pincode: string;
    city: string;
    payment: "Cash" | "Online";
  };
  logs: Array<{
    timestamp: string;
    action: string;
  }>;
};

const models: Record<VehicleType, string[]> = {
  "2 Wheeler": [
    "Honda Activa",
    "TVS Jupiter",
    "Bajaj Pulsar",
    "Royal Enfield Classic",
    "Hero Splendor",
  ],
  "3 Wheeler": [
    "Bajaj RE",
    "Piaggio Ape",
    "Mahindra Alfa",
    "TVS King",
    "Atul Gem",
  ],
  "4 Wheeler - Cars": [
    "Maruti Swift",
    "Hyundai i20",
    "Tata Nexon",
    "Honda City",
    "Toyota Innova",
  ],
  "4 Wheeler - Commercial Cars": [
    "Maruti Eeco",
    "Mahindra Bolero",
    "Tata Ace",
    "Force Traveller",
    "Toyota Hiace",
  ],
  "4 Wheeler - Trucks": [
    "Tata Intra",
    "Mahindra Pickup",
    "Ashok Leyland Partner",
    "Isuzu D-Max",
    "Tata Yodha",
  ],
  "6 Wheeler": [
    "Tata 407",
    "Ashok Leyland Dost",
    "Eicher Pro 2049",
    "BharatBenz 914R",
    "Mahindra Jayo",
  ],
  "More Than 8 Wheelers": [
    "Tata Prima",
    "Ashok Leyland 2820",
    "BharatBenz 2823R",
    "Eicher Pro 6025",
    "Mahindra Blazo X",
  ],
  "Garage Service": [
    "General Service",
    "Repair Work",
    "Paint Job",
    "Tire Change",
    "Engine Work",
  ],
  "New Vehicle": [
    "New Car Booking",
    "New Bike Booking",
    "New Commercial Vehicle",
    "New Truck Booking",
    "New Auto Booking",
  ],
};

const brands: Record<VehicleType, string[]> = {
  "2 Wheeler": [
    "Honda",
    "TVS",
    "Bajaj",
    "Royal Enfield",
    "Hero",
    "Yamaha",
    "Suzuki",
  ],
  "3 Wheeler": ["Bajaj", "Piaggio", "Mahindra", "TVS", "Atul"],
  "4 Wheeler - Cars": [
    "Maruti Suzuki",
    "Hyundai",
    "Tata",
    "Honda",
    "Toyota",
    "Mahindra",
    "Kia",
  ],
  "4 Wheeler - Commercial Cars": [
    "Maruti Suzuki",
    "Mahindra",
    "Tata",
    "Force",
    "Toyota",
  ],
  "4 Wheeler - Trucks": [
    "Tata",
    "Mahindra",
    "Ashok Leyland",
    "Isuzu",
    "Eicher",
  ],
  "6 Wheeler": ["Tata", "Ashok Leyland", "Eicher", "BharatBenz", "Mahindra"],
  "More Than 8 Wheelers": [
    "Tata",
    "Ashok Leyland",
    "BharatBenz",
    "Eicher",
    "Mahindra",
  ],
  "Garage Service": ["N/A"],
  "New Vehicle": ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota"],
};

export function generateOrder(): Order {
  const statuses: OrderStatus[] = [
    "Assigned to Vendor",
    "Cancelled by Vehiverze",
    "Cancelled by Customer",
    "Completed",
    "Pending",
  ];

  const serviceTypes: ServiceType[] = [
    "Buy",
    "Sell",
    "Garage Service",
    "New Vehicle",
  ];

  const vehicleTypes: VehicleType[] = [
    "2 Wheeler",
    "3 Wheeler",
    "4 Wheeler - Cars",
    "4 Wheeler - Commercial Cars",
    "4 Wheeler - Trucks",
    "6 Wheeler",
    "More Than 8 Wheelers",
    "New Vehicle",
    "Garage Service",
  ];

  const type = faker.helpers.arrayElement(vehicleTypes);
  const serviceType = faker.helpers.arrayElement(serviceTypes);
  const status = faker.helpers.arrayElement(statuses);
  const brand = faker.helpers.arrayElement(brands[type]);
  const model = faker.helpers.arrayElement(models[type]);
  const city = faker.location.city();

  return {
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    model,
    city,
    type,
    serviceType,
    status,
    token: faker.string.alphanumeric(8).toUpperCase(),
    pickup: faker.date.soon().toISOString(),
    vendor:
      status === "Assigned to Vendor" || status === "Completed"
        ? faker.company.name()
        : null,
    specs: {
      brand,
      model,
      manufacturingYear: faker.date
        .past({ years: 10 })
        .getFullYear()
        .toString(),
      variant: faker.helpers.arrayElement(["Base", "Mid", "Top", "Premium"]),
      ownershipHistory: faker.helpers.arrayElement([
        "1st Owner",
        "2nd Owner",
        "3rd Owner",
      ]),
      fuelType: faker.helpers.arrayElement([
        "Petrol",
        "Diesel",
        "CNG",
        "Electric",
      ]),
      kilometersDriven: `${faker.number.int({ min: 5000, max: 150000 })} km`,
      city,
      planningToSell: faker.helpers.arrayElement([
        "Immediately",
        "Within a week",
        "Within a month",
        "After 1-2 months",
      ]),
      priceEstimate: faker.helpers.arrayElement([
        "Fair",
        "Good",
        "Very Good",
        "Excellent",
      ]),
    },
    pricing: {
      quoted: faker.number.int({ min: 50000, max: 2000000 }),
      requote: faker.datatype.boolean()
        ? faker.number.int({ min: 50000, max: 2000000 })
        : null,
    },
    customer: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("+91 ##########"),
      address: faker.location.streetAddress(),
      pincode: faker.location.zipCode("######"),
      city,
      payment: faker.helpers.arrayElement(["Cash", "Online"]),
    },
    logs: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      timestamp: faker.date.recent().toISOString(),
      action: faker.helpers.arrayElement([
        "Order created",
        "Vendor assigned",
        "Inspection scheduled",
        "Price quoted",
        "Customer contacted",
        "Documents verified",
        "Payment received",
      ]),
    })),
  };
}

export function generateOrders(count: number): Order[] {
  return Array.from({ length: count }, generateOrder);
}

// Store orders in memory for demo
let orders = generateOrders(100);

// CRUD operations
export const ordersDb = {
  getAll: () => orders,
  getById: (id: string) => orders.find((order) => order.id === id),
  create: (order: Omit<Order, "id">) => {
    const newOrder = { ...order, id: faker.string.uuid() };
    orders.unshift(newOrder);
    return newOrder;
  },
  update: (id: string, updates: Partial<Order>) => {
    orders = orders.map((order) =>
      order.id === id ? { ...order, ...updates } : order
    );
    return orders.find((order) => order.id === id);
  },
  delete: (id: string) => {
    orders = orders.filter((order) => order.id !== id);
  },
};
