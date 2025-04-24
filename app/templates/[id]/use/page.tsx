"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTemplates } from "@/lib/use-templates"
import { TemplateForm } from "@/components/template-form"
import { TemplatePreview } from "@/components/template-preview"
import { calculateTemplate } from "@/lib/calculation-engine"

export default function UseTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getTemplate } = useTemplates()
  const [template, setTemplate] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [calculatedData, setCalculatedData] = useState<Record<string, any>>({})

  useEffect(() => {
    const templateData = getTemplate(params.id)
    if (!templateData) {
      router.push("/templates")
      return
    }
    setTemplate(templateData)
  }, [params.id, getTemplate, router])

  useEffect(() => {
    if (template && Object.keys(formData).length > 0) {
      try {
        const result = calculateTemplate(template, formData)
        setCalculatedData(result)
      } catch (error) {
        console.error("Calculation error:", error)
      }
    }
  }, [template, formData])

  if (!template) return null

  return (
    <div className="container py-4 px-4 sm:px-6 lg:px-8 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{template.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/templates")}>
            Back to Templates
          </Button>
          <Button onClick={() => window.print()}>Export PDF</Button>
        </div>
      </div>

      <Tabs defaultValue="form" className="flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="flex-1 overflow-auto">
          <Card className="p-4">
            <TemplateForm schema={template.schema} data={formData} onChange={setFormData} />
          </Card>
        </TabsContent>
        <TabsContent value="preview" className="flex-1 overflow-auto">
          <Card className="p-4">
            <TemplatePreview template={template} data={calculatedData} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
