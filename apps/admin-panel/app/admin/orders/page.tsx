"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vehiverze/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@vehiverze/ui/pagination";
import { Badge } from "@vehiverze/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs";
import {
  getGarageBookings,
  getSellOrders,
  type GarageBooking,
  type SellOrder,
} from "@/lib/api";

type OrderType = "all" | "garage" | "sell";

export default function OrdersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [orderType, setOrderType] = useState<OrderType>("all");
  const pageSize = 10;

  const [garageBookings, setGarageBookings] = useState<GarageBooking[]>([]);
  const [sellOrders, setSellOrders] = useState<SellOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getGarageBookings({ limit: 100 }), getSellOrders()])
      .then(([bookingsRes, orders]) => {
        setGarageBookings(bookingsRes.data);
        setSellOrders(orders);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeZone: "UTC",
    });
  }, []);

  // Combine and normalize orders
  const allOrders = useMemo(() => {
    const normalizedBookings = garageBookings.map((b) => ({
      id: b.id,
      type: "garage" as const,
      date: new Date(b.createdAt),
      model: `${b.brand} ${b.model}`,
      city: b.address.split(",").pop()?.trim() || "-",
      vehicleType: b.vehicleType,
      serviceType: b.selectedServices.join(", "),
      status: b.status,
      customer: b.customerName,
      phone: b.mobile,
    }));

    const normalizedSellOrders = sellOrders.map((s) => ({
      id: s.id,
      type: "sell" as const,
      date: new Date(s.createdAt),
      model: `${s.brand} ${s.model}`,
      city: s.location,
      vehicleType: s.vehicleType,
      serviceType: "Sell Vehicle",
      status: s.status,
      customer: s.sellerName,
      phone: s.sellerPhone,
    }));

    let combined = [...normalizedBookings, ...normalizedSellOrders];

    // Filter by type
    if (orderType === "garage") {
      combined = combined.filter((o) => o.type === "garage");
    } else if (orderType === "sell") {
      combined = combined.filter((o) => o.type === "sell");
    }

    // Sort by date descending
    combined.sort((a, b) => b.date.getTime() - a.date.getTime());

    return combined;
  }, [garageBookings, sellOrders, orderType]);

  const totalPages = Math.ceil(allOrders.length / pageSize);
  const currentOrders = allOrders.slice((page - 1) * pageSize, page * pageSize);

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "completed":
        return "status-completed bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "status-pending bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "in_progress":
      case "in-progress":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "cancelled":
        return "status-cancelled bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeColor = (type: "garage" | "sell") => {
    if (type === "garage") {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    }
    return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400";
  };

  const handleRowClick = (order: (typeof allOrders)[0]) => {
    if (order.type === "garage") {
      router.push(`/admin/orders/garage/${order.id}`);
    } else {
      router.push(`/admin/orders/sell/${order.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">Failed to load orders: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="all"
        onValueChange={(v) => {
          setOrderType(v as OrderType);
          setPage(1);
        }}
      >
        <TabsList>
          <TabsTrigger value="all">
            All Orders ({garageBookings.length + sellOrders.length})
          </TabsTrigger>
          <TabsTrigger value="garage">
            Garage Bookings ({garageBookings.length})
          </TabsTrigger>
          <TabsTrigger value="sell">
            Sell Orders ({sellOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={orderType} className="mt-4">
          {currentOrders.length === 0 ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-muted-foreground">No orders found</div>
            </div>
          ) : (
            <>
              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow className="table-header">
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.map((order) => (
                      <TableRow
                        key={`${order.type}-${order.id}`}
                        className="table-row cursor-pointer"
                        onClick={() => handleRowClick(order)}
                      >
                        <TableCell className="font-medium">
                          {dateFormatter.format(order.date)}
                        </TableCell>
                        <TableCell>
                          <div>{order.customer}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.phone}
                          </div>
                        </TableCell>
                        <TableCell>{order.model}</TableCell>
                        <TableCell>{order.city}</TableCell>
                        <TableCell>
                          <Badge
                            className={`badge ${getTypeColor(order.type)}`}
                          >
                            {order.type === "garage"
                              ? "Garage Service"
                              : "Sell Vehicle"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-blue-500/20 text-blue-500 max-w-[150px] truncate"
                          >
                            {order.serviceType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`badge ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={
                          page === 1 ? "pointer-events-none opacity-50" : ""
                        }
                      />
                    </PaginationItem>
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() => setPage(i + 1)}
                          isActive={page === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        className={
                          page === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
