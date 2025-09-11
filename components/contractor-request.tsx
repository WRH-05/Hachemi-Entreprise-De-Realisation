"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface ContractorRequestProps {
  projectDetails: any
  estimatedCost: number
}

export function ContractorRequest({ projectDetails, estimatedCost }: ContractorRequestProps) {
  const { translations: t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the data to your backend
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  // Helper function to format property names for display
  const formatPropertyName = (name: string): string => {
    if (!name) return ""

    // Convert camelCase to Title Case with spaces
    return name
      .replace(/([A-Z])/g, " $1") // Insert a space before all capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
  }

  // Helper function to format property values for display
  const formatPropertyValue = (name: string, value: any): string => {
    if (value === undefined || value === null) return "Not specified"

    // Handle boolean values
    if (typeof value === "boolean") {
      return value ? "Yes" : "No"
    }

    // Handle specific property types
    if (
      [
        "constructionType",
        "structureType",
        "foundationType",
        "flooringType",
        "wallFinishType",
        "windowType",
        "exteriorFinishType",
      ].includes(name)
    ) {
      return formatPropertyName(value)
    }

    return value.toString()
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 text-green-500 mb-3 md:mb-4" />
          <h3 className="text-lg md:text-xl font-bold mb-2">
            {t.calculator?.contractor.successTitle || "Request Submitted Successfully!"}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mb-4">
            {t.calculator?.contractor.successMessage ||
              "Thank you for your interest. Our team will review your project details and connect you with qualified contractors. You'll receive a response within 24-48 hours."}
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm" className="text-xs md:text-sm">
            {t.calculator?.contractor.submitAnother || "Submit Another Request"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Get key project details to display
  const keyDetails = [
    { label: t.calculator?.contractor.area || "Area", value: `${projectDetails.area} m²` },
    { label: t.calculator?.contractor.floors || "Floors", value: projectDetails.floors },
    {
      label: t.calculator?.contractor.constructionType || "Construction Type",
      value: formatPropertyValue("constructionType", projectDetails.constructionType),
    },
    {
      label: t.calculator?.contractor.structureType || "Structure Type",
      value: formatPropertyValue("structureType", projectDetails.structureType),
    },
  ]

  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl">
          {t.calculator?.contractor.title || "Request Contractor Quotes"}
        </CardTitle>
        <CardDescription>
          {t.calculator?.contractor.subtitle ||
            "Submit your project details to receive quotes from our network of certified contractors"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-1 md:space-y-2">
              <Label htmlFor="name" className="text-xs md:text-sm">
                {t.calculator?.contractor.fullName || "Full Name"}
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="text-xs md:text-sm"
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <Label htmlFor="phone" className="text-xs md:text-sm">
                {t.calculator?.contractor.phoneNumber || "Phone Number"}
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                required
                className="text-xs md:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="email" className="text-xs md:text-sm">
              {t.calculator?.contractor.email || "Email"}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="text-xs md:text-sm"
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="message" className="text-xs md:text-sm">
              {t.calculator?.contractor.additionalDetails || "Additional Details (Optional)"}
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                t.calculator?.contractor.additionalDetailsPlaceholder ||
                "Any specific requirements or questions for the contractors..."
              }
              rows={3}
              className="text-xs md:text-sm"
            />
          </div>

          <div className="bg-secondary/50 p-3 md:p-4 rounded-lg space-y-1 md:space-y-2">
            <h4 className="font-medium text-xs md:text-sm">
              {t.calculator?.contractor.projectSummary || "Project Summary"}
            </h4>
            <ul className="text-xs md:text-sm space-y-1">
              {keyDetails.map((detail, index) => (
                <li key={index}>
                  <span className="font-medium">{detail.label}:</span> {detail.value}
                </li>
              ))}
              <li>
                <span className="font-medium">{t.calculator?.contractor.estimatedCost || "Estimated Cost"}:</span>{" "}
                {new Intl.NumberFormat("fr-DZ", {
                  style: "currency",
                  currency: "DZD",
                  maximumFractionDigits: 0,
                }).format(estimatedCost)}
              </li>
            </ul>
          </div>
        </form>
      </CardContent>
      <CardFooter className="p-4 md:p-6">
        <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 text-xs md:text-sm">
          <Send className="mr-2 h-3 w-3 md:h-4 md:w-4" />
          {t.calculator?.contractor.submitRequest || "Submit Request"}
        </Button>
      </CardFooter>
    </Card>
  )
}
