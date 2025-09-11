"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Save, RefreshCw, Edit, Eye, Plus, Trash2, ImageIcon, Globe, Search, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for content
const contentPages = [
  {
    id: 1,
    title: "Homepage Hero Section",
    type: "hero",
    status: "published",
    lastModified: "2 hours ago",
    language: "en",
    content: "Professional Construction Services in Algeria",
  },
  {
    id: 2,
    title: "About Us Page",
    type: "page",
    status: "published",
    lastModified: "1 day ago",
    language: "en",
    content: "Learn about our 15+ years of construction experience...",
  },
  {
    id: 3,
    title: "Services Overview",
    type: "section",
    status: "draft",
    lastModified: "3 days ago",
    language: "fr",
    content: "Nos services de construction professionnels...",
  },
  {
    id: 4,
    title: "Project Gallery",
    type: "gallery",
    status: "published",
    lastModified: "1 week ago",
    language: "ar",
    content: "معرض مشاريعنا المكتملة",
  },
]

const contentTypes = [
  { value: "page", label: "Page" },
  { value: "hero", label: "Hero Section" },
  { value: "section", label: "Section" },
  { value: "gallery", label: "Gallery" },
  { value: "testimonial", label: "Testimonial" },
]

export default function ContentManagement() {
  const [selectedContent, setSelectedContent] = useState(contentPages[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [saving, setSaving] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
    }, 1000)
  }

  const filteredContent = contentPages.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className={`space-y-6 ${isDarkMode ? "dark" : ""}`}>
      {/* Header with Dark Mode Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage your website content across all pages</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save All Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Content List Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Content Pages</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              {filteredContent.map((content) => (
                <div
                  key={content.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedContent.id === content.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{content.title}</h3>
                      <p className="text-sm text-muted-foreground truncate mt-1">{content.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={content.status === "published" ? "default" : "secondary"}>
                          {content.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {content.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {content.language}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{content.lastModified}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Editor */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Edit Content</CardTitle>
                <CardDescription>Modify content for {selectedContent.title}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Globe className="mr-2 h-4 w-4" />
                      Translate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" defaultValue={selectedContent.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input id="slug" defaultValue={selectedContent.title.toLowerCase().replace(/\s+/g, "-")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    defaultValue={selectedContent.content}
                    rows={12}
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="Enter your content here..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Content Type</Label>
                    <Select defaultValue={selectedContent.type}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue={selectedContent.language}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={selectedContent.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input id="meta-title" placeholder="SEO optimized title" />
                  <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea id="meta-description" rows={3} placeholder="Brief description for search engines" />
                  <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input id="keywords" placeholder="construction, algeria, building, renovation" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canonical">Canonical URL</Label>
                  <Input id="canonical" placeholder="https://her-construction.dz/page" />
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-2 text-sm font-medium">No media uploaded</h3>
                    <p className="text-sm text-muted-foreground">Upload images, videos, or documents</p>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Media
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Featured Content</Label>
                      <p className="text-sm text-muted-foreground">Show this content prominently on the homepage</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Comments</Label>
                      <p className="text-sm text-muted-foreground">Enable user comments for this content</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Search Engine Indexing</Label>
                      <p className="text-sm text-muted-foreground">Allow search engines to index this page</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publish-date">Publish Date</Label>
                    <Input id="publish-date" type="datetime-local" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Select defaultValue="admin">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin User</SelectItem>
                        <SelectItem value="editor">Content Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
