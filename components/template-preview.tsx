"use client"

import { useEffect, useRef } from "react"

export function TemplatePreview({
  template,
  data,
}: {
  template: any
  data: Record<string, any>
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !template || !template.elements) return

    // Clear previous content
    containerRef.current.innerHTML = ""

    // Render each element
    template.elements.forEach((element: any) => {
      const elementDiv = document.createElement("div")
      elementDiv.style.position = "absolute"
      elementDiv.style.left = `${element.position.x}px`
      elementDiv.style.top = `${element.position.y}px`
      elementDiv.style.width = `${element.size.width}px`
      elementDiv.style.height = `${element.size.height}px`

      switch (element.type) {
        case "text":
          elementDiv.style.fontFamily = element.content.format?.fontFamily || "inherit"
          elementDiv.style.fontSize = `${element.content.format?.fontSize || 16}px`
          elementDiv.style.fontWeight = element.content.format?.fontWeight || "normal"
          elementDiv.style.fontStyle = element.content.format?.fontStyle || "normal"
          elementDiv.style.textAlign = element.content.format?.textAlign || "left"
          elementDiv.style.color = element.content.format?.color || "inherit"

          // Replace dynamic fields with data values
          let text = element.content.text || ""
          text = text.replace(/\{\{([^}]+)\}\}/g, (match: string, field: string) => {
            return data[field] !== undefined ? data[field] : match
          })

          elementDiv.textContent = text
          break

        case "table":
          const table = document.createElement("table")
          table.style.width = "100%"
          table.style.height = "100%"
          table.style.borderCollapse = "collapse"

          // Create rows and cells
          for (let i = 0; i < (element.content.rows || 3); i++) {
            const row = document.createElement("tr")

            for (let j = 0; j < (element.content.cols || 3); j++) {
              const cell = document.createElement(i === 0 && element.content.headers ? "th" : "td")
              cell.style.border = `${element.content.borderWidth || 1}px solid ${element.content.borderColor || "#cccccc"}`
              cell.style.padding = "4px"

              // Get cell content, replace with data if it's a dynamic field
              let cellContent = element.content.data?.[i]?.[j] || ""
              cellContent = cellContent.replace(/\{\{([^}]+)\}\}/g, (match: string, field: string) => {
                return data[field] !== undefined ? data[field] : match
              })

              cell.textContent = cellContent
              row.appendChild(cell)
            }

            table.appendChild(row)
          }

          elementDiv.appendChild(table)
          break

        case "chart":
          // In a real implementation, you would render a chart using a library like Chart.js
          const chartPlaceholder = document.createElement("div")
          chartPlaceholder.style.width = "100%"
          chartPlaceholder.style.height = "100%"
          chartPlaceholder.style.backgroundColor = "#f0f0f0"
          chartPlaceholder.style.display = "flex"
          chartPlaceholder.style.alignItems = "center"
          chartPlaceholder.style.justifyContent = "center"
          chartPlaceholder.textContent = "Chart: " + element.content.chartType

          elementDiv.appendChild(chartPlaceholder)
          break

        case "image":
          const img = document.createElement("img")
          img.style.width = "100%"
          img.style.height = "100%"
          img.style.objectFit = "contain"

          // Replace dynamic fields in src
          let src = element.content.src || ""
          src = src.replace(/\{\{([^}]+)\}\}/g, (match: string, field: string) => {
            return data[field] !== undefined ? data[field] : match
          })

          if (src) {
            img.src = src
          } else {
            img.src = "/colorful-abstract-flow.png"
          }

          img.alt = element.content.alt || "Image"

          elementDiv.appendChild(img)
          break

        case "shape":
          elementDiv.style.backgroundColor = element.content.backgroundColor || "transparent"
          elementDiv.style.border = `${element.content.borderWidth || 1}px solid ${element.content.borderColor || "black"}`
          elementDiv.style.borderRadius = `${element.content.borderRadius || 0}px`
          break
      }

      containerRef.current.appendChild(elementDiv)
    })
  }, [template, data])

  if (!template) {
    return <div>No template data available</div>
  }

  return (
    <div className="relative bg-white mx-auto" style={{ width: "794px", height: "1123px" }} ref={containerRef}>
      {/* Elements will be rendered here dynamically */}
    </div>
  )
}
