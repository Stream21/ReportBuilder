"use client"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Save, Undo, Redo, ZoomIn, ZoomOut, Eye, EyeOff, Code, Database, Box, Layers, Printer } from "lucide-react"
import type { Template } from "@/app/page"
import { useEditor } from "@craftjs/core"

interface EditorToolbarProps {
  template: Template
  zoom: number
  onZoomChange: (zoom: number) => void
  onToggleComponents: () => void
  showComponents: boolean
  className?: string
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Cloud, Globe, History } from "lucide-react"


export function EditorToolbar({
  template,
  zoom,
  onZoomChange,
  onToggleComponents,
  showComponents,
  className,
}: EditorToolbarProps) {
  const { actions, query, canUndo, canRedo, enabled } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    enabled: state.options.enabled,
  }))


  const handleSave = () => {
    const json = query.serialize()
    console.log("Guardando plantilla:", json)
    // Aquí enviarías al backend de Symfony
    alert("Plantilla guardada (Draft)")
  }

  const handlePublish = () => {
    const json = query.serialize()
    console.log("Publicando plantilla:", json)
    alert("Plantilla Publicada (v" + template.version + ")")
  }





  useEffect(() => {
    const handleAfterPrint = () => {
      if (!enabled) {
        actions.setOptions((options) => (options.enabled = true))
      }
    }
    window.addEventListener("afterprint", handleAfterPrint)
    return () => window.removeEventListener("afterprint", handleAfterPrint)
  }, [enabled, actions])

  const handleVisualizar = () => {
    // Switch to preview mode immediately
    actions.setOptions((options) => (options.enabled = false))

    // Short timeout to allow React to render the clean state before opening print dialog
    setTimeout(() => {
      window.print()
    }, 100)
  }

  // MOCK: Mock revisions data
  const mockVersions = [
    { version: "1.2", date: "Hace 2 min", status: "draft", current: true },
    { version: "1.1", date: "Ayer, 15:30", status: "published", current: false },
    { version: "1.0", date: "12 Oct, 09:00", status: "published", current: false },
  ]

  const handleVersionChange = (ver: string) => {
    alert(`Cambiando a versión v${ver}... (Simulación)\n\nEn producción esto cargaría el JSON histórico.`)
  }

  return (
    <div className={`h-14 bg-card border-b border-border flex items-center justify-between px-4 ${className || ""}`}>
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-foreground">{template.name}</h2>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full border hover:bg-muted/80 transition-colors outline-none focus:ring-2 focus:ring-ring">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase">{template.status}</span>
                  <div className="w-px h-3 bg-border mx-1" />
                  <span className="text-xs font-medium">v{template.version}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Historial de Versiones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mockVersions.map((ver) => (
                  <DropdownMenuItem
                    key={ver.version}
                    className="flex flex-col items-start gap-1 cursor-pointer"
                    onClick={() => handleVersionChange(ver.version)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-medium ${ver.current ? "text-primary" : ""}`}>
                        v{ver.version}
                        {ver.current && " (Actual)"}
                      </span>
                      <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${ver.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {ver.status}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <History className="w-3 h-3" />
                      {ver.date}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {template.paperType.toUpperCase()} - {template.orientation}
          </p>
        </div>
        <div className="h-8 w-px bg-border" />
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
        <Button variant="ghost" size="sm" onClick={() => onZoomChange(Math.min(500, zoom + 25))}>
          <ZoomIn className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button variant={showComponents ? "secondary" : "ghost"} size="sm" onClick={onToggleComponents}>
          <Box className="w-4 h-4 mr-2" />
          Componentes
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button variant="outline" size="sm" onClick={handleVisualizar}>
          <Eye className="w-4 h-4 mr-2" />
          Visualizar
        </Button>

        <Button variant="ghost" size="sm" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Guardar
        </Button>

        <Button onClick={handlePublish} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
          <Globe className="w-4 h-4 mr-2" />
          Publicar
        </Button>
      </div>

    </div>
  )
}
