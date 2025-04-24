"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Code, ArrowRight, Copy, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function MacroConverterDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [macroCode, setMacroCode] = useState("")
  const [pythonCode, setPythonCode] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleConvert = () => {
    if (!macroCode.trim()) {
      setError("Please enter some VBA/Macro code to convert")
      return
    }

    setIsConverting(true)
    setError(null)

    // Simulate conversion process
    setTimeout(() => {
      try {
        // This is a mock conversion - in a real app, you'd use an actual conversion service
        const converted = convertMacroToPython(macroCode)
        setPythonCode(converted)
        setIsConverting(false)
      } catch (err: any) {
        setError(err.message || "Error converting macro code")
        setIsConverting(false)
      }
    }, 1500)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Mock conversion function - in a real app, this would be a more sophisticated converter
  const convertMacroToPython = (vbaCode: string): string => {
    // This is a very simplified mock conversion
    let pythonCode = "# Converted from VBA/Macro code\n\n"

    // Replace some common VBA patterns with Python equivalents
    const lines = vbaCode.split("\n")

    for (const line of lines) {
      const pyLine = line
        .replace(/Sub\s+(\w+)\s*$$(.*)$$/i, "def $1($2):")
        .replace(/End Sub/i, "")
        .replace(/Dim\s+(\w+)\s+As\s+(\w+)/i, "$1 = None  # was $2 in VBA")
        .replace(/Set\s+(\w+)\s*=\s*(.*)/i, "$1 = $2")
        .replace(/If\s+(.*)\s+Then/i, "if $1:")
        .replace(/ElseIf\s+(.*)\s+Then/i, "elif $1:")
        .replace(/Else/i, "else:")
        .replace(/End If/i, "")
        .replace(/For\s+(\w+)\s*=\s*(\w+)\s+To\s+(\w+)/i, "for $1 in range($2, $3 + 1):")
        .replace(/Next/i, "")
        .replace(/(\w+)\.Value/i, "$1")
        .replace(/'/g, "#")

      if (pyLine.trim() && !pyLine.trim().startsWith("#")) {
        pythonCode += "    " + pyLine + "\n"
      } else if (pyLine.trim()) {
        pythonCode += pyLine + "\n"
      }
    }

    pythonCode += "\n# Note: This is a basic conversion and may require manual adjustments"
    return pythonCode
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Code className="h-4 w-4" />
          <span>Convert Macro</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Convert Excel VBA/Macro to Python
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">VBA/Macro Code</h3>
            <Textarea
              value={macroCode}
              onChange={(e) => setMacroCode(e.target.value)}
              placeholder="Paste your Excel VBA or Macro code here..."
              className="h-[300px] font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Python Code</h3>
              {pythonCode && (
                <Button variant="ghost" size="sm" className="h-7 gap-1" onClick={handleCopyCode}>
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              )}
            </div>
            <Textarea
              value={pythonCode}
              readOnly
              placeholder="Converted Python code will appear here..."
              className="h-[300px] font-mono text-sm bg-gray-50"
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-500">
            Note: The conversion is a best-effort approximation and may require manual adjustments.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button onClick={handleConvert} disabled={isConverting || !macroCode.trim()} className="gap-1">
              {isConverting ? (
                <span>Converting...</span>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" />
                  <span>Convert to Python</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
