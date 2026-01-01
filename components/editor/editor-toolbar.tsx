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
  onToggleVariables: () => void
  onToggleComponents: () => void
  showVariables: boolean
  showComponents: boolean
}


import { TwigExportModal } from "./twig-export-modal"
import { generateTwig } from "@/lib/twig-generator"

export function EditorToolbar({
  template,
  zoom,
  onZoomChange,
  onToggleVariables,
  onToggleComponents,
  showVariables,
  showComponents,
}: EditorToolbarProps) {
  const { actions, query, canUndo, canRedo, enabled } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    enabled: state.options.enabled,
  }))

  const [showTwigModal, setShowTwigModal] = useState(false)
  const [twigCode, setTwigCode] = useState("")

  const handleSave = () => {
    const json = query.serialize()
    console.log("Guardando plantilla:", json)
    // Aquí enviarías al backend de Symfony
    alert("Plantilla guardada correctamente")
  }

  const handleExportTwig = () => {
    // Get raw nodes which have the 'data' structure our generator expects
    const nodes = query.getState().nodes
    const code = generateTwig(nodes as any)
    setTwigCode(code)
    setShowTwigModal(true)
  }

  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true)
      const nodes = query.getState().nodes

      // Datos de prueba (estos vendrían de Symfony en un caso real de edición, 
      // o del formulario de "Visualizar" que crearemos después)
      const mockData = {
        invoice: { number: '2024-001', total: '150.00€', date: '25/12/2024' },
        empresa: { logo: 'https://via.placeholder.com/150x50?text=LOGO+EMPRESA' },
        items: [
          { name: 'Consultoría Estratégica', quantity: 1, price: 100.00, total: 100.00 },
          { name: 'Soporte Técnico', quantity: 2, price: 25.00, total: 50.00 }
        ]
      }

      const response = await fetch('/api/render-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, data: mockData })
      })

      if (!response.ok) throw new Error('Error generando PDF')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `factura-bff-${Date.now()}.pdf`
      link.click()

    } catch (e) {
      console.error(e)
      alert("Error al generar el PDF. Revisa la consola.")
    } finally {
      setIsGenerating(false)
    }
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



        <Button variant={showVariables ? "secondary" : "ghost"} size="sm" onClick={onToggleVariables}>
          <Database className="w-4 h-4 mr-2" />
          Variables
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Removed functionality of manual Edit/Preview toggle as requested by user. 
            Now "Visualizar" handles the preview/print state automatically. 
        */}

        <Button variant="default" size="sm" onClick={handleVisualizar}>
          <Eye className="w-4 h-4 mr-2" />
          Visualizar
        </Button>


        <Button variant="outline" size="sm" onClick={handleDownloadPDF} disabled={isGenerating}>
          {isGenerating ? (
            <span className="animate-spin mr-2">⏳</span>
          ) : (
            <Printer className="w-4 h-4 mr-2" />
          )}
          Simular PDF (BFF)
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

      <TwigExportModal
        open={showTwigModal}
        onOpenChange={setShowTwigModal}
        code={twigCode}
      />
    </div>
  )
}
