"use client"

import { useState } from "react"
import { Edit2, Trash2, FileText, Calculator } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@vehiverze/ui/table"
import { Badge } from "@vehiverze/ui/badge"
import { Input } from "@vehiverze/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@vehiverze/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@vehiverze/ui/dialog"
import { vehiclesDb } from "@/lib/mock-data/vehicle-store"
import type { VehicleProduct } from "@/lib/mock-data/vehicle-types"
import { conditionColors } from "@/lib/mock-data/vehicle-types"
import { useDeviceType } from "@/lib/device-detection"
import { InspectionForm } from "./inspection-form"
import { DetailedInspectionForm } from "./detailed-inspection-form"

interface ProductListProps {
  onEdit: (product: VehicleProduct) => void
  showServiceType?: boolean
  onInspect?: (product: VehicleProduct) => void
}

export function ProductList({ onEdit, showServiceType = false, onInspect }: ProductListProps) {
  const [products, setProducts] = useState(() => vehiclesDb.getAll())
  const [deleteProduct, setDeleteProduct] = useState<VehicleProduct | null>(null)
  const [inspectionDetails, setInspectionDetails] = useState<VehicleProduct | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    condition: "all",
    status: "all",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const deviceType = useDeviceType()
  const [inspectionProduct, setInspectionProduct] = useState<VehicleProduct | null>(null)
  const [detailedInspectionProduct, setDetailedInspectionProduct] = useState<VehicleProduct | null>(null)

  const itemsPerPage = deviceType === "mobile" ? 5 : deviceType === "tablet" ? 10 : 15

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.model.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.location.toLowerCase().includes(filters.search.toLowerCase())

    const matchesType = filters.type === "all" || product.type === filters.type
    const matchesCondition = filters.condition === "all" || product.condition === filters.condition
    const matchesStatus = filters.status === "all" || product.status === filters.status

    return matchesSearch && matchesType && matchesCondition && matchesStatus
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleDelete = async () => {
    if (!deleteProduct) return

    try {
      await vehiclesDb.delete(deleteProduct.id)
      setProducts(vehiclesDb.getAll())
    } catch (error) {
      console.error("Error deleting product:", error)
    } finally {
      setDeleteProduct(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search by brand, model, or location..."
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          className="max-w-sm"
        />
        <Select value={filters.type} onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="2 Wheeler">2 Wheeler</SelectItem>
            <SelectItem value="3 Wheeler">3 Wheeler</SelectItem>
            <SelectItem value="4 Wheeler - Cars">4 Wheeler - Cars</SelectItem>
            <SelectItem value="4 Wheeler - Commercial Cars">4 Wheeler - Commercial Cars</SelectItem>
            <SelectItem value="4 Wheeler - Trucks">4 Wheeler - Trucks</SelectItem>
            <SelectItem value="6 Wheeler">6 Wheeler</SelectItem>
            <SelectItem value="More Than 8 Wheelers">More Than 8 Wheelers</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.condition}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, condition: value }))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            <SelectItem value="Excellent">Excellent</SelectItem>
            <SelectItem value="Very Good">Very Good</SelectItem>
            <SelectItem value="Good">Good</SelectItem>
            <SelectItem value="Average">Average</SelectItem>
            <SelectItem value="Poor">Poor</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.status} onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
              {showServiceType && <TableHead>Service</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="font-medium">
                    {product.brand} {product.model}
                  </div>
                  <div className="text-sm text-muted-foreground">{product.variant}</div>
                </TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.year}</TableCell>
                <TableCell>{product.location}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge className={conditionColors[product.condition || "Good"]}>
                      {product.condition || "Good"}
                    </Badge>
                    {(product.inspectionScore || 0) > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {product.inspectionScore || 0}/{product.maxInspectionScore || 300}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>₹{(product.basePrice || 0).toLocaleString()}</TableCell>
                <TableCell className="font-medium">
                  ₹{(product.currentPrice || product.basePrice || 0).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {product.serviceType === "Sell" && onInspect && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onInspect(product)}
                        title="Start 300-Point Inspection"
                      >
                        <Calculator className="h-4 w-4" />
                      </Button>
                    )}
                    {product.inspectionResults && product.inspectionResults.length > 0 && (
                      <Button variant="ghost" size="icon" onClick={() => setInspectionDetails(product)}>
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                    {product.serviceType === "Sell" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDetailedInspectionProduct(product)}
                        title="Full Screen Inspection"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setDeleteProduct(product)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                {showServiceType && (
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-500">
                      {product.serviceType || "Buy"}
                    </Badge>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Detailed Inspection Modal */}
      <Dialog open={!!detailedInspectionProduct} onOpenChange={() => setDetailedInspectionProduct(null)}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vehicle Inspection & Price Management</DialogTitle>
            <DialogDescription>
              Complete 300-point inspection to determine accurate pricing based on vehicle condition
            </DialogDescription>
          </DialogHeader>
          {detailedInspectionProduct && (
            <DetailedInspectionForm
              vehicleType={detailedInspectionProduct.type}
              basePrice={detailedInspectionProduct.basePrice}
              onInspectionComplete={(results) => {
                // Update the product with inspection results
                vehiclesDb.update(detailedInspectionProduct.id, {
                  condition: results.condition,
                  currentPrice: results.adjustedPrice,
                  inspectionScore: results.totalScore,
                  maxInspectionScore: results.maxScore,
                  inspectionDate: new Date().toISOString(),
                  inspectionResults: results.results,
                })
                setProducts(vehiclesDb.getAll())
                setDetailedInspectionProduct(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Inspection Modal */}
      <Dialog open={!!inspectionProduct} onOpenChange={() => setInspectionProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>300-Point Vehicle Inspection</DialogTitle>
            <DialogDescription>
              {inspectionProduct?.brand} {inspectionProduct?.model} - Condition Assessment
            </DialogDescription>
          </DialogHeader>
          {inspectionProduct && (
            <InspectionForm
              vehicleType={inspectionProduct.type}
              basePrice={inspectionProduct.basePrice}
              onInspectionComplete={(results) => {
                // Update the product with inspection results
                vehiclesDb.update(inspectionProduct.id, {
                  condition: results.condition,
                  currentPrice: results.adjustedPrice,
                  inspectionScore: results.totalScore,
                  maxInspectionScore: results.maxScore,
                  inspectionDate: new Date().toISOString(),
                  inspectionResults: results.results,
                })
                setProducts(vehiclesDb.getAll())
                setInspectionProduct(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the vehicle from the system.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Inspection Details Dialog */}
      <Dialog open={!!inspectionDetails} onOpenChange={() => setInspectionDetails(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inspection Report</DialogTitle>
            <DialogDescription>
              {inspectionDetails?.brand} {inspectionDetails?.model} -{" "}
              {inspectionDetails?.inspectionDate && new Date(inspectionDetails.inspectionDate).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          {inspectionDetails && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <div className="text-2xl font-bold">
                    {inspectionDetails.inspectionScore || 0}/{inspectionDetails.maxInspectionScore || 300}
                  </div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Condition</div>
                  <Badge className={conditionColors[inspectionDetails.condition || "Good"]}>
                    {inspectionDetails.condition || "Good"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Price Adjustment</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Base Price</div>
                    <div className="font-medium">₹{(inspectionDetails.basePrice || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Adjusted Price</div>
                    <div className="font-medium text-primary">
                      ₹{(inspectionDetails.currentPrice || inspectionDetails.basePrice || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


