"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@vehiverze/ui/table"
import { Badge } from "@vehiverze/ui/badge"
import { notificationsDb } from "@/lib/mock-data/stores"

export default function NotificationsPage() {
  const [notifications] = useState(() => notificationsDb.getAll())

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    }
  }

  return (
    <div className="space-y-4">
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow className="table-header">
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Target Users</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id} className="table-row cursor-pointer">
                <TableCell>{new Date(notification.timestamp).toLocaleString()}</TableCell>
                <TableCell>{notification.type}</TableCell>
                <TableCell>{notification.title}</TableCell>
                <TableCell className="max-w-md truncate">{notification.message}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {notification.targetUsers.map((user) => (
                      <Badge key={user} variant="outline" className="text-xs">
                        {user}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      notification.isRead
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }
                  >
                    {notification.isRead ? "Read" : "Unread"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


