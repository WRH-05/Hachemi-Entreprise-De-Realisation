import type React from "react"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

// This is a simple authentication check - in a real app, you would use a proper auth system
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This is a placeholder for actual authentication logic
  const isAuthenticated = true // In a real app, this would check session/cookies

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <AdminSidebar />
      <div className="flex-1 md:ml-16 transition-all duration-300">
        <main className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          <div className="min-h-[calc(100vh-3rem)]">{children}</div>
        </main>
      </div>
    </div>
  )
}
