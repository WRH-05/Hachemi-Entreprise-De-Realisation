"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, RefreshCw, Upload, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Update your site's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="HER - Hachemi Entreprise de Réalisation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input id="site-url" defaultValue="https://her-construction.dz" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Professional construction services for building, renovation, and demolition projects in Algeria."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="hachemibat@gmail.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input id="phone-number" defaultValue="+213550568438" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" defaultValue="https://facebook.com/her.construction" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" defaultValue="https://instagram.com/her.construction" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" defaultValue="https://twitter.com/her_construction" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" defaultValue="https://linkedin.com/company/her-construction" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo & Favicon</CardTitle>
              <CardDescription>Customize your site's visual identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Site Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-white">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250201_182835-I5a1G28cVNVnfNTs1J9lLzJH0wql2n.webp"
                      alt="Current logo"
                      className="max-w-full max-h-full p-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Logo
                    </Button>
                    <p className="text-xs text-muted-foreground">Recommended size: 200x80px. Max file size: 2MB.</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border rounded-md flex items-center justify-center bg-white">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-YJnXXXXXXXXXXXXXXXXXXXXXXXXXXX.ico"
                      alt="Current favicon"
                      className="max-w-full max-h-full p-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Favicon
                    </Button>
                    <p className="text-xs text-muted-foreground">Recommended size: 32x32px. Max file size: 1MB.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input id="primary-color" defaultValue="#153276" />
                    <div className="w-10 h-10 rounded-md bg-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input id="secondary-color" defaultValue="#FEFFF9" />
                    <div className="w-10 h-10 rounded-md bg-secondary border" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure when and how you receive email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-message">New Message Notification</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when a new message is submitted through the contact form
                    </p>
                  </div>
                  <Switch id="new-message" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="quote-request">Quote Request Notification</Label>
                    <p className="text-sm text-muted-foreground">Receive an email when someone requests a quote</p>
                  </div>
                  <Switch id="quote-request" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-summary">Daily Summary</Label>
                    <p className="text-sm text-muted-foreground">Receive a daily summary of all website activities</p>
                  </div>
                  <Switch id="daily-summary" />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input id="notification-email" type="email" defaultValue="admin@her-construction.dz" />
                <p className="text-xs text-muted-foreground">All notifications will be sent to this email address</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automated Responses</CardTitle>
              <CardDescription>Configure automatic email responses to user inquiries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-reply">Auto-Reply to Contact Form</Label>
                  <p className="text-sm text-muted-foreground">
                    Send an automatic confirmation email when someone submits the contact form
                  </p>
                </div>
                <Switch id="auto-reply" defaultChecked />
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="auto-reply-subject">Auto-Reply Subject</Label>
                <Input id="auto-reply-subject" defaultValue="Thank you for contacting HER Construction" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="auto-reply-message">Auto-Reply Message</Label>
                <Textarea
                  id="auto-reply-message"
                  rows={5}
                  defaultValue="Dear {name},

Thank you for contacting Hachemi Entreprise de Réalisation. We have received your message and will get back to you within 24-48 hours.

Best regards,
The HER Team"
                />
                <p className="text-xs text-muted-foreground">
                  Use {"{name}"} to include the sender's name in the message
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>Manage administrator accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@her-construction.dz" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
              </div>

              <Button variant="outline" className="mt-2">
                Change Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require a verification code in addition to your password when logging in
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Automatically log out after a period of inactivity</p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger id="session-timeout" className="w-[180px]">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="login-attempts">Failed Login Attempts</Label>
                  <p className="text-sm text-muted-foreground">Lock account after multiple failed login attempts</p>
                </div>
                <Select defaultValue="5">
                  <SelectTrigger id="login-attempts" className="w-[180px]">
                    <SelectValue placeholder="Select attempts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="10">10 attempts</SelectItem>
                    <SelectItem value="0">Disable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Admin Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

