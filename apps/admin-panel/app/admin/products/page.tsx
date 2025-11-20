"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@vehiverze/ui/table"
import { Badge } from "@vehiverze/ui/badge"
import { productsDb } from "@/lib/mock-data/stores"

export default function ProductsPage() {
  const [products] = useState(() => productsDb.getAll())

  return (
    <div className="space-y-4">
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow className="table-header">
              <TableHead>Vehicle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Specifications</TableHead>
              <TableHead>Price Range</TableHead>
              <TableHead>Available Cities</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="table-row cursor-pointer">
                <TableCell>
                  <div>{product.model}</div>
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{product.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">Year: {product.specifications.year}</div>
                    <div className="text-sm">Fuel: {product.specifications.fuelType}</div>
                    <div className="text-sm">Mileage: {product.specifications.mileage}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>₹{product.basePrice.toLocaleString()} - </div>
                  <div>₹{product.maxPrice.toLocaleString()}</div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {product.availableCities.map((city) => (
                      <Badge key={city} variant="outline" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      product.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }
                  >
                    {product.isActive ? "Active" : "Inactive"}
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


