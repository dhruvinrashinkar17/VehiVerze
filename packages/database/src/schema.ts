import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  json,
  real,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// Helper for generating cuid
const cuid = () => createId();

// ============================================
// USER
// ============================================
export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name"),
  email: text("email").unique(),
  phone: text("phone").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  phoneVerified: timestamp("phone_verified", { mode: "date" }),
  image: text("image"),
  role: text("role").default("user").notNull(), // user, staff, admin
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  vehicles: many(vehicles),
  insurances: many(insurances),
  garageBookings: many(garageBookings),
  healthInsurances: many(healthInsurances),
}));

// ============================================
// VEHICLE
// ============================================
export const vehicles = pgTable("vehicle", {
  id: text("id").primaryKey().$defaultFn(cuid),
  type: text("type").notNull(), // 2,3,4,6,8 wheeler
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  variant: text("variant").notNull(),
  year: integer("year").notNull(),
  fuelType: text("fuel_type").notNull(),
  kilometers: text("kilometers").notNull(),
  city: text("city").notNull(),
  condition: json("condition").notNull(),
  images: text("images").array().notNull(),
  documents: json("documents"),
  estimatedPrice: decimal("estimated_price", { precision: 10, scale: 2 }),
  finalPrice: decimal("final_price", { precision: 10, scale: 2 }),
  status: text("status").default("pending").notNull(),
  listingType: text("listing_type").notNull(), // buy or sell
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  user: one(users, {
    fields: [vehicles.userId],
    references: [users.id],
  }),
  inspection: one(inspections),
}));

// ============================================
// INSPECTION
// ============================================
export const inspections = pgTable("inspection", {
  id: text("id").primaryKey().$defaultFn(cuid),
  vehicleId: text("vehicle_id")
    .notNull()
    .unique()
    .references(() => vehicles.id),
  address: text("address").notNull(),
  date: timestamp("date", { mode: "date" }).notNull(),
  timeSlot: text("time_slot").notNull(),
  status: text("status").default("scheduled").notNull(),
  report: json("report"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const inspectionsRelations = relations(inspections, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [inspections.vehicleId],
    references: [vehicles.id],
  }),
}));

