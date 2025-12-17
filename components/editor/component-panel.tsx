import { useEditor, Element } from "@craftjs/core"
import { useDrag } from "@/components/editor/drag-context"
import { Type, Square, TableIcon, Layout, Minus, Search } from "lucide-react"
import {
  Container,
  Text,
  Table,
  GioComponent,
  Divider,
} from "@/components/editor/components"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Template } from "@/app/page"

interface ComponentPanelProps {
  template?: Template
  onTemplateUpdate?: (updates: Partial<Template>) => void
}

export function ComponentPanel({ template, onTemplateUpdate }: ComponentPanelProps) {
  const { connectors } = useEditor()
  const { setDragType } = useDrag() // Import useDrag

  const sections = [
    {
      title: "Estructura",
      value: "structure",
      items: [
        {
          name: "Contenedor",
          type: "container",
          icon: Square,
          ref: (ref: HTMLDivElement) => { connectors.create(ref, <Element canvas is={Container} flexDirection="column" padding={20} />) },
        },
        {
          name: "Cuadrícula",
          type: "grid",
          icon: Layout,
          ref: (ref: HTMLDivElement) => {
            connectors.create(
              ref,
              <Element
                canvas
                is={Container}
                layout="grid"
                columns={2}
                rows={1}
                gap={20}
                padding={10}
                minHeight="100px"
              >
                <Element canvas is={Container} padding={10} minHeight="80px" backgroundColor="#f8fafc" borderColor="#e2e8f0" borderWidth={1} borderRadius={4} />
                <Element canvas is={Container} padding={10} minHeight="80px" backgroundColor="#f8fafc" borderColor="#e2e8f0" borderWidth={1} borderRadius={4} />
              </Element>
            )
          },
        },
        {
          name: "Separador",
          type: "divider",
          icon: Minus,
          ref: (ref: HTMLDivElement) => { connectors.create(ref, <Divider />) },
        },
      ]
    },
    {
      title: "Contenido",
      value: "content",
      items: [
        {
          name: "Texto Simple",
          type: "text",
          icon: Type,
          ref: (ref: HTMLDivElement) => { connectors.create(ref, <Text text="Texto de ejemplo" />) },
        },
        {
          name: "Tabla de Ítems",
          type: "table",
          icon: TableIcon,
          ref: (ref: HTMLDivElement) => { connectors.create(ref, <Table />) },
        },
      ]
    },
    {
      title: "Componentes Gio",
      value: "gio",
      items: [
        {
          name: "Logotipo",
          type: "gio",
          icon: Layout,
          ref: (ref: HTMLDivElement) => { connectors.create(ref, <GioComponent />) },
        },
      ]
    }
  ]

  return (
    <div className="w-80 bg-background border-r border-border overflow-auto flex flex-col scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg flex items-center justify-between">
          Editor
        </h2>
      </div>

      <Accordion type="multiple" defaultValue={["document", "structure", "content", "gio"]} className="w-full">
        {/* Configuración del Documento - Ahora en el panel izquierdo */}
        {template && onTemplateUpdate && (
          <AccordionItem value="document" className="border-b-0">
            <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-muted/50 text-sm font-medium text-muted-foreground data-[state=open]:text-foreground">
              Configuración Página
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2 space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Orientación</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={template.orientation === "portrait" ? "default" : "outline"}
                      size="sm"
                      className="flex-1 h-7 text-xs"
                      onClick={() => onTemplateUpdate({ orientation: "portrait" })}
                    >
                      Vertical
                    </Button>
                    <Button
                      variant={template.orientation === "landscape" ? "default" : "outline"}
                      size="sm"
                      className="flex-1 h-7 text-xs"
                      onClick={() => onTemplateUpdate({ orientation: "landscape" })}
                    >
                      Horizontal
                    </Button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {sections.map((section) => (
          <AccordionItem key={section.value} value={section.value} className="border-b-0">
            <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-muted/50 text-sm font-medium text-muted-foreground data-[state=open]:text-foreground">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="px-3 grid grid-cols-2 gap-2">
                {section.items.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={i}
                      ref={item.ref}
                      onMouseDownCapture={() => setDragType(item.type as any)} // Capture early
                      className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-primary/50 cursor-grab active:cursor-grabbing transition-all duration-200 group"
                    >
                      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
