"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEditorStore } from "@/lib/editor-store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  Home,
  Settings,
  FileText,
  Plus,
  TableIcon,
  ImageIcon,
  BarChartIcon as ChartIcon,
  Type,
  Square,
  Play,
  Save,
  Printer,
  Download,
  X,
  Calculator,
  PieChart,
  LineChart,
  BarChart,
} from "lucide-react"
import { CanvasEditor } from "@/components/canvas-editor"
import { SchemaEditor } from "@/components/schema-editor"
import { ScriptEditor } from "@/components/script-editor"
import { nanoid } from "nanoid"
import { ExcelImportDialog } from "@/components/excel-import-dialog"
import { MacroConverterDialog } from "@/components/macro-converter-dialog"

export function ModernTemplateDesigner() {
  const router = useRouter()
  const { templateName, setTemplateName, selectElement } = useEditorStore()
  const [activeTab, setActiveTab] = useState("design-input")
  const [activeView, setActiveView] = useState("canvas")
  const [tabs, setTabs] = useState([
    { id: "read-me", title: "Read Me", active: false },
    { id: "design-input", title: "Design Input", active: true },
    { id: "calculations", title: "Calculations", active: false },
  ])

  const handleSave = () => {
    // Get the current state from the editor store and save it
    const state = useEditorStore.getState()
    const template = {
      id: state.templateId,
      name: state.templateName,
      category: state.templateCategory,
      elements: state.elements,
      schema: state.schema,
      scripts: state.scripts,
    }

    // Save the template to localStorage
    const templates = JSON.parse(localStorage.getItem("templates") || "[]")
    const index = templates.findIndex((t: any) => t.id === template.id)

    if (index >= 0) {
      templates[index] = {
        ...templates[index],
        ...template,
        updatedAt: new Date().toISOString(),
      }
    } else {
      templates.push({
        ...template,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    localStorage.setItem("templates", JSON.stringify(templates))
    router.push("/templates")
  }

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault()
    e.stopPropagation()

    // Remove the tab
    const newTabs = tabs.filter((tab) => tab.id !== tabId)

    // If we're closing the active tab, activate another one
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id)
    }

    setTabs(newTabs)
  }

  const handleAddTab = () => {
    const newTabId = `tab-${nanoid(6)}`
    const newTabTitle = `New Tab ${tabs.length + 1}`

    setTabs([...tabs, { id: newTabId, title: newTabTitle, active: false }])
    setActiveTab(newTabId)
  }

  const handleAddFormField = (type: string) => {
    const { addElement } = useEditorStore.getState()
    const id = nanoid()
    const newElement = {
      id,
      type,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 60 },
      content: getFormFieldContent(type),
    }

    addElement(newElement)
    selectElement(id)
  }

  const handleAddCalculationField = (type: string) => {
    const { addElement } = useEditorStore.getState()
    const id = nanoid()
    const newElement = {
      id,
      type:
        type === "Basic Calculation" || type === "Advanced Formula"
          ? "calculationField"
          : type === "Currency Field"
            ? "currencyField"
            : "percentageField",
      position: { x: 100, y: 100 },
      size: { width: 200, height: 60 },
      content: getCalculationFieldContent(type),
    }

    addElement(newElement)
    selectElement(id)
  }

  const handleAddChartElement = (type: string) => {
    const { addElement } = useEditorStore.getState()
    const id = nanoid()
    const newElement = {
      id,
      type: "chart",
      position: { x: 100, y: 100 },
      size: { width: 300, height: 200 },
      content: { chartType: type.toLowerCase() },
    }

    addElement(newElement)
    selectElement(id)
  }

  const getFormFieldContent = (type: string) => {
    switch (type) {
      case "textField":
        return { label: "Text Field", placeholder: "Enter text" }
      case "numberField":
        return { label: "Number Field", placeholder: "0" }
      case "dateField":
        return { label: "Date Field" }
      case "timeField":
        return { label: "Time Field" }
      case "dropdownField":
        return { label: "Dropdown Field", options: ["Option 1", "Option 2", "Option 3"] }
      case "checkboxField":
        return { label: "Checkbox Field", checked: false }
      case "radioField":
        return { label: "Radio Button Field", options: ["Option 1", "Option 2"] }
      case "fileField":
        return { label: "File Upload Field" }
      default:
        return {}
    }
  }

  const getCalculationFieldContent = (type: string) => {
    switch (type) {
      case "Basic Calculation":
        return { label: "Calculation", formula: "={{field1}} + {{field2}}" }
      case "Advanced Formula":
        return { label: "Formula", formula: "=IF({{condition}}, {{value1}}, {{value2}})" }
      case "Currency Field":
        return { label: "Currency", symbol: "$", value: "0.00" }
      case "Percentage Field":
        return { label: "Percentage", value: "0" }
      default:
        return {}
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top navigation bar */}
      <header className="border-b">
        <div className="flex items-center h-14 px-4">
          <div className="flex items-center gap-2 font-semibold">
            <FileText className="h-5 w-5" />
            <span>Template Designer</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <a href="/">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <a href="/templates">
                <FileText className="h-4 w-4" />
                <span>Templates</span>
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Template name and actions */}
      <div className="flex items-center gap-4 p-2 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Template Name:</span>
          <Input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="h-8 w-64"
            placeholder="Enter template name"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Select defaultValue="general">
            <SelectTrigger className="h-8 w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="form">Form</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <FileText className="h-4 w-4" />
                <span>Load Example</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Invoice Template</DropdownMenuItem>
              <DropdownMenuItem>Report Template</DropdownMenuItem>
              <DropdownMenuItem>Form Template</DropdownMenuItem>
              <DropdownMenuItem>Light Pole Design</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ExcelImportDialog />

          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>

          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>

          <Button variant="default" size="sm" className="h-8 gap-1" onClick={handleSave}>
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </div>
      </div>

      {/* Document tabs */}
      <div className="flex items-center border-b bg-gray-50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent h-10 p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`${
                  activeTab === tab.id
                    ? tab.id === "read-me"
                      ? "bg-green-500 text-white"
                      : "bg-white border-t-2 border-t-blue-500"
                    : ""
                } rounded-none h-10 px-4 relative`}
              >
                {tab.title}
                <button
                  onClick={(e) => handleCloseTab(e, tab.id)}
                  className="ml-2 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </TabsTrigger>
            ))}
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={handleAddTab}>
              <Plus className="h-4 w-4" />
            </Button>
          </TabsList>
        </Tabs>
      </div>

      {/* Formatting toolbar */}
      <div className="flex items-center gap-1 p-2 border-b overflow-x-auto">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Tables dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <TableIcon className="h-4 w-4" />
              <span>Table</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Basic Table</DropdownMenuItem>
            <DropdownMenuItem>Data Table</DropdownMenuItem>
            <DropdownMenuItem>Pivot Table</DropdownMenuItem>
            <DropdownMenuItem>Table with Header</DropdownMenuItem>
            <DropdownMenuItem>Table with Footer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Images dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <ImageIcon className="h-4 w-4" />
              <span>Picture</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Upload Image</DropdownMenuItem>
            <DropdownMenuItem>From URL</DropdownMenuItem>
            <DropdownMenuItem>From Library</DropdownMenuItem>
            <DropdownMenuItem>Screenshot</DropdownMenuItem>
            <DropdownMenuItem>Icon</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Charts dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <ChartIcon className="h-4 w-4" />
              <span>Chart</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleAddChartElement("Bar")}>
              <BarChart className="h-4 w-4 mr-2" /> Bar Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddChartElement("Line")}>
              <LineChart className="h-4 w-4 mr-2" /> Line Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddChartElement("Pie")}>
              <PieChart className="h-4 w-4 mr-2" /> Pie Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddChartElement("Area")}>Area Chart</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddChartElement("Scatter")}>Scatter Plot</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddChartElement("Radar")}>Radar Chart</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Type className="h-4 w-4" />
          <span>Text</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Square className="h-4 w-4" />
          <span>Shape</span>
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <FileText className="h-4 w-4" />
              <span>Form Fields</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleAddFormField("textField")}>Text Field</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddFormField("numberField")}>Number Field</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddFormField("dateField")}>Date Field</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddFormField("timeField")}>Time Field</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddFormField("dropdownField")}>Dropdown Field</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddFormField("checkboxField")}>Checkbox Field</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddFormField("radioField")}>Radio Button Field</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddFormField("fileField")}>File Upload Field</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Calculator className="h-4 w-4" />
              <span>Calculations</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleAddCalculationField("Basic Calculation")}>
              Basic Calculation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddCalculationField("Advanced Formula")}>
              Advanced Formula
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddCalculationField("Currency Field")}>
              Currency Field
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddCalculationField("Percentage Field")}>
              Percentage Field
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <MacroConverterDialog />

        <div className="ml-auto">
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Play className="h-4 w-4" />
            <span>Run Script</span>
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeView} onValueChange={setActiveView} className="h-full">
          <div className="border-b bg-gray-50">
            <TabsList className="bg-transparent h-10 p-0">
              <TabsTrigger
                value="canvas"
                className="data-[state=active]:bg-white data-[state=active]:border-b-0 rounded-none h-10 px-4"
              >
                Canvas
              </TabsTrigger>
              <TabsTrigger
                value="json-schema"
                className="data-[state=active]:bg-white data-[state=active]:border-b-0 rounded-none h-10 px-4"
              >
                JSON Schema
              </TabsTrigger>
              <TabsTrigger
                value="python-script"
                className="data-[state=active]:bg-white data-[state=active]:border-b-0 rounded-none h-10 px-4"
              >
                Python Script
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="canvas" className="h-full m-0 p-0 data-[state=active]:flex">
            <CanvasEditor />
          </TabsContent>
          <TabsContent value="json-schema" className="h-full m-0 p-0 data-[state=active]:flex">
            <SchemaEditor />
          </TabsContent>
          <TabsContent value="python-script" className="h-full m-0 p-0 data-[state=active]:flex">
            <ScriptEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
