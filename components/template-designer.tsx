"use client"

import type React from "react"

import { useState } from "react"
import { useEditorStore } from "@/lib/editor-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Type, Table, BarChart, ImageIcon, Square, Move, Trash2 } from "lucide-react"
import { ElementProperties } from "@/components/element-properties"
import { nanoid } from "nanoid"

export function TemplateDesigner() {
  const {
    templateName,
    setTemplateName,
    elements,
    addElement,
    updateElement,
    removeElement,
    selectedElementId,
    selectElement,
  } = useEditorStore()

  console.log("TemplateDesigner rendering with elements:", elements)

  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })

  const handleAddElement = (type: string) => {
    const id = nanoid()
    const newElement = {
      id,
      type,
      position: { x: 100, y: 100 },
      size: { width: 200, height: type === "table" ? 150 : 50 },
      content: getDefaultContent(type),
    }

    addElement(newElement)
    selectElement(id)
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking directly on the canvas, not on an element
    if (e.currentTarget === e.target) {
      selectElement(null)
    }
  }

  const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation()
    selectElement(elementId)

    setIsDragging(true)
    setDragPosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElementId) {
      const element = elements.find((el) => el.id === selectedElementId)
      if (!element) return

      const deltaX = e.clientX - dragPosition.x
      const deltaY = e.clientY - dragPosition.y

      updateElement(selectedElementId, {
        position: {
          x: element.position.x + deltaX,
          y: element.position.y + deltaY,
        },
      })

      setDragPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="flex h-full min-h-[600px]">
      <div className="w-64 border-r p-4 flex flex-col">
        <div className="mb-4">
          <Label htmlFor="template-name">Template Name</Label>
          <Input
            id="template-name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Add Elements</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex flex-col h-16 gap-1" onClick={() => handleAddElement("text")}>
              <Type className="h-4 w-4" />
              <span className="text-xs">Text</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-16 gap-1" onClick={() => handleAddElement("table")}>
              <Table className="h-4 w-4" />
              <span className="text-xs">Table</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-16 gap-1" onClick={() => handleAddElement("chart")}>
              <BarChart className="h-4 w-4" />
              <span className="text-xs">Chart</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-16 gap-1" onClick={() => handleAddElement("image")}>
              <ImageIcon className="h-4 w-4" />
              <span className="text-xs">Image</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-16 gap-1" onClick={() => handleAddElement("shape")}>
              <Square className="h-4 w-4" />
              <span className="text-xs">Shape</span>
            </Button>
          </div>
        </div>

        {selectedElementId && (
          <ElementProperties
            element={elements.find((el) => el.id === selectedElementId)!}
            onUpdate={(updates) => updateElement(selectedElementId, updates)}
            onDelete={() => removeElement(selectedElementId)}
          />
        )}
      </div>

      <div
        className="flex-1 bg-gray-100 overflow-auto relative"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="w-[794px] h-[1123px] bg-white mx-auto my-4 shadow-md relative">
          {elements.map((element) => (
            <div
              key={element.id}
              className={`absolute cursor-move ${selectedElementId === element.id ? "ring-2 ring-blue-500" : ""}`}
              style={{
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
              }}
              onMouseDown={(e) => handleElementMouseDown(e, element.id)}
            >
              <RenderElement element={element} />

              {selectedElementId === element.id && (
                <>
                  <div className="absolute -top-6 left-0 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 bg-white shadow-sm hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeElement(element.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 bg-white shadow-sm hover:bg-gray-100 cursor-move"
                    >
                      <Move className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Resize handles */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize" />
                </>
              )}
            </div>
          ))}
          {elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <p>No elements yet. Add elements from the sidebar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function RenderElement({ element }: { element: any }) {
  switch (element.type) {
    case "text":
      return (
        <div
          className="w-full h-full overflow-hidden"
          style={{
            fontFamily: element.content.format?.fontFamily || "inherit",
            fontSize: `${element.content.format?.fontSize || 16}px`,
            fontWeight: element.content.format?.fontWeight || "normal",
            fontStyle: element.content.format?.fontStyle || "normal",
            textAlign: element.content.format?.textAlign || "left",
            color: element.content.format?.color || "inherit",
          }}
        >
          {element.content.text || "Text Element"}
        </div>
      )

    case "table":
      return (
        <table className="w-full h-full border-collapse">
          <tbody>
            {Array.from({ length: element.content.rows || 3 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: element.content.cols || 3 }).map((_, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 p-1 text-sm">
                    {element.content.data?.[rowIndex]?.[colIndex] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )

    case "chart":
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <BarChart className="h-12 w-12 text-gray-400" />
          <span className="ml-2 text-gray-500">Chart Element</span>
        </div>
      )

    case "image":
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <ImageIcon className="h-12 w-12 text-gray-400" />
          <span className="ml-2 text-gray-500">Image Element</span>
        </div>
      )

    case "shape":
      return (
        <div
          className="w-full h-full"
          style={{
            backgroundColor: element.content.backgroundColor || "transparent",
            border: `${element.content.borderWidth || 1}px solid ${element.content.borderColor || "black"}`,
            borderRadius: `${element.content.borderRadius || 0}px`,
          }}
        />
      )

    default:
      return <div>Unknown Element Type</div>
  }
}

function getDefaultContent(type: string) {
  switch (type) {
    case "text":
      return {
        text: "New Text Element",
        format: {
          fontFamily: "Arial",
          fontSize: 16,
          fontWeight: "normal",
          fontStyle: "normal",
          textAlign: "left",
          color: "#000000",
        },
      }
    case "table":
      return {
        rows: 3,
        cols: 3,
        data: Array(3).fill(Array(3).fill("")),
        headers: true,
        borderWidth: 1,
        borderColor: "#cccccc",
      }
    case "chart":
      return {
        chartType: "bar",
        data: {
          labels: ["Label 1", "Label 2", "Label 3"],
          datasets: [
            {
              label: "Dataset 1",
              data: [10, 20, 30],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
              borderColor: "#ffffff",
            },
          ],
        },
        options: {},
      }
    case "image":
      return {
        src: "",
        alt: "Image",
        aspectRatio: "1:1",
      }
    case "shape":
      return {
        shapeType: "rectangle",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 0,
      }
    default:
      return {}
  }
}
