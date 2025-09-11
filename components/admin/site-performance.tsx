"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Mock data for site performance
const pageViewsData = [
  { name: "Mon", views: 1200 },
  { name: "Tue", views: 1800 },
  { name: "Wed", views: 1600 },
  { name: "Thu", views: 2200 },
  { name: "Fri", views: 1900 },
  { name: "Sat", views: 1400 },
  { name: "Sun", views: 1300 },
]

const popularPagesData = [
  { name: "Home", views: 3500 },
  { name: "Services", views: 2100 },
  { name: "About", views: 1800 },
  { name: "Projects", views: 1500 },
  { name: "Contact", views: 1200 },
  { name: "Cost Calculator", views: 900 },
]

const deviceData = [
  { name: "Mobile", value: 58 },
  { name: "Desktop", value: 35 },
  { name: "Tablet", value: 7 },
]

export function SitePerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Performance</CardTitle>
        <CardDescription>Analytics and statistics for your website</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="traffic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="pages">Popular Pages</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pageViewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#153276" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground text-center">Daily page views for the last 7 days</div>
          </TabsContent>

          <TabsContent value="pages" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popularPagesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#153276" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground text-center">Most visited pages in the last 30 days</div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#153276"
                    label={{ position: "right", formatter: (value) => `${value}%` }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground text-center">Device usage breakdown in percentage</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
