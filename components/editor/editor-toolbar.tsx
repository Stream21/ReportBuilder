"use client"

import { Button } from "@/components/ui/button"
import { Save, Undo, Redo, ZoomIn, ZoomOut, Eye, Code, Database, Box, Layers } from "lucide-react"
import type { Template } from "@/app/page"
import { useEditor } from "@craftjs/core"

interface EditorToolbarProps {
  template: Template
  zoom: number
  onZoomChange: (zoom: number) => void
  onToggleVariables: () => void
  onToggleComponents: () => void
  onToggleLayers: () => void
  showVariables: boolean
  showComponents: boolean
  showLayers: boolean
}

import { ModeToggle } from "@/components/mode-toggle"

export function EditorToolbar({
  template,
  zoom,
  onZoomChange,
  onToggleVariables,
  onToggleComponents,
  onToggleLayers,
  showVariables,
  showComponents,
  showLayers,
}: EditorToolbarProps) {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))

  const handleSave = () => {
    const json = query.serialize()
    console.log("Guardando plantilla:", json)
    // Aquí enviarías al backend de Symfony
    alert("Plantilla guardada correctamente")
  }

  const handleExportTwig = () => {
    const json = query.serialize()
    console.log("Exportando a Twig:", json)
    // Aquí generarías el Twig
    alert("Exportando plantilla a formato Twig")
  }

  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{template.name}</h2>
          <p className="text-xs text-muted-foreground">
            {template.paperType.toUpperCase()} - {template.orientation}
          </p>
        </div>
        <div className="h-8 w-px bg-border" />
        <ModeToggle />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => actions.history.undo()} disabled={!canUndo}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => actions.history.redo()} disabled={!canRedo}>
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button variant="ghost" size="sm" onClick={() => onZoomChange(Math.max(25, zoom - 25))}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium min-w-[60px] text-center text-foreground">{zoom}%</span>
        <Button variant="ghost" size="sm" onClick={() => onZoomChange(Math.min(200, zoom + 25))}>
          <ZoomIn className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button variant={showComponents ? "secondary" : "ghost"} size="sm" onClick={onToggleComponents}>
          <Box className="w-4 h-4 mr-2" />
          Componentes
        </Button>

        <Button variant={showLayers ? "secondary" : "ghost"} size="sm" onClick={onToggleLayers}>
          <Layers className="w-4 h-4 mr-2" />
          Capas
        </Button>

        <Button variant={showVariables ? "secondary" : "ghost"} size="sm" onClick={onToggleVariables}>
          <Database className="w-4 h-4 mr-2" />
          Variables
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Vista Previa
        </Button>

        <Button variant="ghost" size="sm" onClick={handleExportTwig}>
          <Code className="w-4 h-4 mr-2" />
          Exportar Twig
        </Button>

        <Button onClick={handleSave} size="sm">
          <Save className="w-4 h-4 mr-2" />
          Guardar
        </Button>
      </div>
    </div>
  )
}
