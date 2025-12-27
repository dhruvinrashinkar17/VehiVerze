"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card";
import { Input } from "@vehiverze/ui/input";
import { Button } from "@vehiverze/ui/button";
import { Badge } from "@vehiverze/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vehiverze/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";

type Pincode = {
  code: string;
  city: string;
  state: string;
  deviceType: string;
  status: "Live" | "In active";
};

export default function AreaManagementPage() {
  const [pincodes, _setPincodes] = useState<Pincode[]>([
    {
      code: "400001",
      city: "Mumbai",
      state: "Maharashtra",
      deviceType: "mobile",
      status: "Live",
    },
    {
      code: "400049",
      city: "Mumbai",
      state: "Maharashtra",
      deviceType: "laptop",
      status: "Live",
    },
  ]);

  const handleAddPincode = (e: React.FormEvent) => {
    e.preventDefault();
    // Add pincode logic
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardHeader>
          <CardTitle>Serviceable Pincodes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-[#2A2A2A]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pincode</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Device Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pincodes.map((pincode) => (
                  <TableRow key={pincode.code}>
                    <TableCell>{pincode.code}</TableCell>
                    <TableCell>{pincode.city}</TableCell>
                    <TableCell>{pincode.state}</TableCell>
                    <TableCell>{pincode.deviceType}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          pincode.status === "Live" ? "default" : "destructive"
                        }
                        className={
                          pincode.status === "Live" ? "bg-green-500" : undefined
                        }
                      >
                        {pincode.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle>Add Pincode</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPincode} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Pincode</label>
                <Input
                  placeholder="Enter pincode"
                  className="bg-[#2A2A2A] border-[#3A3A3A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">City</label>
                <Input
                  placeholder="Enter city"
                  className="bg-[#2A2A2A] border-[#3A3A3A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">State</label>
                <Input
                  placeholder="Enter state"
                  className="bg-[#2A2A2A] border-[#3A3A3A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Device Type</label>
                <Select>
                  <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="watch">Watch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Add Pincode
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-center p-4 rounded-lg bg-[#2A2A2A]">
                <div className="text-4xl font-bold text-green-500">500</div>
                <div className="text-sm text-gray-400">Total Pincodes</div>
              </div>
              <div className="space-y-2 text-center p-4 rounded-lg bg-[#2A2A2A]">
                <div className="text-4xl font-bold text-yellow-500">20</div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
