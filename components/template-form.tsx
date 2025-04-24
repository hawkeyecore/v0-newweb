"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export function TemplateForm({
  schema,
  data,
  onChange,
}: {
  schema: any
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
}) {
  const [formData, setFormData] = useState<Record<string, any>>(data || {})

  useEffect(() => {
    onChange(formData)
  }, [formData, onChange])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const renderField = (property: any, propertyName: string, required = false) => {
    const value = formData[propertyName] !== undefined ? formData[propertyName] : ""

    switch (property.type) {
      case "string":
        if (property.format === "email") {
          return (
            <Input
              type="email"
              value={value}
              onChange={(e) => handleChange(propertyName, e.target.value)}
              required={required}
            />
          )
        } else if (property.format === "date") {
          return (
            <Input
              type="date"
              value={value}
              onChange={(e) => handleChange(propertyName, e.target.value)}
              required={required}
            />
          )
        } else if (property.enum) {
          return (
            <Select value={value} onValueChange={(val) => handleChange(propertyName, val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {property.enum.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        } else if (property.maxLength && property.maxLength > 100) {
          return (
            <Textarea value={value} onChange={(e) => handleChange(propertyName, e.target.value)} required={required} />
          )
        } else {
          return (
            <Input
              type="text"
              value={value}
              onChange={(e) => handleChange(propertyName, e.target.value)}
              required={required}
            />
          )
        }

      case "number":
      case "integer":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleChange(propertyName, Number.parseFloat(e.target.value) || 0)}
            min={property.minimum}
            max={property.maximum}
            step={property.type === "integer" ? 1 : "any"}
            required={required}
          />
        )

      case "boolean":
        return <Checkbox checked={!!value} onCheckedChange={(checked) => handleChange(propertyName, checked)} />

      default:
        return <div>Unsupported field type: {property.type}</div>
    }
  }

  if (!schema || !schema.properties) {
    return (
      <div className="p-4 text-center">
        <p>No schema defined for this template.</p>
        <p className="text-sm text-gray-500 mt-2">Define a schema in the template editor to generate a form.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(schema.properties).map(([propertyName, property]: [string, any]) => {
        const required = schema.required?.includes(propertyName) || false

        return (
          <div key={propertyName} className="space-y-2">
            <Label htmlFor={propertyName}>
              {property.title || propertyName}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {renderField(property, propertyName, required)}
            {property.description && <p className="text-xs text-gray-500">{property.description}</p>}
          </div>
        )
      })}

      <Button type="button" onClick={() => onChange(formData)} className="w-full">
        Update Preview
      </Button>
    </div>
  )
}
