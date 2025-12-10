"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@vehiverze/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card";
import { Badge } from "@vehiverze/ui/badge";
import { ordersDb } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import type { Order } from "@/lib/mock-data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@vehiverze/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  getInspectionQuestions,
  conditionMultipliers,
} from "@/lib/mock-data/inspection-questions";
import type { VehicleCondition } from "@/lib/mock-data/inspection-questions";

export default function FailedOrderDetailPage() {
  const { id } = useParams();
  const _router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const foundOrder = ordersDb.getById(id as string);
    setOrder(foundOrder);
    setLoading(false);
  }, [id]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading || !order) {
    return <div>Loading...</div>;
  }

  const handleAcceptFail = () => {
    console.log("Accepting fail for order:", order.id);
  };

  const handleReverseLead = () => {
    console.log("Reversing lead for order:", order.id);
  };

  const handleRejectLead = () => {
    console.log("Rejecting lead for order:", order.id);
  };

  const inspectionQuestions = getInspectionQuestions(order.type);

  const basePrice = order.pricing.quoted;
  const pricePerPoint = basePrice / 300;

  // For demo purposes, randomly assign conditions to show the pricing
  const mockInspectionResults: Record<string, VehicleCondition> = {};
  inspectionQuestions.forEach((question) => {
    const conditions: VehicleCondition[] = [
      "Excellent",
      "Very Good",
      "Good",
      "Average",
      "Poor",
    ];
    mockInspectionResults[question.id] =
      conditions[Math.floor(Math.random() * conditions.length)];
  });

  const questionsByCategory = inspectionQuestions.reduce(
    (acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push(question);
      return acc;
    },
    {} as Record<string, typeof inspectionQuestions>
  );

  const calculateCategoryTotals = (
    categoryQuestions: typeof inspectionQuestions
  ) => {
    let totalDeduction = 0;
    let totalPoints = 0;

    categoryQuestions.forEach((question) => {
      const condition = mockInspectionResults[question.id] || "Good";
      const multiplier = conditionMultipliers[condition];
      const pointValue = pricePerPoint * question.points;
      const actualValue = pointValue * multiplier;
      const deduction = pointValue - actualValue;

      totalDeduction += deduction;
      totalPoints += question.points;
    });

    return { totalDeduction, totalPoints };
  };

  const calculateOverallTotals = () => {
    let totalDeduction = 0;

    inspectionQuestions.forEach((question) => {
      const condition = mockInspectionResults[question.id] || "Good";
      const multiplier = conditionMultipliers[condition];
      const pointValue = pricePerPoint * question.points;
      const actualValue = pointValue * multiplier;
      const deduction = pointValue - actualValue;

      totalDeduction += deduction;
    });

    return totalDeduction;
  };

  const totalDeduction = calculateOverallTotals();
  const adjustedPrice = basePrice - totalDeduction;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="bg-purple-500/20 text-purple-500">mobile</Badge>
              <Badge variant="destructive">Failed</Badge>
            </div>
            <CardTitle>{order.model}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Token</div>
                <div>{order.token}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Pickup</div>
                <div>{new Date(order.pickup).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Service Type</div>
                <div>{order.serviceType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Vendor</div>
                <div>{order.vendor || "No vendor assigned!"}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Device Details</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">RAM</div>
                  <div>{order.specs.ram}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Storage</div>
                  <div>{order.specs.storage}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Age</div>
                  <div>{order.specs.age}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Screen Condition</div>
                  <div>{order.specs.screenCondition}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">
                    Physical Condition
                  </div>
                  <div>{order.specs.physicalCondition}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Accessories</div>
                  <div>{order.specs.accessories}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Pricing</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Quoted Price</div>
                  <div>₹{order.pricing.quoted.toLocaleString()}</div>
                </div>
                {order.pricing.requote && (
                  <div>
                    <div className="text-sm text-gray-400">Requoted Price</div>
                    <div>₹{order.pricing.requote.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleAcceptFail}
              >
                Accept Fail
              </Button>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleReverseLead}
              >
                Reverse Lead
              </Button>
              <Button variant="secondary" onClick={handleRejectLead}>
                Reject Lead
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Name</div>
                  <div>{order.customer.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div>{order.customer.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div>{order.customer.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Payment Method</div>
                  <div>{order.customer.payment}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Address</div>
                <div>{order.customer.address}</div>
                <div>
                  {order.customer.city}, {order.customer.pincode}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle>Failure Reason</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <h4 className="font-semibold text-red-500 mb-2">
                  Sold Device Elsewhere
                </h4>
                <p className="text-sm text-gray-400">
                  Customer has sold the Vehicle through another platform or
                  dealer.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {order.serviceType === "Sell" && inspectionQuestions.length > 0 && (
        <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>300-Point Inspection Pricing Report</CardTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Detailed pricing breakdown based on vehicle condition
                  assessment
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Total Deduction</div>
                <div className="text-2xl font-bold text-red-500">
                  -₹{totalDeduction.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Adjusted Price: ₹{adjustedPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-gray-400">Base Price</div>
                <div className="text-lg font-bold">
                  ₹{basePrice.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Price Per Point</div>
                <div className="text-lg font-bold">
                  ₹{pricePerPoint.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Total Points</div>
                <div className="text-lg font-bold">300</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Final Price</div>
                <div className="text-lg font-bold text-green-500">
                  ₹{adjustedPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(questionsByCategory).map(
                ([category, categoryQuestions]) => {
                  const {
                    totalDeduction: categoryDeduction,
                    totalPoints: _categoryPoints,
                  } = calculateCategoryTotals(categoryQuestions);

                  return (
                    <Collapsible
                      key={category}
                      open={openSections[category]}
                      onOpenChange={() => toggleSection(category)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                        <div className="flex items-center gap-3">
                          {openSections[category] ? (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          )}
                          <span className="font-semibold text-lg">
                            {category}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {categoryQuestions.length} questions
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xs text-gray-400">
                              Category Deduction
                            </div>
                            <div className="text-lg font-bold text-red-400">
                              -₹{categoryDeduction.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <div className="space-y-2 p-4 bg-gray-900/30 rounded-lg">
                          <div className="grid grid-cols-12 gap-2 pb-2 border-b border-gray-700 text-xs font-semibold text-gray-400">
                            <div className="col-span-5">Question</div>
                            <div className="col-span-2 text-center">
                              Condition
                            </div>
                            <div className="col-span-2 text-right">
                              Base Value
                            </div>
                            <div className="col-span-2 text-right">
                              Actual Value
                            </div>
                            <div className="col-span-1 text-right">
                              Deduction
                            </div>
                          </div>

                          {categoryQuestions.map((question, index) => {
                            const condition =
                              mockInspectionResults[question.id] || "Good";
                            const multiplier = conditionMultipliers[condition];
                            const pointValue = pricePerPoint * question.points;
                            const actualValue = pointValue * multiplier;
                            const deduction = pointValue - actualValue;

                            const conditionColors: Record<
                              VehicleCondition,
                              string
                            > = {
                              Excellent:
                                "bg-green-500/20 text-green-400 border-green-500/30",
                              "Very Good":
                                "bg-blue-500/20 text-blue-400 border-blue-500/30",
                              Good: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                              Average:
                                "bg-orange-500/20 text-orange-400 border-orange-500/30",
                              Poor: "bg-red-500/20 text-red-400 border-red-500/30",
                            };

                            return (
                              <div
                                key={question.id}
                                className="grid grid-cols-12 gap-2 p-3 bg-gray-800/30 rounded text-sm hover:bg-gray-800/50 transition-colors"
                              >
                                <div className="col-span-5 flex items-center">
                                  <Badge
                                    variant="outline"
                                    className="mr-2 text-xs"
                                  >
                                    {index + 1}
                                  </Badge>
                                  <span className="text-gray-300">
                                    {question.question}
                                  </span>
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                  <Badge
                                    className={conditionColors[condition]}
                                    variant="outline"
                                  >
                                    {condition}
                                  </Badge>
                                </div>
                                <div className="col-span-2 flex items-center justify-end font-mono text-gray-400">
                                  ₹{pointValue.toFixed(2)}
                                </div>
                                <div className="col-span-2 flex items-center justify-end font-mono text-green-400">
                                  ₹{actualValue.toFixed(2)}
                                </div>
                                <div className="col-span-1 flex items-center justify-end font-mono">
                                  {deduction > 0 ? (
                                    <span className="text-red-400">
                                      -₹{deduction.toFixed(0)}
                                    </span>
                                  ) : (
                                    <span className="text-gray-500">₹0</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                          <div className="grid grid-cols-12 gap-2 pt-2 mt-2 border-t border-gray-700 font-semibold">
                            <div className="col-span-7 flex items-center justify-end text-gray-300">
                              Category Total:
                            </div>
                            <div className="col-span-4 flex items-center justify-end text-lg text-red-400">
                              -₹{categoryDeduction.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                }
              )}
            </div>

            <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">
                    Original Quote
                  </div>
                  <div className="text-2xl font-bold text-gray-300">
                    ₹{basePrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">
                    Total Deductions
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    -₹{totalDeduction.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ({((totalDeduction / basePrice) * 100).toFixed(1)}%
                    reduction)
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">
                    Final Adjusted Price
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    ₹{adjustedPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {order.serviceType !== "Sell" && (
        <Card className="bg-yellow-900/20 border-yellow-600/30">
          <CardContent className="pt-6">
            <div className="text-center text-yellow-400">
              <p>
                300-Point Inspection Pricing Report is only available for
                &quot;Sell&quot; service type orders.
              </p>
              <p className="text-sm mt-1">
                Current service type: <strong>{order.serviceType}</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
