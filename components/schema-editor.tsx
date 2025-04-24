"use client"

import { useState, useEffect } from "react"
import { useEditorStore } from "@/lib/editor-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function SchemaEditor() {
  const { schema, setSchema } = useEditorStore()
  const [schemaText, setSchemaText] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setSchemaText(JSON.stringify(schema || { type: "object", properties: {} }, null, 2))
    } catch (err) {
      console.error("Error stringifying schema:", err)
    }
  }, [schema])

  const handleSave = () => {
    try {
      const parsedSchema = JSON.parse(schemaText)
      setSchema(parsedSchema)
      setError(null)
    } catch (err: any) {
      setError(err.message || "Invalid JSON schema")
    }
  }

  return (
    <div className="h-full flex flex-col p-4 w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">JSON Schema Editor</h2>
        <Button onClick={handleSave}>Save Schema</Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex-1 overflow-hidden">
        <Textarea
          value={schemaText}
          onChange={(e) => setSchemaText(e.target.value)}
          className="h-full font-mono text-sm"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Example Schema:</h3>
        <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
          {`{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "Name"
    },
    "email": {
      "type": "string",
      "format": "email",
      "title": "Email"
    },
    "age": {
      "type": "number",
      "minimum": 0,
      "title": "Age"
    },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "price": { "type": "number" },
          "quantity": { "type": "number" }
        }
      }
    }
  },
  "required": ["name", "email"]
}`}
        </pre>
      </div>
    </div>
  )
}
