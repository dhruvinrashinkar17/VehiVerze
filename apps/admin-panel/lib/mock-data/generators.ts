import { faker } from "@faker-js/faker";
import type {
  VehicleType,
  LeadStatus,
  VendorStatus,
  PaymentStatus,
  NotificationType,
  CreditType,
} from "./types";

const vehicleModels = {
  "2 Wheeler": [
    "Honda Activa",
    "TVS Jupiter",
    "Bajaj Pulsar",
    "Royal Enfield Classic",
    "Hero Splendor",
    "Suzuki Access",
    "Yamaha FZ",
  ],
  "3 Wheeler": [
    "Bajaj RE",
    "Piaggio Ape",
    "Mahindra Alfa",
    "TVS King",
    "Atul Gem",
    "Force Minidor",
    "Bajaj Maxima",
  ],
  "4 Wheeler - Cars": [
    "Maruti Swift",
    "Hyundai i20",
    "Tata Nexon",
    "Honda City",
    "Toyota Innova",
    "Mahindra XUV700",
    "Kia Seltos",
  ],
  "4 Wheeler - Commercial Cars": [
    "Mahindra Bolero Pickup",
    "Tata Ace",
    "Force Traveller",
    "Isuzu D-Max",
    "Ashok Leyland Dost",
  ],
  "4 Wheeler - Trucks": [
    "Tata 407",
    "Mahindra Jayo",
    "Eicher Pro 1049",
    "BharatBenz 914R",
    "Ashok Leyland Partner",
  ],
  "6 Wheeler": [
    "Tata 1109",
    "Ashok Leyland Ecomet",
    "Eicher Pro 2049",
    "BharatBenz 1214R",
    "Mahindra Furio",
    "Force Traveller",
    "SML Isuzu Samrat",
  ],
  "More Than 8 Wheelers": [
    "Tata Prima",
    "Ashok Leyland 2820",
    "BharatBenz 2823R",
    "Eicher Pro 6025",
    "Mahindra Blazo X",
    "Volvo FM",
    "Scania P410",
  ],
  "New Vehicle": [
    "New Car Booking",
    "New Bike Booking",
    "New Commercial Vehicle",
    "New Truck Booking",
    "New Auto Booking",
  ],
  "Garage Service": [
    "General Service",
    "AC Service",
    "Battery Replacement",
    "Brake Service",
    "Oil Change",
    "Tire Service",
    "Engine Repair",
  ],
};

export function generateLead() {
  const type = faker.helpers.arrayElement(
    Object.keys(vehicleModels) as VehicleType[]
  );
  const status: LeadStatus = faker.helpers.arrayElement([
    "New",
    "Contacted",
    "Qualified",
    "Converted",
    "Failed",
  ]);
  const serviceType = faker.helpers.arrayElement([
    "Buy",
    "Sell",
    "Garage Service",
    "New Vehicle",
  ]);

  return {
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    customerName: faker.person.fullName(),
    phone: faker.string.numeric(10),
    email: faker.internet.email(),
    vehicleType: type,
    model: faker.helpers.arrayElement(vehicleModels[type]),
    city: faker.location.city(),
    status,
    serviceType,
    notes: faker.lorem.sentence(),
    assignedTo: faker.person.fullName(),
    lastContact: faker.date.recent().toISOString(),
  };
}

export function generateVendor() {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    ownerName: faker.person.fullName(),
    phone: faker.string.numeric(10),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    pincode: faker.location.zipCode("######"),
    status: faker.helpers.arrayElement([
      "Active",
      "Inactive",
      "Pending Verification",
      "Suspended",
    ] as VendorStatus[]),
    rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    totalOrders: faker.number.int({ min: 10, max: 1000 }),
    completionRate: faker.number.float({ min: 75, max: 99, fractionDigits: 1 }),
    serviceTypes: faker.helpers.arrayElements(
      [
        "2 Wheeler",
        "3 Wheeler",
        "4 Wheeler - Cars",
        "4 Wheeler - Commercial Cars",
        "4 Wheeler - Trucks",
        "6 Wheeler",
        "More Than 8 Wheelers",
        "New Vehicle",
        "Garage Service",
      ] as VehicleType[],
      { min: 1, max: 3 }
    ),
    registrationDate: faker.date.past().toISOString(),
    documents: {
      gst: faker.string.alphanumeric(15).toUpperCase(),
      pan: faker.string.alphanumeric(10).toUpperCase(),
      bankAccount: faker.finance.accountNumber(),
      ifsc: faker.string.alphanumeric(11).toUpperCase(),
    },
  };
}

