"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, FileSpreadsheet, BarChart } from "lucide-react"
import { useTemplates } from "@/lib/use-templates"
import { useEffect, useState } from "react"

export function ClientTemplatesList() {
  const { templates, isLoaded } = useTemplates()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false)
    }
  }, [isLoaded])

  if (isLoading) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
        <p>Loading templates...</p>
      </div>
    )
  }

  if (templates.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
          <FileText className="h-10 w-10 text-gray-500 dark:text-gray-400" />
        </div>
        <h2 className="mt-4 text-lg font-medium">No templates yet</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Create your first template to get started</p>
        <Link href="/templates/create" className="mt-4">
          <Button>Create Template</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              {getTemplateIcon(template.category)}
              {template.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <img
                src="/document-template-layout.png"
                alt={`${template.name} preview`}
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(template.updatedAt).toLocaleDateString()}
            </div>
            <div className="flex gap-2">
              <Link href={`/templates/${template.id}/edit`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <Link href={`/templates/${template.id}/use`}>
                <Button size="sm">Use</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

function getTemplateIcon(category: string) {
  switch (category?.toLowerCase()) {
    case "invoice":
      return <FileText className="h-4 w-4" />
    case "calendar":
      return <Calendar className="h-4 w-4" />
    case "spreadsheet":
      return <FileSpreadsheet className="h-4 w-4" />
    case "chart":
      return <BarChart className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}
