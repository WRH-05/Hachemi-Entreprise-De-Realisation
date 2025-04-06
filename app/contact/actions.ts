"use server"

import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  projectType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string().min(10),
})

export async function submitContactForm(data: z.infer<typeof formSchema>) {
  // Validate the data
  const result = formSchema.safeParse(data)
  if (!result.success) {
    return { error: "Invalid form data" }
  }

  // Here you would typically:
  // 1. Save to your database
  // 2. Send notification emails
  // 3. Integrate with your CRM
  // For now, we'll just return success

  return { success: true }
}

