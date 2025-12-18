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
import { Button } from "@vehiverze/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@vehiverze/ui/pagination";
import { useDeviceType } from "@/lib/device-detection";
import { Eye } from "lucide-react";
import { getGaragePartners, type GaragePartner } from "@/lib/api";

export default function VendorsPage() {
  const router = useRouter();
  const deviceType = useDeviceType();
  const [page, setPage] = useState(1);
  const itemsPerPage =
    deviceType === "mobile" ? 5 : deviceType === "tablet" ? 10 : 15;

  const [vendors, setVendors] = useState<GaragePartner[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getGaragePartners({ page, limit: itemsPerPage })
      .then((res) => {
        setVendors(res.data);
        setTotalPages(res.pagination.pages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, itemsPerPage]);

  const getStatusColor = (partner: GaragePartner) => {
    if (!partner.isVerified) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    }
    if (partner.isActive) {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const getStatusLabel = (partner: GaragePartner) => {
    if (!partner.isVerified) return "Pending Verification";
    if (partner.isActive) return "Active";
    return "Inactive";
  };

  if (loading && vendors.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading vendors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">Failed to load vendors: {error}</div>
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">No vendors found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow className="table-header">
              <TableHead>Vendor Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id} className="table-row">
                <TableCell>
                  <div>{vendor.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {vendor.city}
                  </div>
                </TableCell>
                <TableCell>{vendor.ownerName}</TableCell>
                <TableCell>
                  <div>{vendor.phone}</div>
                  <div className="text-sm text-muted-foreground">
                    {vendor.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {vendor.services.slice(0, 2).map((service) => (
                      <Badge
                        key={service}
                        variant="outline"
                        className="text-xs"
                      >
                        {service}
                      </Badge>
                    ))}
                    {vendor.services.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{vendor.services.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    {vendor.rating.toFixed(1)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`badge ${getStatusColor(vendor)}`}>
                    {getStatusLabel(vendor)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/admin/vendors/${vendor.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
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
