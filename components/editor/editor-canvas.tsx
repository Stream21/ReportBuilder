import { useRef, useState, MouseEvent } from "react"
import { Frame, Element, useEditor } from "@craftjs/core"
import type { Template } from "@/app/page"
import { Container, Text, Header, Footer } from "@/components/editor/components"
import { DefaultInvoiceLayout } from "@/components/editor/templates/default-invoice"
import { AdrianSalgadoLayout } from "@/components/editor/templates/adrian-salgado"

interface EditorCanvasProps {
  template: Template
  zoom: number
}

export function EditorCanvas({ template, zoom }: EditorCanvasProps) {
  const { actions } = useEditor()
  // ... existing code ...
  const getCanvasWidth = () => {
    switch (template.paperType) {
      case "a4":
        return template.orientation === "portrait" ? 210 : 297
      case "a5":
        return template.orientation === "portrait" ? 148 : 210
      case "letter":
        return template.orientation === "portrait" ? 216 : 279
      case "continuous":
        return template.paperWidth || 80 // Configurable Thermal Printer Width
      case "label":
        return 100
      case "email":
        return 600
      case "sms":
        return 320
      default:
        return 210
    }
  }

  const getCanvasHeight = () => {
    if (template.paperType === "continuous") {
      return "auto"
    }
    switch (template.paperType) {
      case "a4":
        return template.orientation === "portrait" ? 297 : 210
      case "a5":
        return template.orientation === "portrait" ? 210 : 148
      case "letter":
        return template.orientation === "portrait" ? 279 : 216
      case "label":
        return 50
      case "email":
        return 800
      case "sms":
        return 200
      default:
        return 297
    }
  }

  // Lógica de Layout Inteligente
  const isContinuous = template.paperType === "continuous"
  const canvasWidth = getCanvasWidth()
  const canvasHeight = getCanvasHeight()

  // Altura del lienzo visual (estilo)
  const canvasStyleHeight = isContinuous ? "auto" : `${canvasHeight}mm`

  // Altura mínima para visualización en editor (para que no se vea colapsado vacio)
  const minHeightVal = isContinuous ? "297mm" : "auto" // En continuo le damos una altura inicial visual agradable

  // Drag to Scroll Logic
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: MouseEvent) => {
    // Only allow left click dragging
    if (e.button !== 0) return
    setIsDragging(true)
    setLastPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()

    const dx = e.clientX - lastPos.x
    const dy = e.clientY - lastPos.y

    containerRef.current.scrollLeft -= dx
    containerRef.current.scrollTop -= dy

    setLastPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      ref={containerRef}
      className={`flex-1 bg-muted/30 overflow-auto relative h-full w-full custom-scrollbar flex items-center justify-center ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="relative flex items-center justify-center py-10 min-w-full min-h-full"
        style={{
          width: isContinuous ? "100%" : `${canvasWidth * (zoom / 100)}mm`,
          height: isContinuous ? "auto" : `${canvasHeight * (zoom / 100)}mm`,
        }}
      >
        <div
          style={{
            width: `${canvasWidth}mm`,
            minHeight: isContinuous ? "100mm" : canvasStyleHeight,
            height: isContinuous ? "auto" : canvasStyleHeight,
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center top",
            transition: "width 0.3s, height 0.3s, transform 0.2s cubic-bezier(0.2, 0, 0, 1)",
            fontFamily: template.fontFamily || "Arial",
          }}
          className="bg-white flex-col print-visible relative shadow-lg print:!transform-none print:!m-0 print:!shadow-none print:!fixed print:!top-0 print:!left-0 print:!w-screen print:!h-screen print:!z-[9999]"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: `${template.padding.top}mm ${template.padding.right}mm ${template.padding.bottom}mm ${template.padding.left}mm`,
            }}
          >
            <Frame>
              {(template.id === "adrian-1" || template.name?.includes("Adrian") || template.reportType === "optometric") ? (
                AdrianSalgadoLayout()
              ) : (
                DefaultInvoiceLayout()
              )}
            </Frame>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media print {
          @page {
            size: ${template.paperType === "continuous" ? (template.paperWidth || 80) + "mm auto" : (template.paperType === "a4" ? "A4" : template.paperType === "a5" ? "A5" : "auto") + " " + (template.paperType === "continuous" ? "portrait" : template.orientation)};
            margin: 0;
          }
           ${template.paperType === "continuous" ? `body { width: ${template.paperWidth || 80}mm; }` : ""}
        }
      `}</style>
    </div>
  )
}
