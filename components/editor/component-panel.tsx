import { useEditor, Element } from "@craftjs/core"
import { Type, Square, TableIcon, Layout, Minus } from "lucide-react"
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

  const sections = [
    {
      title: "Estructura",
      value: "structure",
      items: [
        {
          name: "Contenedor Flex",
          icon: Square,
          ref: (ref: HTMLDivElement) => { connectors.create(ref, <Element canvas is={Container} flexDirection="column" padding={20} />) },
        },
        {
          name: "Separador",
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
          name: "Texto",
          icon: Type,
          ref: (ref: HTMLDivElement) => { connectors.create(ref, <Text text="Texto de ejemplo" />) },
        },
        {
          name: "Tabla",
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
            <AccordionContent className="pt-1 pb-2">
              <div className="px-2 space-y-1">
                {section.items.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={i}
                      ref={item.ref}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-move transition-colors group"
                    >
                      <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
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
