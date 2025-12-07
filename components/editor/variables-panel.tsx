"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Braces } from "lucide-react"

export function VariablesPanel() {
  const [search, setSearch] = useState("")

  const variables = [
    {
      category: "Paciente",
      items: [
        "paciente.nombre",
        "paciente.apellidos",
        "paciente.dni",
        "paciente.fecha_nacimiento",
        "paciente.telefono",
        "paciente.email",
      ],
    },
    {
      category: "Optometría",
      items: [
        "graduacion.ojo_derecho_esfera",
        "graduacion.ojo_derecho_cilindro",
        "graduacion.ojo_derecho_eje",
        "graduacion.ojo_izquierdo_esfera",
        "agudeza_visual.ojo_derecho",
        "agudeza_visual.ojo_izquierdo",
      ],
    },
    {
      category: "Audiometría",
      items: [
        "audiometria.ojo_derecho_500hz",
        "audiometria.ojo_derecho_1000hz",
        "audiometria.ojo_derecho_2000hz",
        "audiometria.resultado",
      ],
    },
    {
      category: "Contactología",
      items: ["lentilla.marca", "lentilla.modelo", "lentilla.radio", "lentilla.diametro", "lentilla.potencia"],
    },
    {
      category: "Venta",
      items: ["venta.numero_factura", "venta.fecha", "venta.total", "venta.items", "venta.forma_pago"],
    },
    {
      category: "Empresa",
      items: [
        "empresa.nombre",
        "empresa.direccion",
        "empresa.telefono",
        "empresa.email",
        "empresa.cif",
        "empresa.logo",
      ],
    },
  ]

  const filteredVariables = variables
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((category) => category.items.length > 0)

  const handleDragStart = (e: React.DragEvent, variable: string) => {
    e.dataTransfer.setData("variable", variable)
    e.dataTransfer.effectAllowed = "copy"
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-background z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {filteredVariables.map((category) => (
            <div key={category.category}>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary/50" />
                {category.category}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {category.items.map((variable) => (
                  <div
                    key={variable}
                    draggable
                    onDragStart={(e) => handleDragStart(e, variable)}
                    className="flex items-center gap-3 p-2.5 rounded-md border border-transparent hover:border-border hover:bg-accent cursor-move transition-all group bg-card/50 shadow-sm hover:shadow"
                  >
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Braces className="w-3.5 h-3.5" />
                    </div>
                    <code className="text-xs font-mono text-foreground/80 flex-1 truncate select-all">{`{{ ${variable} }}`}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
