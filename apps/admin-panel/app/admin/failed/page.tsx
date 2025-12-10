"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ordersDb } from "@/lib/mock-data";
import { useDeviceType } from "@/lib/device-detection";

export default function FailedOrdersPage() {
  const router = useRouter();
  const deviceType = useDeviceType();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =
    deviceType === "mobile" ? 5 : deviceType === "tablet" ? 10 : 15;

  const [orders] = useState(() =>
    ordersDb
      .getAll()
      .filter(
        (order) =>
          order.status === "Cancelled by Customer" ||
          order.status === "Cancelled by Vehiverze"
      )
  );

  const [filters, _setFilters] = useState({
    search: "",
    status: "all",
    type: "all",
    city: "all",
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.model.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customer.name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      order.city.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "all" || order.status === filters.status;
    const matchesType = filters.type === "all" || order.type === filters.type;
    const matchesCity = filters.city === "all" || order.city === filters.city;

    return matchesSearch && matchesStatus && matchesType && matchesCity;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card text-card-foreground overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>Order Date</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-muted/50 border-border"
              >
                <TableCell>
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.model}</TableCell>
                <TableCell>
                  <div>{order.customer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customer.phone}
                  </div>
                </TableCell>
                <TableCell>{order.city}</TableCell>
                <TableCell>
                  <Badge variant="outline">{order.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-500"
                  >
                    {order.serviceType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-red-500/20 text-red-500"
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() => router.push(`/admin/failed/${order.id}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
          {filteredOrders.length} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
