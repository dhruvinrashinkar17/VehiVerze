"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@vehiverze/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { vendorsDb } from "@/lib/mock-data/stores"

interface AssignVendorModalProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (vendorId: string) => Promise<void>
}

export function AssignVendorModal({ isOpen, onClose, onAssign }: AssignVendorModalProps) {
  const [selectedVendor, setSelectedVendor] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const vendors = vendorsDb.getAll()

  const handleAssign = async () => {
    if (!selectedVendor) return

    setLoading(true)
    try {
      await onAssign(selectedVendor)
      onClose()
    } catch (error) {
      console.error("Error assigning vendor:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1A1A1A] border-[#2A2A2A]">
        <DialogHeader>
          <DialogTitle className="text-xl">Assign Vendor</DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            onClick={onClose}
          >
            
          </Button>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger className="w-full bg-[#2A2A2A] border-[#3A3A3A]">
              <SelectValue placeholder="Select a vendor" />
            </SelectTrigger>
            <SelectContent>
              {vendors.length === 0 ? (
                <SelectItem value="none" disabled>
                  No vendor Available
                </SelectItem>
              ) : (
                vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <Button className="w-full" disabled={!selectedVendor || loading} onClick={handleAssign}>
            {loading ? "Assigning..." : "Assign Vendor"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


