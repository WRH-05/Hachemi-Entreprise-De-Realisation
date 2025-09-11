"use client"

import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="rounded-full h-14 w-14 bg-gradient-to-r from-primary to-primary/90 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl relative group"
          >
            <Phone className="h-6 w-6 group-hover:scale-90 transition-transform duration-300" />
            <span className="sr-only">Contact options</span>
            <span className="absolute inset-0 rounded-full animate-pulse bg-primary/20" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => (window.location.href = "tel:+1234567890")}>
            <Phone className="mr-2 h-4 w-4" />
            <span>Call Us</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => (window.location.href = "https://wa.me/1234567890")}>
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>WhatsApp</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