// ============================================
// INSURANCE
// ============================================
export const insurances = pgTable("insurance", {
  id: text("id").primaryKey().$defaultFn(cuid),
  type: text("type").notNull(), // comprehensive, third-party, zero-dep
  vehicleDetails: json("vehicle_details").notNull(),
  premium: decimal("premium", { precision: 10, scale: 2 }).notNull(),
  coverage: decimal("coverage", { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp("start_date", { mode: "date" }).notNull(),
  endDate: timestamp("end_date", { mode: "date" }).notNull(),
  documents: json("documents"),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const insurancesRelations = relations(insurances, ({ one }) => ({
  user: one(users, {
    fields: [insurances.userId],
    references: [users.id],
  }),
}));

// ============================================
// HEALTH INSURANCE
// ============================================
export const healthInsurances = pgTable("health_insurance", {
  id: text("id").primaryKey().$defaultFn(cuid),
  type: text("type").notNull(), // individual, family, senior
  members: json("members").notNull(), // array of covered family members
  premium: decimal("premium", { precision: 10, scale: 2 }).notNull(),
  coverage: decimal("coverage", { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp("start_date", { mode: "date" }).notNull(),
  endDate: timestamp("end_date", { mode: "date" }).notNull(),
  documents: json("documents"),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const healthInsurancesRelations = relations(
  healthInsurances,
  ({ one }) => ({
    user: one(users, {
      fields: [healthInsurances.userId],
      references: [users.id],
    }),
  })
);

// ============================================
// GARAGE BOOKING (Legacy)
// ============================================
export const garageBookings = pgTable("garage_booking", {
  id: text("id").primaryKey().$defaultFn(cuid),
  vehicleDetails: json("vehicle_details").notNull(),
  serviceType: text("service_type").notNull(),
  description: text("description"),
  address: text("address"),
  date: timestamp("date", { mode: "date" }).notNull(),
  timeSlot: text("time_slot").notNull(),
  estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }),
  finalCost: decimal("final_cost", { precision: 10, scale: 2 }),
  status: text("status").default("scheduled").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const garageBookingsRelations = relations(garageBookings, ({ one }) => ({
  user: one(users, {
    fields: [garageBookings.userId],
    references: [users.id],
  }),
}));

// ============================================
// GARAGE PARTNER
// ============================================
export const garagePartners = pgTable(
  "garage_partner",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    name: text("name").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    pincode: text("pincode").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    ownerName: text("owner_name").notNull(),
    gstNumber: text("gst_number"),
    specialization: text("specialization").array().notNull(), // Array of specializations
    vehicleTypes: text("vehicle_types").array().notNull(), // Array of vehicle types they service
    services: text("services").array().notNull(), // Array of service IDs they offer
    workingHours: json("working_hours").notNull(), // Working hours data
    rating: real("rating").default(4.0).notNull(),
    totalReviews: integer("total_reviews").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    joinedAt: timestamp("joined_at", { mode: "date" }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    cityIdx: index("garage_partner_city_idx").on(table.city),
    phoneIdx: index("garage_partner_phone_idx").on(table.phone),
    isActiveIdx: index("garage_partner_is_active_idx").on(table.isActive),
  })
);

export const garagePartnersRelations = relations(
  garagePartners,
  ({ many }) => ({
    bookings: many(garageServiceBookings),
  })
);

// ============================================
// GARAGE SERVICE BOOKING
// ============================================
export const garageServiceBookings = pgTable(
  "garage_service_booking",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    bookingId: text("booking_id").notNull().unique(),
    vehicleType: text("vehicle_type").notNull(),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    year: integer("year").notNull(),
    variant: text("variant"),
    transmission: text("transmission"),
    registrationNumber: text("registration_number").notNull(),
    selectedServices: text("selected_services").array().notNull(), // Array of service IDs
    bookingDate: timestamp("booking_date", { mode: "date" }).notNull(),
    timeSlot: text("time_slot").notNull(),
    pickupDrop: boolean("pickup_drop").default(false).notNull(),
    additionalNotes: text("additional_notes"),
    customerName: text("customer_name").notNull(),
    mobile: text("mobile").notNull(),
    email: text("email"),
    address: text("address").notNull(),
    paymentMethod: text("payment_method").notNull(),
    paymentStatus: text("payment_status").default("pending").notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    finalAmount: decimal("final_amount", { precision: 10, scale: 2 }),
    status: text("status").default("confirmed").notNull(), // confirmed, in_progress, completed, cancelled
    garagePartnerId: text("garage_partner_id").references(
      () => garagePartners.id
    ), // nullable for manual staff assignment
    estimatedCompletionTime: timestamp("estimated_completion_time", {
      mode: "date",
    }),
    actualCompletionTime: timestamp("actual_completion_time", { mode: "date" }),
    serviceNotes: text("service_notes"),
    paidAt: timestamp("paid_at", { mode: "date" }),
    cancelledAt: timestamp("cancelled_at", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    mobileIdx: index("garage_service_booking_mobile_idx").on(table.mobile),
    statusIdx: index("garage_service_booking_status_idx").on(table.status),
    bookingDateIdx: index("garage_service_booking_date_idx").on(
      table.bookingDate
    ),
    partnerIdx: index("garage_service_booking_partner_idx").on(
      table.garagePartnerId
    ),
  })
);

export const garageServiceBookingsRelations = relations(
  garageServiceBookings,
  ({ one, many }) => ({
    garagePartner: one(garagePartners, {
      fields: [garageServiceBookings.garagePartnerId],
      references: [garagePartners.id],
    }),
    payments: many(payments),
    notifications: many(notifications),
  })
);

// ============================================
// PAYMENT
// ============================================
export const payments = pgTable("payment", {
  id: text("id").primaryKey().$defaultFn(cuid),
  bookingId: text("booking_id")
    .notNull()
    .references(() => garageServiceBookings.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(), // upi, card, wallet, cash
  paymentGateway: text("payment_gateway"), // razorpay, payu, etc.
  transactionId: text("transaction_id"),
  status: text("status").default("pending").notNull(), // pending, completed, failed, refunded
  gatewayResponse: json("gateway_response"),
  refundAmount: decimal("refund_amount", { precision: 10, scale: 2 }),
  refundedAt: timestamp("refunded_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(garageServiceBookings, {
    fields: [payments.bookingId],
    references: [garageServiceBookings.id],
  }),
}));

// ============================================
// NOTIFICATION
// ============================================
export const notifications = pgTable("notification", {
  id: text("id").primaryKey().$defaultFn(cuid),
  type: text("type").notNull(), // booking_confirmed, status_update, reminder, etc.
  title: text("title").notNull(),
  message: text("message").notNull(),
  recipientType: text("recipient_type").notNull(), // customer, partner, admin
  recipientId: text("recipient_id").notNull(),
  bookingId: text("booking_id").references(() => garageServiceBookings.id),
  isRead: boolean("is_read").default(false).notNull(),
  scheduledFor: timestamp("scheduled_for", { mode: "date" }),
  sentAt: timestamp("sent_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  booking: one(garageServiceBookings, {
    fields: [notifications.bookingId],
    references: [garageServiceBookings.id],
  }),
}));

// ============================================
// OTP
// ============================================
export const otps = pgTable(
  "otp",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    phone: text("phone").notNull(),
    code: text("code").notNull(),
    verified: boolean("verified").default(false).notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    phoneIdx: index("otp_phone_idx").on(table.phone),
    expiresAtIdx: index("otp_expires_at_idx").on(table.expiresAt),
  })
);

// ============================================
// BETTER AUTH (auth_*)
// ============================================
//
// These tables are used by `better-auth` and are intentionally kept separate
// from the existing domain `user` table to avoid breaking foreign keys.
export const authUsers = pgTable("auth_user", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  phoneNumber: text("phone_number").unique(),
  phoneNumberVerified: boolean("phone_number_verified")
    .default(false)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const authSessions = pgTable(
  "auth_session",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
  },
  (table) => ({
    userIdIdx: index("auth_session_user_id_idx").on(table.userId),
  })
);

export const authAccounts = pgTable(
  "auth_account",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "date",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "date",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("auth_account_user_id_idx").on(table.userId),
  })
);

