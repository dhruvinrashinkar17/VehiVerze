"use client"

import * as React from "react"
import { X, Calendar } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Calendar as CalendarComponent } from "@vehiverze/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@vehiverze/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@vehiverze/ui/popover"
import { cn } from "@vehiverze/shared-utils/cn"
import { format } from "date-fns"

interface ReschedulePickupModalProps {
  isOpen: boolean
  onClose: () => void
  onReschedule: (date: Date, time: string) => Promise<void>
}

const timeSlots = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
]

export function ReschedulePickupModal({ isOpen, onClose, onReschedule }: ReschedulePickupModalProps) {
  const [date, setDate] = React.useState<Date>()
  const [time, setTime] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleReschedule = async () => {
    if (!date || !time) return

    setLoading(true)
    try {
      await onReschedule(date, time)
      onClose()
    } catch (error) {
      console.error("Error rescheduling pickup:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1A1A1A] border-[#2A2A2A]">
        <DialogHeader>
          <DialogTitle className="text-xl">Reschedule Pickup</DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            onClick={onClose}
          >
            
          </Button>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">New Pickup Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-[#2A2A2A] border-[#3A3A3A]",
                    !date && "text-muted-foreground",
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">New Pickup Time</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full bg-[#2A2A2A] border-[#3A3A3A]">
                <SelectValue placeholder="Select a pickuptime" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" disabled={!date || !time || loading} onClick={handleReschedule}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


