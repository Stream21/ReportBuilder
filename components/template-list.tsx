"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calendar, Eye, EyeOff, Power } from "lucide-react"
import type { Template } from "@/app/page"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TemplateListProps {
  reportType: string
  templates: Template[]
  onSelectTemplate: (template: Template) => void
  onCreateTemplate: () => void
  onToggleActive: (id: string) => void
}

export function TemplateList({ reportType, templates, onSelectTemplate, onCreateTemplate, onToggleActive }: TemplateListProps) {
  const [showInactive, setShowInactive] = useState(false)

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

  const filteredTemplates = templates.filter(t => showInactive || t.isActive)

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Plantillas</h2>
            <p className="text-muted-foreground mt-2">Gestiona las plantillas para este tipo de informe</p>
          </div>
          <div className="flex items-center gap-4">
            <Tabs value={showInactive ? "all" : "active"} onValueChange={(v) => setShowInactive(v === "all")} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active">Activas</TabsTrigger>
                <TabsTrigger value="all">Todas</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={onCreateTemplate} size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Nueva Plantilla
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`p-6 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-card group relative ${!template.isActive ? 'opacity-60 grayscale' : ''}`}
              onClick={() => onSelectTemplate(template)}
            >
              <Button
                variant={template.isActive ? "destructive" : "outline"}
                size="icon"
                className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleActive(template.id)
                }}
                title={template.isActive ? "Desactivar" : "Activar"}
              >
                <Power className="w-4 h-4" />
              </Button>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${template.isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
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
                    {!template.isActive && (
                      <span className="px-2 py-0.5 rounded bg-destructive/10 text-destructive text-xs font-semibold">
                        INACTIVA
                      </span>
                    )}
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
