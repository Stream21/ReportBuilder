"use client"

import { FileText, Layout, Settings, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ViewType, Template } from "@/app/page"

import { reports } from "@/mocks/reports"
import { getMockTemplates } from "@/mocks/templates"

interface SidebarProps {
  currentView: ViewType
  onNavigate: (view: ViewType) => void
  selectedReportId?: string | null
  onSelectTemplate?: (template: Template) => void
  onSelectReport?: (reportId: string) => void
}

export function Sidebar(props: SidebarProps) {
  const { currentView, onNavigate, selectedReportId, onSelectReport, onSelectTemplate } = props
  const reportTemplates = selectedReportId ? getMockTemplates(selectedReportId) : []

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">


      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {/* Nivel 1: Cabecera "Informes" */}
          <button
            onClick={() => onNavigate("reports")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-2",
              (currentView === "reports" && !selectedReportId) ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
            )}
          >
            <FileText className="w-4 h-4" />
            <span>Informes</span>
          </button>

          {/* Lista de Informes (Siempre visibles) */}
          <div className="ml-4 pl-3 border-l border-border mt-1 space-y-1">
            {reports.map((report) => {
              const Icon = report.icon
              const isSelected = selectedReportId === report.id

              return (
                <div key={report.id}>
                  {/* Item de Reporte */}
                  <button
                    onClick={() => props.onSelectReport && props.onSelectReport(report.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left",
                      isSelected ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate flex-1">{report.name}</span>
                    {isSelected && <ChevronRight className="w-3 h-3 rotate-90 transition-transform" />}
                  </button>

                  {/* Subniveles: Plantillas (Solo si este reporte está seleccionado) */}
                  {isSelected && (
                    <div className="ml-4 pl-3 border-l border-border mt-1 space-y-1">

                      {/* Botón "Todas las Plantillas" del reporte */}
                      <button
                        onClick={() => onNavigate("templates")}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-all",
                          currentView === "templates" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Layout className="w-3 h-3" />
                        <span>Galería de Plantillas</span>
                      </button>

                      {/* Lista de Plantillas Individuales */}
                      {reportTemplates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => props.onSelectTemplate && props.onSelectTemplate(template)}
                          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all text-left"
                        >
                          <span className="w-1 h-1 rounded-full bg-current opacity-50 shrink-0" />
                          <span className="truncate">{template.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Settings className="w-4 h-4" />
          <span>Configuración</span>
        </div>
      </div>
    </aside>
  )
}
