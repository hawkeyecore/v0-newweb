"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LightPoleCalculator } from "@/components/templates/light-pole-calculator"
import { Save, Download, Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LightPoleDesignPage() {
  const [templateName, setTemplateName] = useState("Light Pole Design Calculator")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">Web Template Designer</h1>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/templates" className="text-sm font-medium hover:underline flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Templates
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{templateName}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button size="sm" className="gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        <LightPoleCalculator />
      </div>
    </div>
  )
}
