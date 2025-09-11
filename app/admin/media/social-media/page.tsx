"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SocialMediaOverview } from "@/components/admin/social-media/overview"
import { SocialMediaContent } from "@/components/admin/social-media/content"
import { SocialMediaMessages } from "@/components/admin/social-media/messages"
import { SocialMediaAnalytics } from "@/components/admin/social-media/analytics"
import { SocialMediaScheduler } from "@/components/admin/social-media/scheduler"
import { PlusCircle, RefreshCw } from "lucide-react"

export default function SocialMediaDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Media Management</h1>
          <p className="text-muted-foreground">Manage all your social media accounts in one place</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <SocialMediaOverview />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <SocialMediaContent />
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <SocialMediaMessages />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <SocialMediaAnalytics />
        </TabsContent>

        <TabsContent value="scheduler" className="space-y-4">
          <SocialMediaScheduler />
        </TabsContent>
      </Tabs>
    </div>
  )
}
