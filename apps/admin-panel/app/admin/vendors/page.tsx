"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@vehiverze/ui/table"
import { Badge } from "@vehiverze/ui/badge"
import { Button } from "@vehiverze/ui/button"
import { vendorsDb } from "@/lib/mock-data/stores"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@vehiverze/ui/pagination"
import { useDeviceType } from "@/lib/device-detection"
import { Eye } from "lucide-react"

export default function VendorsPage() {
  const router = useRouter()
  const deviceType = useDeviceType()
  const [page, setPage] = useState(1)
  const itemsPerPage = deviceType === "mobile" ? 5 : deviceType === "tablet" ? 10 : 15
  const [vendors] = useState(() => vendorsDb.getAll())

  const totalPages = Math.ceil(vendors.length / itemsPerPage)
  const currentVendors = vendors.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      case "Pending Verification":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
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
              <TableHead>Service Types</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentVendors.map((vendor) => (
              <TableRow key={vendor.id} className="table-row">
                <TableCell>
                  <div>{vendor.name}</div>
                  <div className="text-sm text-muted-foreground">{vendor.city}</div>
                </TableCell>
                <TableCell>{vendor.ownerName}</TableCell>
                <TableCell>
                  <div>{vendor.phone}</div>
                  <div className="text-sm text-muted-foreground">{vendor.email}</div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {vendor.serviceTypes.slice(0, 2).map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                    {vendor.serviceTypes.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{vendor.serviceTypes.length - 2}
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
                  <Badge className={`badge ${getStatusColor(vendor.status)}`}>{vendor.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/vendors/${vendor.id}`)}>
                    <Eye className="h-4 w-4" />
                  </Button>
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
              <PaginationLink onClick={() => setPage(i + 1)} isActive={page === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={page === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}


