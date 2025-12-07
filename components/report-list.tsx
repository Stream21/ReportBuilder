"use client"

import { Card } from "@/components/ui/card"
// Icons are now imported in lib/reports.ts but we need to import reports from there
// Actually, the previous step removed the lines using these icons, so I should clean up imports. 
// Wait, I replaced lines 10-74, but the component still uses them? 
// No, the component iterates over `reports`. The icon is part of the object.
// So I can remove the imports here.

interface ReportListProps {
  onSelectReport: (reportId: string) => void
}

import { reports } from "@/mocks/reports"

export function ReportList({ onSelectReport }: ReportListProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Tipos de Informes</h2>
          <p className="text-muted-foreground mt-2">Selecciona el tipo de informe para gestionar sus plantillas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => {
            const Icon = report.icon
            return (
              <Card
                key={report.id}
                className="p-6 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-card"
                onClick={() => onSelectReport(report.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${report.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">{report.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
