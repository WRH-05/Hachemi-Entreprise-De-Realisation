"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data for recent messages
const recentMessages = [
  {
    id: "msg-1",
    name: "Ahmed Benali",
    email: "ahmed.benali@example.com",
    subject: "Quote Request for Villa Construction",
    message: "I'm interested in building a villa in Algiers...",
    date: "2023-05-15T10:30:00",
    status: "unread",
    type: "quote",
  },
  {
    id: "msg-4",
    name: "Amina Khelif",
    email: "amina.k@example.com",
    subject: "Urgent: Construction Issue",
    message: "We're experiencing some issues with the recent work...",
    date: "2023-05-12T16:20:00",
    status: "unread",
    type: "support",
  },
  {
    id: "msg-2",
    name: "Fatima Zahra",
    email: "fatima.z@example.com",
    subject: "Question about Renovation Services",
    message: "Hello, I have an old apartment in downtown Algiers...",
    date: "2023-05-14T14:45:00",
    status: "read",
    type: "inquiry",
  },
]

export function RecentMessages() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>
            You have {recentMessages.filter((m) => m.status === "unread").length} unread messages
          </CardDescription>
        </div>
        <Link href="/admin/messages">
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMessages.map((message) => (
            <div key={message.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">{getInitials(message.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${message.status === "unread" ? "font-bold" : ""}`}>
                    {message.name}
                  </p>
                  {message.status === "unread" && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                  <Badge variant={message.type === "support" ? "destructive" : "outline"} className="ml-auto text-xs">
                    {message.type}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{message.subject}</p>
                <p className="text-sm text-muted-foreground">{message.message}</p>
                <p className="text-xs text-muted-foreground">{formatDate(message.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
