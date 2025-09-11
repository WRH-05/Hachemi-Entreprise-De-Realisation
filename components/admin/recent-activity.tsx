"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User, FileText, Settings, Clock } from "lucide-react"

// Mock data for recent activity
const recentActivity = [
  {
    id: "act-1",
    type: "message",
    description: "New message received from Ahmed Benali",
    time: "10 minutes ago",
  },
  {
    id: "act-2",
    type: "user",
    description: "Admin user logged in from new device",
    time: "1 hour ago",
  },
  {
    id: "act-3",
    type: "content",
    description: "Home page content updated",
    time: "3 hours ago",
  },
  {
    id: "act-4",
    type: "settings",
    description: "Site settings changed: Contact email updated",
    time: "Yesterday at 15:30",
  },
  {
    id: "act-5",
    type: "message",
    description: "New support request from Amina Khelif",
    time: "Yesterday at 12:45",
  },
  {
    id: "act-6",
    type: "content",
    description: "New project added to gallery",
    time: "2 days ago",
  },
]

export function RecentActivity() {
  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      case "content":
        return <FileText className="h-4 w-4" />
      case "settings":
        return <Settings className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions and events on your website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-0.5">
                <Badge variant="outline" className="flex h-8 w-8 items-center justify-center rounded-full">
                  {getIcon(activity.type)}
                </Badge>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
