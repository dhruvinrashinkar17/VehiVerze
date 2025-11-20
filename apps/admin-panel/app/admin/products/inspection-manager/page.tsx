"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Button } from "@vehiverze/ui/button"
import { Badge } from "@vehiverze/ui/badge"
import { Input } from "@vehiverze/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@vehiverze/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@vehiverze/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@vehiverze/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"
import { Label } from "@vehiverze/ui/label"
import { vehiclesDb } from "@/lib/mock-data/vehicle-store"
import { DetailedInspectionForm } from "@/components/products/detailed-inspection-form"
import type { VehicleProduct } from "@/lib/mock-data/vehicle-types"
import { conditionColors } from "@/lib/mock-data/vehicle-types"
import {
  getInspectionQuestions,
  calculateOverallCondition,
  calculatePriceAdjustment,
} from "@/lib/mock-data/inspection-questions"
import type { VehicleCondition, InspectionResult } from "@/lib/mock-data/inspection-questions"
import { FileText, Eye, Calculator, Save, Edit } from "lucide-react"

export default function InspectionManagerPage() {
  const [vehicles, setVehicles] = useState(() => vehiclesDb.getAll().filter((v) => v.serviceType === "Sell"))
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleProduct | null>(null)
  const [viewInspection, setViewInspection] = useState<VehicleProduct | null>(null)
  const [editingVehicle, setEditingVehicle] = useState<VehicleProduct | null>(null)
  const [inspectionAnswers, setInspectionAnswers] = useState<Record<string, VehicleCondition>>({})
  const [customBasePrice, setCustomBasePrice] = useState<number>(0)
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    condition: "all",
    inspectionStatus: "all",
  })

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(filters.search.toLowerCase())

    const matchesType = filters.type === "all" || vehicle.type === filters.type
    const matchesCondition = filters.condition === "all" || vehicle.condition === filters.condition
    const matchesInspectionStatus =
      filters.inspectionStatus === "all" ||
      (filters.inspectionStatus === "completed" && vehicle.inspectionDate) ||
      (filters.inspectionStatus === "pending" && !vehicle.inspectionDate)

    return matchesSearch && matchesType && matchesCondition && matchesInspectionStatus
  })

  const handleInspectionComplete = (results: any) => {
    if (!selectedVehicle) return

    vehiclesDb.update(selectedVehicle.id, {
      condition: results.condition,
      currentPrice: results.adjustedPrice,
      inspectionScore: results.totalScore,
      maxInspectionScore: results.maxScore,
      inspectionDate: new Date().toISOString(),
      inspectionResults: results.results,
    })

    setVehicles(vehiclesDb.getAll().filter((v) => v.serviceType === "Sell"))
    setSelectedVehicle(null)
  }

  const handleStartInlineInspection = (vehicle: VehicleProduct) => {
    setEditingVehicle(vehicle)
    setCustomBasePrice(vehicle.basePrice)

    // Load existing inspection results if available
    if (vehicle.inspectionResults && vehicle.inspectionResults.length > 0) {
      const existingAnswers: Record<string, VehicleCondition> = {}
      vehicle.inspectionResults.forEach((result: any) => {
        existingAnswers[result.questionId] = result.condition
      })
      setInspectionAnswers(existingAnswers)
    } else {
      setInspectionAnswers({})
    }
  }

  const handleAnswerChange = (questionId: string, condition: VehicleCondition) => {
    setInspectionAnswers((prev) => ({
      ...prev,
      [questionId]: condition,
    }))
  }

  const calculateCurrentResults = () => {
    if (!editingVehicle) return { totalScore: 0, maxScore: 0, condition: "Good" as VehicleCondition, adjustedPrice: 0 }

    const questions = getInspectionQuestions(editingVehicle.type)
    const conditionPoints: Record<VehicleCondition, number> = {
      Excellent: 1.0,
      "Very Good": 0.8,
      Good: 0.6,
      Average: 0.4,
      Poor: 0.2,
    }

    const results: InspectionResult[] = questions.map((question) => {
      const condition = inspectionAnswers[question.id] || "Good"
      return {
        questionId: question.id,
        condition,
        points: Math.round(question.points * conditionPoints[condition]),
        maxPoints: question.points,
      }
    })

    const totalScore = results.reduce((sum, r) => sum + r.points, 0)
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0)
    const overallCondition = calculateOverallCondition(totalScore, maxScore)
    const adjustedPrice = calculatePriceAdjustment(customBasePrice, overallCondition)

    return { totalScore, maxScore, condition: overallCondition, adjustedPrice, results }
  }

  const handleSaveInspection = () => {
    if (!editingVehicle) return

    const { totalScore, maxScore, condition, adjustedPrice, results } = calculateCurrentResults()

    vehiclesDb.update(editingVehicle.id, {
      basePrice: customBasePrice,
      condition,
      currentPrice: adjustedPrice,
      inspectionScore: totalScore,
      maxInspectionScore: maxScore,
      inspectionDate: new Date().toISOString(),
      inspectionResults: results,
    })

    setVehicles(vehiclesDb.getAll().filter((v) => v.serviceType === "Sell"))
    setEditingVehicle(null)
    setInspectionAnswers({})
  }

  const getInspectionStatus = (vehicle: VehicleProduct) => {
    if (!vehicle.inspectionDate) {
      return <Badge variant="secondary">Pending</Badge>
    }
    return <Badge variant="default">Completed</Badge>
  }

  const getPriceAdjustment = (vehicle: VehicleProduct) => {
    if (!vehicle.currentPrice || vehicle.currentPrice === vehicle.basePrice) {
      return <span className="text-muted-foreground">No adjustment</span>
    }

    const difference = vehicle.currentPrice - vehicle.basePrice
    const percentage = ((difference / vehicle.basePrice) * 100).toFixed(1)

    return (
      <span className={difference > 0 ? "text-green-600" : "text-red-600"}>
        {difference > 0 ? "+" : ""}₹{difference.toLocaleString()} ({percentage}%)
      </span>
    )
  }

  const { totalScore, maxScore, condition, adjustedPrice } = calculateCurrentResults()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vehicle Inspection & Price Manager</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Sell Service Only
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inspected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{vehicles.filter((v) => v.inspectionDate).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{vehicles.filter((v) => !v.inspectionDate).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Adjustment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(() => {
                const inspected = vehicles.filter((v) => v.inspectionDate && v.currentPrice !== v.basePrice)
                if (inspected.length === 0) return "0%"
                const avgAdjustment =
                  inspected.reduce((sum, v) => {
                    return sum + ((v.currentPrice - v.basePrice) / v.basePrice) * 100
                  }, 0) / inspected.length
                return `${avgAdjustment.toFixed(1)}%`
              })()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Search by brand or model..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="max-w-sm"
            />
            <Select value={filters.type} onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Vehicle Type" />
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
                <SelectValue placeholder="Condition" />
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
            <Select
              value={filters.inspectionStatus}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, inspectionStatus: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Inspection Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicles for Inspection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Adjustment</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Inspection</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div className="font-medium">
                        {vehicle.brand} {vehicle.model}
                      </div>
                      <div className="text-sm text-muted-foreground">{vehicle.variant}</div>
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>₹{vehicle.basePrice.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">
                      ₹{(vehicle.currentPrice || vehicle.basePrice).toLocaleString()}
                    </TableCell>
                    <TableCell>{getPriceAdjustment(vehicle)}</TableCell>
                    <TableCell>
                      {vehicle.condition ? (
                        <div className="space-y-1">
                          <Badge className={conditionColors[vehicle.condition]}>{vehicle.condition}</Badge>
                          {vehicle.inspectionScore && (
                            <div className="text-xs text-muted-foreground">
                              {vehicle.inspectionScore}/{vehicle.maxInspectionScore || 300}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Badge variant="secondary">Not Assessed</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getInspectionStatus(vehicle)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStartInlineInspection(vehicle)}
                          title="Start Inline Inspection"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedVehicle(vehicle)}
                          title="Full Screen Inspection"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        {vehicle.inspectionDate && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewInspection(vehicle)}
                            title="View Inspection Report"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Inline Inspection Form */}
      {editingVehicle && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                300-Point Inspection: {editingVehicle.brand} {editingVehicle.model}
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={handleSaveInspection} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Inspection
                </Button>
                <Button variant="outline" onClick={() => setEditingVehicle(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price and Results Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-muted rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price (₹)</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={customBasePrice}
                  onChange={(e) => setCustomBasePrice(Number(e.target.value))}
                  className="font-medium"
                />
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Current Score</div>
                <div className="text-2xl font-bold">
                  {totalScore}/{maxScore}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Condition</div>
                <Badge className={conditionColors[condition]}>{condition}</Badge>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Adjusted Price</div>
                <div className="text-xl font-bold text-primary">₹{adjustedPrice.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Adjustment</div>
                <div
                  className={`text-lg font-medium ${adjustedPrice > customBasePrice ? "text-green-600" : adjustedPrice < customBasePrice ? "text-red-600" : "text-muted-foreground"}`}
                >
                  {adjustedPrice === customBasePrice
                    ? "No change"
                    : `${adjustedPrice > customBasePrice ? "+" : ""}₹${(adjustedPrice - customBasePrice).toLocaleString()}`}
                </div>
              </div>
            </div>

            {/* 300-Point Questions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Complete 300-Point Inspection</h3>

              {(() => {
                const questions = getInspectionQuestions(editingVehicle.type)
                const questionsByCategory = questions.reduce(
                  (acc, question) => {
                    if (!acc[question.category]) {
                      acc[question.category] = []
                    }
                    acc[question.category].push(question)
                    return acc
                  },
                  {} as Record<string, typeof questions>,
                )

                return (
                  <Accordion type="multiple" className="w-full">
                    {Object.entries(questionsByCategory).map(([category, categoryQuestions]) => {
                      const answeredCount = categoryQuestions.filter((q) => inspectionAnswers[q.id]).length
                      const categoryScore = categoryQuestions.reduce((sum, q) => {
                        const condition = inspectionAnswers[q.id] || "Good"
                        const conditionPoints: Record<VehicleCondition, number> = {
                          Excellent: 1.0,
                          "Very Good": 0.8,
                          Good: 0.6,
                          Average: 0.4,
                          Poor: 0.2,
                        }
                        return sum + Math.round(q.points * conditionPoints[condition])
                      }, 0)
                      const maxCategoryScore = categoryQuestions.reduce((sum, q) => sum + q.points, 0)

                      return (
                        <AccordionItem key={category} value={category}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center justify-between w-full mr-4">
                              <span className="font-medium">{category}</span>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline">
                                  {answeredCount}/{categoryQuestions.length} answered
                                </Badge>
                                <Badge variant="secondary">
                                  {categoryScore}/{maxCategoryScore} points
                                </Badge>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid gap-4">
                              {categoryQuestions.map((question, index) => (
                                <Card key={question.id} className="p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Badge variant="secondary" className="text-xs">
                                            {index + 1}
                                          </Badge>
                                          <span className="text-xs text-muted-foreground">
                                            {question.points} point{question.points !== 1 ? "s" : ""}
                                          </span>
                                        </div>
                                        <p className="font-medium">{question.question}</p>
                                      </div>
                                    </div>

                                    <RadioGroup
                                      value={inspectionAnswers[question.id] || ""}
                                      onValueChange={(value) =>
                                        handleAnswerChange(question.id, value as VehicleCondition)
                                      }
                                    >
                                      <div className="grid grid-cols-5 gap-2">
                                        {(
                                          ["Excellent", "Very Good", "Good", "Average", "Poor"] as VehicleCondition[]
                                        ).map((conditionOption) => (
                                          <div key={conditionOption} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                              value={conditionOption}
                                              id={`${question.id}-${conditionOption}`}
                                            />
                                            <Label
                                              htmlFor={`${question.id}-${conditionOption}`}
                                              className="text-xs cursor-pointer"
                                            >
                                              {conditionOption}
                                            </Label>
                                          </div>
                                        ))}
                                      </div>
                                    </RadioGroup>

                                    {inspectionAnswers[question.id] && (
                                      <div className="flex items-center justify-between text-sm">
                                        <Badge
                                          className={conditionColors[inspectionAnswers[question.id]]}
                                          variant="secondary"
                                        >
                                          {inspectionAnswers[question.id]}
                                        </Badge>
                                        <span className="text-muted-foreground">
                                          Points: {(() => {
                                            const conditionPoints: Record<VehicleCondition, number> = {
                                              Excellent: 1.0,
                                              "Very Good": 0.8,
                                              Good: 0.6,
                                              Average: 0.4,
                                              Poor: 0.2,
                                            }
                                            return Math.round(
                                              question.points * conditionPoints[inspectionAnswers[question.id]],
                                            )
                                          })()} / {question.points}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                )
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full Screen Inspection Modal */}
      <Dialog open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>300-Point Vehicle Inspection</DialogTitle>
            <DialogDescription>
              {selectedVehicle?.brand} {selectedVehicle?.model} - Complete inspection to determine accurate pricing
            </DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <DetailedInspectionForm
              vehicleType={selectedVehicle.type}
              basePrice={selectedVehicle.basePrice}
              onInspectionComplete={handleInspectionComplete}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Inspection Report Modal */}
      <Dialog open={!!viewInspection} onOpenChange={() => setViewInspection(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inspection Report</DialogTitle>
            <DialogDescription>
              {viewInspection?.brand} {viewInspection?.model} -
              {viewInspection?.inspectionDate &&
                ` Inspected on ${new Date(viewInspection.inspectionDate).toLocaleDateString()}`}
            </DialogDescription>
          </DialogHeader>
          {viewInspection && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <div className="text-2xl font-bold">
                    {viewInspection.inspectionScore || 0}/{viewInspection.maxInspectionScore || 300}
                  </div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Condition</div>
                  <Badge className={conditionColors[viewInspection.condition || "Good"]}>
                    {viewInspection.condition || "Good"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Price Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Base Price</div>
                    <div className="font-medium">₹{viewInspection.basePrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Adjusted Price</div>
                    <div className="font-medium text-primary">
                      ₹{(viewInspection.currentPrice || viewInspection.basePrice).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Price Adjustment: </span>
                  {getPriceAdjustment(viewInspection)}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setViewInspection(null)
                    handleStartInlineInspection(viewInspection)
                  }}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Re-inspect Vehicle
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


