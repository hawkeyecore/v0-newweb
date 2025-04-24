"use client"

import { create } from "zustand"
import { nanoid } from "nanoid"

interface Element {
  id: string
  type: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  content: any
}

interface Schema {
  type: string
  properties: Record<string, any>
  required?: string[]
}

interface Scripts {
  calculation: string
  validation: string
}

interface EditorState {
  templateId: string | null
  templateName: string
  templateCategory: string
  elements: Element[]
  schema: Schema
  scripts: Scripts
  selectedElementId: string | null

  // Actions
  setTemplateId: (id: string | null) => void
  setTemplateName: (name: string) => void
  setTemplateCategory: (category: string) => void
  setElements: (elements: Element[]) => void
  setSchema: (schema: Schema) => void
  setScripts: (scripts: Scripts) => void
  addElement: (element: Element) => void
  updateElement: (id: string, updates: Partial<Element>) => void
  removeElement: (id: string) => void
  selectElement: (id: string | null) => void
  saveTemplate: () => void
}

export const useEditorStore = create<EditorState>((set, get) => ({
  templateId: null,
  templateName: "New Template",
  templateCategory: "general",
  elements: [],
  schema: { type: "object", properties: {} },
  scripts: { calculation: "", validation: "" },
  selectedElementId: null,

  setTemplateId: (id) => set({ templateId: id }),
  setTemplateName: (name) => set({ templateName: name }),
  setTemplateCategory: (category) => set({ templateCategory: category }),
  setElements: (elements) => set({ elements }),
  setSchema: (schema) => set({ schema }),
  setScripts: (scripts) => set({ scripts }),

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((element) => (element.id === id ? { ...element, ...updates } : element)),
    })),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    })),

  selectElement: (id) => set({ selectedElementId: id }),

  saveTemplate: () => {
    const state = get()
    const templates = JSON.parse(localStorage.getItem("templates") || "[]")

    const template = {
      id: state.templateId || nanoid(),
      name: state.templateName,
      category: state.templateCategory,
      elements: state.elements,
      schema: state.schema,
      scripts: state.scripts,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const index = templates.findIndex((t: any) => t.id === template.id)
    if (index >= 0) {
      templates[index] = template
    } else {
      templates.push(template)
    }

    localStorage.setItem("templates", JSON.stringify(templates))
    set({ templateId: template.id })

    return template.id
  },
}))
