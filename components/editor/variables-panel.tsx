"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Braces, Calendar, Hash, Type, Image, Phone, Mail, FileText } from "lucide-react"

export function VariablesPanel() {
  const [search, setSearch] = useState("")

  const getVariableIcon = (variable: string) => {
    const v = variable.toLowerCase()
    if (v.includes("fecha") || v.includes("date")) return Calendar
    if (v.includes("telef") || v.includes("phone")) return Phone
    if (v.includes("email") || v.includes("mail")) return Mail
    if (v.includes("logo") || v.includes("imagen") || v.includes("image")) return Image
    if (v.includes("esfera") || v.includes("cilindro") || v.includes("eje") || v.includes("total") || v.includes("precio") || v.includes("cantidad") || v.includes("ojo")) return Hash
    if (v.includes("dni") || v.includes("cif") || v.includes("id")) return FileText
    return Type // Default for text
  }

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
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((variable) => {
                  const Icon = getVariableIcon(variable)
                  return (
                    <div
                      key={variable}
                      draggable
                      onDragStart={(e) => handleDragStart(e, variable)}
                      className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:bg-accent/50 cursor-grab active:cursor-grabbing transition-all duration-200 group relative overflow-hidden"
                      title={`{{ ${variable} }}`} // Tooltip para ver el valor completo
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
                        <Icon className="w-4 h-4" />
                      </div>
                      <code className="text-[10px] font-mono text-foreground/80 w-full text-center truncate select-all px-1">
                        {`{{ ${variable} }}`}
                      </code>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
