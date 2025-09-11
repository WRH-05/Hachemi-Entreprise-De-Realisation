"use client"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Instagram, Facebook, Twitter, Youtube, TrendingUp, MessageSquare, Heart, Share2, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for social media accounts
const socialAccounts = [
  {
    platform: "Instagram",
    handle: "@herconstructionco",
    followers: "12.4K",
    engagement: 3.2,
    growth: 2.1,
    icon: Instagram,
    color: "bg-pink-500",
    lightColor: "bg-pink-100",
  },
  {
    platform: "Facebook",
    handle: "HER Construction",
    followers: "8.7K",
    engagement: 2.8,
    growth: 1.5,
    icon: Facebook,
    color: "bg-blue-600",
    lightColor: "bg-blue-100",
  },
  {
    platform: "Twitter",
    handle: "@HERConstruction",
    followers: "5.2K",
    engagement: 2.1,
    growth: 0.8,
    icon: Twitter,
    color: "bg-sky-500",
    lightColor: "bg-sky-100",
  },
  {
    platform: "TikTok",
    handle: "@herconstructionco",
    followers: "18.9K",
    engagement: 4.7,
    growth: 5.3,
    icon: Users, // Using Users as a placeholder for TikTok
    color: "bg-black",
    lightColor: "bg-gray-100",
  },
  {
    platform: "YouTube",
    handle: "HER Construction",
    followers: "3.6K",
    engagement: 1.9,
    growth: 1.2,
    icon: Youtube,
    color: "bg-red-600",
    lightColor: "bg-red-100",
  },
]

// Mock data for recent activities
const recentActivities = [
  {
    platform: "Instagram",
    type: "post",
    content: "New kitchen renovation project completed!",
    engagement: { likes: 342, comments: 28, shares: 15 },
    time: "2 hours ago",
    icon: Instagram,
    color: "bg-pink-500",
  },
  {
    platform: "Facebook",
    type: "message",
    content: "Customer inquiry about bathroom remodeling",
    time: "4 hours ago",
    icon: Facebook,
    color: "bg-blue-600",
  },
  {
    platform: "TikTok",
    type: "post",
    content: "Time-lapse of our latest commercial project",
    engagement: { likes: 1204, comments: 87, shares: 215 },
    time: "1 day ago",
    icon: Users,
    color: "bg-black",
  },
  {
    platform: "YouTube",
    type: "comment",
    content: "Great video! How long did this project take?",
    time: "2 days ago",
    icon: Youtube,
    color: "bg-red-600",
  },
]

export function SocialMediaOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Account Summary Cards */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>Overview of all your social media accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {socialAccounts.map((account) => {
              const Icon = account.icon
              return (
                <div key={account.platform} className="flex flex-col p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-full ${account.lightColor}`}>
                      <Icon className={`h-5 w-5 text-${account.color.split("-")[1]}-500`} />
                    </div>
                    <span className="font-medium">{account.platform}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{account.followers}</div>
                  <div className="text-sm text-muted-foreground mb-3">{account.handle}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">{account.growth}%</span>
                    <span className="text-muted-foreground ml-1">this week</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement</span>
                      <span>{account.engagement}%</span>
                    </div>
                    <Progress value={account.engagement * 10} className="h-1" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest posts, comments, and messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg border">
                  <div className={`p-2 rounded-full ${activity.color} text-white shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.platform}</span>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto">{activity.time}</span>
                    </div>
                    <p className="text-sm mt-1 truncate">{activity.content}</p>
                    {activity.engagement && (
                      <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{activity.engagement.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{activity.engagement.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          <span>{activity.engagement.shares}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
          <CardDescription>Scheduled content for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <Badge className="bg-pink-500">Instagram</Badge>
                <span className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</span>
              </div>
              <p className="text-sm mt-2">New project announcement: Downtown office renovation</p>
            </div>
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-600">Facebook</Badge>
                <span className="text-xs text-muted-foreground">Apr 4, 2:00 PM</span>
              </div>
              <p className="text-sm mt-2">Customer testimonial video from the Johnson residence</p>
            </div>
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <Badge className="bg-black">TikTok</Badge>
                <span className="text-xs text-muted-foreground">Apr 5, 5:30 PM</span>
              </div>
              <p className="text-sm mt-2">Behind the scenes: Material selection process</p>
            </div>
            <Button variant="outline" className="w-full text-sm">
              View All Scheduled Posts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
