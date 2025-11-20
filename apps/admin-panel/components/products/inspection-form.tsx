"use client"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Badge } from "@vehiverze/ui/badge"
import { Progress } from "@vehiverze/ui/progress"
import {
  getInspectionQuestions,
  calculateOverallCondition,
  calculatePriceAdjustment,
} from "@/lib/mock-data/inspection-questions"
import type { VehicleCondition, InspectionResult } from "@/lib/mock-data/inspection-questions"
import { conditionColors } from "@/lib/mock-data/vehicle-types"

interface InspectionFormProps {
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

export function InspectionForm({ vehicleType, basePrice, onInspectionComplete }: InspectionFormProps) {
  const questions = getInspectionQuestions(vehicleType)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [inspectionResults, setInspectionResults] = useState<InspectionResult[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleConditionSelect = (condition: VehicleCondition) => {
    const conditionPoints: Record<VehicleCondition, number> = {
      Excellent: 1.0,
      "Very Good": 0.8,
      Good: 0.6,
      Average: 0.4,
      Poor: 0.2,
    }

    const result: InspectionResult = {
      questionId: currentQuestion.id,
      condition,
      points: Math.round(currentQuestion.points * conditionPoints[condition]),
      maxPoints: currentQuestion.points,
    }

    const newResults = [...inspectionResults, result]
    setInspectionResults(newResults)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Complete inspection
      const totalScore = newResults.reduce((sum, r) => sum + r.points, 0)
      const maxScore = questions.reduce((sum, q) => sum + q.points, 0)
      const overallCondition = calculateOverallCondition(totalScore, maxScore)
      const adjustedPrice = calculatePriceAdjustment(basePrice, overallCondition)

      onInspectionComplete({
        totalScore,
        maxScore,
        condition: overallCondition,
        adjustedPrice,
        results: newResults,
      })
      setIsCompleted(true)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setInspectionResults(inspectionResults.slice(0, -1))
    }
  }

  if (isCompleted) {
    const totalScore = inspectionResults.reduce((sum, r) => sum + r.points, 0)
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0)
    const overallCondition = calculateOverallCondition(totalScore, maxScore)
    const adjustedPrice = calculatePriceAdjustment(basePrice, overallCondition)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Inspection Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {totalScore}/{maxScore}
            </div>
            <Badge className={conditionColors[overallCondition]}>{overallCondition}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Base Price</div>
              <div className="text-xl font-bold">₹{basePrice.toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-sm text-muted-foreground">Adjusted Price</div>
              <div className="text-xl font-bold text-primary">₹{adjustedPrice.toLocaleString()}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Category Breakdown:</div>
            {Object.entries(
              inspectionResults.reduce(
                (acc, result) => {
                  const question = questions.find((q) => q.id === result.questionId)
                  if (question) {
                    if (!acc[question.category]) {
                      acc[question.category] = { score: 0, max: 0 }
                    }
                    acc[question.category].score += result.points
                    acc[question.category].max += result.maxPoints
                  }
                  return acc
                },
                {} as Record<string, { score: number; max: number }>,
              ),
            ).map(([category, data]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm">{category}</span>
                <span className="text-sm font-medium">
                  {data.score}/{data.max}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentQuestion) {
    return <div>No inspection questions available for this vehicle type.</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Vehicle Inspection</CardTitle>
          <Badge variant="outline">
            {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-sm text-muted-foreground mb-2">{currentQuestion.category}</div>
          <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
          <div className="text-sm text-muted-foreground mt-1">Points: {currentQuestion.points}</div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {(["Excellent", "Very Good", "Good", "Average", "Poor"] as VehicleCondition[]).map((condition) => (
            <Button
              key={condition}
              variant="outline"
              className="justify-start h-auto p-4 bg-transparent"
              onClick={() => handleConditionSelect(condition)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{condition}</span>
                <Badge className={conditionColors[condition]} variant="secondary">
                  {condition === "Excellent"
                    ? "100%"
                    : condition === "Very Good"
                      ? "80%"
                      : condition === "Good"
                        ? "60%"
                        : condition === "Average"
                          ? "40%"
                          : "20%"}
                </Badge>
              </div>
            </Button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          <Button variant="outline" onClick={() => setIsCompleted(true)}>
            Skip Inspection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


