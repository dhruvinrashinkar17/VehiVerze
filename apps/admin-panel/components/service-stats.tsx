"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ordersDb } from "@/lib/mock-data"
import { useMemo } from "react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#ff6b6b"]

export function ServiceStats() {
  const data = useMemo(() => {
    const orders = ordersDb.getAll()
    const typeCounts: { [key: string]: number } = {}
    orders.forEach((order) => {
      const type = order.type
      typeCounts[type] = (typeCounts[type] || 0) + 1
    })
    return Object.entries(typeCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}


