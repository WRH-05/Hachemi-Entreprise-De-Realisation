"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentMessages } from "@/components/admin/recent-messages"
import { RecentActivity } from "@/components/admin/recent-activity"
import { SitePerformance } from "@/components/admin/site-performance"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <AdminStats />

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Recent Messages</TabsTrigger>
          <TabsTrigger value="activity">Site Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="messages" className="space-y-4">
          <RecentMessages />
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <RecentActivity />
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <SitePerformance />
        </TabsContent>
      </Tabs>
    </div>
  )
}
