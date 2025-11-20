import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@vehiverze/ui/table"
import { ordersDb } from "@/lib/mock-data"
import { Badge } from "@vehiverze/ui/badge"

export function RecentOrders() {
  const recentOrders = ordersDb.getAll().slice(0, 5)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "status-completed"
      case "Pending":
        return "status-pending"
      case "Assigned to Vendor":
        return "status-assigned"
      default:
        return "status-cancelled"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
            <TableCell>{order.model}</TableCell>
            <TableCell>{order.city}</TableCell>
            <TableCell>
              <Badge variant="outline">{order.type}</Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


