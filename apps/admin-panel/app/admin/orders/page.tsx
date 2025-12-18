"use client";

import { useMemo, useState } from "react";
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
import { ordersDb } from "@/lib/mock-data";
import type { Order } from "@/lib/mock-data";

export default function OrdersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const orders = ordersDb.getAll();
  const totalPages = Math.ceil(orders.length / pageSize);
  const currentOrders = orders.slice((page - 1) * pageSize, page * pageSize);

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    });
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "Pending":
        return "status-pending";
      case "Assigned to Vendor":
        return "status-assigned";
      default:
        return "status-cancelled";
    }
  };

  const getTypeColor = (type: Order["type"]) => {
    switch (type) {
      case "2 Wheeler":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "3 Wheeler":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "4 Wheeler - Cars":
      case "4 Wheeler - Commercial Cars":
      case "4 Wheeler - Trucks":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "6 Wheeler":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "8 Wheeler":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Garage Service":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "New Vehicle":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow className="table-header">
              <TableHead>Order Date</TableHead>
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
                key={order.id}
                className="table-row cursor-pointer"
                onClick={() => router.push(`/admin/orders/${order.id}`)}
              >
                <TableCell className="font-medium">
                  {dateFormatter.format(new Date(order.date))}
                </TableCell>

                <TableCell>{order.model}</TableCell>
                <TableCell>{order.city}</TableCell>
                <TableCell>
                  <Badge className={`badge ${getTypeColor(order.type)}`}>
                    {order.type}
                  </Badge>
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
                  <Badge className={`badge ${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
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
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
