"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTemplates } from "@/lib/use-templates"
import { ModernTemplateDesigner } from "@/components/modern-template-designer"
import { useEditorStore } from "@/lib/editor-store"

export default function EditTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getTemplate, isLoaded } = useTemplates()
  const { setTemplateId, setTemplateName, setTemplateCategory, setElements, setSchema, setScripts } = useEditorStore()

  const [templateLoaded, setTemplateLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait until templates are loaded from localStorage
    if (!isLoaded) {
      return
    }

    if (templateLoaded) {
      return
    }

    try {
      const template = getTemplate(params.id)

      if (template) {
        console.log("Loading template into editor:", template)
        setTemplateId(template.id)
        setTemplateName(template.name)
        setTemplateCategory(template.category)
        setElements(template.elements || [])
        setSchema(template.schema || { type: "object", properties: {} })
        setScripts(template.scripts || { calculation: "", validation: "" })
        setTemplateLoaded(true)
      }
    } catch (error) {
      console.error("Error loading template:", error)
    } finally {
      setIsLoading(false)
    }
  }, [
    params.id,
    getTemplate,
    isLoaded,
    templateLoaded,
    setTemplateId,
    setTemplateName,
    setTemplateCategory,
    setElements,
    setSchema,
    setScripts,
  ])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading template...</p>
      </div>
    )
  }

  return <ModernTemplateDesigner />
}
