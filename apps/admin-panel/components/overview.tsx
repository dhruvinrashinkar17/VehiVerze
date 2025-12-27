"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ordersDb } from "@/lib/mock-data";
import { useMemo } from "react";

export function Overview() {
  const data = useMemo(() => {
    const orders = ordersDb.getAll();
    const monthlyRevenue: { [key: string]: number } = {};

    // Get last 7 months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ] as const;
    const now = new Date();
    const last7Months: string[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = months[date.getMonth()];
      if (monthName) {
        last7Months.push(monthName);
        monthlyRevenue[monthName] = 0;
      }
    }

    // Calculate revenue for each month
    orders.forEach((order) => {
      if (order.status === "Completed") {
        const orderDate = new Date(order.date);
        const monthName = months[orderDate.getMonth()];
        if (
          monthName &&
          Object.prototype.hasOwnProperty.call(monthlyRevenue, monthName)
        ) {
          const current = monthlyRevenue[monthName] ?? 0;
          monthlyRevenue[monthName] =
            current + (order.pricing.requote || order.pricing.quoted);
        }
      }
    });

    return last7Months.map((month) => ({
      name: month,
      total: Math.round(monthlyRevenue[month] ?? 0),
    }));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [
            `₹${value.toLocaleString()}`,
            "Revenue",
          ]}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
