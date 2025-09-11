"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram, Facebook, Twitter, Search, Filter, CheckCircle2, Clock, AlertCircle, Send } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for messages
const messages = [
  {
    id: 1,
    platform: "Instagram",
    sender: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@sarahjohnson",
    },
    content:
      "Hi there! I'm interested in getting a quote for a kitchen renovation. Do you have any availability in the next month?",
    time: "2 hours ago",
    status: "unread",
    icon: Instagram,
    color: "bg-pink-500",
  },
  {
    id: 2,
    platform: "Facebook",
    sender: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "Michael Chen",
    },
    content:
      "Your recent bathroom remodel looks amazing! I'd like to know more about the materials you used for the shower.",
    time: "Yesterday",
    status: "replied",
    icon: Facebook,
    color: "bg-blue-600",
  },
  {
    id: 3,
    platform: "Twitter",
    sender: {
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@alexrivera",
    },
    content: "Do you offer commercial construction services? We're looking to renovate our office space.",
    time: "2 days ago",
    status: "pending",
    icon: Twitter,
    color: "bg-sky-500",
  },
  {
    id: 4,
    platform: "Instagram",
    sender: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@emilywilson",
    },
    content:
      "I saw your post about sustainable building materials. Can you tell me more about the eco-friendly options you offer?",
    time: "3 days ago",
    status: "replied",
    icon: Instagram,
    color: "bg-pink-500",
  },
  {
    id: 5,
    platform: "Facebook",
    sender: {
      name: "David Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "David Thompson",
    },
    content:
      "Great work on the Smith residence! I'm looking for something similar for my home. What's the best way to schedule a consultation?",
    time: "1 week ago",
    status: "replied",
    icon: Facebook,
    color: "bg-blue-600",
  },
]

// Mock conversation data
const conversation = [
  {
    id: 1,
    sender: "customer",
    content:
      "Hi there! I'm interested in getting a quote for a kitchen renovation. Do you have any availability in the next month?",
    time: "2 hours ago",
  },
  {
    id: 2,
    sender: "company",
    content:
      "Hello Sarah! Thank you for reaching out. We'd be happy to provide a quote for your kitchen renovation. We do have availability next month. Could you please provide some details about your project?",
    time: "1 hour ago",
  },
  {
    id: 3,
    sender: "customer",
    content:
      "Great! I have a medium-sized kitchen, about 200 sq ft. I'm looking to replace the cabinets, countertops, and flooring. I'd also like to add an island if possible.",
    time: "45 minutes ago",
  },
]

export function SocialMediaMessages() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0])
  const [replyText, setReplyText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSendReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send the reply to the API
      console.log("Sending reply:", replyText)
      setReplyText("")
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Messages List */}
      <Card className="md:col-span-1">
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Messages</CardTitle>
          <CardDescription>Manage customer inquiries across platforms</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-4 py-2 border-y">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                All
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Unread
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Flagged
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Platform</DropdownMenuItem>
                <DropdownMenuItem>Date</DropdownMenuItem>
                <DropdownMenuItem>Status</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ScrollArea className="h-[calc(100vh-22rem)]">
            {messages.map((message) => {
              const Icon = message.icon

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage.id === message.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className={`p-2 rounded-full ${message.color} text-white shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{message.sender.name}</span>
                      <div className="flex items-center gap-1">
                        {message.status === "unread" && <Badge className="bg-blue-500">New</Badge>}
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">{message.sender.username}</div>
                    <p className="text-sm truncate">{message.content}</p>
                  </div>
                </div>
              )
            })}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Conversation View */}
      <Card className="md:col-span-2">
        <CardHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedMessage.sender.avatar} alt={selectedMessage.sender.name} />
                <AvatarFallback>{selectedMessage.sender.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedMessage.sender.name}</CardTitle>
                <CardDescription>{selectedMessage.sender.username}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${selectedMessage.color} hover:${selectedMessage.color}`}>
                {selectedMessage.platform}
              </Badge>
              {selectedMessage.status === "unread" && (
                <Badge variant="outline" className="bg-blue-50 text-blue-500 hover:bg-blue-50">
                  <Clock className="h-3 w-3 mr-1" />
                  Unread
                </Badge>
              )}
              {selectedMessage.status === "replied" && (
                <Badge variant="outline" className="bg-green-50 text-green-500 hover:bg-green-50">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Replied
                </Badge>
              )}
              {selectedMessage.status === "pending" && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-500 hover:bg-yellow-50">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-26rem)]">
            <div className="p-4 space-y-4">
              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "company" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "company" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "company" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your reply..."
                className="min-h-[80px]"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Templates
                </Button>
                <Button variant="outline" size="sm">
                  Attach
                </Button>
              </div>
              <Button size="sm" onClick={handleSendReply} disabled={!replyText.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
