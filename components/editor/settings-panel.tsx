"use client"

import { useEditor } from "@craftjs/core"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import type { Template } from "@/app/page"
import React from "react"

interface SettingsPanelProps {
  template?: Template
  onTemplateUpdate?: (updates: Partial<Template>) => void
}

export function SettingsPanel({ template, onTemplateUpdate }: SettingsPanelProps) {
  const { selected, actions } = useEditor((state, query) => {
    const currentNodeId = state.events.selected.values().next().value
    let selectedNode

    if (currentNodeId) {
      const node = state.nodes[currentNodeId]
      const name = node.data.custom?.displayName || node.data.displayName
      const isProtected = ["Header", "Footer", "Body (Cuerpo)", "Documento General"].includes(name || "")

      selectedNode = {
        id: currentNodeId,
        data: node,
        settings: node.related && node.related.settings,
        isDeletable: !isProtected && query.node(currentNodeId).isDeletable(),
      }
    }

    return {
      selected: selectedNode,
    }
  })

  // Si hay un componente seleccionado, mostramos su configuración
  if (selected && selected.settings) {
    return (
      <div className="overflow-auto h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-muted/10 shrink-0">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            Propiedades
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs gap-1.5 text-muted-foreground hover:text-primary"
            onClick={() => actions.selectNode(null)}
            title="Volver a configuración del documento"
          >
            <FileText className="w-3.5 h-3.5" />
            Documento
          </Button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {React.createElement(selected.settings)}
          </div>

          <Separator className="my-6" />

          {selected.isDeletable && (
            <div className="mt-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  actions.delete(selected.id)
                }}
              >
                Eliminar Componente
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Si no hay componente seleccionado, mostramos Configuración del Documento
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-1">Configuración del Documento</h3>
          <p className="text-sm text-muted-foreground">Ajustes generales de la plantilla.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Formato de Papel</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "a4", label: "A4" },
                { value: "letter", label: "Carta" },
                { value: "a5", label: "A5" },
                { value: "continuous", label: "Continuo (Ticket)" },
              ].map((type) => (
                <div
                  key={type.value}
                  className={`cursor-pointer rounded-md border-2 p-2 hover:bg-accent ${template?.paperType === type.value ? "border-primary bg-accent" : "border-transparent bg-card"}`}
                  onClick={() => onTemplateUpdate?.({ paperType: type.value as any })}
                >
                  <div className="text-center font-medium text-sm">{type.label}</div>
                </div>
              ))}
            </div>
          </div>

          {template?.paperType !== "continuous" ? (
            <div className="space-y-2">
              <Label>Orientación</Label>
              <div className="flex bg-muted p-1 rounded-md">
                {[
                  { value: "portrait", label: "Vertical" },
                  { value: "landscape", label: "Horizontal" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    className={`flex-1 rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${template?.orientation === opt.value ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"}`}
                    onClick={() => onTemplateUpdate?.({ orientation: opt.value as any })}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Ancho del Papel (mm)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={template?.paperWidth || 80}
                  onChange={(e) => onTemplateUpdate?.({ paperWidth: Number(e.target.value) })}
                  className="h-9"
                />
                <span className="text-sm text-muted-foreground">mm</span>
              </div>
              <p className="text-[10px] text-muted-foreground">tickets estándar: 58mm o 80mm</p>
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Márgenes (mm)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Superior</Label>
                <Input
                  type="number"
                  value={template?.margins.top || 0}
                  onChange={(e) => onTemplateUpdate?.({ margins: { ...template!.margins, top: Number(e.target.value) } })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Inferior</Label>
                <Input
                  type="number"
                  value={template?.margins.bottom || 0}
                  onChange={(e) => onTemplateUpdate?.({ margins: { ...template!.margins, bottom: Number(e.target.value) } })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Izquierdo</Label>
                <Input
                  type="number"
                  value={template?.margins.left || 0}
                  onChange={(e) => onTemplateUpdate?.({ margins: { ...template!.margins, left: Number(e.target.value) } })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Derecho</Label>
                <Input
                  type="number"
                  value={template?.margins.right || 0}
                  onChange={(e) => onTemplateUpdate?.({ margins: { ...template!.margins, right: Number(e.target.value) } })}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Relleno / Padding (mm)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Superior</Label>
                <Input
                  type="number"
                  value={template?.padding.top || 0}
                  onChange={(e) => onTemplateUpdate?.({ padding: { ...template!.padding, top: Number(e.target.value) } })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Inferior</Label>
                <Input
                  type="number"
                  value={template?.padding.bottom || 0}
                  onChange={(e) => onTemplateUpdate?.({ padding: { ...template!.padding, bottom: Number(e.target.value) } })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Izquierdo</Label>
                <Input
                  type="number"
                  value={template?.padding.left || 0}
                  onChange={(e) => onTemplateUpdate?.({ padding: { ...template!.padding, left: Number(e.target.value) } })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Derecho</Label>
                <Input
                  type="number"
                  value={template?.padding.right || 0}
                  onChange={(e) => onTemplateUpdate?.({ padding: { ...template!.padding, right: Number(e.target.value) } })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
