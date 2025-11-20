import { faker } from "@faker-js/faker"
import type { VehicleProduct, VehicleType, FuelType, VehicleCondition } from "./vehicle-types"
import { vehicleBrands } from "./vehicle-types"

// Initialize mock data store
let vehicles: VehicleProduct[] = []

// CRUD operations for vehicles
export const vehiclesDb = {
  getAll: () => vehicles,

  getById: (id: string) => vehicles.find((vehicle) => vehicle.id === id),

  create: (vehicle: Omit<VehicleProduct, "id" | "createdAt" | "updatedAt">) => {
    const newVehicle: VehicleProduct = {
      ...vehicle,
      id: faker.string.uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    vehicles.unshift(newVehicle)
    return newVehicle
  },

  update: (id: string, updates: Partial<VehicleProduct>) => {
    vehicles = vehicles.map((vehicle) =>
      vehicle.id === id
        ? {
            ...vehicle,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : vehicle,
    )
    return vehicles.find((vehicle) => vehicle.id === id)
  },

  delete: (id: string) => {
    vehicles = vehicles.filter((vehicle) => vehicle.id !== id)
  },

  // Generate some initial data
  seed: (count = 10) => {
    vehicles = Array.from({ length: count }, () => {
      const type = faker.helpers.arrayElement([
        "2 Wheeler",
        "3 Wheeler",
        "4 Wheeler - Cars",
        "4 Wheeler - Commercial Cars",
        "4 Wheeler - Trucks",
        "6 Wheeler",
        "More Than 8 Wheelers",
      ] as VehicleType[])

      const brand = faker.helpers.arrayElement(vehicleBrands[type])
      const basePrice = faker.number.int({ min: 50000, max: 2000000 })

      return {
        id: faker.string.uuid(),
        type,
        brand,
        model: faker.vehicle.model(),
        variant: faker.helpers.arrayElement(["Base", "Mid", "Top", "Special"]),
        year: faker.number.int({ min: 2015, max: 2024 }),
        fuelType: faker.helpers.arrayElement(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"] as FuelType[]),
        kilometers: faker.number.int({ min: 0, max: 100000 }),
        location: faker.location.city(),
        basePrice,
        currentPrice: basePrice,
        condition: faker.helpers.arrayElement([
          "Excellent",
          "Very Good",
          "Good",
          "Average",
          "Poor",
        ] as VehicleCondition[]),
        inspectionScore: faker.number.int({ min: 150, max: 300 }),
        maxInspectionScore: 300,
        description: faker.lorem.paragraph(),
        images: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.image.url()),
        status: faker.helpers.arrayElement(["active", "inactive"]),
        serviceType: faker.helpers.arrayElement(["Buy", "Sell", "Garage Service", "New Vehicle"]),
        inspectionDate: faker.date.recent().toISOString(),
        inspectionResults: [],
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      }
    })
    return vehicles
  },
}

// Seed initial data
vehiclesDb.seed()


