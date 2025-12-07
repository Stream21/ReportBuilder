"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, FileText } from "lucide-react"
import type { Template } from "@/app/page"

interface DocumentConfigProps {
  onComplete: (config: Partial<Template>) => void
}

export function DocumentConfig({ onComplete }: DocumentConfigProps) {
  const [config, setConfig] = useState({
    name: "",
    paperType: "a4" as Template["paperType"],
    orientation: "portrait" as Template["orientation"],
    margins: { top: 20, right: 20, bottom: 20, left: 20 },
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  })

  const paperTypes = [
    { value: "continuous", label: "Papel Continuo", description: "Sin límites de altura" },
    { value: "a4", label: "A4", description: "210 x 297 mm" },
    { value: "a5", label: "A5", description: "148 x 210 mm" },
    { value: "letter", label: "Letter", description: "8.5 x 11 in" },
    { value: "label", label: "Etiqueta", description: "Tamaño personalizado" },
    { value: "email", label: "Email", description: "Formato HTML responsive" },
    { value: "sms", label: "SMS", description: "Mensaje de texto corto" },
  ]

  const handleSubmit = () => {
    if (!config.name) {
      alert("Por favor, ingresa un nombre para la plantilla")
      return
    }
    onComplete(config)
  }

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Configuración del Documento</h2>
          <p className="text-muted-foreground mt-2">
            Define las características básicas de tu plantilla antes de diseñarla
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-card">
            <Label htmlFor="name" className="text-base font-semibold">
              Nombre de la Plantilla
            </Label>
            <Input
              id="name"
              placeholder="Ej: Informe Optométrico Estándar"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="mt-2"
            />
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="text-base font-semibold mb-4">Tipo de Papel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paperTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setConfig({ ...config, paperType: type.value as Template["paperType"] })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    config.paperType === type.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FileText
                      className={`w-5 h-5 mt-0.5 ${
                        config.paperType === type.value ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <div>
                      <div className="font-medium text-foreground">{type.label}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{type.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="text-base font-semibold mb-4">Orientación</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setConfig({ ...config, orientation: "portrait" })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  config.orientation === "portrait"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-16 h-20 rounded border-2 ${
                      config.orientation === "portrait" ? "border-primary" : "border-border"
                    }`}
                  />
                  <span className="font-medium text-foreground">Vertical</span>
                </div>
              </button>
              <button
                onClick={() => setConfig({ ...config, orientation: "landscape" })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  config.orientation === "landscape"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-20 h-16 rounded border-2 ${
                      config.orientation === "landscape" ? "border-primary" : "border-border"
                    }`}
                  />
                  <span className="font-medium text-foreground">Horizontal</span>
                </div>
              </button>
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="text-base font-semibold mb-4">Márgenes del Documento (mm)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="margin-top" className="text-sm">
                  Superior
                </Label>
                <Input
                  id="margin-top"
                  type="number"
                  value={config.margins.top}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      margins: { ...config.margins, top: Number(e.target.value) },
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="margin-right" className="text-sm">
                  Derecho
                </Label>
                <Input
                  id="margin-right"
                  type="number"
                  value={config.margins.right}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      margins: { ...config.margins, right: Number(e.target.value) },
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="margin-bottom" className="text-sm">
                  Inferior
                </Label>
                <Input
                  id="margin-bottom"
                  type="number"
                  value={config.margins.bottom}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      margins: { ...config.margins, bottom: Number(e.target.value) },
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="margin-left" className="text-sm">
                  Izquierdo
                </Label>
                <Input
                  id="margin-left"
                  type="number"
                  value={config.margins.left}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      margins: { ...config.margins, left: Number(e.target.value) },
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="text-base font-semibold mb-4">Padding Interno (mm)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="padding-top" className="text-sm">
                  Superior
                </Label>
                <Input
                  id="padding-top"
                  type="number"
                  value={config.padding.top}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      padding: { ...config.padding, top: Number(e.target.value) },
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="padding-right" className="text-sm">
                  Derecho
                </Label>
                <Input
                  id="padding-right"
                  type="number"
                  value={config.padding.right}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      padding: { ...config.padding, right: Number(e.target.value) },
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="padding-bottom" className="text-sm">
                  Inferior
                </Label>
                <Input
                  id="padding-bottom"
                  type="number"
                  value={config.padding.bottom}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      padding: { ...config.padding, bottom: Number(e.target.value) },
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="padding-left" className="text-sm">
                  Izquierdo
                </Label>
                <Input
                  id="padding-left"
                  type="number"
                  value={config.padding.left}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      padding: { ...config.padding, left: Number(e.target.value) },
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button onClick={handleSubmit} size="lg" className="gap-2">
              Continuar al Editor
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
