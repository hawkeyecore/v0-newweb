"use client"

import { useState, useEffect } from "react"
import { useEditorStore } from "@/lib/editor-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Play } from "lucide-react"

export function ScriptEditor() {
  const { scripts, setScripts } = useEditorStore()
  const [scriptText, setScriptText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<any>(null)

  useEffect(() => {
    setScriptText(scripts?.calculation || getDefaultScript())
  }, [scripts])

  const handleSave = () => {
    try {
      setScripts({
        ...scripts,
        calculation: scriptText,
      })
      setError(null)
    } catch (err: any) {
      setError(err.message || "Error saving script")
    }
  }

  const handleTest = () => {
    try {
      // This is a simplified test - in a real app, you'd use a proper Python-like
      // interpreter or transpiler to execute the script
      const testData = {
        name: "Test User",
        quantity: 5,
        price: 10,
      }

      // Mock calculation result
      const result = {
        ...testData,
        subtotal: testData.quantity * testData.price,
        tax: testData.quantity * testData.price * 0.08,
        total: testData.quantity * testData.price * 1.08,
      }

      setTestResult(result)
      setError(null)
    } catch (err: any) {
      setError(err.message || "Error testing script")
      setTestResult(null)
    }
  }

  return (
    <div className="h-full flex flex-col p-4 w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Python Script Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTest} className="gap-1">
            <Play className="h-4 w-4" />
            Test
          </Button>
          <Button onClick={handleSave}>Save Script</Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex-1 overflow-hidden">
        <Textarea
          value={scriptText}
          onChange={(e) => setScriptText(e.target.value)}
          className="h-full font-mono text-sm"
        />
      </div>

      {testResult && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Test Result:</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

function getDefaultScript() {
  return `def calculate(data):
    # Get input values
    quantity = data.get("quantity", 0)
    price = data.get("price", 0)
    
    # Calculate subtotal
    subtotal = quantity * price
    
    # Apply tax
    tax_rate = 0.08  # 8% tax
    tax = subtotal * tax_rate
    
    # Calculate total
    total = subtotal + tax
    
    # Set calculated values
    data["subtotal"] = subtotal
    data["tax"] = tax
    data["total"] = total
    
    return data
`
}
