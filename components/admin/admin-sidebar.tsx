"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  FileText,
  Users,
  Image,
  BarChart3,
  LogOut,
  Menu,
  X,
  Share2,
} from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: Image,
    subItems: [
      {
        title: "Social Media",
        href: "/admin/media/social-media",
        icon: Share2,
      },
    ],
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  // Add a new state for tracking hover
  const [isHovered, setIsHovered] = useState(false)
  // Track expanded menu items
  const [expandedItems, setExpandedItems] = useState<string[]>(["/admin/media"])

  const toggleExpand = (href: string) => {
    if (expandedItems.includes(href)) {
      setExpandedItems(expandedItems.filter((item) => item !== href))
    } else {
      setExpandedItems([...expandedItems, href])
    }
  }

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-20 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-2 font-semibold text-lg">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>HER Admin</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                const isExpanded = expandedItems.includes(item.href)
                const hasSubItems = item.subItems && item.subItems.length > 0

                return (
                  <div key={item.href}>
                    <div className="flex items-center">
                      <Link
                        href={hasSubItems ? "#" : item.href}
                        className="flex-1"
                        onClick={(e) => {
                          if (hasSubItems) {
                            e.preventDefault()
                            toggleExpand(item.href)
                          } else {
                            setOpen(false)
                          }
                        }}
                      >
                        <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
                          <Icon className="mr-2 h-5 w-5" />
                          {item.title}
                          {hasSubItems && <span className="ml-auto">{isExpanded ? "−" : "+"}</span>}
                        </Button>
                      </Link>
                    </div>

                    {hasSubItems && isExpanded && (
                      <div className="ml-6 mt-2 space-y-2">
                        {item.subItems?.map((subItem) => {
                          const SubIcon = subItem.icon
                          const isSubActive = pathname === subItem.href

                          return (
                            <Link key={subItem.href} href={subItem.href} onClick={() => setOpen(false)}>
                              <Button variant={isSubActive ? "default" : "ghost"} className="w-full justify-start">
                                <SubIcon className="mr-2 h-5 w-5" />
                                {subItem.title}
                              </Button>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-white border-r z-30 transition-all duration-300 ${
          isHovered ? "md:w-64" : "md:w-16"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ boxShadow: isHovered ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none" }}
      >
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b overflow-hidden">
            <Link href="/admin" className="flex items-center gap-2 font-semibold text-lg">
              <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
              <span className={`transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                HER Admin
              </span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                const isExpanded = expandedItems.includes(item.href)
                const hasSubItems = item.subItems && item.subItems.length > 0

                return (
                  <div key={item.href}>
                    <div className="flex items-center">
                      <Link
                        href={hasSubItems ? "#" : item.href}
                        className="flex-1"
                        onClick={(e) => {
                          if (hasSubItems) {
                            e.preventDefault()
                            toggleExpand(item.href)
                          }
                        }}
                      >
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start transition-all duration-300 ${isHovered ? "" : "px-2"}`}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span
                            className={`ml-2 transition-opacity duration-300 ${
                              isHovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                            }`}
                          >
                            {item.title}
                          </span>
                          {hasSubItems && isHovered && <span className="ml-auto">{isExpanded ? "−" : "+"}</span>}
                        </Button>
                      </Link>
                    </div>

                    {hasSubItems && isExpanded && isHovered && (
                      <div className="ml-6 mt-2 space-y-2">
                        {item.subItems?.map((subItem) => {
                          const SubIcon = subItem.icon
                          const isSubActive = pathname === subItem.href

                          return (
                            <Link key={subItem.href} href={subItem.href}>
                              <Button variant={isSubActive ? "default" : "ghost"} className="w-full justify-start">
                                <SubIcon className="mr-2 h-5 w-5" />
                                {subItem.title}
                              </Button>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 p-4 border-t">
            <Button
              variant="ghost"
              className={`w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 ${
                isHovered ? "" : "px-2"
              }`}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span
                className={`ml-2 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                Logout
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
