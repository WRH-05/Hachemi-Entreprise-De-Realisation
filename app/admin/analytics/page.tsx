"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  RefreshCw,
} from "lucide-react"

// Mock data for analytics
const pageViewsData = [
  { name: "Mon", views: 1200, visitors: 800 },
  { name: "Tue", views: 1800, visitors: 1200 },
  { name: "Wed", views: 1600, visitors: 1000 },
  { name: "Thu", views: 2200, visitors: 1500 },
  { name: "Fri", views: 1900, visitors: 1300 },
  { name: "Sat", views: 1400, visitors: 900 },
  { name: "Sun", views: 1300, visitors: 850 },
]

const deviceData = [
  { name: "Mobile", value: 58, color: "#8884d8" },
  { name: "Desktop", value: 35, color: "#82ca9d" },
  { name: "Tablet", value: 7, color: "#ffc658" },
]

const topPagesData = [
  { page: "Homepage", views: 3500, bounce: 25 },
  { page: "Services", views: 2100, bounce: 35 },
  { page: "About", views: 1800, bounce: 40 },
  { page: "Contact", views: 1200, bounce: 20 },
  { page: "Cost Calculator", views: 900, bounce: 15 },
  { page: "Projects", views: 750, bounce: 30 },
]

const trafficSourcesData = [
  { source: "Direct", visitors: 2500, percentage: 45 },
  { source: "Google Search", visitors: 1800, percentage: 32 },
  { source: "Social Media", visitors: 800, percentage: 14 },
  { source: "Referrals", visitors: 500, percentage: 9 },
]

const monthlyData = [
  { month: "Jan", visitors: 12000, pageviews: 18000, conversions: 120 },
  { month: "Feb", visitors: 14000, pageviews: 21000, conversions: 140 },
  { month: "Mar", visitors: 16000, pageviews: 24000, conversions: 160 },
  { month: "Apr", visitors: 15000, pageviews: 22500, conversions: 150 },
  { month: "May", visitors: 18000, pageviews: 27000, conversions: 180 },
  { month: "Jun", visitors: 20000, pageviews: 30000, conversions: 200 },
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7days")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const MetricCard = ({ title, value, change, trend, icon: Icon, description }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`p-3 rounded-full ${trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
            <Icon className={`h-6 w-6 ${trend === "up" ? "text-green-600" : "text-red-600"}`} />
          </div>
        </div>
        <div className="flex items-center mt-4">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change}</span>
          <span className="text-sm text-muted-foreground ml-1">vs last period</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your website performance and user behavior</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Visitors"
          value="24,567"
          change="+12.5%"
          trend="up"
          icon={Users}
          description="Unique visitors this period"
        />
        <MetricCard
          title="Page Views"
          value="89,234"
          change="+8.2%"
          trend="up"
          icon={Eye}
          description="Total page views"
        />
        <MetricCard
          title="Avg. Session Duration"
          value="3m 24s"
          change="-2.1%"
          trend="down"
          icon={Clock}
          description="Average time on site"
        />
        <MetricCard
          title="Bounce Rate"
          value="34.2%"
          change="-5.3%"
          trend="up"
          icon={MousePointer}
          description="Single page sessions"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Daily visitors and page views</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pageViewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="views" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Visitors by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>6-month performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="pageviews" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Visitors by geographic location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "Algeria", visitors: 15420, flag: "🇩🇿" },
                    { country: "France", visitors: 3240, flag: "🇫🇷" },
                    { country: "Morocco", visitors: 1890, flag: "🇲🇦" },
                    { country: "Tunisia", visitors: 1560, flag: "🇹🇳" },
                    { country: "Canada", visitors: 980, flag: "🇨🇦" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.flag}</span>
                        <span className="font-medium">{item.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.visitors.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {((item.visitors / 24567) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Details</CardTitle>
                <CardDescription>Detailed device and browser information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: "Mobile", icon: Smartphone, users: 14248, percentage: 58 },
                    { device: "Desktop", icon: Monitor, users: 8598, percentage: 35 },
                    { device: "Tablet", icon: Tablet, users: 1721, percentage: 7 },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{item.device}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{item.users.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPagesData.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{page.page}</div>
                      <div className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{page.bounce}% bounce rate</div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${100 - page.bounce}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acquisition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>How visitors find your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSourcesData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{source.source}</div>
                        <div className="text-sm text-muted-foreground">{source.visitors.toLocaleString()} visitors</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{source.percentage}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${source.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
