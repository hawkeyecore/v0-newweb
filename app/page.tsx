import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">Web Template Designer</h1>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/templates" className="text-sm font-medium hover:underline">
              Templates
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:underline">
              Documentation
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Create Custom Templates with Ease
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Design, edit, and use customizable templates for various business and technical purposes with our
                    browser-based application.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/templates/create">
                    <Button size="lg" className="gap-1">
                      Create Template <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/templates">
                    <Button size="lg" variant="outline">
                      Browse Templates
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/template-designer-ui.png"
                  alt="Template Designer Interface"
                  width={550}
                  height={550}
                  className="rounded-lg object-cover border shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our template designer provides powerful features to create professional documents
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Visual Editor",
                  description: "WYSIWYG interface for template design with drag-and-drop functionality",
                },
                {
                  title: "Template Elements",
                  description: "Add text, tables, charts, images, and shapes to your templates",
                },
                {
                  title: "Form Fields",
                  description: "Create interactive forms with various input types and validation",
                },
                {
                  title: "Data Schema",
                  description: "Define data structure for templates with JSON Schema",
                },
                {
                  title: "Calculation Engine",
                  description: "Write calculation logic in Python-like syntax for dynamic content",
                },
                {
                  title: "Export Options",
                  description: "Export your templates in PDF, HTML, and JSON formats",
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Web Template Designer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
