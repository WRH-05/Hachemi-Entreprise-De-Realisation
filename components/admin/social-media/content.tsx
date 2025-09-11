"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  Filter,
  Search,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for posts
const posts = [
  {
    id: 1,
    platform: "Instagram",
    type: "image",
    content: "Check out our latest kitchen renovation project! #HomeImprovement #Construction",
    image: "/placeholder.svg?height=300&width=300",
    date: "Mar 30, 2025",
    stats: { likes: 342, comments: 28, shares: 15 },
    icon: Instagram,
    color: "bg-pink-500",
  },
  {
    id: 2,
    platform: "Facebook",
    type: "video",
    content: "We're excited to share this time-lapse of our commercial building project from start to finish!",
    image: "/placeholder.svg?height=300&width=300",
    date: "Mar 28, 2025",
    stats: { likes: 187, comments: 42, shares: 23 },
    icon: Facebook,
    color: "bg-blue-600",
  },
  {
    id: 3,
    platform: "TikTok",
    type: "video",
    content: "Construction hacks you didn't know you needed! #ConstructionTips #BuildingHacks",
    image: "/placeholder.svg?height=300&width=300",
    date: "Mar 25, 2025",
    stats: { likes: 1204, comments: 87, shares: 215 },
    icon: Users,
    color: "bg-black",
  },
  {
    id: 4,
    platform: "YouTube",
    type: "video",
    content: "How to choose the right materials for your home renovation project - A complete guide",
    image: "/placeholder.svg?height=300&width=300",
    date: "Mar 22, 2025",
    stats: { likes: 156, comments: 32, shares: 18 },
    icon: Youtube,
    color: "bg-red-600",
  },
  {
    id: 5,
    platform: "Twitter",
    type: "text",
    content:
      "Excited to announce we've been awarded 'Best Construction Company' in the regional business awards! #Achievement #Construction",
    date: "Mar 20, 2025",
    stats: { likes: 89, comments: 12, shares: 34 },
    icon: Twitter,
    color: "bg-sky-500",
  },
]

export function SocialMediaContent() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Manage all your social media posts across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Platform</DropdownMenuItem>
                    <DropdownMenuItem>Content Type</DropdownMenuItem>
                    <DropdownMenuItem>Date Range</DropdownMenuItem>
                    <DropdownMenuItem>Performance</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Create Post</Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>

            <TabsContent value="published" className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              <div className="flex items-center justify-center p-8 text-muted-foreground">No scheduled posts found</div>
            </TabsContent>

            <TabsContent value="drafts" className="space-y-4">
              <div className="flex items-center justify-center p-8 text-muted-foreground">No draft posts found</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function PostCard({ post }: { post: any }) {
  const Icon = post.icon

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {post.image && (
            <div className="md:w-1/4 lg:w-1/5">
              <img
                src={post.image || "/placeholder.svg"}
                alt={`Post on ${post.platform}`}
                className="rounded-md w-full h-auto object-cover aspect-square"
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${post.color} text-white`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">{post.platform}</span>
                <Badge variant="outline" className="ml-2">
                  {post.type}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <p className="text-sm mb-3">{post.content}</p>

            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.stats?.likes || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.stats?.comments || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>{post.stats?.shares || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
