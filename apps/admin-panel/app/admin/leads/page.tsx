"use client";

import { useEffect, useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@vehiverze/ui/pagination";
import { useDeviceType } from "@/lib/device-detection";
import { getLeads, type Lead } from "@/lib/api";

export default function LeadsPage() {
  const router = useRouter();
  const deviceType = useDeviceType();
  const [page, setPage] = useState(1);
  const itemsPerPage =
    deviceType === "mobile" ? 5 : deviceType === "tablet" ? 10 : 15;

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLeads()
      .then(setLeads)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(leads.length / itemsPerPage);
  const currentLeads = leads.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "contacted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "qualified":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "converted":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading leads...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">Failed to load leads: {error}</div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">No leads found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow className="table-header">
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Brand / Model</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="table-row cursor-pointer"
                onClick={() => router.push(`/admin/leads/${lead.id}`)}
              >
                <TableCell>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div>{lead.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {lead.phone}
                  </div>
                </TableCell>
                <TableCell>{lead.vehicleType || "-"}</TableCell>
                <TableCell>
                  {lead.brand || lead.model
                    ? `${lead.brand || ""} ${lead.model || ""}`.trim()
                    : "-"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {lead.message || "-"}
                </TableCell>
                <TableCell>
                  <Badge className={`badge ${getStatusColor(lead.status)}`}>
                    {lead.status}
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
      )}
    </div>
  );
}
