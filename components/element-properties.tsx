"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Trash2 } from "lucide-react"

export function ElementProperties({
  element,
  onUpdate,
  onDelete,
}: {
  element: any
  onUpdate: (updates: any) => void
  onDelete: () => void
}) {
  if (!element) return null

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Element Properties</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1">
            Content
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1">
            Style
          </TabsTrigger>
          <TabsTrigger value="position" className="flex-1">
            Position
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentProperties element={element} onUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="style">
          <StyleProperties element={element} onUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="position">
          <PositionProperties element={element} onUpdate={onUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ContentProperties({ element, onUpdate }: { element: any; onUpdate: (updates: any) => void }) {
  switch (element.type) {
    case "text":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="text-content">Text Content</Label>
            <Textarea
              id="text-content"
              value={element.content.text || ""}
              onChange={(e) =>
                onUpdate({
                  content: {
                    ...element.content,
                    text: e.target.value,
                  },
                })
              }
              className="mt-1 h-32"
            />
          </div>
        </div>
      )

    case "table":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="table-rows">Rows</Label>
              <Input
                id="table-rows"
                type="number"
                min="1"
                value={element.content.rows || 3}
                onChange={(e) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      rows: Number.parseInt(e.target.value) || 1,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="table-cols">Columns</Label>
              <Input
                id="table-cols"
                type="number"
                min="1"
                value={element.content.cols || 3}
                onChange={(e) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      cols: Number.parseInt(e.target.value) || 1,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={element.content.headers || false}
                onChange={(e) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      headers: e.target.checked,
                    },
                  })
                }
              />
              Include Headers
            </Label>
          </div>
        </div>
      )

    case "chart":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="chart-type">Chart Type</Label>
            <Select
              value={element.content.chartType || "bar"}
              onValueChange={(value) =>
                onUpdate({
                  content: {
                    ...element.content,
                    chartType: value,
                  },
                })
              }
            >
              <SelectTrigger id="chart-type">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
                <SelectItem value="scatter">Scatter Plot</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Chart Data</Label>
            <p className="text-sm text-gray-500 mt-1">
              Chart data will be populated from the data schema and calculation script.
            </p>
          </div>
        </div>
      )

    case "image":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="image-src">Image Source</Label>
            <Input
              id="image-src"
              value={element.content.src || ""}
              onChange={(e) =>
                onUpdate({
                  content: {
                    ...element.content,
                    src: e.target.value,
                  },
                })
              }
              placeholder="Enter image URL or {{field}}"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="image-alt">Alt Text</Label>
            <Input
              id="image-alt"
              value={element.content.alt || ""}
              onChange={(e) =>
                onUpdate({
                  content: {
                    ...element.content,
                    alt: e.target.value,
                  },
                })
              }
              className="mt-1"
            />
          </div>
        </div>
      )

    case "shape":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="shape-type">Shape Type</Label>
            <Select
              value={element.content.shapeType || "rectangle"}
              onValueChange={(value) =>
                onUpdate({
                  content: {
                    ...element.content,
                    shapeType: value,
                  },
                })
              }
            >
              <SelectTrigger id="shape-type">
                <SelectValue placeholder="Select shape type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="triangle">Triangle</SelectItem>
                <SelectItem value="line">Line</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )

    default:
      return <div>No properties available for this element type</div>
  }
}

