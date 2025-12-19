"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ReportList } from "@/components/report-list"
import { TemplateList } from "@/components/template-list"
import { DocumentConfig } from "@/components/document-config"
import { TemplateEditor } from "@/components/template-editor"
import { getMockTemplates } from "@/mocks/templates"

export type ViewType = "reports" | "templates" | "document-config" | "editor"

export interface ReportType {
  id: string
  name: string
  icon: string
  description: string
}

export interface Template {
  id: string
  name: string
  reportsType: string
  // ... (keep other props implicit/same if not touching, but here I am replacing interface definition)
  // Let's rely on ReplaceFileContent matching.
  // I will replace the Interface and the handler.
}
// Actually, let's use MULTI replace to be cleaner.


export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("reports")
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const handleSelectReport = (reportId: string) => {
    setSelectedReport(reportId)
    setCurrentView("templates")
  }

  const handleCreateTemplate = () => {
    setCurrentView("document-config")
  }

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setCurrentView("editor")
  }

  /* 
     Initialize templates with mocks. 
     We load all types so they persist in state.
  */
  const [templates, setTemplates] = useState<Template[]>(() => {
    const types = ["optometric", "contactology", "audiometric", "sales"]
    return types.flatMap(t => getMockTemplates(t))
  })

  const handleToggleActive = (templateId: string) => {
    setTemplates(prev => prev.map(t =>
      t.id === templateId ? { ...t, isActive: !t.isActive } : t
    ))
  }

  const handleDocumentConfigComplete = (config: Partial<Template>) => {
    const newTemplate: Template = {
      id: Math.random().toString(36).substr(2, 9),
      name: config.name || "Nueva Plantilla",
      reportType: selectedReport || "",
      paperType: config.paperType || "a4",
      orientation: config.orientation || "portrait",
      paperWidth: config.paperWidth,
      dpi: config.dpi || 300,
      colorMode: config.colorMode || "color",
      margins: config.margins || { top: 20, right: 20, bottom: 20, left: 20 },
      padding: config.padding || { top: 10, right: 10, bottom: 10, left: 10 },
      fontFamily: config.fontFamily || "Arial",
      version: "1.0",
      status: "draft",
      createdAt: new Date(),
      isActive: true,
    }

    // Save to "Database"
    setTemplates(prev => [...prev, newTemplate])

    // Select and Navigate
    setSelectedTemplate(newTemplate)
    setCurrentView("editor")
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view)
          if (view === "reports") {
            setSelectedReport(null)
            setSelectedTemplate(null)
          }
        }}
        selectedReportId={selectedReport}
        onSelectTemplate={handleSelectTemplate}
        onSelectReport={handleSelectReport}
      />

      <main className="flex-1 overflow-hidden">
        {currentView === "reports" && <ReportList onSelectReport={handleSelectReport} />}

        {currentView === "templates" && selectedReport && (
          <TemplateList
            reportType={selectedReport}
            templates={templates.filter(t => t.reportType === selectedReport)}
            onSelectTemplate={handleSelectTemplate}
            onCreateTemplate={handleCreateTemplate}
            onToggleActive={handleToggleActive}
          />
        )}

        {currentView === "document-config" && <DocumentConfig onComplete={handleDocumentConfigComplete} />}

        {currentView === "editor" && selectedTemplate && (
          <TemplateEditor
            template={selectedTemplate}
            onTemplateUpdate={(updates) => setSelectedTemplate({ ...selectedTemplate, ...updates })}
          />
        )}
      </main>
    </div>
  )
}
