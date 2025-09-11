"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Mail, CheckCircle, AlertCircle, Trash2, Star, StarOff, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageDetail } from "@/components/admin/message-detail"

// Mock data for messages
const mockMessages = [
  {
    id: "msg-1",
    name: "Ahmed Benali",
    email: "ahmed.benali@example.com",
    subject: "Quote Request for Villa Construction",
    message:
      "I'm interested in building a villa in Algiers. The land area is approximately 500 square meters. I would like to know your pricing and timeline for such a project.",
    date: "2023-05-15T10:30:00",
    status: "unread",
    type: "quote",
    phone: "+213 555 123 456",
  },
  {
    id: "msg-2",
    name: "Fatima Zahra",
    email: "fatima.z@example.com",
    subject: "Question about Renovation Services",
    message:
      "Hello, I have an old apartment in downtown Algiers that needs complete renovation. Do you provide such services? What would be the approximate cost per square meter?",
    date: "2023-05-14T14:45:00",
    status: "read",
    type: "inquiry",
    phone: "+213 555 789 012",
  },
  {
    id: "msg-3",
    name: "Karim Hadj",
    email: "karim.hadj@example.com",
    subject: "Commercial Building Project",
    message:
      "Our company is planning to build a new office in the business district. We need a reliable construction company. Can you provide your portfolio of similar projects?",
    date: "2023-05-13T09:15:00",
    status: "read",
    type: "quote",
    phone: "+213 555 345 678",
    starred: true,
  },
  {
    id: "msg-4",
    name: "Amina Khelif",
    email: "amina.k@example.com",
    subject: "Urgent: Construction Issue",
    message:
      "We're experiencing some issues with the recent work done on our property. There are cracks appearing in the walls. Can someone come inspect it as soon as possible?",
    date: "2023-05-12T16:20:00",
    status: "unread",
    type: "support",
    phone: "+213 555 901 234",
    starred: true,
  },
  {
    id: "msg-5",
    name: "Mohammed Larbi",
    email: "m.larbi@example.com",
    subject: "Partnership Opportunity",
    message:
      "I represent a building materials supplier and would like to discuss a potential partnership with your company. Please let me know when we can schedule a meeting.",
    date: "2023-05-11T11:05:00",
    status: "read",
    type: "business",
    phone: "+213 555 567 890",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const markAsRead = (id: string) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg)))
  }

  const toggleStarred = (id: string) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, starred: !msg.starred } : msg)))
  }

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id))
    if (selectedMessage === id) {
      setSelectedMessage(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Message Management</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-2 mt-2">
              {filteredMessages.map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer ${selectedMessage === message.id ? "border-primary" : ""} ${message.status === "unread" ? "bg-primary/5" : ""}`}
                  onClick={() => {
                    setSelectedMessage(message.id)
                    if (message.status === "unread") {
                      markAsRead(message.id)
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3
                            className={`text-sm font-medium truncate ${message.status === "unread" ? "font-bold" : ""}`}
                          >
                            {message.name}
                          </h3>
                          {message.status === "unread" && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{message.email}</p>
                        <p className="text-sm font-medium mt-1 truncate">{message.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{message.message}</p>
                        <div className="flex items-center mt-2">
                          <Badge variant={message.type === "support" ? "destructive" : "outline"} className="text-xs">
                            {message.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-2">{formatDate(message.date)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleStarred(message.id)
                          }}
                        >
                          {message.starred ? (
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => markAsRead(message.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Mark as read</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleStarred(message.id)}>
                              {message.starred ? (
                                <>
                                  <StarOff className="mr-2 h-4 w-4" />
                                  <span>Remove star</span>
                                </>
                              ) : (
                                <>
                                  <Star className="mr-2 h-4 w-4" />
                                  <span>Star message</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteMessage(message.id)
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredMessages.length === 0 && (
                <div className="text-center py-8">
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">No messages found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm ? "Try a different search term" : "You have no messages yet"}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-2 mt-2">
              {filteredMessages
                .filter((m) => m.status === "unread")
                .map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer ${selectedMessage === message.id ? "border-primary" : ""} bg-primary/5`}
                    onClick={() => {
                      setSelectedMessage(message.id)
                      markAsRead(message.id)
                    }}
                  >
                    {/* Same card content as above */}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3 className="text-sm font-bold truncate">{message.name}</h3>
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{message.email}</p>
                          <p className="text-sm font-medium mt-1 truncate">{message.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{message.message}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant={message.type === "support" ? "destructive" : "outline"} className="text-xs">
                              {message.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">{formatDate(message.date)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center space-y-1 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStarred(message.id)
                            }}
                          >
                            {message.starred ? (
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => markAsRead(message.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as read</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleStarred(message.id)}>
                                {message.starred ? (
                                  <>
                                    <StarOff className="mr-2 h-4 w-4" />
                                    <span>Remove star</span>
                                  </>
                                ) : (
                                  <>
                                    <Star className="mr-2 h-4 w-4" />
                                    <span>Star message</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteMessage(message.id)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {filteredMessages.filter((m) => m.status === "unread").length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">No unread messages</h3>
                  <p className="text-sm text-muted-foreground">You've read all your messages</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="starred" className="space-y-2 mt-2">
              {filteredMessages
                .filter((m) => m.starred)
                .map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer ${selectedMessage === message.id ? "border-primary" : ""} ${message.status === "unread" ? "bg-primary/5" : ""}`}
                    onClick={() => {
                      setSelectedMessage(message.id)
                      if (message.status === "unread") {
                        markAsRead(message.id)
                      }
                    }}
                  >
                    {/* Same card content as above */}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3
                              className={`text-sm font-medium truncate ${message.status === "unread" ? "font-bold" : ""}`}
                            >
                              {message.name}
                            </h3>
                            {message.status === "unread" && (
                              <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{message.email}</p>
                          <p className="text-sm font-medium mt-1 truncate">{message.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{message.message}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant={message.type === "support" ? "destructive" : "outline"} className="text-xs">
                              {message.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">{formatDate(message.date)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center space-y-1 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStarred(message.id)
                            }}
                          >
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => markAsRead(message.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as read</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleStarred(message.id)}>
                                <StarOff className="mr-2 h-4 w-4" />
                                <span>Remove star</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteMessage(message.id)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {filteredMessages.filter((m) => m.starred).length === 0 && (
                <div className="text-center py-8">
                  <Star className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">No starred messages</h3>
                  <p className="text-sm text-muted-foreground">Star important messages to find them quickly</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="support" className="space-y-2 mt-2">
              {filteredMessages
                .filter((m) => m.type === "support")
                .map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer ${selectedMessage === message.id ? "border-primary" : ""} ${message.status === "unread" ? "bg-primary/5" : ""}`}
                    onClick={() => {
                      setSelectedMessage(message.id)
                      if (message.status === "unread") {
                        markAsRead(message.id)
                      }
                    }}
                  >
                    {/* Same card content as above */}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3
                              className={`text-sm font-medium truncate ${message.status === "unread" ? "font-bold" : ""}`}
                            >
                              {message.name}
                            </h3>
                            {message.status === "unread" && (
                              <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{message.email}</p>
                          <p className="text-sm font-medium mt-1 truncate">{message.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{message.message}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant="destructive" className="text-xs">
                              {message.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">{formatDate(message.date)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center space-y-1 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStarred(message.id)
                            }}
                          >
                            {message.starred ? (
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => markAsRead(message.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as read</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleStarred(message.id)}>
                                {message.starred ? (
                                  <>
                                    <StarOff className="mr-2 h-4 w-4" />
                                    <span>Remove star</span>
                                  </>
                                ) : (
                                  <>
                                    <Star className="mr-2 h-4 w-4" />
                                    <span>Star message</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteMessage(message.id)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {filteredMessages.filter((m) => m.type === "support").length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">No support messages</h3>
                  <p className="text-sm text-muted-foreground">There are no support requests at the moment</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-2">
          {selectedMessage ? (
            <MessageDetail
              message={messages.find((m) => m.id === selectedMessage)!}
              onClose={() => setSelectedMessage(null)}
              onDelete={() => deleteMessage(selectedMessage)}
              onToggleStar={() => toggleStarred(selectedMessage)}
            />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-10">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">Select a message</h3>
                <p className="text-sm text-muted-foreground mt-1">Choose a message from the list to view its details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
