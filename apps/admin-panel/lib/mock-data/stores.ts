import {
  generateLead,
  generateVendor,
  generatePayment,
  generateArea,
  generateNotification,
  generateCredit,
  generateProduct,
} from "./generators"

// Initialize mock data stores
let leads = Array.from({ length: 100 }, generateLead)
let vendors = Array.from({ length: 50 }, generateVendor)
let payments = Array.from({ length: 100 }, generatePayment)
let areas = Array.from({ length: 30 }, generateArea)
let notifications = Array.from({ length: 50 }, generateNotification)
let credits = Array.from({ length: 100 }, generateCredit)
let products = Array.from({ length: 100 }, generateProduct)

// CRUD operations for leads
export const leadsDb = {
  getAll: () => leads,
  getById: (id: string) => leads.find((lead) => lead.id === id),
  create: (lead: any) => {
    const newLead = { ...lead, id: crypto.randomUUID() }
    leads.unshift(newLead)
    return newLead
  },
  update: (id: string, updates: any) => {
    leads = leads.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    return leads.find((lead) => lead.id === id)
  },
  delete: (id: string) => {
    leads = leads.filter((lead) => lead.id !== id)
  },
}

// CRUD operations for vendors
export const vendorsDb = {
  getAll: () => vendors,
  getById: (id: string) => vendors.find((vendor) => vendor.id === id),
  create: (vendor: any) => {
    const newVendor = { ...vendor, id: crypto.randomUUID() }
    vendors.unshift(newVendor)
    return newVendor
  },
  update: (id: string, updates: any) => {
    vendors = vendors.map((vendor) => (vendor.id === id ? { ...vendor, ...updates } : vendor))
    return vendors.find((vendor) => vendor.id === id)
  },
  delete: (id: string) => {
    vendors = vendors.filter((vendor) => vendor.id !== id)
  },
}

// CRUD operations for payments
export const paymentsDb = {
  getAll: () => payments,
  getById: (id: string) => payments.find((payment) => payment.id === id),
  create: (payment: any) => {
    const newPayment = { ...payment, id: crypto.randomUUID() }
    payments.unshift(newPayment)
    return newPayment
  },
  update: (id: string, updates: any) => {
    payments = payments.map((payment) => (payment.id === id ? { ...payment, ...updates } : payment))
    return payments.find((payment) => payment.id === id)
  },
  delete: (id: string) => {
    payments = payments.filter((payment) => payment.id !== id)
  },
}

// CRUD operations for areas
export const areasDb = {
  getAll: () => areas,
  getById: (id: string) => areas.find((area) => area.id === id),
  create: (area: any) => {
    const newArea = { ...area, id: crypto.randomUUID() }
    areas.unshift(newArea)
    return newArea
  },
  update: (id: string, updates: any) => {
    areas = areas.map((area) => (area.id === id ? { ...area, ...updates } : area))
    return areas.find((area) => area.id === id)
  },
  delete: (id: string) => {
    areas = areas.filter((area) => area.id !== id)
  },
}

// CRUD operations for notifications
export const notificationsDb = {
  getAll: () => notifications,
  getById: (id: string) => notifications.find((notification) => notification.id === id),
  create: (notification: any) => {
    const newNotification = { ...notification, id: crypto.randomUUID() }
    notifications.unshift(newNotification)
    return newNotification
  },
  update: (id: string, updates: any) => {
    notifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, ...updates } : notification,
    )
    return notifications.find((notification) => notification.id === id)
  },
  delete: (id: string) => {
    notifications = notifications.filter((notification) => notification.id !== id)
  },
}

// CRUD operations for credits
export const creditsDb = {
  getAll: () => credits,
  getById: (id: string) => credits.find((credit) => credit.id === id),
  create: (credit: any) => {
    const newCredit = { ...credit, id: crypto.randomUUID() }
    credits.unshift(newCredit)
    return newCredit
  },
  update: (id: string, updates: any) => {
    credits = credits.map((credit) => (credit.id === id ? { ...credit, ...updates } : credit))
    return credits.find((credit) => credit.id === id)
  },
  delete: (id: string) => {
    credits = credits.filter((credit) => credit.id !== id)
  },
}

// CRUD operations for products
export const productsDb = {
  getAll: () => products,
  getById: (id: string) => products.find((product) => product.id === id),
  create: (product: any) => {
    const newProduct = { ...product, id: crypto.randomUUID() }
    products.unshift(newProduct)
    return newProduct
  },
  update: (id: string, updates: any) => {
    products = products.map((product) => (product.id === id ? { ...product, ...updates } : product))
    return products.find((product) => product.id === id)
  },
  delete: (id: string) => {
    products = products.filter((product) => product.id !== id)
  },
}


