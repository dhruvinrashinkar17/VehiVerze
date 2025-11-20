"use client"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Progress } from "@vehiverze/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group"
import { Label } from "@vehiverze/ui/label"
import {
  getInspectionQuestions,
  calculateOverallCondition,
  calculatePriceAdjustment,
} from "@/lib/mock-data/inspection-questions"
import type { VehicleCondition, InspectionResult } from "@/lib/mock-data/inspection-questions"
import { conditionColors } from "@/lib/mock-data/vehicle-types"

interface DetailedInspectionFormProps {
  vehicleType: string
  basePrice: number
  onInspectionComplete: (results: {
    totalScore: number
    maxScore: number
    condition: VehicleCondition
    adjustedPrice: number
    results: InspectionResult[]
  }) => void
}

export function DetailedInspectionForm({ vehicleType, basePrice, onInspectionComplete }: DetailedInspectionFormProps) {
  const questions = getInspectionQuestions(vehicleType)
  const [inspectionResults, setInspectionResults] = useState<Record<string, VehicleCondition>>({})
  const [activeTab, setActiveTab] = useState("")

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

  const categories = Object.keys(questionsByCategory)
  if (!activeTab && categories.length > 0) {
    setActiveTab(categories[0])
  }

  const conditionPoints: Record<VehicleCondition, number> = {
    Excellent: 1.0,
    "Very Good": 0.8,
    Good: 0.6,
    Average: 0.4,
    Poor: 0.2,
  }

  const handleConditionChange = (questionId: string, condition: VehicleCondition) => {
    setInspectionResults((prev) => ({
      ...prev,
      [questionId]: condition,
    }))
  }

  const calculateCurrentResults = () => {
    const results: InspectionResult[] = questions.map((question) => {
      const condition = inspectionResults[question.id] || "Good"
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
    const adjustedPrice = calculatePriceAdjustment(basePrice, overallCondition)

    return { results, totalScore, maxScore, overallCondition, adjustedPrice }
  }

  const { results, totalScore, maxScore, overallCondition, adjustedPrice } = calculateCurrentResults()
  const completionPercentage = (Object.keys(inspectionResults).length / questions.length) * 100

  const getCategoryProgress = (categoryQuestions: typeof questions) => {
    const answered = categoryQuestions.filter((q) => inspectionResults[q.id]).length
    return (answered / categoryQuestions.length) * 100
  }

  const getCategoryScore = (categoryQuestions: typeof questions) => {
    const categoryResults = categoryQuestions.map((question) => {
      const condition = inspectionResults[question.id] || "Good"
      return {
        points: Math.round(question.points * conditionPoints[condition]),
        maxPoints: question.points,
      }
    })
    const score = categoryResults.reduce((sum, r) => sum + r.points, 0)
    const max = categoryResults.reduce((sum, r) => sum + r.maxPoints, 0)
    return { score, max }
  }

  const handleCompleteInspection = () => {
    onInspectionComplete({
      totalScore,
      maxScore,
      condition: overallCondition,
      adjustedPrice,
      results,
    })
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-muted-foreground">No inspection questions available for {vehicleType}.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Progress and Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{vehicleType} - 300-Point Inspection</CardTitle>
            <Badge variant="outline">
              {Object.keys(inspectionResults).length} / {questions.length} Completed
            </Badge>
          </div>
          <Progress value={completionPercentage} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{totalScore}</div>
              <div className="text-sm text-muted-foreground">Current Score</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{maxScore}</div>
              <div className="text-sm text-muted-foreground">Max Score</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Badge className={conditionColors[overallCondition]} variant="secondary">
                {overallCondition}
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Condition</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">₹{adjustedPrice.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Adjusted Price</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b p-4">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {categories.map((category) => {
                  const categoryQuestions = questionsByCategory[category]
                  const progress = getCategoryProgress(categoryQuestions)
                  const { score, max } = getCategoryScore(categoryQuestions)

                  return (
                    <TabsTrigger key={category} value={category} className="flex flex-col gap-1 h-auto py-2">
                      <span className="text-xs font-medium">{category}</span>
                      <div className="flex items-center gap-1">
                        <div className="text-xs text-muted-foreground">
                          {score}/{max}
                        </div>
                        <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{category}</h3>
                    <Badge variant="outline">{questionsByCategory[category].length} Questions</Badge>
                  </div>

                  <div className="space-y-4">
                    {questionsByCategory[category].map((question, index) => (
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
                            value={inspectionResults[question.id] || ""}
                            onValueChange={(value) => handleConditionChange(question.id, value as VehicleCondition)}
                          >
                            <div className="grid grid-cols-5 gap-2">
                              {(["Excellent", "Very Good", "Good", "Average", "Poor"] as VehicleCondition[]).map(
                                (condition) => (
                                  <div key={condition} className="flex items-center space-x-2">
                                    <RadioGroupItem value={condition} id={`${question.id}-${condition}`} />
                                    <Label htmlFor={`${question.id}-${condition}`} className="text-xs cursor-pointer">
                                      {condition}
                                    </Label>
                                  </div>
                                ),
                              )}
                            </div>
                          </RadioGroup>

                          {inspectionResults[question.id] && (
                            <div className="flex items-center justify-between text-sm">
                              <Badge className={conditionColors[inspectionResults[question.id]]} variant="secondary">
                                {inspectionResults[question.id]}
                              </Badge>
                              <span className="text-muted-foreground">
                                Points: {Math.round(question.points * conditionPoints[inspectionResults[question.id]])}{" "}
                                / {question.points}
                              </span>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button onClick={handleCompleteInspection} disabled={Object.keys(inspectionResults).length === 0}>
          Complete Inspection & Update Price
        </Button>
      </div>
    </div>
  )
}


