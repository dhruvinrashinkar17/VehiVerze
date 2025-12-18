/**
 * API client for admin panel to communicate with website backend.
 * All requests include credentials for session cookie authentication.
 */

const WEBSITE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${WEBSITE_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    throw new ApiError(res.status, errorText);
  }

  return res.json();
}

// ─────────────────────────────────────────────────────────────
// Leads
// ─────────────────────────────────────────────────────────────

export interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  vehicleType: string | null;
  brand: string | null;
  model: string | null;
  year: number | null;
  message: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getLeads(): Promise<Lead[]> {
  return request<Lead[]>("/api/leads");
}

export async function getLead(id: number): Promise<Lead> {
  return request<Lead>(`/api/leads/${id}`);
}

export async function updateLead(
  id: number,
  data: Partial<Pick<Lead, "status">>
): Promise<Lead> {
  return request<Lead>(`/api/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────────
// Garage Partners (Vendors)
// ─────────────────────────────────────────────────────────────

export interface GaragePartner {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string | null;
  ownerName: string;
  gstNumber: string | null;
  specialization: string | null;
  vehicleTypes: string[];
  services: string[];
  workingHours: Record<string, unknown> | null;
  rating: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GaragePartnersResponse {
  success: boolean;
  data: GaragePartner[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export async function getGaragePartners(params?: {
  page?: number;
  limit?: number;
  city?: string;
  isActive?: boolean;
}): Promise<GaragePartnersResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.city) searchParams.set("city", params.city);
  if (params?.isActive !== undefined)
    searchParams.set("isActive", params.isActive.toString());

  const query = searchParams.toString();
  return request<GaragePartnersResponse>(
    `/api/garage/partners${query ? `?${query}` : ""}`
  );
}

export async function getGaragePartner(id: number): Promise<{
  success: boolean;
  data: GaragePartner;
}> {
  return request(`/api/garage/partners/${id}`);
}

export async function updateGaragePartner(
  id: number,
  data: Partial<GaragePartner>
): Promise<{ success: boolean; data: GaragePartner }> {
  return request(`/api/garage/partners/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────────
// Garage Bookings
// ─────────────────────────────────────────────────────────────

export interface GarageBooking {
  id: number;
  bookingId: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  variant: string | null;
  transmission: string | null;
  registrationNumber: string;
  selectedServices: string[];
  bookingDate: string;
  timeSlot: string;
  pickupDrop: boolean;
  additionalNotes: string | null;
  customerName: string;
  mobile: string;
  email: string | null;
  address: string;
  paymentMethod: string;
  totalAmount: string;
  status: string;
  garagePartnerId: number | null;
  garagePartner: {
    name: string;
    address: string;
    phone: string;
    rating: number;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface GarageBookingsResponse {
  success: boolean;
  data: GarageBooking[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export async function getGarageBookings(params?: {
  page?: number;
  limit?: number;
  status?: string;
  mobile?: string;
}): Promise<GarageBookingsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.status) searchParams.set("status", params.status);
  if (params?.mobile) searchParams.set("mobile", params.mobile);

  const query = searchParams.toString();
  return request<GarageBookingsResponse>(
    `/api/garage/bookings${query ? `?${query}` : ""}`
  );
}

export async function getGarageBooking(id: number): Promise<{
  success: boolean;
  data: GarageBooking;
}> {
  return request(`/api/garage/bookings/${id}`);
}

export async function updateGarageBooking(
  id: number,
  data: Partial<GarageBooking>
): Promise<{ success: boolean; data: GarageBooking }> {
  return request(`/api/garage/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────────
// Sell Orders
// ─────────────────────────────────────────────────────────────

export interface SellOrder {
  id: number;
  vehicleType: string;
  brand: string;
  model: string;
  variant: string | null;
  year: number;
  kilometers: number;
  condition: string;
  registrationNo: string;
  location: string;

  sellerName: string;
  sellerEmail: string | null;
  sellerPhone: string;
  sellerAddress: string | null;

  inspectionDate: string | null;
  inspectionTime: string | null;
  inspectionAddress: string | null;

  estimatedPriceMin: string | null;
  estimatedPriceMax: string | null;

  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getSellOrders(): Promise<SellOrder[]> {
  return request<SellOrder[]>("/api/sell-orders");
}

export async function getSellOrder(id: number): Promise<SellOrder> {
  return request<SellOrder>(`/api/sell-orders/${id}`);
}

export async function updateSellOrder(
  id: number,
  data: Partial<Pick<SellOrder, "status">>
): Promise<SellOrder> {
  return request<SellOrder>(`/api/sell-orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
