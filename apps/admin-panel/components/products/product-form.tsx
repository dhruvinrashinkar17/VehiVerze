"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@vehiverze/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@vehiverze/ui/form"
import { Input } from "@vehiverze/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Textarea } from "@vehiverze/ui/textarea"
import { Badge } from "@vehiverze/ui/badge"
import { vehiclesDb } from "@/lib/mock-data/vehicle-store"
import { vehicleBrands, conditionColors } from "@/lib/mock-data/vehicle-types"
import type { VehicleProduct, VehicleCondition } from "@/lib/mock-data/vehicle-types"
import { InspectionForm } from "./inspection-form"

const formSchema = z.object({
  type: z.enum([
    "2 Wheeler",
    "3 Wheeler",
    "4 Wheeler - Cars",
    "4 Wheeler - Commercial Cars",
    "4 Wheeler - Trucks",
    "6 Wheeler",
    "More Than 8 Wheelers",
  ]),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  variant: z.string().min(1, "Variant is required"),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  fuelType: z.enum(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]),
  kilometers: z.number().min(0),
  location: z.string().min(1, "Location is required"),
  basePrice: z.number().positive("Price must be positive"),
  description: z.string(),
  status: z.enum(["active", "inactive"]),
})

interface ProductFormProps {
  product?: VehicleProduct
  onSuccess: () => void
  serviceType?: string
  maxImages?: number
}

export function ProductForm({ product, onSuccess, serviceType = "Buy", maxImages = 5 }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [showInspection, setShowInspection] = useState(false)
  const [inspectionData, setInspectionData] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          type: product.type,
          brand: product.brand,
          model: product.model,
          variant: product.variant,
          year: product.year,
          fuelType: product.fuelType,
          kilometers: product.kilometers,
          location: product.location,
          basePrice: product.basePrice,
          description: product.description,
          status: product.status,
        }
      : {
          type: "4 Wheeler - Cars",
          status: "active",
          description: "",
        },
  })

  const vehicleType = form.watch("type")
  const basePrice = form.watch("basePrice")
  const brands = vehicleBrands[vehicleType]

  const handleInspectionComplete = (results: any) => {
    setInspectionData(results)
    setShowInspection(false)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const vehicleData = {
        ...values,
        currentPrice: inspectionData ? inspectionData.adjustedPrice : values.basePrice,
        condition: inspectionData ? inspectionData.condition : ("Good" as VehicleCondition),
        inspectionScore: inspectionData ? inspectionData.totalScore : 0,
        maxInspectionScore: inspectionData ? inspectionData.maxScore : 300,
        inspectionDate: inspectionData ? new Date().toISOString() : undefined,
        inspectionResults: inspectionData ? inspectionData.results : [],
        images: [],
      }

      if (product) {
        await vehiclesDb.update(product.id, vehicleData)
      } else {
        await vehiclesDb.create(vehicleData)
      }
      onSuccess()
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setLoading(false)
    }
  }

  if (showInspection) {
    return (
      <InspectionForm
        vehicleType={vehicleType}
        basePrice={basePrice || 0}
        onInspectionComplete={handleInspectionComplete}
      />
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "2 Wheeler",
                      "3 Wheeler",
                      "4 Wheeler - Cars",
                      "4 Wheeler - Commercial Cars",
                      "4 Wheeler - Trucks",
                      "6 Wheeler",
                      "More Than 8 Wheelers",
                    ].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="variant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Base", "Mid", "Top", "Special"].map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Petrol", "Diesel", "CNG", "Electric", "Hybrid"].map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kilometers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kilometers Driven</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Price (₹)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {inspectionData && (
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Inspection Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Condition</div>
                <Badge className={conditionColors[inspectionData.condition]}>{inspectionData.condition}</Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Score</div>
                <div className="font-medium">
                  {inspectionData.totalScore}/{inspectionData.maxScore}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Base Price</div>
                <div className="font-medium">₹{basePrice?.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Adjusted Price</div>
                <div className="font-medium text-primary">₹{inspectionData.adjustedPrice.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          {/* Only show inspection button for Sell service type */}
          {!product && serviceType === "Sell" && (
            <Button type="button" variant="secondary" onClick={() => setShowInspection(true)} disabled={!basePrice}>
              Start 300-Point Inspection
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : product ? "Update Vehicle" : "Add Vehicle"}
          </Button>
        </div>
      </form>
    </Form>
  )
}


