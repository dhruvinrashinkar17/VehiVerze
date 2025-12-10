"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vehiverze/ui/table";
import { Badge } from "@vehiverze/ui/badge";
import { Button } from "@vehiverze/ui/button";
import { formatDate } from "@vehiverze/shared-utils/format-date";

interface SellOrder {
  id: string;
  status: string;
  vehicleType: string;
  brand: string;
  model: string;
  condition: string;
  sellerName: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  createdAt: string;
}

export function SellOrdersTable() {
  const [orders, setOrders] = useState<SellOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/sell-orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-500",
      INSPECTION_SCHEDULED: "bg-blue-500",
      INSPECTION_COMPLETED: "bg-purple-500",
      OFFER_MADE: "bg-orange-500",
      OFFER_ACCEPTED: "bg-green-500",
      OFFER_REJECTED: "bg-red-500",
      PAYMENT_PENDING: "bg-blue-500",
      COMPLETED: "bg-green-500",
      CANCELLED: "bg-gray-500",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white/10 rounded-lg p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Estimated Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {order.brand} {order.model}
                  </div>
                  <div className="text-sm text-gray-400">
                    {order.vehicleType}
                  </div>
                </div>
              </TableCell>
              <TableCell>{order.sellerName}</TableCell>
              <TableCell>{order.condition}</TableCell>
              <TableCell>
                ₹{order.estimatedPriceMin.toLocaleString()} - ₹
                {order.estimatedPriceMax.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.replace(/_/g, " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Handle view details
                  }}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
