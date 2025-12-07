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
      <div className="overflow-auto h-full">
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

  // Si no hay componente seleccionado, mostramos mensaje
  return (
    <div className="p-4 h-full overflow-y-auto flex flex-col items-center justify-center text-muted-foreground">
      <h3 className="text-lg font-medium mb-2">Editor de Propiedades</h3>
      <p className="text-sm text-center">Selecciona un elemento en el lienzo para editar sus propiedades.</p>
    </div>
  )
}
