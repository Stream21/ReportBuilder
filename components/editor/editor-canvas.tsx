"use client"

import { Frame, Element } from "@craftjs/core"
import type { Template } from "@/app/page"
import { Container, Text, Header, Footer } from "@/components/editor/components"
import { DefaultInvoiceLayout } from "@/components/editor/templates/default-invoice"
import { AdrianSalgadoLayout } from "@/components/editor/templates/adrian-salgado"

interface EditorCanvasProps {
  template: Template
  zoom: number
}

export function EditorCanvas({ template, zoom }: EditorCanvasProps) {
  const getCanvasWidth = () => {
    switch (template.paperType) {
      case "a4":
        return template.orientation === "portrait" ? 210 : 297
      case "a5":
        return template.orientation === "portrait" ? 148 : 210
      case "letter":
        return template.orientation === "portrait" ? 216 : 279
      case "continuous":
        return 210
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

  return (
    <div className="flex-1 bg-muted overflow-auto p-8">
      <div className="flex justify-center items-start min-h-full">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.2s",
            fontFamily: template.fontFamily || "Arial",
            // El wrapper externo no afecta al layout interno del documento, solo al zoom
          }}
        >
          <div
            className="bg-white shadow-2xl flex flex-col"
            style={{
              width: `${canvasWidth}mm`,
              height: isContinuous ? "auto" : canvasStyleHeight,
              minHeight: isContinuous ? "100mm" : undefined,
              padding: `${template.padding.top}mm ${template.padding.right}mm ${template.padding.bottom}mm ${template.padding.left}mm`,
              margin: `${template.margins.top}mm ${template.margins.right}mm ${template.margins.bottom}mm ${template.margins.left}mm`,
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
    </div>
  )
}
