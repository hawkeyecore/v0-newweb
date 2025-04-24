"use client"

import type React from "react"

import { useState } from "react"
import { useEditorStore } from "@/lib/editor-store"
import { Move, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CanvasEditor() {
  const { elements, addElement, updateElement, removeElement, selectedElementId, selectElement } = useEditorStore()

  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })

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
            <p>No elements yet. Add elements from the toolbar above.</p>
          </div>
        )}
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
                {Array.from({ length: element.content.cols || 3 }).map((_, colIndex) => {
                  const cellIndex = `${rowIndex}-${colIndex}`
                  return (
                    <td key={cellIndex} className="border border-gray-300 p-1 text-sm">
                      {element.content.data?.[rowIndex]?.[colIndex] || ""}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )

    case "chart":
      const chartType = element.content.chartType || "bar"
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-2">
          <div className="text-sm font-medium mb-2">{chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</div>
          <div className="flex-1 w-full flex items-center justify-center">
            {chartType === "bar" && (
              <div className="flex items-end h-full w-full justify-around px-4">
                <div className="bg-blue-500 w-8 h-[30%]"></div>
                <div className="bg-blue-500 w-8 h-[60%]"></div>
                <div className="bg-blue-500 w-8 h-[45%]"></div>
                <div className="bg-blue-500 w-8 h-[75%]"></div>
                <div className="bg-blue-500 w-8 h-[25%]"></div>
              </div>
            )}
            {chartType === "line" && (
              <div className="h-full w-full flex items-center justify-center">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <polyline points="0,40 20,30 40,35 60,15 80,25 100,10" fill="none" stroke="blue" strokeWidth="2" />
                </svg>
              </div>
            )}
            {chartType === "pie" && (
              <div className="h-full aspect-square relative">
                <div
                  className="absolute inset-0 rounded-full border-8 border-blue-500"
                  style={{ borderRightColor: "transparent", transform: "rotate(-45deg)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-green-500"
                  style={{ borderTopColor: "transparent", borderLeftColor: "transparent", transform: "rotate(45deg)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-yellow-500"
                  style={{
                    borderTopColor: "transparent",
                    borderRightColor: "transparent",
                    transform: "rotate(180deg)",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )

    case "image":
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-500">Image Element</span>
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
    case "textField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Text Field</label>
          <input type="text" className="border rounded p-1 flex-1" placeholder="Text input" disabled />
        </div>
      )

    case "numberField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Number Field</label>
          <input type="number" className="border rounded p-1 flex-1" placeholder="0" disabled />
        </div>
      )

    case "dateField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Date Field</label>
          <input type="date" className="border rounded p-1 flex-1" disabled />
        </div>
      )

    case "timeField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Time Field</label>
          <input type="time" className="border rounded p-1 flex-1" disabled />
        </div>
      )

    case "dropdownField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Dropdown Field</label>
          <select className="border rounded p-1 flex-1" disabled>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      )

    case "checkboxField":
      return (
        <div className="w-full h-full flex items-center">
          <input type="checkbox" className="mr-2" disabled />
          <label className="text-sm">Checkbox Field</label>
        </div>
      )

    case "radioField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Radio Button Field</label>
          <div className="flex items-center">
            <input type="radio" name="radio-group" className="mr-1" checked disabled />
            <label className="text-sm mr-3">Option 1</label>
            <input type="radio" name="radio-group" className="mr-1" disabled />
            <label className="text-sm">Option 2</label>
          </div>
        </div>
      )

    case "fileField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">File Upload Field</label>
          <input type="file" className="text-sm" disabled />
        </div>
      )

    case "calculationField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Calculation Field</label>
          <div className="border rounded p-1 flex-1 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-500">{element.content.formula || "Calculation Result"}</span>
          </div>
        </div>
      )

    case "currencyField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Currency Field</label>
          <div className="flex">
            <div className="border rounded-l p-1 bg-gray-100">$</div>
            <input type="text" className="border border-l-0 rounded-r p-1 flex-1" placeholder="0.00" disabled />
          </div>
        </div>
      )

    case "percentageField":
      return (
        <div className="w-full h-full flex flex-col">
          <label className="text-sm font-medium mb-1">Percentage Field</label>
          <div className="flex">
            <input type="text" className="border rounded-l p-1 flex-1" placeholder="0" disabled />
            <div className="border rounded-r border-l-0 p-1 bg-gray-100">%</div>
          </div>
        </div>
      )

    default:
      return <div>Unknown Element Type</div>
  }
}
