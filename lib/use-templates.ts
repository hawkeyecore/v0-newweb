"use client"

import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

interface Template {
  id: string
  name: string
  category: string
  elements: any[]
  schema: any
  scripts: {
    calculation: string
    validation: string
  }
  createdAt: string
  updatedAt: string
}

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load templates from localStorage
    const storedTemplates = localStorage.getItem("templates")
    if (storedTemplates) {
      try {
        setTemplates(JSON.parse(storedTemplates))
      } catch (error) {
        console.error("Error parsing templates:", error)
        setTemplates([])
      }
    }
    setIsLoaded(true)
  }, [])

  const getTemplate = (id: string) => {
    console.log("Getting template with ID:", id)
    console.log("Available templates:", templates)

    // Check if the template exists
    const template = templates.find((template) => template.id === id)

    if (!template) {
      console.warn(`Template not found with ID: ${id}. Creating a new template.`)

      // Create a new template with the given ID
      const newTemplate: Template = {
        id,
        name: "New Template",
        category: "general",
        elements: [],
        schema: { type: "object", properties: {} },
        scripts: { calculation: "", validation: "" },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Save the new template
      const updatedTemplates = [...templates, newTemplate]
      setTemplates(updatedTemplates)
      localStorage.setItem("templates", JSON.stringify(updatedTemplates))

      return newTemplate
    }

    console.log("Found template:", template)
    return template
  }

  const createTemplate = (templateData: Partial<Template>) => {
    const newTemplate: Template = {
      id: nanoid(),
      name: templateData.name || "New Template",
      category: templateData.category || "general",
      elements: templateData.elements || [],
      schema: templateData.schema || { type: "object", properties: {} },
      scripts: templateData.scripts || { calculation: "", validation: "" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedTemplates = [...templates, newTemplate]
    setTemplates(updatedTemplates)
    localStorage.setItem("templates", JSON.stringify(updatedTemplates))

    return newTemplate.id
  }

  const updateTemplate = (id: string, updates: Partial<Template>) => {
    const updatedTemplates = templates.map((template) => {
      if (template.id === id) {
        return {
          ...template,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      }
      return template
    })

    setTemplates(updatedTemplates)
    localStorage.setItem("templates", JSON.stringify(updatedTemplates))
  }

  const deleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter((template) => template.id !== id)
    setTemplates(updatedTemplates)
    localStorage.setItem("templates", JSON.stringify(updatedTemplates))
  }

  return {
    templates,
    isLoaded,
    getTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  }
}