export const authVerifications = pgTable(
  "auth_verification",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    identifierIdx: index("auth_verification_identifier_idx").on(
      table.identifier
    ),
  })
);

// ============================================
// LEAD
// ============================================
export const leads = pgTable(
  "lead",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone").notNull(),
    vehicleType: text("vehicle_type"),
    brand: text("brand"),
    model: text("model"),
    year: integer("year"),
    message: text("message"),
    status: text("status").default("new").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    phoneIdx: index("lead_phone_idx").on(table.phone),
    statusIdx: index("lead_status_idx").on(table.status),
    createdAtIdx: index("lead_created_at_idx").on(table.createdAt),
  })
);

// ============================================
// SELL ORDER
// ============================================
export const sellOrders = pgTable(
  "sell_order",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    vehicleType: text("vehicle_type").notNull(),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    variant: text("variant"),
    year: integer("year").notNull(),
    kilometers: text("kilometers").notNull(),
    condition: json("condition"),
    registrationNo: text("registration_no"),
    location: text("location"),
    sellerName: text("seller_name").notNull(),
    sellerEmail: text("seller_email"),
    sellerPhone: text("seller_phone").notNull(),
    sellerAddress: text("seller_address"),
    inspectionDate: timestamp("inspection_date", { mode: "date" }),
    inspectionTime: text("inspection_time"),
    inspectionAddress: text("inspection_address"),
    estimatedPriceMin: decimal("estimated_price_min", {
      precision: 10,
      scale: 2,
    }),
    estimatedPriceMax: decimal("estimated_price_max", {
      precision: 10,
      scale: 2,
    }),
    finalPrice: decimal("final_price", { precision: 10, scale: 2 }),
    status: text("status").default("PENDING").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    sellerPhoneIdx: index("sell_order_seller_phone_idx").on(table.sellerPhone),
    statusIdx: index("sell_order_status_idx").on(table.status),
    createdAtIdx: index("sell_order_created_at_idx").on(table.createdAt),
  })
);

// ============================================
// TYPE EXPORTS
// ============================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Vehicle = typeof vehicles.$inferSelect;
export type NewVehicle = typeof vehicles.$inferInsert;

export type Inspection = typeof inspections.$inferSelect;
export type NewInspection = typeof inspections.$inferInsert;

export type Insurance = typeof insurances.$inferSelect;
export type NewInsurance = typeof insurances.$inferInsert;

export type HealthInsurance = typeof healthInsurances.$inferSelect;
export type NewHealthInsurance = typeof healthInsurances.$inferInsert;

export type GarageBooking = typeof garageBookings.$inferSelect;
export type NewGarageBooking = typeof garageBookings.$inferInsert;

export type GaragePartner = typeof garagePartners.$inferSelect;
export type NewGaragePartner = typeof garagePartners.$inferInsert;

export type GarageServiceBooking = typeof garageServiceBookings.$inferSelect;
export type NewGarageServiceBooking = typeof garageServiceBookings.$inferInsert;

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;

export type OTP = typeof otps.$inferSelect;
export type NewOTP = typeof otps.$inferInsert;

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export type SellOrder = typeof sellOrders.$inferSelect;
export type NewSellOrder = typeof sellOrders.$inferInsert;

export type AuthUser = typeof authUsers.$inferSelect;
export type NewAuthUser = typeof authUsers.$inferInsert;

export type AuthSession = typeof authSessions.$inferSelect;
export type NewAuthSession = typeof authSessions.$inferInsert;

export type AuthAccount = typeof authAccounts.$inferSelect;
export type NewAuthAccount = typeof authAccounts.$inferInsert;

export type AuthVerification = typeof authVerifications.$inferSelect;
export type NewAuthVerification = typeof authVerifications.$inferInsert;
