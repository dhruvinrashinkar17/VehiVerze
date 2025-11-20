export type ServiceType = "Buy" | "Sell" | "Garage Service" | "New Vehicle"

export type VehicleType =
  | "2 Wheeler"
  | "3 Wheeler"
  | "4 Wheeler - Cars"
  | "4 Wheeler - Commercial Cars"
  | "4 Wheeler - Trucks"
  | "6 Wheeler"
  | "More Than 8 Wheelers"
  | "New Vehicle"
  | "Garage Service"

export type OrderStatus =
  | "Assigned to Vendor"
  | "Cancelled by Vehiverze"
  | "Cancelled by Customer"
  | "Completed"
  | "Pending"

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Failed"

export type VendorStatus = "Active" | "Inactive" | "Pending Verification" | "Suspended"

export type PaymentStatus = "Completed" | "Pending" | "Failed" | "Refunded"

export type NotificationType = "Order Update" | "Lead Alert" | "Payment Confirmation" | "System Alert"

export type CreditType = "Order Commission" | "Referral Bonus" | "Service Charge" | "Penalty"


