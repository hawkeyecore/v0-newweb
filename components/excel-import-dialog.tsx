"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Upload, FileSpreadsheet, Check } from "lucide-react"
import { useEditorStore } from "@/lib/editor-store"
import { nanoid } from "nanoid"

export function ExcelImportDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [importTab, setImportTab] = useState("upload")
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<any[] | null>(null)
  const [importStatus, setImportStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const { addElement, selectElement } = useEditorStore()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setImportStatus("loading")

    // Simulate file processing
    setTimeout(() => {
      // Mock data for preview
      const mockData = [
        ["Name", "Age", "Email", "Department", "Salary"],
        ["John Doe", 32, "john@example.com", "Engineering", 85000],
        ["Jane Smith", 28, "jane@example.com", "Marketing", 72000],
        ["Bob Johnson", 45, "bob@example.com", "Finance", 95000],
        ["Alice Brown", 37, "alice@example.com", "HR", 68000],
        ["Charlie Wilson", 29, "charlie@example.com", "Engineering", 78000],
      ]

      setPreviewData(mockData)
      setImportStatus("success")
    }, 1500)
  }

  const handleImport = () => {
    if (!previewData) return

    // Create a table element from the Excel data
    const id = nanoid()
    const newElement = {
      id,
      type: "table",
      position: { x: 50, y: 50 },
      size: { width: 600, height: 300 },
      content: {
        rows: previewData.length,
        cols: previewData[0].length,
        data: previewData,
        headers: true,
        borderWidth: 1,
        borderColor: "#cccccc",
      },
    }

    addElement(newElement)
    selectElement(id)
    setIsOpen(false)
    setFileName(null)
    setPreviewData(null)
    setImportStatus("idle")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Upload className="h-4 w-4" />
          <span>Import</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Import Excel Sheet
          </DialogTitle>
        </DialogHeader>

        <Tabs value={importTab} onValueChange={setImportTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="paste">Paste Data</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-4">Drag and drop your Excel file here, or click to browse</p>
              <input
                type="file"
                id="excel-file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button asChild>
                <label htmlFor="excel-file">Browse Files</label>
              </Button>
            </div>

            {fileName && (
              <div className="p-4 border rounded-lg">
                <p className="font-medium flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  {fileName}
                </p>

                {importStatus === "loading" && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Processing file...</p>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 animate-pulse" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="paste" className="space-y-4">
            <div className="border rounded-lg p-4">
              <p className="mb-2 text-sm">Paste data from Excel (Ctrl+V)</p>
              <textarea
                className="w-full h-40 border rounded p-2 font-mono text-sm"
                placeholder="Paste your Excel data here..."
              ></textarea>
            </div>
          </TabsContent>
        </Tabs>

        {previewData && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Preview</h3>
            <div className="border rounded overflow-auto max-h-60">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    {previewData[0].map((header: any, i: number) => (
                      <th key={i} className="border px-3 py-2 text-left text-sm font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(1).map((row: any[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.map((cell: any, cellIndex: number) => (
                        <td key={cellIndex} className="border px-3 py-2 text-sm">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!previewData || importStatus !== "success"} className="gap-1">
            <Check className="h-4 w-4" />
            Import to Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
