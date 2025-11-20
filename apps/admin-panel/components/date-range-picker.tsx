"use client"

import * as React from "react"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@vehiverze/shared-utils/cn"
import { Button } from "@vehiverze/ui/button"
import { Calendar } from "@vehiverze/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@vehiverze/ui/popover"
import type { DateRange } from "react-day-picker"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange
  onDateChange?: (date: DateRange | undefined) => void
  onApply?: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({ className, date, onDateChange, onApply }: DatePickerWithRangeProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(date)

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range)
    onDateChange?.(range)
  }

  const handleApply = () => {
    onApply?.(dateRange)
  }

  const handleClear = () => {
    setDateRange(undefined)
    onDateChange?.(undefined)
    onApply?.(undefined)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="from"
              variant={"outline"}
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !dateRange?.from && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? format(dateRange.from, "PPP") : <span>From Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              selected={dateRange?.from}
              onSelect={(date) =>
                handleSelect({
                  from: date,
                  to: dateRange?.to,
                })
              }
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="to"
              variant={"outline"}
              className={cn("w-[180px] justify-start text-left font-normal", !dateRange?.to && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.to ? format(dateRange.to, "PPP") : <span>To Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              selected={dateRange?.to}
              onSelect={(date) =>
                handleSelect({
                  from: dateRange?.from,
                  to: date,
                })
              }
              disabled={(date) => date < (dateRange?.from ?? new Date())}
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="default"
          className="bg-primary hover:bg-primary/90"
          onClick={handleApply}
          disabled={!dateRange?.from || !dateRange?.to}
        >
          Apply
        </Button>

        {(dateRange?.from || dateRange?.to) && (
          <Button variant="destructive" className="gap-2" onClick={handleClear}>
            Clear
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}


