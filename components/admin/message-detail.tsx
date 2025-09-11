"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Star, StarOff, Trash2, Reply, Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"

interface MessageDetailProps {
  message: {
    id: string
    name: string
    email: string
    subject: string
    message: string
    date: string
    status: string
    type: string
    phone?: string
    starred?: boolean
  }
  onClose: () => void
  onDelete: () => void
  onToggleStar: () => void
}

export function MessageDetail({ message, onClose, onDelete, onToggleStar }: MessageDetailProps) {
  const [replyText, setReplyText] = useState("")
  const [isSending, setIsSending] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleSendReply = () => {
    if (!replyText.trim()) return

    setIsSending(true)
    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      setReplyText("")
      // In a real app, you would send the reply to the backend
      alert(`Reply sent to ${message.email}`)
    }, 1000)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">{message.subject}</CardTitle>
          <Badge variant={message.type === "support" ? "destructive" : "outline"}>{message.type}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleStar}>
            {message.starred ? (
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ) : (
              <StarOff className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">From:</span>
              <span>
                {message.name} &lt;{message.email}&gt;
              </span>
            </div>
            {message.phone && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Phone:</span>
                <span>{message.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Date:</span>
              <span>{formatDate(message.date)}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="whitespace-pre-line">{message.message}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-2">Reply</h3>
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
              rows={6}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href={`tel:${message.phone}`} className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${message.email}`} className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
          <Button onClick={handleSendReply} disabled={!replyText.trim() || isSending}>
            {isSending ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Reply className="mr-2 h-4 w-4" />
                Send Reply
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
