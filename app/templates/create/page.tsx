"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTemplates } from "@/lib/use-templates"

export default function CreateTemplatePage() {
  const router = useRouter()
  const { createTemplate } = useTemplates()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("general")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return

    const templateId = createTemplate({
      name,
      category,
      elements: [],
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            title: "Name",
          },
          email: {
            type: "string",
            format: "email",
            title: "Email",
          },
        },
      },
      scripts: {
        calculation: "def calculate(data):\n    # Your calculation code here\n    return data",
        validation: "",
      },
    })

    router.push(`/templates/${templateId}/edit`)
  }

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create New Template</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter template name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    <SelectItem value="form">Form</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/templates")}>
                Cancel
              </Button>
              <Button type="submit">Create Template</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