function StyleProperties({ element, onUpdate }: { element: any; onUpdate: (updates: any) => void }) {
  switch (element.type) {
    case "text":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Select
              value={element.content.format?.fontFamily || "Arial"}
              onValueChange={(value) =>
                onUpdate({
                  content: {
                    ...element.content,
                    format: {
                      ...element.content.format,
                      fontFamily: value,
                    },
                  },
                })
              }
            >
              <SelectTrigger id="font-family">
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Courier New">Courier New</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="font-size">Font Size: {element.content.format?.fontSize || 16}px</Label>
            <Slider
              id="font-size"
              min={8}
              max={72}
              step={1}
              value={[element.content.format?.fontSize || 16]}
              onValueChange={(value) =>
                onUpdate({
                  content: {
                    ...element.content,
                    format: {
                      ...element.content.format,
                      fontSize: value[0],
                    },
                  },
                })
              }
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="font-weight">Font Weight</Label>
              <Select
                value={element.content.format?.fontWeight || "normal"}
                onValueChange={(value) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      format: {
                        ...element.content.format,
                        fontWeight: value,
                      },
                    },
                  })
                }
              >
                <SelectTrigger id="font-weight">
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="lighter">Lighter</SelectItem>
                  <SelectItem value="bolder">Bolder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="text-align">Text Align</Label>
              <Select
                value={element.content.format?.textAlign || "left"}
                onValueChange={(value) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      format: {
                        ...element.content.format,
                        textAlign: value,
                      },
                    },
                  })
                }
              >
                <SelectTrigger id="text-align">
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="text-color"
                type="color"
                value={element.content.format?.color || "#000000"}
                onChange={(e) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      format: {
                        ...element.content.format,
                        color: e.target.value,
                      },
                    },
                  })
                }
                className="w-12 h-8 p-1"
              />
              <Input
                value={element.content.format?.color || "#000000"}
                onChange={(e) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      format: {
                        ...element.content.format,
                        color: e.target.value,
                      },
                    },
                  })
                }
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )

    case "table":
    case "shape":
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="border-width">Border Width: {element.content.borderWidth || 1}px</Label>
            <Slider
              id="border-width"
              min={0}
              max={10}
              step={1}
              value={[element.content.borderWidth || 1]}
              onValueChange={(value) =>
                onUpdate({
                  content: {
                    ...element.content,
                    borderWidth: value[0],
                  },
                })
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="border-color">Border Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="border-color"
                type="color"
                value={element.content.borderColor || "#000000"}
                onChange={(e) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      borderColor: e.target.value,
                    },
                  })
                }
                className="w-12 h-8 p-1"
              />
              <Input
                value={element.content.borderColor || "#000000"}
                onChange={(e) =>
                  onUpdate({
                    content: {
                      ...element.content,
                      borderColor: e.target.value,
                    },
                  })
                }
                className="flex-1"
              />
            </div>
          </div>

          {element.type === "shape" && (
            <>
              <div>
                <Label htmlFor="background-color">Background Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="background-color"
                    type="color"
                    value={element.content.backgroundColor || "#ffffff"}
                    onChange={(e) =>
                      onUpdate({
                        content: {
                          ...element.content,
                          backgroundColor: e.target.value,
                        },
                      })
                    }
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    value={element.content.backgroundColor || "#ffffff"}
                    onChange={(e) =>
                      onUpdate({
                        content: {
                          ...element.content,
                          backgroundColor: e.target.value,
                        },
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="border-radius">Border Radius: {element.content.borderRadius || 0}px</Label>
                <Slider
                  id="border-radius"
                  min={0}
                  max={50}
                  step={1}
                  value={[element.content.borderRadius || 0]}
                  onValueChange={(value) =>
                    onUpdate({
                      content: {
                        ...element.content,
                        borderRadius: value[0],
                      },
                    })
                  }
                  className="mt-1"
                />
              </div>
            </>
          )}
        </div>
      )

    default:
      return <div>No style properties available for this element type</div>
  }
}

function PositionProperties({ element, onUpdate }: { element: any; onUpdate: (updates: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="position-x">X Position</Label>
          <Input
            id="position-x"
            type="number"
            value={element.position.x}
            onChange={(e) =>
              onUpdate({
                position: {
                  ...element.position,
                  x: Number.parseInt(e.target.value) || 0,
                },
              })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="position-y">Y Position</Label>
          <Input
            id="position-y"
            type="number"
            value={element.position.y}
            onChange={(e) =>
              onUpdate({
                position: {
                  ...element.position,
                  y: Number.parseInt(e.target.value) || 0,
                },
              })
            }
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="size-width">Width</Label>
          <Input
            id="size-width"
            type="number"
            min="10"
            value={element.size.width}
            onChange={(e) =>
              onUpdate({
                size: {
                  ...element.size,
                  width: Number.parseInt(e.target.value) || 10,
                },
              })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="size-height">Height</Label>
          <Input
            id="size-height"
            type="number"
            min="10"
            value={element.size.height}
            onChange={(e) =>
              onUpdate({
                size: {
                  ...element.size,
                  height: Number.parseInt(e.target.value) || 10,
                },
              })
            }
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )
}
