import { useEditor, Element } from "@craftjs/core"
import { useDrag } from "@/components/editor/drag-context"
import { Type, Square, Table as TableIcon, Layout, Minus, Plus, Settings2, Layers as LayersIcon, Database } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import type { Template } from "@/app/page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsPanel } from "@/components/editor/settings-panel"
import { VariablesPanel } from "@/components/editor/variables-panel"
import { Layers } from "@craftjs/layers"
import { useState, useEffect } from "react"

interface ComponentPanelProps {
  template?: Template
  onTemplateUpdate?: (updates: Partial<Template>) => void
}

export function ComponentPanel({ template, onTemplateUpdate }: ComponentPanelProps) {
  const { connectors } = useEditor()
  const { setDragType } = useDrag()

  // Auto-switch tabs logic
  const [activeTab, setActiveTab] = useState("add")
  const { selectedId } = useEditor((state) => ({
    selectedId: state.events.selected.size > 0 ? state.events.selected.values().next().value : null
  }))

  useEffect(() => {
    if (selectedId) {
      setActiveTab("edit")
    }
  }, [selectedId])

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
    <div className="w-80 bg-background border-r border-border flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full">
        <div className="border-b bg-background">
          <TabsList className="w-full grid grid-cols-3 h-12 p-0 bg-transparent">
            <TabsTrigger
              value="add"
              className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/10 p-2"
              title="Insertar y Variables"
            >
              <Plus className="w-5 h-5 mr-1" />
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/10 p-2"
              title="Propiedades"
            >
              <Settings2 className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger
              value="layers"
              className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/10 p-2"
              title="Capas"
            >
              <LayersIcon className="w-5 h-5" />
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Panel de Añadir Componentes y Variables */}
        <TabsContent value="add" className="flex-1 overflow-auto data-[state=inactive]:hidden mt-0 p-0">
          <div className="p-4 pb-2">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">
              Componentes & Variables
            </h2>
          </div>
          <Accordion type="multiple" defaultValue={["structure", "content", "gio", "variables"]} className="w-full">
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
                          onMouseDownCapture={() => setDragType(item.type as any)}
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

            {/* Nueva Sección de Variables */}
            <AccordionItem value="variables" className="border-b-0">
              <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-muted/50 text-sm font-medium text-muted-foreground data-[state=open]:text-foreground">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Variables</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                {/* Provide constrained height for the inner scrollable panel */}
                <div>
                  <VariablesPanel />
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </TabsContent>

        {/* Panel de Propiedades (Settings) */}
        <TabsContent value="edit" className="flex-1 overflow-hidden data-[state=inactive]:hidden mt-0">
          <SettingsPanel template={template} onTemplateUpdate={onTemplateUpdate} />
        </TabsContent>

        {/* Panel de Capas */}
        <TabsContent value="layers" className="flex-1 overflow-auto data-[state=inactive]:hidden mt-0 p-4">
          <Layers expandRootOnLoad={true} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
