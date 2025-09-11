"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Users,
  Plus,
  CalendarIcon,
  Clock,
  ImageIcon,
  FileText,
  Video,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for scheduled posts
const scheduledPosts = [
  {
    id: 1,
    title: "New project announcement: Downtown office renovation",
    platforms: ["Instagram", "Facebook"],
    date: "Apr 3, 2025",
    time: "10:00 AM",
    status: "scheduled",
    type: "image",
  },
  {
    id: 2,
    title: "Customer testimonial video from the Johnson residence",
    platforms: ["Facebook", "YouTube"],
    date: "Apr 4, 2025",
    time: "2:00 PM",
    status: "scheduled",
    type: "video",
  },
  {
    id: 3,
    title: "Behind the scenes: Material selection process",
    platforms: ["TikTok", "Instagram"],
    date: "Apr 5, 2025",
    time: "5:30 PM",
    status: "scheduled",
    type: "video",
  },
  {
    id: 4,
    title: "Tips for maintaining your newly renovated space",
    platforms: ["Twitter", "Facebook"],
    date: "Apr 7, 2025",
    time: "11:00 AM",
    status: "draft",
    type: "text",
  },
  {
    id: 5,
    title: "Before and after: Bathroom transformation",
    platforms: ["Instagram", "Facebook", "Pinterest"],
    date: "Apr 10, 2025",
    time: "3:00 PM",
    status: "scheduled",
    type: "image",
  },
]

// Mock data for calendar events
const calendarEvents = [
  { date: new Date(2025, 3, 3), count: 1 },
  { date: new Date(2025, 3, 4), count: 1 },
  { date: new Date(2025, 3, 5), count: 1 },
  { date: new Date(2025, 3, 7), count: 1 },
  { date: new Date(2025, 3, 10), count: 1 },
]

export function SocialMediaScheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 3))
  const [selectedPosts, setSelectedPosts] = useState<number[]>([])

  const togglePostSelection = (id: number) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter((postId) => postId !== id))
    } else {
      setSelectedPosts([...selectedPosts, id])
    }
  }

  const isAllSelected = scheduledPosts.length > 0 && selectedPosts.length === scheduledPosts.length

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(scheduledPosts.map((post) => post.id))
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Calendar View */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
          <CardDescription>Schedule and manage your posts</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              event: calendarEvents.map((event) => event.date),
            }}
            modifiersStyles={{
              event: {
                fontWeight: "bold",
                backgroundColor: "#f0f9ff",
                color: "#0369a1",
                borderBottom: "2px solid #0ea5e9",
              },
            }}
          />
        </CardContent>
        <CardFooter className="flex justify-between p-4 border-t">
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </CardFooter>
      </Card>

      {/* Scheduled Posts */}
      <Card className="md:col-span-2">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scheduled Content</CardTitle>
              <CardDescription>Manage your upcoming posts</CardDescription>
            </div>
            <Tabs defaultValue="list" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <TabsContent value="list" className="m-0">
            <div className="border-y">
              <div className="flex items-center p-4">
                <Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} className="mr-4" />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={selectedPosts.length === 0}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" disabled={selectedPosts.length === 0}>
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500" disabled={selectedPosts.length === 0}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-26rem)]">
              <div className="divide-y">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="flex items-start p-4 gap-3">
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={() => togglePostSelection(post.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{post.title}</div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Duplicate</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.platforms.map((platform) => {
                          let Icon = Instagram
                          let color = "bg-pink-500"

                          if (platform === "Facebook") {
                            Icon = Facebook
                            color = "bg-blue-600"
                          } else if (platform === "Twitter") {
                            Icon = Twitter
                            color = "bg-sky-500"
                          } else if (platform === "TikTok") {
                            Icon = Users
                            color = "bg-black"
                          } else if (platform === "YouTube") {
                            Icon = Youtube
                            color = "bg-red-600"
                          }

                          return (
                            <Badge key={platform} className={`${color} hover:${color}`}>
                              <Icon className="h-3 w-3 mr-1" />
                              {platform}
                            </Badge>
                          )
                        })}
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.time}</span>
                        </div>
                        {post.type === "image" && (
                          <div className="flex items-center gap-1">
                            <ImageIcon className="h-4 w-4" />
                            <span>Image</span>
                          </div>
                        )}
                        {post.type === "video" && (
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            <span>Video</span>
                          </div>
                        )}
                        {post.type === "text" && (
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>Text</span>
                          </div>
                        )}
                        {post.status === "scheduled" ? (
                          <Badge variant="outline" className="ml-auto bg-green-50 text-green-600 hover:bg-green-50">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Scheduled
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="ml-auto bg-yellow-50 text-yellow-600 hover:bg-yellow-50">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="calendar" className="m-0">
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              Calendar view would appear here
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}