export function generatePayment() {
  return {
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    amount: faker.number.int({ min: 1000, max: 100000 }),
    type: faker.helpers.arrayElement(["Credit", "Debit"]),
    status: faker.helpers.arrayElement([
      "Completed",
      "Pending",
      "Failed",
      "Refunded",
    ] as PaymentStatus[]),
    orderId: faker.string.alphanumeric(8).toUpperCase(),
    customerName: faker.person.fullName(),
    paymentMethod: faker.helpers.arrayElement([
      "UPI",
      "Net Banking",
      "Credit Card",
      "Debit Card",
      "Cash",
    ]),
    transactionId: faker.string.alphanumeric(12).toUpperCase(),
    description: faker.lorem.sentence(),
  };
}

export function generateArea() {
  return {
    id: faker.string.uuid(),
    city: faker.location.city(),
    state: faker.location.state(),
    pincode: faker.location.zipCode("######"),
    isActive: faker.datatype.boolean(),
    serviceTypes: faker.helpers.arrayElements(
      [
        "2 Wheeler",
        "3 Wheeler",
        "4 Wheeler - Cars",
        "4 Wheeler - Commercial Cars",
        "4 Wheeler - Trucks",
        "6 Wheeler",
        "More Than 8 Wheelers",
        "New Vehicle",
        "Garage Service",
      ] as VehicleType[],
      { min: 2, max: 7 }
    ),
    vendorCount: faker.number.int({ min: 5, max: 50 }),
    orderCount: faker.number.int({ min: 100, max: 1000 }),
    avgResponseTime: faker.number.int({ min: 15, max: 60 }),
  };
}

export function generateNotification() {
  const type: NotificationType = faker.helpers.arrayElement([
    "Order Update",
    "Lead Alert",
    "Payment Confirmation",
    "System Alert",
  ]);

  return {
    id: faker.string.uuid(),
    type,
    title: faker.helpers.arrayElement([
      "New Order Assigned",
      "Lead Status Updated",
      "Payment Received",
      "System Maintenance",
    ]),
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toISOString(),
    isRead: faker.datatype.boolean(),
    priority: faker.helpers.arrayElement(["High", "Medium", "Low"]),
    targetUsers: faker.helpers.arrayElements(
      ["All", "Vendors", "Customers", "Admins"],
      { min: 1, max: 2 }
    ),
  };
}

export function generateCredit() {
  const type: CreditType = faker.helpers.arrayElement([
    "Order Commission",
    "Referral Bonus",
    "Service Charge",
    "Penalty",
  ]);

  return {
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    type,
    amount: faker.number.int({ min: 100, max: 10000 }),
    vendorId: faker.string.uuid(),
    vendorName: faker.company.name(),
    orderId: faker.string.alphanumeric(8).toUpperCase(),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(["Processed", "Pending", "Failed"]),
    balanceAfter: faker.number.int({ min: 0, max: 50000 }),
  };
}

export function generateProduct() {
  const type = faker.helpers.arrayElement(
    Object.keys(vehicleModels) as VehicleType[]
  );
  const model = faker.helpers.arrayElement(vehicleModels[type]);

  return {
    id: faker.string.uuid(),
    type,
    model,
    brand: model.split(" ")[0],
    basePrice: faker.number.int({ min: 50000, max: 2000000 }),
    maxPrice: faker.number.int({ min: 2000000, max: 5000000 }),
    isActive: faker.datatype.boolean(),
    specifications: {
      year: faker.date.past().getFullYear(),
      fuelType: faker.helpers.arrayElement([
        "Petrol",
        "Diesel",
        "CNG",
        "Electric",
      ]),
      transmission: faker.helpers.arrayElement(["Manual", "Automatic"]),
      mileage: `${faker.number.int({ min: 10, max: 25 })} kmpl`,
      engineCC: faker.number.int({ min: 100, max: 3000 }),
    },
    availableCities: faker.helpers.arrayElements(
      [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Kolkata",
        "Hyderabad",
        "Pune",
      ],
      { min: 2, max: 7 }
    ),
    imageUrl: `/placeholder.svg?height=200&width=300`,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}
