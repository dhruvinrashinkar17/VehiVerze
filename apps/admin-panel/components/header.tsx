"use client";

import {
  Search,
  Menu,
  ChevronDown,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Input } from "@vehiverze/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useAuthContext } from "@/components/auth-provider";
import { useDeviceType } from "@/lib/device-detection";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@vehiverze/ui/button";
import { Collapsible, CollapsibleTrigger } from "@vehiverze/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@vehiverze/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@vehiverze/ui/avatar";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const deviceType = useDeviceType();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    city: "",
    dateRange: undefined as DateRange | undefined,
  });

  const { user, isAdmin, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0 shadow-sm">
      <div className="w-full bg-card">
        <div className="flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-3 lg:py-4">
          {deviceType !== "desktop" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="h-9 w-9 flex-shrink-0 hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Search Bar */}
          <div className="relative flex-1 min-w-0 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground flex-shrink-0" />
            <Input
              placeholder={
                deviceType === "mobile"
                  ? "Search..."
                  : "Search orders, leads, vendors..."
              }
              className="pl-9 bg-background/50 text-sm input-focus border-border"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>

          {/* Desktop Filters */}
          {isAdmin && deviceType !== "mobile" && (
            <div className="hidden lg:flex items-center gap-2">
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-[140px] bg-background/50 text-sm h-9 border-border hover:bg-background/70 transition-colors">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.type}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="w-[140px] bg-background/50 text-sm h-9 border-border hover:bg-background/70 transition-colors">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="2-wheeler">2 Wheeler</SelectItem>
                  <SelectItem value="3-wheeler">3 Wheeler</SelectItem>
                  <SelectItem value="4-wheeler">4 Wheeler</SelectItem>
                </SelectContent>
              </Select>

              <DatePickerWithRange
                date={filters.dateRange}
                onDateChange={(date) =>
                  setFilters((prev) => ({ ...prev, dateRange: date }))
                }
                onApply={(date) =>
                  setFilters((prev) => ({ ...prev, dateRange: date }))
                }
              />
            </div>
          )}

          {/* Right Section - Icons */}
          <div className="flex items-center gap-2">
            {isAdmin && deviceType === "mobile" && (
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 flex-shrink-0 hover:bg-primary/10 border-border transition-all bg-transparent"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 flex-shrink-0 hover:bg-accent relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 flex-shrink-0 hover:bg-accent"
            >
              <Settings className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            {/* User Menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.phone || user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        Role: {user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Filters */}
        {isAdmin && deviceType === "mobile" && filtersOpen && (
          <div className="border-t border-border bg-card/50 px-4 py-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full bg-background/50 text-sm h-9 border-border hover:bg-background/70 transition-colors">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.type}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="w-full bg-background/50 text-sm h-9 border-border hover:bg-background/70 transition-colors">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="2-wheeler">2 Wheeler</SelectItem>
                <SelectItem value="3-wheeler">3 Wheeler</SelectItem>
                <SelectItem value="4-wheeler">4 Wheeler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
