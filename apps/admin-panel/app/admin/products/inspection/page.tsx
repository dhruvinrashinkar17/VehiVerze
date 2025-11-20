"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Badge } from "@vehiverze/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@vehiverze/ui/accordion"
import { getInspectionQuestions } from "@/lib/mock-data/inspection-questions"
import type { VehicleType } from "@/lib/mock-data/vehicle-types"

export default function InspectionQuestionsPage() {
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("")

  const vehicleTypes: VehicleType[] = [
    "2 Wheeler",
    "3 Wheeler",
    "4 Wheeler - Cars",
    "4 Wheeler - Commercial Cars",
    "4 Wheeler - Trucks",
    "6 Wheeler",
    "More Than 8 Wheelers",
  ]

  const questions = selectedVehicleType ? getInspectionQuestions(selectedVehicleType) : []

  // Group questions by category
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">300-Point Vehicle Inspection</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          For Sell Service Only
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Vehicle Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Choose a vehicle type to view inspection questions" />
            </SelectTrigger>
            <SelectContent>
              {vehicleTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedVehicleType && questions.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedVehicleType} - Inspection Questions</CardTitle>
              <Badge variant="secondary">{questions.length} Total Questions</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(questionsByCategory).map(([category, categoryQuestions]) => (
                  <div key={category} className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{categoryQuestions.length}</div>
                    <div className="text-sm text-muted-foreground">{category}</div>
                  </div>
                ))}
              </div>

              <Accordion type="single" collapsible className="w-full">
                {Object.entries(questionsByCategory).map(([category, categoryQuestions]) => (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center justify-between w-full mr-4">
                        <span className="font-medium">{category}</span>
                        <Badge variant="outline">{categoryQuestions.length} questions</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {categoryQuestions.map((question, index) => (
                          <div key={question.id} className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                            <Badge variant="secondary" className="mt-1 min-w-[2rem] justify-center">
                              {index + 1}
                            </Badge>
                            <div className="flex-1">
                              <div className="font-medium">{question.question}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Points: {question.points} | ID: {question.id}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedVehicleType && questions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              No inspection questions available for {selectedVehicleType} yet.
              <br />
              Questions are being developed for this vehicle type.
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedVehicleType && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              Select a vehicle type above to view the 300-point inspection questions.
              <br />
              These comprehensive inspections are used for vehicles in the "Sell" service category.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


