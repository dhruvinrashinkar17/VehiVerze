"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card";
import { Badge } from "@vehiverze/ui/badge";
import { Button } from "@vehiverze/ui/button";
import {
  Car,
  Wrench,
  Clock,
  ChevronRight,
  Calendar,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface GarageBooking {
  id: string;
  bookingId: string;
  vehicleType: string;
  brand: string;
  model: string;
  selectedServices: string[];
  bookingDate: string;
  timeSlot: string;
  status: string;
  totalAmount: string;
  garagePartner?: {
    name: string;
    address: string;
  } | null;
}

interface SellOrder {
  id: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  status: string;
  inspectionDate: string | null;
  inspectionTime: string | null;
  estimatedPriceMin: string | null;
  estimatedPriceMax: string | null;
  createdAt: string;
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "in_progress":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "completed":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "pending":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "approved":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [garageBookings, setGarageBookings] = useState<GarageBooking[]>([]);
  const [sellOrders, setSellOrders] = useState<SellOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      sessionStorage.setItem("previousPath", "/dashboard");
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [bookingsRes, ordersRes] = await Promise.all([
        fetch("/api/garage/bookings/mine", { credentials: "include" }),
        fetch("/api/sell-orders/mine", { credentials: "include" }),
      ]);

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setGarageBookings(bookingsData.data || []);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setSellOrders(ordersData.data || []);
      }
    } catch {
      setError("Failed to load your data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-white">
        <NavBar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your bookings and orders from your dashboard
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-700">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchData}
              className="ml-auto"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Wrench className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{garageBookings.length}</p>
                  <p className="text-sm text-gray-500">Service Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Car className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{sellOrders.length}</p>
                  <p className="text-sm text-gray-500">Sell Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {
                      garageBookings.filter(
                        (b) =>
                          b.status === "confirmed" || b.status === "in_progress"
                      ).length
                    }
                  </p>
                  <p className="text-sm text-gray-500">Active Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Calendar className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {
                      sellOrders.filter(
                        (o) =>
                          o.status === "PENDING" ||
                          o.status === "INSPECTION_SCHEDULED"
                      ).length
                    }
                  </p>
                  <p className="text-sm text-gray-500">Pending Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Garage Service Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">
                  Garage Service Bookings
                </CardTitle>
                <Link href="/garage-services">
                  <Button variant="ghost" size="sm">
                    Book New <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {garageBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      No service bookings yet
                    </p>
                    <Link href="/garage-services">
                      <Button variant="outline">Book a Service</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {garageBookings.slice(0, 5).map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">
                              {booking.brand} {booking.model}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.bookingId}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(booking.bookingDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.timeSlot}
                          </div>
                        </div>
                        {booking.garagePartner && (
                          <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {booking.garagePartner.name}
                          </div>
                        )}
                        <p className="mt-2 text-sm font-medium">
                          Total: ₹{Number(booking.totalAmount).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    {garageBookings.length > 5 && (
                      <Link href="/dashboard/bookings">
                        <Button variant="outline" className="w-full">
                          View All Bookings
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sell Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Sell Vehicle Orders</CardTitle>
                <Link href="/sell">
                  <Button variant="ghost" size="sm">
                    Sell Vehicle <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {sellOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No sell orders yet</p>
                    <Link href="/sell">
                      <Button variant="outline">Sell Your Vehicle</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sellOrders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">
                              {order.brand} {order.model} ({order.year})
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.vehicleType}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace("_", " ")}
                          </Badge>
                        </div>
                        {order.estimatedPriceMin && order.estimatedPriceMax && (
                          <p className="mt-2 text-sm">
                            Est. Price: ₹
                            {Number(order.estimatedPriceMin).toLocaleString()} -
                            ₹{Number(order.estimatedPriceMax).toLocaleString()}
                          </p>
                        )}
                        {order.inspectionDate && (
                          <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            Inspection: {formatDate(order.inspectionDate)}
                            {order.inspectionTime &&
                              ` at ${order.inspectionTime}`}
                          </div>
                        )}
                        <p className="mt-2 text-xs text-gray-400">
                          Created: {formatDate(order.createdAt)}
                        </p>
                      </div>
                    ))}
                    {sellOrders.length > 5 && (
                      <Link href="/dashboard/sell-orders">
                        <Button variant="outline" className="w-full">
                          View All Sell Orders
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/garage-services">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Wrench className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-medium">Book Service</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/sell">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Car className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium">Sell Vehicle</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/buy">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Car className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="font-medium">Buy Vehicle</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/contact">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <MapPin className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="font-medium">Contact Us</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
