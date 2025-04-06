"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Share2, ImageIcon, FileVideo, FileText, FolderOpen, Upload, PlusCircle } from "lucide-react"

export default function MediaDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Management</h1>
          <p className="text-muted-foreground">Manage all your media assets in one place</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/media/social-media">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-blue-500" />
                Social Media
              </CardTitle>
              <CardDescription>Manage all your social media accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Schedule posts, respond to messages, and track performance across all your social platforms.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto">
                Manage
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-green-500" />
              Images
            </CardTitle>
            <CardDescription>Manage your image library</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upload, organize, and optimize images for your website and marketing materials.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto">
              Manage
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileVideo className="h-5 w-5 text-red-500" />
              Videos
            </CardTitle>
            <CardDescription>Manage your video content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upload, organize, and share videos of your construction projects and testimonials.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto">
              Manage
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-yellow-500" />
              Documents
            </CardTitle>
            <CardDescription>Manage your document library</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Store and organize important documents like contracts, proposals, and specifications.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto">
              Manage
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-purple-500" />
              Project Assets
            </CardTitle>
            <CardDescription>Manage assets by project</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Organize media assets by project for easy access and management.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto">
              Manage
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

