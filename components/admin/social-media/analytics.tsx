"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react"

export function SocialMediaAnalytics() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Select defaultValue="30days">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Total Followers" value="48.8K" change="+2.4%" trend="up" icon={Users} />
              <MetricCard title="Engagement Rate" value="3.2%" change="+0.8%" trend="up" icon={BarChart3} />
              <MetricCard title="Impressions" value="124.5K" change="-1.2%" trend="down" icon={LineChart} />
              <MetricCard title="Click-through Rate" value="2.8%" change="+0.5%" trend="up" icon={PieChart} />
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Follower Growth</CardTitle>
                  <CardDescription>Follower count across all platforms</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">[Line chart visualization would appear here]</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement by Platform</CardTitle>
                  <CardDescription>Likes, comments, and shares</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">[Bar chart visualization would appear here]</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Platforms</CardTitle>
                  <CardDescription>By engagement rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <PlatformPerformance platform="TikTok" icon={Users} color="bg-black" value="4.7%" change="+1.2%" />
                    <PlatformPerformance
                      platform="Instagram"
                      icon={Instagram}
                      color="bg-pink-500"
                      value="3.2%"
                      change="+0.5%"
                    />
                    <PlatformPerformance
                      platform="Facebook"
                      icon={Facebook}
                      color="bg-blue-600"
                      value="2.8%"
                      change="-0.3%"
                    />
                    <PlatformPerformance
                      platform="Twitter"
                      icon={Twitter}
                      color="bg-sky-500"
                      value="2.1%"
                      change="+0.2%"
                    />
                    <PlatformPerformance
                      platform="YouTube"
                      icon={Youtube}
                      color="bg-red-600"
                      value="1.9%"
                      change="+0.4%"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>Top performing posts by engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ContentPerformance
                      platform="TikTok"
                      icon={Users}
                      color="bg-black"
                      content="Time-lapse of our latest commercial project"
                      engagement="5.8%"
                      views="24.3K"
                    />
                    <ContentPerformance
                      platform="Instagram"
                      icon={Instagram}
                      color="bg-pink-500"
                      content="New kitchen renovation project completed!"
                      engagement="4.2%"
                      views="12.7K"
                    />
                    <ContentPerformance
                      platform="YouTube"
                      icon={Youtube}
                      color="bg-red-600"
                      content="How to choose the right materials for your home renovation"
                      engagement="3.9%"
                      views="8.5K"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement">
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              Detailed engagement analytics would appear here
            </div>
          </TabsContent>

          <TabsContent value="audience">
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              Audience demographics and insights would appear here
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              Content performance analytics would appear here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MetricCard({ title, value, change, trend, icon: Icon }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="text-2xl font-bold">{value}</div>
          </div>
          <div className={`p-2 rounded-full ${trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
            <Icon className={`h-5 w-5 ${trend === "up" ? "text-green-500" : "text-red-500"}`} />
          </div>
        </div>
        <div className="flex items-center mt-2">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {change} from last period
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function PlatformPerformance({ platform, icon: Icon, color, value, change }: any) {
  const isPositive = !change.startsWith("-")

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${color} text-white`}>
          <Icon className="h-4 w-4" />
        </div>
        <span>{platform}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">{value}</span>
        <span className={isPositive ? "text-green-500" : "text-red-500"}>{change}</span>
      </div>
    </div>
  )
}

function ContentPerformance({ platform, icon: Icon, color, content, engagement, views }: any) {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg">
      <div className={`p-2 rounded-full ${color} text-white shrink-0`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium">{platform}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{views} views</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{engagement} engagement</span>
          </div>
        </div>
        <p className="text-sm mt-1 truncate">{content}</p>
      </div>
    </div>
  )
}
