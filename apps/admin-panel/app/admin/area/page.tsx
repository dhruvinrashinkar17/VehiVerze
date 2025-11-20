"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@vehiverze/ui/table"
import { Badge } from "@vehiverze/ui/badge"
import { areasDb } from "@/lib/mock-data/stores"

export default function AreasPage() {
  const [areas] = useState(() => areasDb.getAll())

  return (
    <div className="space-y-4">
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow className="table-header">
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Pincode</TableHead>
              <TableHead>Service Types</TableHead>
              <TableHead>Vendors</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.id} className="table-row cursor-pointer">
                <TableCell>{area.city}</TableCell>
                <TableCell>{area.state}</TableCell>
                <TableCell>{area.pincode}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {area.serviceTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{area.vendorCount}</TableCell>
                <TableCell>{area.orderCount}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      area.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }
                  >
                    {area.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


