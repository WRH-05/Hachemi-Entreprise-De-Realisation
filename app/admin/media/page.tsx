"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  Eye,
  ImageIcon,
  Video,
  FileText,
  Folder,
  Plus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for media files
const mediaFiles = [
  {
    id: 1,
    name: "algiers-sunset.jpg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadDate: "2024-01-15",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1221185618-612x612.jpg-xr3qR0w0plqKGkNSHFYlUp0sW8Hkll.jpeg",
    folder: "projects",
  },
  {
    id: 2,
    name: "mosque-coastline.jpg",
    type: "image",
    size: "1.8 MB",
    dimensions: "1600x900",
    uploadDate: "2024-01-14",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1783208765-612x612.jpg-0eQ246c3K3RiDl0EumEUxhajKOOPh1.jpeg",
    folder: "projects",
  },
  {
    id: 3,
    name: "construction-video.mp4",
    type: "video",
    size: "45.2 MB",
    duration: "2:34",
    uploadDate: "2024-01-12",
    url: "/placeholder.svg?height=200&width=300",
    folder: "videos",
  },
  {
    id: 4,
    name: "project-proposal.pdf",
    type: "document",
    size: "890 KB",
    pages: "12",
    uploadDate: "2024-01-10",
    url: "/placeholder.svg?height=200&width=150",
    folder: "documents",
  },
]

const folders = [
  { name: "projects", count: 24, type: "folder" },
  { name: "videos", count: 8, type: "folder" },
  { name: "documents", count: 15, type: "folder" },
  { name: "logos", count: 6, type: "folder" },
]

export default function MediaManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFolder = selectedFolder === "all" || file.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "document":
        return FileText
      default:
        return FileText
    }
  }

  const formatFileSize = (size: string) => {
    return size
  }

  const toggleFileSelection = (id: number) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id))
    } else {
      setSelectedFiles([...selectedFiles, id])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your images, videos, and documents</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Images</p>
                <p className="text-2xl font-bold">{mediaFiles.filter((f) => f.type === "image").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold">{mediaFiles.filter((f) => f.type === "video").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">{mediaFiles.filter((f) => f.type === "document").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Folder className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Folders</p>
                <p className="text-2xl font-bold">{folders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Media Files</CardTitle>
              <CardDescription>Browse and manage your media library</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search files..."
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Folders</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.name} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="files" className="w-full">
            <TabsList>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="mt-6">
              {selectedFiles.length > 0 && (
                <div className="mb-4 p-3 bg-muted rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium">{selectedFiles.length} files selected</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredFiles.map((file) => {
                    const Icon = getFileIcon(file.type)
                    return (
                      <div
                        key={file.id}
                        className={`group relative border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${
                          selectedFiles.includes(file.id) ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => toggleFileSelection(file.id)}
                      >
                        <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2">
                          {file.type === "image" ? (
                            <img
                              src={file.url || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <Icon className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                          <Badge variant="outline" className="text-xs">
                            {file.type}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFiles.map((file) => {
                    const Icon = getFileIcon(file.type)
                    return (
                      <div
                        key={file.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedFiles.includes(file.id) ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => toggleFileSelection(file.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>{file.uploadDate}</span>
                              <Badge variant="outline" className="text-xs">
                                {file.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )
                  })}
                </div>
              )}

              {filteredFiles.length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">No files found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm ? "Try a different search term" : "Upload some files to get started"}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="folders" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {folders.map((folder) => (
                  <div
                    key={folder.name}
                    className="group border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
                    onClick={() => setSelectedFolder(folder.name)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Folder className="h-12 w-12 text-blue-500 mb-2" />
                      <p className="font-medium">{folder.name}</p>
                      <p className="text-xs text-muted-foreground">{folder.count} files</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
