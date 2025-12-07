"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calendar } from "lucide-react"
import type { Template } from "@/app/page"

interface TemplateListProps {
  reportType: string
  onSelectTemplate: (template: Template) => void
  onCreateTemplate: () => void
}

import { getMockTemplates } from "@/mocks/templates"

export function TemplateList({ reportType, onSelectTemplate, onCreateTemplate }: TemplateListProps) {
  const [templates] = useState<Template[]>(getMockTemplates(reportType))

  const getPaperTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      continuous: "Continuo",
      a4: "A4",
      a5: "A5",
      letter: "Letter",
      label: "Etiqueta",
      email: "Email",
      sms: "SMS",
    }
    return labels[type] || type
  }

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Plantillas</h2>
            <p className="text-muted-foreground mt-2">Gestiona las plantillas para este tipo de informe</p>
          </div>
          <Button onClick={onCreateTemplate} size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Nueva Plantilla
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="p-6 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-card"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{template.name}</h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                      {getPaperTypeLabel(template.paperType)}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground capitalize">
                      {template.orientation}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {template.createdAt.toLocaleDateString("es-ES")}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
