"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "What types of construction projects do you handle?",
    answer:
      "We handle a wide range of construction projects including residential buildings, commercial properties, renovations, demolitions, and specialized concrete work. Our team has extensive experience in both small-scale and large-scale projects.",
  },
  {
    question: "How long does a typical construction project take?",
    answer:
      "Project duration varies depending on the scope and complexity. A simple renovation might take a few weeks, while a large commercial building could take several months. We provide detailed timelines during the initial consultation.",
  },
  {
    question: "Do you provide free estimates?",
    answer:
      "Yes, we provide free initial consultations and estimates for all projects. Our team will assess your requirements and provide a detailed quote outlining all costs and timelines.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, we are fully licensed and insured. We maintain comprehensive insurance coverage and all necessary certifications to operate in the construction industry.",
  },
  {
    question: "What warranties do you offer on your work?",
    answer:
      "We offer comprehensive warranties on all our construction work. The specific warranty terms depend on the type of project and materials used. We'll provide detailed warranty information in your project contract.",
  },
  {
    question: "How do you ensure project quality and safety?",
    answer:
      "We maintain strict quality control processes and follow all safety regulations. Our team is regularly trained on the latest safety protocols, and we conduct frequent inspections throughout the project.",
  },
]

export default function FAQPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the question to your backend
    alert("Thank you for your question! We'll respond to your email soon.")
    setIsDialogOpen(false)
    setNewQuestion("")
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
              <p className="text-gray-600">Find answers to common questions about our construction services</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Ask a Question
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit Your Question</DialogTitle>
                  <DialogDescription>
                    Can't find what you're looking for? Submit your question and we'll get back to you.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitQuestion} className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-1">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="question" className="text-sm font-medium block mb-1">
                      Your Question
                    </label>
                    <Textarea
                      id="question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Type your question here..."
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Submit Question
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

