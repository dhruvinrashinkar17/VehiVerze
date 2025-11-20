"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@vehiverze/ui/table"
import { Badge } from "@vehiverze/ui/badge"
import { leadsDb } from "@/lib/mock-data/stores"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@vehiverze/ui/pagination"
import { useDeviceType } from "@/lib/device-detection"

export default function LeadsPage() {
  const router = useRouter()
  const deviceType = useDeviceType()
  const [page, setPage] = useState(1)
  const itemsPerPage = deviceType === "mobile" ? 5 : deviceType === "tablet" ? 10 : 15
  const [leads] = useState(() => leadsDb.getAll())

  const totalPages = Math.ceil(leads.length / itemsPerPage)
  const currentLeads = leads.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "Contacted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Qualified":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Converted":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "Failed":
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
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="table-row cursor-pointer"
                onClick={() => router.push(`/admin/leads/${lead.id}`)}
              >
                <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div>{lead.customerName}</div>
                  <div className="text-sm text-muted-foreground">{lead.phone}</div>
                </TableCell>
                <TableCell>{lead.vehicleType}</TableCell>
                <TableCell>{lead.model}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">
                    {lead.serviceType}
                  </Badge>
                </TableCell>
                <TableCell>{lead.city}</TableCell>
                <TableCell>
                  <Badge className={`badge ${getStatusColor(lead.status)}`}>{lead.status}</Badge>
                </TableCell>
                <TableCell>{lead.assignedTo}</TableCell>
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


