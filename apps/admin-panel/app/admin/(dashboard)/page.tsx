"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Overview } from "@/components/overview"
import { RecentOrders } from "@/components/recent-orders"
import { ServiceStats } from "@/components/service-stats"
import { ordersDb } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    garageServices: 0,
    newVehicles: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
  })

  useEffect(() => {
    // Check if user has dashboard access (you can implement this check based on your auth logic)
    // For now, redirect to orders if trying to access directly
    const hasAccess = sessionStorage.getItem("dashboardAccess") === "true"
    if (!hasAccess) {
      router.push("/admin/orders")
    } else {
      setIsAuthenticated(true)
      calculateMetrics()
    }
  }, [router])

  const calculateMetrics = () => {
    const orders = ordersDb.getAll()
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    // Current month orders
    const currentMonthOrders = orders.filter((order) => new Date(order.date) >= lastMonth)
    const previousMonthOrders = orders.filter((order) => {
      const orderDate = new Date(order.date)
      const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())
      return orderDate >= twoMonthsAgo && orderDate < lastMonth
    })

    // Calculate metrics
    const totalOrders = orders.length
    const completedOrders = orders.filter((o) => o.status === "Completed").length
    const totalRevenue = orders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => sum + (o.pricing.requote || o.pricing.quoted), 0)

    const garageServices = orders.filter((o) => o.serviceType === "Garage Service").length
    const newVehicles = orders.filter((o) => o.serviceType === "New Vehicle").length

    // Calculate growth percentages
    const ordersGrowth =
      previousMonthOrders.length > 0
        ? ((currentMonthOrders.length - previousMonthOrders.length) / previousMonthOrders.length) * 100
        : 0

    const currentRevenue = currentMonthOrders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => sum + (o.pricing.requote || o.pricing.quoted), 0)
    const previousRevenue = previousMonthOrders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => sum + (o.pricing.requote || o.pricing.quoted), 0)
    const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0

    setMetrics({
      totalOrders,
      completedOrders,
      totalRevenue,
      garageServices,
      newVehicles,
      revenueGrowth,
      ordersGrowth,
    })
  }

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {metrics.ordersGrowth >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{metrics.ordersGrowth.toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{metrics.ordersGrowth.toFixed(1)}%</span>
                </>
              )}
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completedOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((metrics.completedOrders / metrics.totalOrders) * 100).toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(metrics.totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {metrics.revenueGrowth >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{metrics.revenueGrowth.toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{metrics.revenueGrowth.toFixed(1)}%</span>
                </>
              )}
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Breakdown</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.garageServices + metrics.newVehicles}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.garageServices} Garage • {metrics.newVehicles} New Vehicles
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Service Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ServiceStats />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentOrders />
        </CardContent>
      </Card>
    </div>
  )
}


